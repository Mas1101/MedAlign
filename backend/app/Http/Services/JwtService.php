<?php

namespace App\Http\Services;

use App\Models\User;
use Exception;

class JwtService
{
    /**
     * Generate a signed JSON Web Token (JWT) using HS256 algorithm.
     *
     * @param User $user
     * @param int $ttlSeconds (Default: 7 days)
     * @return string
     */
    public static function generateToken(User $user, int $ttlSeconds = 604800): string
    {
        $header = [
            'typ' => 'JWT',
            'alg' => 'HS256',
        ];

        $issuedAt = time();
        $expireAt = $issuedAt + $ttlSeconds;

        $payload = [
            'iss' => config('app.url', 'http://localhost:8000'),
            'sub' => $user->id,
            'user_id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role,
            'clinic_id' => $user->clinic_id,
            'iat' => $issuedAt,
            'exp' => $expireAt,
        ];

        $base64Header = self::base64UrlEncode(json_encode($header));
        $base64Payload = self::base64UrlEncode(json_encode($payload));

        $secret = config('app.key', 'medalign_super_jwt_secret_key_2026');
        $signature = hash_hmac('sha256', "{$base64Header}.{$base64Payload}", $secret, true);
        $base64Signature = self::base64UrlEncode($signature);

        return "{$base64Header}.{$base64Payload}.{$base64Signature}";
    }

    /**
     * Decode and verify a JSON Web Token.
     *
     * @param string $token
     * @return array|null Payload array if valid, null otherwise
     */
    public static function verifyToken(string $token): ?array
    {
        $parts = explode('.', $token);
        if (count($parts) !== 3) {
            return null;
        }

        [$base64Header, $base64Payload, $base64Signature] = $parts;

        $secret = config('app.key', 'medalign_super_jwt_secret_key_2026');
        $expectedSignature = self::base64UrlEncode(
            hash_hmac('sha256', "{$base64Header}.{$base64Payload}", $secret, true)
        );

        if (!hash_equals($expectedSignature, $base64Signature)) {
            return null; // Signature mismatch
        }

        $payloadJson = self::base64UrlDecode($base64Payload);
        $payload = json_decode($payloadJson, true);

        if (!$payload || !isset($payload['exp']) || time() > $payload['exp']) {
            return null; // Expired or malformed
        }

        return $payload;
    }

    /**
     * Helper: Base64URL Encode (RFC 7515)
     */
    private static function base64UrlEncode(string $data): string
    {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    /**
     * Helper: Base64URL Decode (RFC 7515)
     */
    private static function base64UrlDecode(string $data): string
    {
        return base64_decode(strtr($data, '-_', '+/'));
    }
}
