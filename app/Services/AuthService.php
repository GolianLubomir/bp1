<?php

namespace App\Services;

use App\Exceptions\CustomException;
use Laravel\Sanctum\HasApiTokens;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use function PHPUnit\Framework\isNan;
use Illuminate\Validation\Rules\Password;

class AuthService
{
    /**
     * @throws CustomException
     */
    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|string|unique:users,email',
            'password' => [
                'required',
                'confirmed',
                Password::min(8)->mixedCase()->numbers()
            ]
        ]);

        try {
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => bcrypt($data['password'])
            ]);
        } catch (\Exception $e) {
            throw new CustomException("Error creating user: " . $e->getMessage(), 500);
        }

        $token = $user->createToken('main')->plainTextToken;

        if (!$token) {
            throw new CustomException("Error creating token for user", 500);
        }

        return [
            'user' => $user,
            'token' => $token
        ];
    }

    /**
     * @throws CustomException
     */
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email|string|exists:users,email',
            'password' => [
                'required',
            ],
            'remember' => 'boolean'
        ]);
        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);

        if (!Auth::attempt($credentials, $remember)) {
            throw new CustomException('The provided credentials are not correct', 422);
        }

        $user = Auth::user();

        if (!$user) {
            throw new CustomException('Unexpected error occurred during authentication', 500);
        }

        $token = $user->createToken('main')->plainTextToken;

        return [
            'user' => $user,
            'token' => $token
        ];
    }

    /**
     * @throws CustomException
     */
    public function logout()
    {
        $user = Auth::user();

        if (!$user || !$user->currentAccessToken()) {
            throw new CustomException('Token does not exist', 400);
        }

        $user->currentAccessToken()->delete();

        return [
            'success' => true
        ];
    }
}