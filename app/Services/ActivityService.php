<?php

namespace App\Services;

use App\Exceptions\CustomException;
use App\Models\UserActivity;
use App\Models\Game;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ActivityService
{
    /**
     * @throws CustomException
     */
    public function getActivities()
    {
        try {
            $userId = Auth::id();
            $activities = UserActivity::select('game_id', DB::raw('SUM(training_time) as time'))
                ->where('user_id', $userId)
                ->where('created_at', '>=', Carbon::now()->subDays(7))
                ->groupBy('game_id')
                ->orderBy('game_id')
                ->get();

            $result = [];
            foreach ($activities as $gameActivity) {
                $gameName = Game::select('name')->where('id', $gameActivity->game_id)->value('name');
                $result[$gameName] = [ 
                    'weeklyActivity' => ($gameActivity->time /60),
                ];
            }
            return $result;
        } catch (\Exception $e) {
            throw new CustomException("Error while getting activities: " . $e->getMessage(), 500);
        }
    }

    /**
     * @throws CustomException
     */
    public function addActivity(Request $request)
    {
        try {
            $validated = $request->validate([
                'game_id' => 'required|integer',
                'training_time' => 'required|integer',
            ]);
            $userId = Auth::id();

            $activity = UserActivity::create([
                'user_id' => $userId,
                'game_id' => $validated['game_id'],
                'training_time' => $validated['training_time'],
                'created_at' => now(),
            ]);

            return [
                'message' => 'Activity added successfully',
                'game_name' => $activity->game->name,
                'training_time' => $activity->training_time
            ];
        } catch (\Exception $e) {
            throw new CustomException("Error while adding activity: " . $e->getMessage(), 500);
        }
    }
}
