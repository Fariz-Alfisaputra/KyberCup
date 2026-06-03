<?php

namespace App\Http\Controllers;

use App\Models\Tournament;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $openTournaments = Tournament::with(['game'])
            ->open()
            ->withCount(['registrations as registrations_count' => function ($query) {
                $query->where('status', 'approved');
            }])
            ->latest()
            ->take(6)
            ->get()
            ->map(fn ($t) => [
                'id' => $t->id,
                'nama' => $t->nama,
                'slug' => $t->slug,
                'format' => $t->format->value,
                'status' => $t->status->value,
                'max_tim' => $t->max_tim,
                'hadiah' => $t->hadiah,
                'prize_pool' => $t->prize_pool,
                'registration_deadline' => $t->registration_deadline?->toISOString(),
                'tanggal_mulai' => $t->tanggal_mulai?->format('Y-m-d'),
                'banner_url' => $t->banner_url,
                'registrations_count' => $t->registrations_count,
                'game' => [
                    'id' => $t->game->id,
                    'nama_game' => $t->game->nama_game,
                    'logo_url' => $t->game->logo_url,
                ],
            ]);

        $ongoingTournaments = Tournament::with(['game'])
            ->ongoing()
            ->withCount(['registrations as registrations_count' => function ($query) {
                $query->where('status', 'approved');
            }])
            ->latest()
            ->take(3)
            ->get()
            ->map(fn ($t) => [
                'id' => $t->id,
                'nama' => $t->nama,
                'slug' => $t->slug,
                'status' => $t->status->value,
                'max_tim' => $t->max_tim,
                'hadiah' => $t->hadiah,
                'tanggal_mulai' => $t->tanggal_mulai?->format('Y-m-d'),
                'banner_url' => $t->banner_url,
                'registrations_count' => $t->registrations_count,
                'game' => [
                    'id' => $t->game->id,
                    'nama_game' => $t->game->nama_game,
                    'logo_url' => $t->game->logo_url,
                ],
            ]);

        return Inertia::render('Home', [
            'openTournaments' => $openTournaments,
            'ongoingTournaments' => $ongoingTournaments,
        ]);
    }
}
