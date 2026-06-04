<?php

namespace Tests\Feature;

use App\Enums\TeamMemberRole;
use App\Enums\TournamentStatus;
use App\Models\Game;
use App\Models\Team;
use App\Models\Tournament;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TournamentRegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_register_team_using_tournament_slug(): void
    {
        $user = User::factory()->create();
        $game = Game::create([
            'nama_game' => 'Mobile Legends',
            'genre' => 'MOBA',
            'is_active' => true,
        ]);
        $tournament = Tournament::create([
            'nama' => 'EsportHub ML Championship 2026',
            'slug' => 'esporthub-ml-championship-2026',
            'game_id' => $game->id,
            'format' => 'single_elimination',
            'max_tim' => 16,
            'status' => TournamentStatus::Open,
            'created_by' => $user->id,
        ]);
        $team = Team::create([
            'nama_tim' => 'Kyver',
            'slug' => 'kyver',
            'captain_id' => $user->id,
        ]);
        $team->members()->attach($user->id, [
            'role' => TeamMemberRole::Captain->value,
            'joined_at' => now(),
        ]);

        $response = $this->actingAs($user)->post(
            route('tournaments.register', ['slug' => $tournament->slug]),
            ['team_id' => $team->id],
        );

        $response->assertRedirect();
        $response->assertSessionHas('success');

        $this->assertDatabaseHas('tournament_registrations', [
            'tournament_id' => $tournament->id,
            'team_id' => $team->id,
            'status' => 'pending',
        ]);
    }

    public function test_registering_with_unknown_slug_returns_not_found(): void
    {
        $user = User::factory()->create();
        $team = Team::create([
            'nama_tim' => 'Kyver',
            'slug' => 'kyver',
            'captain_id' => $user->id,
        ]);

        $this->actingAs($user)
            ->post(route('tournaments.register', ['slug' => 'turnamen-tidak-ada']), [
                'team_id' => $team->id,
            ])
            ->assertNotFound();
    }

    public function test_guest_cannot_register_for_tournament(): void
    {
        $this->post(route('tournaments.register', ['slug' => 'some-tournament']), [
            'team_id' => 1,
        ])->assertRedirect(route('login'));
    }
}
