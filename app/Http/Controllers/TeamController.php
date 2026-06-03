<?php

namespace App\Http\Controllers;

use App\Enums\TeamMemberRole;
use App\Enums\UserRole;
use App\Http\Requests\StoreTeamRequest;
use App\Http\Requests\UpdateTeamRequest;
use App\Models\Team;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class TeamController extends Controller
{
    public function index(): Response
    {
        $teams = Team::with(['captain'])
            ->active()
            ->withCount('members')
            ->latest()
            ->paginate(12)
            ->through(fn ($t) => [
                'id' => $t->id,
                'nama_tim' => $t->nama_tim,
                'slug' => $t->slug,
                'logo_url' => $t->logo_url,
                'deskripsi' => $t->deskripsi,
                'members_count' => $t->members_count,
                'captain' => ['id' => $t->captain->id, 'name' => $t->captain->name],
            ]);

        return Inertia::render('teams/Index', ['teams' => $teams]);
    }

    public function show(string $slug): Response
    {
        $team = Team::with(['captain', 'members'])->where('slug', $slug)->firstOrFail();

        return Inertia::render('teams/Show', [
            'team' => [
                'id' => $team->id,
                'nama_tim' => $team->nama_tim,
                'slug' => $team->slug,
                'logo_url' => $team->logo_url,
                'deskripsi' => $team->deskripsi,
                'is_active' => $team->is_active,
                'captain' => ['id' => $team->captain->id, 'name' => $team->captain->name, 'avatar_url' => $team->captain->avatar_url],
                'members' => $team->members->map(fn ($m) => [
                    'id' => $m->id,
                    'name' => $m->name,
                    'username' => $m->username,
                    'avatar_url' => $m->avatar_url,
                    'role' => $m->pivot->role,
                ]),
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('teams/Create');
    }

    public function store(StoreTeamRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $user = $request->user();

        $logoPath = null;
        if ($request->hasFile('logo')) {
            $logoPath = $request->file('logo')->store('teams/logos', 'public');
        }

        $slug = Str::slug($validated['nama_tim']).'-'.Str::random(4);

        $team = Team::create([
            'nama_tim' => $validated['nama_tim'],
            'slug' => $slug,
            'logo' => $logoPath,
            'deskripsi' => $validated['deskripsi'] ?? null,
            'captain_id' => $user->id,
            'invite_code' => strtoupper(Str::random(6)),
        ]);

        // Add captain as team member
        $team->members()->attach($user->id, [
            'role' => TeamMemberRole::Captain->value,
            'joined_at' => now(),
        ]);

        // Update user role to captain if they are a member
        if ($user->role === UserRole::Member) {
            $user->update(['role' => UserRole::Captain->value]);
        }

        return redirect()->route('teams.show', $team->slug)
            ->with('success', 'Tim berhasil dibuat!');
    }

    public function edit(Team $team): Response
    {
        $this->authorize('update', $team);

        return Inertia::render('teams/Edit', [
            'team' => [
                'id' => $team->id,
                'nama_tim' => $team->nama_tim,
                'slug' => $team->slug,
                'logo_url' => $team->logo_url,
                'deskripsi' => $team->deskripsi,
                'invite_code' => $team->invite_code,
            ],
        ]);
    }

    public function update(UpdateTeamRequest $request, Team $team): RedirectResponse
    {
        $validated = $request->validated();

        if ($request->hasFile('logo')) {
            if ($team->logo) {
                Storage::disk('public')->delete($team->logo);
            }
            $validated['logo'] = $request->file('logo')->store('teams/logos', 'public');
        }

        $team->update($validated);

        return redirect()->route('teams.show', $team->slug)
            ->with('success', 'Tim berhasil diperbarui!');
    }

    public function destroy(Team $team): RedirectResponse
    {
        $this->authorize('delete', $team);

        if ($team->logo) {
            Storage::disk('public')->delete($team->logo);
        }

        $team->delete();

        return redirect()->route('teams.index')
            ->with('success', 'Tim berhasil dihapus.');
    }

    public function join(Request $request): RedirectResponse
    {
        $request->validate([
            'invite_code' => ['required', 'string', 'size:6'],
        ]);

        $team = Team::where('invite_code', strtoupper($request->invite_code))
            ->where('is_active', true)
            ->firstOrFail();

        $user = $request->user();

        // Check if already a member
        if ($team->members()->where('user_id', $user->id)->exists()) {
            return back()->with('error', 'Anda sudah terdaftar di tim ini.');
        }

        $team->members()->attach($user->id, [
            'role' => TeamMemberRole::Member->value,
            'joined_at' => now(),
        ]);

        return redirect()->route('teams.show', $team->slug)
            ->with('success', "Berhasil bergabung dengan tim {$team->nama_tim}!");
    }

    public function kick(Team $team, \App\Models\User $user): RedirectResponse
    {
        $currentUser = request()->user();

        if ($team->captain_id !== $currentUser->id && ! $currentUser->isAdmin()) {
            abort(403);
        }

        if ($user->id === $team->captain_id) {
            return back()->with('error', 'Captain tidak bisa di-kick dari tim.');
        }

        $team->members()->detach($user->id);

        return back()->with('success', "{$user->name} berhasil dikeluarkan dari tim.");
    }

    public function generateInviteCode(Team $team): RedirectResponse
    {
        $currentUser = request()->user();

        if ($team->captain_id !== $currentUser->id && ! $currentUser->isAdmin()) {
            abort(403);
        }

        $code = $team->generateInviteCode();

        return back()->with('success', "Kode undangan baru: {$code}");
    }
}
