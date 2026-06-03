<?php

namespace App\Services;

use App\Enums\MatchStatus;
use App\Enums\TournamentStatus;
use App\Models\Standing;
use App\Models\Tournament;
use App\Models\TournamentMatch;
use Illuminate\Support\Collection;

class TournamentService
{
    /**
     * Generate single elimination bracket for a tournament.
     * Teams are seeded from approved registrations.
     */
    public function generateBracket(Tournament $tournament): void
    {
        $teams = $tournament->approvedTeams->shuffle();
        $teamCount = $teams->count();

        if ($teamCount < 2) {
            return;
        }

        // Delete existing bracket
        $tournament->matches()->delete();
        $tournament->standings()->delete();

        // Calculate number of rounds needed
        $rounds = (int) ceil(log($teamCount, 2));
        $bracketSize = (int) pow(2, $rounds);

        // Pad with byes (null slots)
        $paddedTeams = $teams->toArray();
        while (count($paddedTeams) < $bracketSize) {
            $paddedTeams[] = null;
        }

        // Create first round matches
        $bracketPosition = 1;
        $matchesCreated = [];

        for ($i = 0; $i < $bracketSize; $i += 2) {
            $team1 = $paddedTeams[$i] ?? null;
            $team2 = $paddedTeams[$i + 1] ?? null;

            if ($team1 === null && $team2 === null) {
                $bracketPosition++;

                continue;
            }

            $match = TournamentMatch::create([
                'tournament_id' => $tournament->id,
                'team1_id' => $team1 ? $team1['id'] : ($team2['id'] ?? null),
                'team2_id' => $team2 ? $team2['id'] : ($team1['id'] ?? null),
                'round' => 1,
                'bracket_position' => $bracketPosition,
                'status' => ($team1 === null || $team2 === null) ? MatchStatus::Walkover : MatchStatus::Scheduled,
                'winner_id' => ($team1 === null) ? ($team2['id'] ?? null) : (($team2 === null) ? ($team1['id'] ?? null) : null),
            ]);

            $matchesCreated[] = $match;
            $bracketPosition++;
        }

        // Initialize standings for all teams
        foreach ($teams as $team) {
            Standing::create([
                'tournament_id' => $tournament->id,
                'team_id' => $team['id'],
                'menang' => 0,
                'kalah' => 0,
                'draw' => 0,
                'poin' => 0,
                'posisi' => 0,
            ]);
        }

        // Update tournament status to ongoing
        $tournament->update(['status' => TournamentStatus::Ongoing]);
    }

    /**
     * Update standings after a match result is recorded.
     */
    public function updateStandings(TournamentMatch $match): void
    {
        if (! $match->winner_id) {
            return;
        }

        $loserId = $match->winner_id === $match->team1_id ? $match->team2_id : $match->team1_id;

        // Update winner standing
        $winnerStanding = Standing::firstOrCreate(
            ['tournament_id' => $match->tournament_id, 'team_id' => $match->winner_id],
            ['menang' => 0, 'kalah' => 0, 'draw' => 0, 'poin' => 0, 'posisi' => 0]
        );
        $winnerStanding->increment('menang');
        $winnerStanding->increment('poin', 3);

        // Update loser standing
        $loserStanding = Standing::firstOrCreate(
            ['tournament_id' => $match->tournament_id, 'team_id' => $loserId],
            ['menang' => 0, 'kalah' => 0, 'draw' => 0, 'poin' => 0, 'posisi' => 0]
        );
        $loserStanding->increment('kalah');

        // Recalculate positions
        $this->recalculatePositions($match->tournament_id);
    }

    /**
     * Recalculate positions based on current points.
     */
    private function recalculatePositions(int $tournamentId): void
    {
        $standings = Standing::where('tournament_id', $tournamentId)
            ->orderByDesc('poin')
            ->orderByDesc('menang')
            ->get();

        foreach ($standings as $index => $standing) {
            $standing->update(['posisi' => $index + 1]);
        }
    }

    /**
     * Get all matches for a specific round.
     *
     * @return Collection<int, TournamentMatch>
     */
    public function getNextRoundMatches(Tournament $tournament, int $round): Collection
    {
        return $tournament->matches()
            ->with(['team1', 'team2', 'winner'])
            ->where('round', $round)
            ->orderBy('bracket_position')
            ->get();
    }

    /**
     * Get all matches grouped by round for bracket display.
     *
     * @return Collection<int, Collection<int, TournamentMatch>>
     */
    public function getBracketData(Tournament $tournament): Collection
    {
        $matches = $tournament->matches()
            ->with(['team1', 'team2', 'winner'])
            ->orderBy('round')
            ->orderBy('bracket_position')
            ->get();

        return $matches->groupBy('round');
    }

    /**
     * Generate next round matches after current round is complete.
     */
    public function advanceRound(Tournament $tournament, int $completedRound): void
    {
        $currentRoundMatches = $tournament->matches()
            ->where('round', $completedRound)
            ->get();

        $allFinished = $currentRoundMatches->every(
            fn ($match) => in_array($match->status, [MatchStatus::Selesai, MatchStatus::Walkover])
        );

        if (! $allFinished || $currentRoundMatches->isEmpty()) {
            return;
        }

        $winners = $currentRoundMatches
            ->filter(fn ($m) => $m->winner_id !== null)
            ->pluck('winner_id')
            ->toArray();

        if (count($winners) < 2) {
            // Tournament is done
            $tournament->update(['status' => TournamentStatus::Selesai]);

            return;
        }

        // Create next round matches
        $nextRound = $completedRound + 1;
        $bracketPosition = 1;

        for ($i = 0; $i < count($winners); $i += 2) {
            TournamentMatch::create([
                'tournament_id' => $tournament->id,
                'team1_id' => $winners[$i],
                'team2_id' => $winners[$i + 1] ?? $winners[$i],
                'round' => $nextRound,
                'bracket_position' => $bracketPosition,
                'status' => MatchStatus::Scheduled,
            ]);
            $bracketPosition++;
        }
    }
}
