<?php

namespace App\Http\Controllers;

use App\Models\GraphsData;
use Illuminate\Http\Request;

class TrainingController extends Controller
{
    public function getGraphsExpressions(){
        $easy = 'EASY';
        $medium = 'MEDium';
        $hard = 'HARD';
        
        $expresionsEasy = GraphsData::where('difficulty', $easy)->inRandomOrder()->limit(2)->get();
        $expresionsMedium = GraphsData::where('difficulty', $medium)->inRandomOrder()->limit(2)->get();
        $expresionsHard = GraphsData::where('difficulty', $hard)->inRandomOrder()->limit(2)->get();

        $expressions = [];

        foreach ($expresionsEasy as $expression) {
            $expressions[] = $expression->expression;
            $expressions[] = $expression->mathjax;     
        }
        foreach ($expresionsMedium as $expression) {
            $expressions[] = $expression->expression;
            $expressions[] = $expression->mathjax;     
        }
        foreach ($expresionsHard as $expression) {
            $expressions[] = $expression->expression;
            $expressions[] = $expression->mathjax;     
        }


        return response()->json([
            'message' => 'Expressions retrieved successfully',
            'expressions' => $expressions,
        ]);
    }
}