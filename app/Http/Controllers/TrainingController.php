<?php

namespace App\Http\Controllers;

use App\Services\TrainingService;
use App\Models\GraphsData;
use App\Models\FindTheSameData;
use Illuminate\Http\Request;

class TrainingController extends Controller
{
    protected TrainingService $trainingService;

    public function __construct(TrainingService $trainingService)
    {
        $this->trainingService = $trainingService;
    }

    /**
     * @throws CustomException
     */
    public function getGraphsExpressions(){
        $result = $this->trainingService->getGraphsExpressions();
        return response()->json($result);
    }

    /**
     * @throws CustomException
     */
    public function getFindTheSameExpressions(){
        $result = $this->trainingService->getFindTheSameExpressions();
        return response()->json($result);
    }    
}