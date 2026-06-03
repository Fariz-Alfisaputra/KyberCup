<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Game;
use App\Models\Team;
use App\Models\Tournament;
use App\Models\TournamentRegistration;
use App\Models\User;
use Carbon\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $stats = [
            'total_tournaments' => Tournament::count(),
            'active_tournaments' => Tournament::whereIn('status', ['open', 'ongoing'])->count(),
            'total_teams' => Team::count(),
            'total_users' => User::count(),
            'total_registrations' => TournamentRegistration::count(),
            'pending_registrations' => TournamentRegistration::where('status', 'pending')->count(),
        ];

        // Tournament status distribution for pie chart
        $tournamentStatusDistribution = Tournament::selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->get()
            ->map(fn ($item) => [
                'name' => $item->status->label(),
                'value' => $item->count,
                'color' => match ($item->status->value) {
                    'draft' => '#71717a',
                    'open' => '#34d399',
                    'ongoing' => '#8b5cf6',
                    'selesai' => '#60a5fa',
                    default => '#71717a',
                },
            ]);

        // Tournaments per month (last 6 months) for line chart
        $tournamentsPerMonth = collect(range(5, 0))->map(function ($monthsAgo) {
            $date = Carbon::now()->subMonths($monthsAgo);

            return [
                'month' => $date->format('M Y'),
                'count' => Tournament::whereYear('created_at', $date->year)
                    ->whereMonth('created_at', $date->month)
                    ->count(),
            ];
        });

        // Teams per game for bar chart
        $teamsPerGame = Game::withCount(['tournaments as teams_count' => function ($query) {
            $query->join('tournament_registrations', 'tournaments.id', '=', 'tournament_registrations.tournament_id')
                ->where('tournament_registrations.status', 'approved');
        }])->get()->map(fn ($g) => [
            'name' => $g->nama_game,
            'count' => $g->teams_count,
        ]);

        // Recent activity
        $recentRegistrations = TournamentRegistration::with(['team', 'tournament'])
            ->latest()
            ->take(5)
            ->get()
            ->map(fn ($r) => [
                'id' => $r->id,
                'status' => $r->status->value,
                'created_at' => $r->created_at->diffForHumans(),
                'team' => ['id' => $r->team->id, 'nama_tim' => $r->team->nama_tim],
                'tournament' => ['id' => $r->tournament->id, 'nama' => $r->tournament->nama],
            ]);

        return Inertia::render('admin/Dashboard', [
            'stats' => $stats,
            'tournamentStatusDistribution' => $tournamentStatusDistribution,
            'tournamentsPerMonth' => $tournamentsPerMonth,
            'teamsPerGame' => $teamsPerGame,
            'recentRegistrations' => $recentRegistrations,
        ]);
    }
}
