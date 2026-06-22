<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MatchStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateMatchResultRequest;
use App\Models\Tournament;
use App\Models\TournamentMatch;
use App\Services\TournamentService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MatchController extends Controller
{
    public function __construct(private readonly TournamentService $tournamentService) {}

    public function index(Request $request): Response
    {
        $tournamentId = $request->integer('tournament');

        $matches = TournamentMatch::with(['tournament', 'team1', 'team2', 'winner'])
            ->when($tournamentId > 0, fn ($query) => $query->where('tournament_id', $tournamentId))
            ->orderBy('tournament_id')
            ->orderBy('round')
            ->orderBy('bracket_position')
            ->paginate(20)
            ->withQueryString()
            ->through(fn ($m) => [
                'id' => $m->id,
                'round' => $m->round,
                'bracket_position' => $m->bracket_position,
                'status' => $m->status->value,
                'skor_team1' => $m->skor_team1,
                'skor_team2' => $m->skor_team2,
                'jadwal' => $m->jadwal?->format('Y-m-d H:i'),
                'catatan' => $m->catatan,
                'tournament' => ['id' => $m->tournament->id, 'nama' => $m->tournament->nama],
                'team1' => ['id' => $m->team1->id, 'nama_tim' => $m->team1->nama_tim],
                'team2' => ['id' => $m->team2->id, 'nama_tim' => $m->team2->nama_tim],
                'winner' => $m->winner ? ['id' => $m->winner->id, 'nama_tim' => $m->winner->nama_tim] : null,
            ]);

        $tournaments = Tournament::query()
            ->orderBy('nama')
            ->get(['id', 'nama']);

        return Inertia::render('admin/Matches', [
            'matches' => $matches,
            'tournaments' => $tournaments,
            'filters' => [
                'tournament' => $tournamentId > 0 ? $tournamentId : null,
            ],
        ]);
    }

    public function result(UpdateMatchResultRequest $request, TournamentMatch $match): RedirectResponse
    {
        $validated = $request->validated();

        $match->update([
            ...$validated,
            'status' => MatchStatus::Selesai,
        ]);

        // Update standings after match result
        $this->tournamentService->updateStandings($match->fresh());

        // Try to advance round
        $this->tournamentService->advanceRound($match->tournament, $match->round);

        return back()->with('success', 'Hasil match berhasil diinput!');
    }
}
