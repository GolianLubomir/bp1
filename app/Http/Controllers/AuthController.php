<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;
use Illuminate\Testing\Fluent\Concerns\Has;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    protected AuthService $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * @throws CustomException
     */
    public function register(Request $request): JsonResponse
    {
        $result = $this->authService->register($request);
        return response()->json($result);
    }

    /**
     * @throws CustomException
     */
    public function login(Request $request): JsonResponse
    {
        $result = $this->authService->login($request);
        return response()->json($result);
    }

    /**
     * @throws CustomException
     */
    public function logout(): JsonResponse
    {
        $result = $this->authService->logout();
        return response()->json($result);
    }
}