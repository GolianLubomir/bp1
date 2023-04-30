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
        Schema::create('find_the_same_data', function (Blueprint $table) {
            $table->id();
            $table->string('mathjax_1');
            $table->string('mathjax_2');
            $table->string('type')->enum(['TYPE_1', 'TYPE_2', 'TYPE_3', 'TYPE_4',]);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('find_the_same_data');
    }
};
