<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Models\UserActivity;

class ActivityController extends Controller
{
    public function getActivities()
    {
        $userId = Auth::id();
        $activities = UserActivity::select('game_id', DB::raw('SUM(training_time) as time'))
            ->where('user_id', $userId)
            ->where('created_at', '>=', Carbon::now()->subDays(7))
            ->groupBy('game_id')
            ->orderBy('game_id')
            ->get();

        return response()->json($activities);
    }

    public function addActivity(Request $request)
    {
        $validated = $request->validate([
            'game_id' => 'required|integer',
            'training_time' => 'required|integer',
        ]);

        $activity = new UserActivity;
        $activity->user_id = Auth::id();
        $activity->game_id = $validated['game_id'];
        $activity->training_time = $validated['training_time'];
        $activity->save();

        return response()->json(['message' => 'Activity added successfully']);
    }
}
