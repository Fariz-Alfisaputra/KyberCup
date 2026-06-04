<?php

namespace App\Http\Controllers;

use App\Models\Team;
use App\Models\TournamentMatch;
use Inertia\Inertia;
use Inertia\Response;

class LeaderboardController extends Controller
{
    public function index(): Response
    {
        // Calculate stats from matches table directly
        $teamStats = Team::active()
            ->with(['captain'])
            ->get()
            ->map(function ($team) {
                $wins = TournamentMatch::where('winner_id', $team->id)
                    ->whereIn('status', ['selesai', 'walkover'])
                    ->count();

                $totalMatches = TournamentMatch::where(function ($q) use ($team) {
                    $q->where('team1_id', $team->id)
                        ->orWhere('team2_id', $team->id);
                })
                    ->whereIn('status', ['selesai', 'walkover'])
                    ->count();

                $losses = $totalMatches - $wins;

                return [
                    'id' => $team->id,
                    'nama_tim' => $team->nama_tim,
                    'slug' => $team->slug,
                    'logo_url' => $team->logo_url,
                    'captain' => $team->captain?->name,
                    'wins' => $wins,
                    'losses' => $losses,
                    'total_matches' => $totalMatches,
                    'win_rate' => $totalMatches > 0 ? round(($wins / $totalMatches) * 100, 1) : 0,
                    'points' => ($wins * 3),
                ];
            })
            ->sortByDesc('points')
            ->sortByDesc('win_rate')
            ->values()
            ->map(function ($team, $index) {
                $team['rank'] = $index + 1;

                return $team;
            });

        return Inertia::render('leaderboard/Index', [
            'teams' => $teamStats,
        ]);
    }
}
