<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'is_user'
    ];

    public function games() {
        return $this->belongsTo(Game::class, 'game_id', 'id');
    }

    public function readyGame() {
        return $this->hasMany(Game::class, 'active_player_id', 'id');
    }
}
