<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FindTheSameData extends Model
{
    use HasFactory;

    protected $table = 'find_the_same_data';

    public $timestamps = false;


    protected $fillable = [
        'mathjax1',
        'mathjax2',
    ];
}
