<?php

namespace App\Http\Controllers\Admin;

use App\Enums\RegistrationStatus;
use App\Http\Controllers\Controller;
use App\Models\TournamentRegistration;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class RegistrationController extends Controller
{
    public function index(): Response
    {
        $registrations = TournamentRegistration::with(['tournament.game', 'team.captain'])
            ->latest()
            ->paginate(20)
            ->through(fn ($r) => [
                'id' => $r->id,
                'status' => $r->status->value,
                'catatan' => $r->catatan,
                'created_at' => $r->created_at->format('Y-m-d H:i'),
                'tournament' => [
                    'id' => $r->tournament->id,
                    'nama' => $r->tournament->nama,
                    'game' => ['nama_game' => $r->tournament->game->nama_game],
                ],
                'team' => [
                    'id' => $r->team->id,
                    'nama_tim' => $r->team->nama_tim,
                    'logo_url' => $r->team->logo_url,
                    'captain' => ['name' => $r->team->captain->name],
                ],
            ]);

        return Inertia::render('admin/Registrations', ['registrations' => $registrations]);
    }

    public function approve(TournamentRegistration $registration): RedirectResponse
    {
        $tournament = $registration->tournament;

        $approvedCount = $tournament->registrations()->where('status', 'approved')->count();
        if ($approvedCount >= $tournament->max_tim) {
            return back()->with('error', 'Kuota tim sudah penuh.');
        }

        $registration->update(['status' => RegistrationStatus::Approved]);

        return back()->with('success', "Pendaftaran {$registration->team->nama_tim} telah disetujui.");
    }

    public function reject(TournamentRegistration $registration): RedirectResponse
    {
        $registration->update(['status' => RegistrationStatus::Rejected]);

        return back()->with('success', "Pendaftaran {$registration->team->nama_tim} telah ditolak.");
    }
}
