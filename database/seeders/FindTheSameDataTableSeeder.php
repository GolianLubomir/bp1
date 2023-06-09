<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\FindTheSameData;

class FindTheSameDataTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        FindTheSameData::truncate();
        $csvFile = fopen(base_path("database/data/find-the-same-data-der.csv"), "r"); 
        $firstline = true;
        while (($data = fgetcsv($csvFile, 2000, ";")) !== FALSE) {
            if (!$firstline) {
                FindTheSameData::create([
                    "mathjax_1" => $data[1],
                    "mathjax_2" => $data[2],
                    "type" => $data[3],
                ]);    
            }
            $firstline = false;
        }
        fclose($csvFile);

        $csvFile = fopen(base_path("database/data/find-the-same-data-int.csv"), "r"); 
        $firstline = true;
        while (($data = fgetcsv($csvFile, 2000, ";")) !== FALSE) {
            if (!$firstline) {
                FindTheSameData::create([
                    "mathjax_1" => $data[1],
                    "mathjax_2" => $data[2],
                    "type" => $data[3],
                ]);    
            }
            $firstline = false;
        }
        fclose($csvFile);
    }
}
