<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class DoctorOnly
{
    public function handle(Request $request, Closure $next): Response
    {
        abort_unless($request->user()?->role === 'doctor', 403, 'Doctor access is required.');

        return $next($request);
    }
}
