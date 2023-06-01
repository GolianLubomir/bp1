<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ScoreController;
use App\Http\Controllers\TrainingController;
use App\Http\Controllers\ActivityController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/scores', [ScoreController::class, 'getScores']);
    Route::post('/scores', [ScoreController::class, 'addScore']);
    Route::get('/training/graphs', [TrainingController::class, 'getGraphsExpressions']);
    Route::get('/training/findthesame', [TrainingController::class, 'getFindTheSameExpressions']);
    Route::post('/activity', [ActivityController::class, 'addActivity']);
    Route::get('/activity', [ActivityController::class, 'getActivities']);
});
