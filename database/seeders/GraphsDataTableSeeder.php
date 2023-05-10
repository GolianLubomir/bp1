<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\GraphsData;

class GraphsDataTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        GraphsData::truncate();
        $csvFile = fopen(base_path("database/data/graphs-data-v3.csv"), "r"); 
        $firstline = true;
        while (($data = fgetcsv($csvFile, 2000, ";")) !== FALSE) {
            if (!$firstline) {
                GraphsData::create([
                    "expression" => $data[1],
                    "mathjax" => $data[2],
                    "difficulty" => $data[3],
                ]);    
            }
            $firstline = false;
        }
        fclose($csvFile);
    }
}
