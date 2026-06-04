<?php

namespace App\Http\Controllers;

use App\Models\TournamentRegistration;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class NotificationController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();

        // Gather registration status changes for user's teams
        $teamIds = $user->teams()->pluck('teams.id')->toArray();

        $notifications = collect();

        if (! empty($teamIds)) {
            $registrations = TournamentRegistration::with(['tournament', 'team'])
                ->whereIn('team_id', $teamIds)
                ->latest()
                ->take(50)
                ->get()
                ->map(fn ($reg) => [
                    'id' => $reg->id,
                    'type' => 'registration',
                    'status' => $reg->status->value,
                    'message' => match ($reg->status->value) {
                        'approved' => "Tim {$reg->team->nama_tim} diterima di turnamen {$reg->tournament->nama}!",
                        'rejected' => "Tim {$reg->team->nama_tim} ditolak dari turnamen {$reg->tournament->nama}.",
                        default => "Pendaftaran tim {$reg->team->nama_tim} ke turnamen {$reg->tournament->nama} sedang menunggu persetujuan.",
                    },
                    'tournament_slug' => $reg->tournament->slug,
                    'created_at' => $reg->created_at->toISOString(),
                ]);

            $notifications = $notifications->merge($registrations);
        }

        return Inertia::render('notifications/Index', [
            'notifications' => $notifications->sortByDesc('created_at')->values(),
        ]);
    }
}
