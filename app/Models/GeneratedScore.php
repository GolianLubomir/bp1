<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class GeneratedScore extends Model
{
    use HasFactory;

    protected $table = 'generated_scores';                                        

    public $timestamps = false;

    protected $fillable = [
        'game_id',
        'score',
    ];

    public function game(){
        return $this->belongsTo(Game::class);
    }
}



                                                                                  