<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration
{
    public function up()
    {
        Schema::create('generated_scores', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('game_id');
            $table->unsignedFloat('score');
            $table->foreign('game_id')->references('id')->on('games');
        });
    }

    public function down()
    {
        Schema::dropIfExists('generated_scores');
    }
};


