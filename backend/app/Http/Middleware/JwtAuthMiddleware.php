<?php

namespace App\Http\Middleware;

use App\Http\Services\JwtService;
use App\Models\User;
use Closure;
use Illuminate\Http\Request;

class JwtAuthMiddleware
{
    /**
     * Handle an incoming request and authenticate via JWT Bearer token.
     */
    public function handle(Request $request, Closure $next)
    {
        $header = $request->header('Authorization', '');

        if (!str_starts_with($header, 'Bearer ')) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized: Bearer token is missing.',
            ], 401);
        }

        $jwtToken = substr($header, 7);
        $payload = JwtService::verifyToken($jwtToken);

        if (!$payload) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized: Invalid or expired JWT token.',
            ], 401);
        }

        // Locate and attach authenticated user to request
        $user = User::find($payload['user_id'] ?? $payload['sub'] ?? null);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized: User does not exist.',
            ], 401);
        }

        $request->setUserResolver(function () use ($user) {
            return $user;
        });

        return $next($request);
    }
}
