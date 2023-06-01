<?php

namespace App\Services;

use App\Exceptions\CustomException;
use App\Models\UserActivity;
use App\Models\Game;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use function PHPUnit\Framework\isNan;
use Illuminate\Validation\Rules\Password;

class ActivityService
{
    
}