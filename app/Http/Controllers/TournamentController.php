<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Tournament;
use App\Services\TournamentService;
use Inertia\Inertia;
use Inertia\Response;

class TournamentController extends Controller
{
    public function __construct(private readonly TournamentService $tournamentService) {}

    public function index(): Response
    {
        $tournaments = Tournament::with(['game'])
            ->public()
            ->withCount(['registrations as registrations_count' => function ($query) {
                $query->where('status', 'approved');
            }])
            ->latest()
            ->paginate(12)
            ->through(fn ($t) => [
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

        $games = Game::active()->get(['id', 'nama_game']);

        return Inertia::render('tournaments/Index', [
            'tournaments' => $tournaments,
            'games' => $games,
        ]);
    }

    public function show(string $slug): Response
    {
        $tournament = Tournament::with(['game', 'creator'])
            ->where('slug', $slug)
            ->firstOrFail();

        $bracketData = $this->tournamentService->getBracketData($tournament);

        $matches = $bracketData->map(fn ($roundMatches) => $roundMatches->map(fn ($m) => [
            'id' => $m->id,
            'round' => $m->round,
            'bracket_position' => $m->bracket_position,
            'status' => $m->status->value,
            'skor_team1' => $m->skor_team1,
            'skor_team2' => $m->skor_team2,
            'jadwal' => $m->jadwal?->toISOString(),
            'team1' => $m->team1 ? ['id' => $m->team1->id, 'nama_tim' => $m->team1->nama_tim, 'logo_url' => $m->team1->logo_url] : null,
            'team2' => $m->team2 ? ['id' => $m->team2->id, 'nama_tim' => $m->team2->nama_tim, 'logo_url' => $m->team2->logo_url] : null,
            'winner' => $m->winner ? ['id' => $m->winner->id, 'nama_tim' => $m->winner->nama_tim] : null,
        ]));

        $standings = $tournament->standings()
            ->with('team')
            ->get()
            ->map(fn ($s) => [
                'posisi' => $s->posisi,
                'menang' => $s->menang,
                'kalah' => $s->kalah,
                'draw' => $s->draw,
                'poin' => $s->poin,
                'team' => ['id' => $s->team->id, 'nama_tim' => $s->team->nama_tim, 'logo_url' => $s->team->logo_url],
            ]);

        $registrations = $tournament->registrations()
            ->with('team')
            ->get()
            ->map(fn ($r) => [
                'id' => $r->id,
                'status' => $r->status->value,
                'team' => ['id' => $r->team->id, 'nama_tim' => $r->team->nama_tim, 'logo_url' => $r->team->logo_url, 'slug' => $r->team->slug],
            ]);

        return Inertia::render('tournaments/Show', [
            'tournament' => [
                'id' => $tournament->id,
                'nama' => $tournament->nama,
                'slug' => $tournament->slug,
                'format' => $tournament->format->value,
                'status' => $tournament->status->value,
                'max_tim' => $tournament->max_tim,
                'hadiah' => $tournament->hadiah,
                'prize_pool' => $tournament->prize_pool,
                'deskripsi' => $tournament->deskripsi,
                'banner_url' => $tournament->banner_url,
                'registration_deadline' => $tournament->registration_deadline?->toISOString(),
                'tanggal_mulai' => $tournament->tanggal_mulai?->format('Y-m-d'),
                'tanggal_selesai' => $tournament->tanggal_selesai?->format('Y-m-d'),
                'registrations_count' => $tournament->registrations()->where('status', 'approved')->count(),
                'game' => [
                    'id' => $tournament->game->id,
                    'nama_game' => $tournament->game->nama_game,
                    'logo_url' => $tournament->game->logo_url,
                    'genre' => $tournament->game->genre,
                ],
            ],
            'matches' => $matches,
            'standings' => $standings,
            'registrations' => $registrations,
        ]);
    }
}
