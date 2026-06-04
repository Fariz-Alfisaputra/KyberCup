<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterTournamentRequest;
use App\Models\Tournament;
use App\Models\TournamentRegistration;
use Illuminate\Http\RedirectResponse;

class RegistrationController extends Controller
{
    public function store(RegisterTournamentRequest $request, string $slug): RedirectResponse
    {
        $tournament = Tournament::where('slug', $slug)->firstOrFail();

        if (! $tournament->isRegistrationOpen()) {
            return back()->with('error', 'Pendaftaran untuk turnamen ini sudah ditutup.');
        }

        $user = $request->user();
        $teamId = $request->validated('team_id');

        // Check if user is captain or member of this team
        $isMember = $user->teams()->where('teams.id', $teamId)->exists();
        if (! $isMember && ! $user->isAdmin()) {
            return back()->with('error', 'Anda bukan anggota tim ini.');
        }

        // Check if team already registered
        $existing = TournamentRegistration::where('tournament_id', $tournament->id)
            ->where('team_id', $teamId)
            ->first();

        if ($existing) {
            return back()->with('error', 'Tim ini sudah mendaftarkan diri ke turnamen.');
        }

        // Check if tournament is full
        $approvedCount = $tournament->registrations()->where('status', 'approved')->count();
        if ($approvedCount >= $tournament->max_tim) {
            return back()->with('error', 'Kuota tim untuk turnamen ini sudah penuh.');
        }

        TournamentRegistration::create([
            'tournament_id' => $tournament->id,
            'team_id' => $teamId,
            'status' => 'pending',
        ]);

        return back()->with('success', 'Pendaftaran berhasil dikirim! Menunggu persetujuan admin.');
    }
}
