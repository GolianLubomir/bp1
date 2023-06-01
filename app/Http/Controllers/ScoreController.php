<?php

namespace App\Http\Controllers;

use App\Models\Score;
use App\Models\Game;
use App\Models\GeneratedScore;
use App\Services\ScoreService;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class ScoreController extends Controller
{
    protected ScoreService $scoreService;

    public function __construct(ScoreService $scoreService)
    {
        $this->scoreService = $scoreService;
    }

    /**
     * @throws CustomException
     */
    public function getScores()
    {
        $result = $this->scoreService->getScores();
        return response()->json($result);
    }

    /**
     * @throws CustomException
     */
    public function addScore(Request $request)
    {
        $result = $this->scoreService->addScore($request);
        return response()->json($result);
    }                                                                               
}



