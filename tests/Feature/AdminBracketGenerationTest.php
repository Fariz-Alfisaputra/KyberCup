<?php

namespace Tests\Feature;

use App\Enums\RegistrationStatus;
use App\Enums\TournamentStatus;
use App\Enums\UserRole;
use App\Models\Game;
use App\Models\Team;
use App\Models\Tournament;
use App\Models\TournamentMatch;
use App\Models\TournamentRegistration;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminBracketGenerationTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_generating_bracket_redirects_to_filtered_matches_page(): void
    {
        $admin = User::factory()->create([
            'username' => 'admin',
            'role' => UserRole::Admin,
        ]);
        $captain1 = User::factory()->create(['username' => 'cap1']);
        $captain2 = User::factory()->create(['username' => 'cap2']);
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
            'max_tim' => 8,
            'status' => TournamentStatus::Open,
            'created_by' => $admin->id,
        ]);
        $team1 = Team::create([
            'nama_tim' => 'Kyver',
            'slug' => 'kyver',
            'captain_id' => $captain1->id,
        ]);
        $team2 = Team::create([
            'nama_tim' => 'Alpha Force',
            'slug' => 'alpha-force',
            'captain_id' => $captain2->id,
        ]);

        foreach ([$team1, $team2] as $team) {
            TournamentRegistration::create([
                'tournament_id' => $tournament->id,
                'team_id' => $team->id,
                'status' => RegistrationStatus::Approved,
            ]);
        }

        $response = $this->actingAs($admin)->post(
            route('admin.tournaments.bracket', $tournament),
        );

        $response->assertRedirect(route('admin.matches.index', ['tournament' => $tournament->id]));
        $response->assertSessionHas('success');

        $this->assertGreaterThan(0, TournamentMatch::where('tournament_id', $tournament->id)->count());
        $this->assertEquals(TournamentStatus::Ongoing, $tournament->fresh()->status);
    }

    public function test_admin_can_open_tournament_edit_page(): void
    {
        $admin = User::factory()->create([
            'username' => 'admin',
            'role' => UserRole::Admin,
        ]);
        $game = Game::create([
            'nama_game' => 'MLBB',
            'genre' => 'MOBA',
            'is_active' => true,
        ]);
        $tournament = Tournament::create([
            'nama' => 'Test Cup',
            'slug' => 'test-cup',
            'game_id' => $game->id,
            'format' => 'single_elimination',
            'max_tim' => 8,
            'status' => TournamentStatus::Open,
            'created_by' => $admin->id,
        ]);

        $this->actingAs($admin)
            ->get(route('admin.tournaments.edit', $tournament))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('admin/tournaments/Edit')
                ->has('locked_fields')
                ->has('edit_hint'),
            );
    }
}
