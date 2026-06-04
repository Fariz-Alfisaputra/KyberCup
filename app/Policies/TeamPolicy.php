<?php

namespace App\Policies;

use App\Models\Team;
use App\Models\User;

class TeamPolicy
{
    /**
     * Determine whether the user can update the team.
     * Only the team captain or an admin may update.
     */
    public function update(User $user, Team $team): bool
    {
        return $user->id === $team->captain_id || $user->isAdmin();
    }

    /**
     * Determine whether the user can delete the team.
     * Only the team captain or an admin may delete.
     */
    public function delete(User $user, Team $team): bool
    {
        return $user->id === $team->captain_id || $user->isAdmin();
    }
}
