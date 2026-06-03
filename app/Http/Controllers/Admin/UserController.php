<?php

namespace App\Http\Controllers\Admin;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(): Response
    {
        $users = User::withCount(['captainedTeams as teams_count'])
            ->latest()
            ->paginate(20)
            ->through(fn ($u) => [
                'id' => $u->id,
                'name' => $u->name,
                'username' => $u->username,
                'email' => $u->email,
                'role' => $u->role?->value,
                'avatar_url' => $u->avatar_url,
                'teams_count' => $u->teams_count,
                'created_at' => $u->created_at->format('Y-m-d'),
            ]);

        return Inertia::render('admin/Users', ['users' => $users]);
    }

    public function update(Request $request, User $user): RedirectResponse
    {
        $validated = $request->validate([
            'role' => ['required', Rule::enum(UserRole::class)],
        ]);

        $user->update($validated);

        return back()->with('success', "Role {$user->name} berhasil diubah ke {$user->role->label()}.");
    }

    public function destroy(User $user): RedirectResponse
    {
        if ($user->id === request()->user()->id) {
            return back()->with('error', 'Anda tidak bisa menghapus akun Anda sendiri.');
        }

        $user->delete();

        return redirect()->route('admin.users.index')
            ->with('success', 'User berhasil dihapus.');
    }
}
