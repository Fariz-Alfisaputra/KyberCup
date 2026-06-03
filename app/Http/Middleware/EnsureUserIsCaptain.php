<?php

namespace App\Http\Middleware;

use App\Enums\UserRole;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsCaptain
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): Response  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->user()) {
            abort(403, 'Anda harus login terlebih dahulu.');
        }

        $user = $request->user();

        if ($user->role !== UserRole::Captain && $user->role !== UserRole::Admin) {
            abort(403, 'Akses ditolak. Hanya captain atau admin yang dapat melakukan aksi ini.');
        }

        return $next($request);
    }
}
