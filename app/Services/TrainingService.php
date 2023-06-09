<?php

namespace App\Services;

use App\Exceptions\CustomException;
use App\Models\GraphsData;
use App\Models\FindTheSameData;

class TrainingService
{
    /**
     * @throws CustomException
     */
    public function getGraphsExpressions(){
        try {
            $easy = 'EASY';
            $medium = 'MEDIUM';
            $hard = 'HARD';
            
            $expresionsEasy = GraphsData::where('difficulty', $easy)->inRandomOrder()->limit(4)->get();
            $expresionsMedium = GraphsData::where('difficulty', $medium)->inRandomOrder()->limit(4)->get();
            $expresionsHard = GraphsData::where('difficulty', $hard)->inRandomOrder()->limit(4)->get();

            $expressions = [];


            for ($i = 0; $i < 4; $i++) {
                if (isset($expresionsEasy[$i])) {
                    $expressions[] = $expresionsEasy[$i]->expression;
                    $expressions[] = $expresionsEasy[$i]->mathjax;
                }

                if (isset($expresionsMedium[$i])) {
                    $expressions[] = $expresionsMedium[$i]->expression;
                    $expressions[] = $expresionsMedium[$i]->mathjax;
                }

                if (isset($expresionsHard[$i])) {
                    $expressions[] = $expresionsHard[$i]->expression;
                    $expressions[] = $expresionsHard[$i]->mathjax;
                }
            }

            return [
                'message' => 'Expressions retrieved successfully',
                'expressions' => $expressions,
            ];
        } catch (\Exception $e) {
            throw new CustomException("Error retrieving graph expressions: " . $e->getMessage(), 500);
        }
    }

    /**
     * @throws CustomException
     */
    public function getFindTheSameExpressions(){
        try {
            $type_1 = 'TYPE_1';
            $type_2 = 'TYPE_2';

            $expressionsType_1 = $this->getUniqueExpression($type_1, 4);
            $expressionsType_2 = $this->getUniqueExpression($type_2, 4);
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
            return [
                'message' => 'Expressions retrieved successfully',
                'expressions' => $expressions,
            ];
        } catch (\Exception $e) {
            throw new CustomException("Error retrieving the same expressions: " . $e->getMessage(), 500);
        }
    }

    public function getUniqueExpression($type, $limit) 
    {
        try {
            $uniqueExpressions = collect();
            $allExpressions = FindTheSameData::where('type', $type)->get();

            if ($allExpressions->count() < $limit) {
                throw new CustomException("Cannot retrieve {$limit} unique expressions of type {$type}", 400);
            }

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
        } catch (\Exception $e) {
            throw new CustomException("Error retrieving unique expressions: " . $e->getMessage(), 500);
        }
    }

}