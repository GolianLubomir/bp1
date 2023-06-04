<?php

namespace App\Http\Controllers;

use App\Services\ActivityService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Models\UserActivity;
use App\Models\Game;

class ActivityController extends Controller
{
    protected ActivityService $activityService;

    public function __construct(ActivityService $activityService)
    {
        $this->activityService = $activityService;
    }

    /**
     * @throws CustomException
     */
    public function getActivities()
    {
        $result = $this->activityService->getActivities();
        return response()->json($result);
    }

    /**
     * @throws CustomException
     */
    public function addActivity(Request $request)
    {
        $result = $this->activityService->addActivity($request);
        return response()->json($result);
    }
}
