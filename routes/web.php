<?php

use App\Http\Controllers\Admin;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LeaderboardController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\TournamentController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/tournaments', [TournamentController::class, 'index'])->name('tournaments.index');
Route::get('/tournaments/{slug}', [TournamentController::class, 'show'])->name('tournaments.show');
Route::get('/teams', [TeamController::class, 'index'])->name('teams.index');
Route::get('/leaderboard', [LeaderboardController::class, 'index'])->name('leaderboard');

// Authenticated user routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications.index');

    // Team management (registered before /teams/{slug} to avoid slug conflicts)
    Route::get('/teams/create', [TeamController::class, 'create'])->name('teams.create');
    Route::post('/teams', [TeamController::class, 'store'])->name('teams.store');
    Route::get('/teams/{team}/edit', [TeamController::class, 'edit'])->name('teams.edit');
    Route::put('/teams/{team}', [TeamController::class, 'update'])->name('teams.update');
    Route::delete('/teams/{team}', [TeamController::class, 'destroy'])->name('teams.destroy');

    // Join team via invite code
    Route::post('/teams/join', [TeamController::class, 'join'])->name('teams.join');

    // Kick member (captain only)
    Route::post('/teams/{team}/kick/{user}', [TeamController::class, 'kick'])
        ->name('teams.kick')
        ->middleware('captain');

    // Generate invite code (captain only)
    Route::post('/teams/{team}/invite-code', [TeamController::class, 'generateInviteCode'])
        ->name('teams.invite-code')
        ->middleware('captain');

    // Tournament registration
    Route::post('/tournaments/{slug}/register', [RegistrationController::class, 'store'])
        ->name('tournaments.register');
});

Route::get('/teams/{slug}', [TeamController::class, 'show'])->name('teams.show');

// Admin routes
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [Admin\DashboardController::class, 'index'])->name('dashboard');

    // Tournament management
    Route::resource('tournaments', Admin\TournamentController::class);

    // Game management
    Route::resource('games', Admin\GameController::class);

    // User management
    Route::resource('users', Admin\UserController::class)->only(['index', 'update', 'destroy']);

    // Registration management
    Route::get('/registrations', [Admin\RegistrationController::class, 'index'])->name('registrations.index');
    Route::post('/registrations/{registration}/approve', [Admin\RegistrationController::class, 'approve'])->name('registrations.approve');
    Route::post('/registrations/{registration}/reject', [Admin\RegistrationController::class, 'reject'])->name('registrations.reject');

    // Match management
    Route::get('/matches', [Admin\MatchController::class, 'index'])->name('matches.index');
    Route::put('/matches/{match}/result', [Admin\MatchController::class, 'result'])->name('matches.result');

    // Bracket generation
    Route::post('/tournaments/{tournament}/bracket', [Admin\BracketController::class, 'generate'])->name('tournaments.bracket');
});

require __DIR__.'/settings.php';
