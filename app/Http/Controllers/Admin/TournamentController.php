<?php

namespace App\Http\Controllers\Admin;

use App\Enums\TournamentStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTournamentRequest;
use App\Http\Requests\UpdateTournamentRequest;
use App\Models\Game;
use App\Models\Tournament;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class TournamentController extends Controller
{
    public function index(): Response
    {
        $tournaments = Tournament::with(['game', 'creator'])
            ->withCount([
                'registrations as registrations_count',
                'matches as matches_count',
            ])
            ->latest()
            ->paginate(15)
            ->through(fn ($t) => [
                'id' => $t->id,
                'nama' => $t->nama,
                'slug' => $t->slug,
                'format' => $t->format->value,
                'status' => $t->status->value,
                'max_tim' => $t->max_tim,
                'hadiah' => $t->hadiah,
                'prize_pool' => $t->prize_pool,
                'registration_deadline' => $t->registration_deadline?->format('Y-m-d H:i'),
                'tanggal_mulai' => $t->tanggal_mulai?->format('Y-m-d'),
                'registrations_count' => $t->registrations_count,
                'matches_count' => $t->matches_count,
                'banner_url' => $t->banner_url,
                'game' => ['id' => $t->game->id, 'nama_game' => $t->game->nama_game],
                'creator' => ['id' => $t->creator->id, 'name' => $t->creator->name],
            ]);

        return Inertia::render('admin/Tournaments', ['tournaments' => $tournaments]);
    }

    public function create(): Response
    {
        $games = Game::active()->get(['id', 'nama_game']);

        return Inertia::render('admin/tournaments/Create', ['games' => $games]);
    }

    public function store(StoreTournamentRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $bannerPath = null;
        if ($request->hasFile('banner')) {
            $bannerPath = $request->file('banner')->store('tournaments/banners', 'public');
        }

        Tournament::create([
            ...$validated,
            'slug' => Str::slug($validated['nama']).'-'.Str::random(6),
            'banner' => $bannerPath,
            'created_by' => $request->user()->id,
        ]);

        return redirect()->route('admin.tournaments.index')
            ->with('success', 'Turnamen berhasil dibuat!');
    }

    public function edit(Tournament $tournament): Response
    {
        $games = Game::active()->get(['id', 'nama_game']);

        return Inertia::render('admin/tournaments/Edit', [
            'tournament' => [
                'id' => $tournament->id,
                'nama' => $tournament->nama,
                'slug' => $tournament->slug,
                'game_id' => $tournament->game_id,
                'format' => $tournament->format->value,
                'status' => $tournament->status->value,
                'max_tim' => $tournament->max_tim,
                'hadiah' => $tournament->hadiah,
                'prize_pool' => $tournament->prize_pool,
                'deskripsi' => $tournament->deskripsi,
                'banner_url' => $tournament->banner_url,
                'registration_deadline' => $tournament->registration_deadline?->format('Y-m-d\TH:i'),
                'tanggal_mulai' => $tournament->tanggal_mulai?->format('Y-m-d'),
                'tanggal_selesai' => $tournament->tanggal_selesai?->format('Y-m-d'),
            ],
            'games' => $games,
            'locked_fields' => $this->lockedFields($tournament),
            'edit_hint' => $this->editHint($tournament),
        ]);
    }

    public function update(UpdateTournamentRequest $request, Tournament $tournament): RedirectResponse
    {
        $validated = $request->validated();

        if ($request->hasFile('banner')) {
            if ($tournament->banner) {
                Storage::disk('public')->delete($tournament->banner);
            }
            $validated['banner'] = $request->file('banner')->store('tournaments/banners', 'public');
        }

        $allowed = $this->editableFields($tournament);
        $tournament->update(collect($validated)->only($allowed)->all());

        return redirect()->route('admin.tournaments.index')
            ->with('success', 'Turnamen berhasil diperbarui!');
    }

    /**
     * @return list<string>
     */
    private function editableFields(Tournament $tournament): array
    {
        if ($tournament->status === TournamentStatus::Selesai) {
            return ['nama', 'hadiah', 'prize_pool', 'deskripsi', 'banner'];
        }

        if ($this->hasBracket($tournament)) {
            return [
                'nama',
                'hadiah',
                'prize_pool',
                'deskripsi',
                'banner',
                'status',
                'tanggal_mulai',
                'tanggal_selesai',
            ];
        }

        return [
            'nama',
            'game_id',
            'format',
            'max_tim',
            'hadiah',
            'prize_pool',
            'deskripsi',
            'banner',
            'status',
            'tanggal_mulai',
            'tanggal_selesai',
            'registration_deadline',
        ];
    }

    /**
     * @return list<string>
     */
    private function lockedFields(Tournament $tournament): array
    {
        $all = [
            'game_id',
            'format',
            'max_tim',
            'status',
            'registration_deadline',
            'tanggal_mulai',
            'tanggal_selesai',
        ];

        return array_values(array_diff($all, $this->editableFields($tournament)));
    }

    private function editHint(Tournament $tournament): ?string
    {
        if ($tournament->status === TournamentStatus::Selesai) {
            return 'Turnamen selesai: hanya informasi tampilan (nama, hadiah, deskripsi, banner) yang dapat diubah.';
        }

        if ($this->hasBracket($tournament)) {
            return 'Bracket sudah di-generate: game, format, kapasitas tim, dan deadline pendaftaran dikunci agar data pertandingan tetap konsisten. Ubah skor di menu Matches.';
        }

        if ($tournament->status === TournamentStatus::Open) {
            return 'Pendaftaran masih dibuka: semua pengaturan turnamen dapat diubah selama bracket belum di-generate.';
        }

        return null;
    }

    private function hasBracket(Tournament $tournament): bool
    {
        return $tournament->matches()->exists();
    }

    public function destroy(Tournament $tournament): RedirectResponse
    {
        if ($tournament->banner) {
            Storage::disk('public')->delete($tournament->banner);
        }

        $tournament->delete();

        return redirect()->route('admin.tournaments.index')
            ->with('success', 'Turnamen berhasil dihapus.');
    }
}
