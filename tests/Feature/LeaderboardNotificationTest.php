<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class LeaderboardNotificationTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_can_visit_leaderboard(): void
    {
        $this->get(route('leaderboard'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('leaderboard/Index')
                ->has('teams'),
            );
    }

    public function test_authenticated_users_can_visit_notifications(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->get(route('notifications.index'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('notifications/Index')
                ->has('notifications'),
            );
    }

    public function test_guests_are_redirected_from_notifications(): void
    {
        $this->get(route('notifications.index'))
            ->assertRedirect(route('login'));
    }
}
