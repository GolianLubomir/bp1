<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory;

    protected $table = 'games';

    protected $fillable = [
        'name',
        'description',
    ];

    public function scores(){
        return $this->hasMany(Score::class);
    }
    
    public function userActivities() {
        return $this->hasMany(UserActivity::class);
    }
    
    public function generatedScores() {
        return $this->hasMany(GeneratedScore::class);
    }
}
