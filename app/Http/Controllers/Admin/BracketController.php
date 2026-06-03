<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Tournament;
use App\Services\TournamentService;
use Illuminate\Http\RedirectResponse;

class BracketController extends Controller
{
    public function __construct(private readonly TournamentService $tournamentService) {}

    public function generate(Tournament $tournament): RedirectResponse
    {
        $approvedCount = $tournament->registrations()->where('status', 'approved')->count();

        if ($approvedCount < 2) {
            return back()->with('error', 'Minimal 2 tim yang disetujui diperlukan untuk generate bracket.');
        }

        $this->tournamentService->generateBracket($tournament);

        return back()->with('success', "Bracket untuk turnamen {$tournament->nama} berhasil di-generate!");
    }
}
