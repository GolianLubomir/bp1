<?php

namespace App\Services;

use App\Exceptions\CustomException;
use App\Models\Score;
use App\Models\GeneratedScore;
use App\Models\Game;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use function PHPUnit\Framework\isNan;
use Illuminate\Validation\Rules\Password;

class ScoreService
{
    /**
     * @throws CustomException
     */
    public function getScores()
    {
        try {
            $userId = Auth::id();
    
            if (!$userId) {
                throw new CustomException('User not authenticated', 401);
            }

            $userScores = Score::with('user', 'game')->where('user_id', $userId)->get();
            $games = Game::all();
            $generatedScores = GeneratedScore::all();

            $result = [];
            $generatedScoreValues = [];
            
            foreach ($games as $game) {
                $result[$game->name] = [
                    'best' => 0,
                    'percentile' => 0,
                    'all' => [],
                ];
            }

            foreach ($generatedScores as $score) {
                $gameId = $score->game_id;
                $scoreValue = $score->score;
                $generatedScoreValues[$gameId][] = $scoreValue;
            }

            foreach ($userScores as $score) {
                $gameId = $score->game_id;
                $gameName = $score->game->name;
                $scoreValue = $score->score;

                if($gameId == 1 || $gameId == 4){
                    if($result[$gameName]['best'] == 0){
                        $result[$gameName]['best'] = 999999;
                    }
                    if ($scoreValue < $result[$gameName]['best']) {
                        $result[$gameName]['best'] = $scoreValue;
                    }
                }else{
                    if ($scoreValue > $result[$gameName]['best']) {
                    $result[$gameName]['best'] = $scoreValue;
                    }
                }
                $result[$gameName]['all'][] = [
                    'score' => $scoreValue,
                ];
            }

            foreach ($games as $game) {
                if($result[$game->name]['all'] != []){
                    sort($generatedScoreValues[$game->id]);
                    $bestScoreValue = $result[$game->name]['best'];
                    $position = 0;
                    $bestValues = 0;
                    foreach ($generatedScoreValues[$game->id] as $scoreValue){
                        if($game->id == 1 || $game->id == 4){
                            if ($scoreValue > $bestScoreValue) {
                                $position++;
                            }else if (($scoreValue == $bestScoreValue)){

                                $bestValues++;
                            }
                        }else{
                            if ($scoreValue < $bestScoreValue) {
                                $position++;
                            }else if (($scoreValue == $bestScoreValue)){

                                $bestValues++;
                            }else {
                                break;
                            }
                        }
                    }

                    if($bestValues == 1){
                        $position++;
                    }

                    $position = $position == 0 ? 1 : $position;
                    $total = count($generatedScoreValues[$game->id]);
                    $result[$game->name]['percentile'] = $position / $total * 100;
                }
            }
            return ['scores' => $result];
        } catch (\Exception $e) {
            throw new CustomException("Error fetching scores: " . $e->getMessage(), 500);
        }
    }

    /**
     * @throws CustomException
     */
    public function addScore(Request $request)
    {
        try {
            $validated = $request->validate([
                'game_id' => 'required|integer',
                'score' => 'required|numeric|between:0,999.999',
            ]);
    
            $userId = Auth::id();
    
            if (!$userId) {
                throw new CustomException('User not authenticated', 401);
            }
    
            $score = Score::create([
                'user_id' => $userId,
                'game_id' => $validated['game_id'],
                'score' => $validated['score'],
            ]);
    
            if (!$score) {
                throw new CustomException('Score could not be created', 500);
            }
    
            return [
                'message' => 'Score added successfully',
                'game_name' => $score->game->name,
                'score' => $score,
            ];
        } catch (\Exception $e) {
            throw new CustomException("Error adding score: " . $e->getMessage(), 500);
        }
    }    
}