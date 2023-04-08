<?php

namespace App\Http\Controllers;

use App\Models\Score;
use App\Models\Game;
use App\Models\GeneratedScore;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class ScoreController extends Controller
{
    // Returns all users scores in all games
    public function getScores()
    {
        //$scores = Score::with('user', 'game')->get();
        //return response()->json($scores);

        $userId = Auth::id();

        //$scores = Score::with('user', 'game')->get();
        $userScores = Score::with('user', 'game')->where('user_id', $userId)->get();
        $allScores = Score::all();
        $games = Game::all();
        $generatedScores = GeneratedScore::all();

        $result = [];
        $gameScoreValues = [];
        $generatedScoreValues = [];
        
        foreach ($games as $game) {
            $result[$game->name] = [
                'best' => 0,
                'percentile' => 0,
                'all' => [],
            ];
        }

        /*foreach ($allScores as $score) {
            $gameId = $score->game_id;
            //$gameName = $score->game->name;
            $scoreValue = $score->score;
            //$userName = $score->user->name;

            $gameScoreValues[$gameId][] = $scoreValue;
        }*/

        foreach ($generatedScores as $score) {
            $gameId = $score->game_id;
            //$gameName = $score->game->name;
            $scoreValue = $score->score;
            //$userName = $score->user->name;

            $generatedScoreValues[$gameId][] = $scoreValue;
        }

        // loop through the userS and group them by game
        foreach ($userScores as $score) {
            $gameId = $score->game_id;
            $gameName = $score->game->name;
            $scoreValue = $score->score;
            //$userName = $score->user->name;

            //$gameScoreValues[$gameName][] = $scoreValue;
            /*if (!isset($result[$gameName])) {
                $result[$gameName] = [
                    'best' => 0,
                    'percentile' => 0,
                    'all' => [],
                ];
            }*/

            // update the best score if this is a new high score for the game
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
            

            // add the score to the game's list of all scores
            $result[$gameName]['all'][] = [
                //'user' => $userName,
                'score' => $scoreValue,
            ];
        }


        /*foreach ($games as $game) {
            sort($gameScoreValues[$game->name]);
            $bestScoreValue = $result[$game->name]['best'];
            $position = 0;
            $bestValues = 0;
            foreach ($gameScoreValues[$game->name] as $scoreValue){
                if ($scoreValue < $bestScoreValue) {
                    $position++;
                }else if (($scoreValue == $bestScoreValue)){

                    $bestValues++;
                }else {
                    break;
                }
            }

            if($bestValues == 1){
                $position++;
            }

            $position = $position == 0 ? 1 : $position;
            $total = count($gameScoreValues[$game->name]);
            $result[$game->name]['percentile'] = $position / $total * 100;
        }*/

        foreach ($games as $game) {
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


        return response()->json(['scores' => $result]);

    }

    // Adds a score achieved by the user in the game
    public function addScore(Request $request)
    {
        $request->validate([
            //'user_id' => 'required',
            'game_id' => 'required',
            'score' => 'required|numeric|between:0,999.999',
        ]);
        $userId = Auth::id();
        $score = Score::create([
            'user_id' => $userId,
            'game_id' => $request->game_id,
            'score' => $request->score,
        ]);

       

        return response()->json([
            'message' => 'Score added successfully',
            'game_name' => $score->game->name,
            'score' => $score,
        ]);
    }
}
