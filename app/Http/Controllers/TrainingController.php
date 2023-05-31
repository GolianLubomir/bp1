<?php

namespace App\Http\Controllers;

use App\Models\GraphsData;
use App\Models\FindTheSameData;
use Illuminate\Http\Request;

class TrainingController extends Controller
{
    public function getGraphsExpressions(){
        $easy = 'EASY';
        $medium = 'MEDIUM';
        $hard = 'HARD';
        
        $expresionsEasy = GraphsData::where('difficulty', $easy)->inRandomOrder()->limit(4)->get();
        $expresionsMedium = GraphsData::where('difficulty', $medium)->inRandomOrder()->limit(4)->get();
        $expresionsHard = GraphsData::where('difficulty', $hard)->inRandomOrder()->limit(4)->get();

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

    public function getFindTheSameExpressions(){
        $type_1 = 'TYPE_1';
        $type_2 = 'TYPE_2';
        $type_3 = 'TYPE_3';
        $type_4 = 'TYPE_4';
        
        $expressionsType_1 = $this->getUniqueExpression($type_1, 4);
        $expressionsType_2 = $this->getUniqueExpression($type_2, 4);
        // $expressionsType_3 = $this->getUniqueExpression($type_3, 2);
        // $expressionsType_4 = $this->getUniqueExpression($type_4, 2);

        $expressions = [];

        foreach ($expressionsType_1 as $expression) {
            $tempExp = array('mathjax_1' => $expression->mathjax_1,
                             'mathjax_2' => $expression->mathjax_2 );
            $expressions[] = $tempExp;
        }
        foreach ($expressionsType_2 as $expression) {
            $tempExp = array('mathjax_1' => $expression->mathjax_1,
                             'mathjax_2' => $expression->mathjax_2 );
            $expressions[] = $tempExp;
        }
        /*foreach ($expressionsType_3 as $expression) {
            $tempExp = array('mathjax_1' => $expression->mathjax_1,
                             'mathjax_2' => $expression->mathjax_2 );
            $expressions[] = $tempExp;
        }
        foreach ($expressionsType_4 as $expression) {
            $tempExp = array('mathjax_1' => $expression->mathjax_1,
                             'mathjax_2' => $expression->mathjax_2 );
            $expressions[] = $tempExp;
        }*/


        return response()->json([
            'message' => 'Expressions retrieved successfully',
            'expressions' => $expressions,
        ]);
    }

    public function getUniqueExpression($type, $limit) {
        $uniqueExpressions = collect();
        while($uniqueExpressions->count() < $limit) {
            $expressions = FindTheSameData::where('type', $type)->inRandomOrder()->get();
            foreach ($expressions as $expression) {
                if (!$uniqueExpressions->contains('mathjax_2', $expression->mathjax_2)) {
                    $uniqueExpressions->push($expression);
                }
                if ($uniqueExpressions->count() == $limit) {
                    break;
                }
            }
        }
        return $uniqueExpressions;
    }
    
}