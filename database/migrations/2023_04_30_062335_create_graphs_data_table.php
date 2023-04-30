<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('graphs_data', function (Blueprint $table) {
            $table->id();
            $table->string('expression');
            $table->string('mathjax');
            $table->string('difficulty')->enum(['EASY', 'MEDIUM', 'HARD']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('graphs_data');
    }
};
