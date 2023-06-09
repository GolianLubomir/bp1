<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\GeneratedScore;
class GeneratedScoresTableSeeder extends Seeder
{
    public function run()
    {
        GeneratedScore::truncate();
        $csvFile = fopen(base_path("database/data/generated-scores-final.csv"), "r"); 
        $firstline = true;
        while (($data = fgetcsv($csvFile, 2000, ";")) !== FALSE) {
            if (!$firstline) {
                GeneratedScore::create([
                    "game_id" => $data[1],
                    "score" => $data[2],
                ]);    
            }
            $firstline = false;
        }
        fclose($csvFile);
    }
}
