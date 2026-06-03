<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreGameRequest;
use App\Models\Game;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class GameController extends Controller
{
    public function index(): Response
    {
        $games = Game::withCount('tournaments')
            ->latest()
            ->paginate(15)
            ->through(fn ($g) => [
                'id' => $g->id,
                'nama_game' => $g->nama_game,
                'genre' => $g->genre,
                'logo_url' => $g->logo_url,
                'deskripsi' => $g->deskripsi,
                'is_active' => $g->is_active,
                'tournaments_count' => $g->tournaments_count,
            ]);

        return Inertia::render('admin/Games', ['games' => $games]);
    }

    public function store(StoreGameRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $logoPath = null;
        if ($request->hasFile('logo')) {
            $logoPath = $request->file('logo')->store('games/logos', 'public');
        }

        Game::create([
            ...$validated,
            'logo' => $logoPath,
        ]);

        return redirect()->route('admin.games.index')
            ->with('success', 'Game berhasil ditambahkan!');
    }

    public function update(Request $request, Game $game): RedirectResponse
    {
        $validated = $request->validate([
            'nama_game' => ['required', 'string', 'max:255'],
            'genre' => ['required', 'string', 'max:255'],
            'logo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'deskripsi' => ['nullable', 'string'],
            'is_active' => ['boolean'],
        ]);

        if ($request->hasFile('logo')) {
            if ($game->logo) {
                Storage::disk('public')->delete($game->logo);
            }
            $validated['logo'] = $request->file('logo')->store('games/logos', 'public');
        }

        $game->update($validated);

        return redirect()->route('admin.games.index')
            ->with('success', 'Game berhasil diperbarui!');
    }

    public function destroy(Game $game): RedirectResponse
    {
        if ($game->logo) {
            Storage::disk('public')->delete($game->logo);
        }

        $game->delete();

        return redirect()->route('admin.games.index')
            ->with('success', 'Game berhasil dihapus.');
    }
}
