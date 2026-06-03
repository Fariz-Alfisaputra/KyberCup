<?php

namespace App\Http\Controllers;

use App\Models\Team;
use App\Models\Tournament;
use App\Models\TournamentMatch;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();

        // Captain's teams
        $myTeams = $user->teams()
            ->withCount('members')
            ->get()
            ->map(fn ($t) => [
                'id' => $t->id,
                'nama_tim' => $t->nama_tim,
                'slug' => $t->slug,
                'logo_url' => $t->logo_url,
                'members_count' => $t->members_count,
                'role' => $t->pivot->role,
            ]);

        // Upcoming matches for user's teams
        $teamIds = $user->teams()->pluck('teams.id')->toArray();

        $upcomingMatches = TournamentMatch::with(['tournament', 'team1', 'team2'])
            ->where(function ($query) use ($teamIds) {
                $query->whereIn('team1_id', $teamIds)
                    ->orWhereIn('team2_id', $teamIds);
            })
            ->where('status', 'scheduled')
            ->orderBy('jadwal')
            ->take(5)
            ->get()
            ->map(fn ($m) => [
                'id' => $m->id,
                'round' => $m->round,
                'status' => $m->status->value,
                'jadwal' => $m->jadwal?->toISOString(),
                'tournament' => ['id' => $m->tournament->id, 'nama' => $m->tournament->nama, 'slug' => $m->tournament->slug],
                'team1' => ['id' => $m->team1->id, 'nama_tim' => $m->team1->nama_tim],
                'team2' => ['id' => $m->team2->id, 'nama_tim' => $m->team2->nama_tim],
            ]);

        // Registration status for user's teams
        $teamRegistrations = collect($teamIds)->isEmpty() ? collect() : Team::with(['registrations.tournament'])
            ->whereIn('id', $teamIds)
            ->get()
            ->flatMap(fn ($team) => $team->registrations->map(fn ($reg) => [
                'id' => $reg->id,
                'status' => $reg->status->value,
                'team' => ['id' => $team->id, 'nama_tim' => $team->nama_tim],
                'tournament' => ['id' => $reg->tournament->id, 'nama' => $reg->tournament->nama, 'slug' => $reg->tournament->slug],
            ]));

        return Inertia::render('dashboard', [
            'myTeams' => $myTeams,
            'upcomingMatches' => $upcomingMatches,
            'teamRegistrations' => $teamRegistrations,
        ]);
    }
}
