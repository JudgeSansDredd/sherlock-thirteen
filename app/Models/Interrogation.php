<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Interrogation extends Model
{
    use HasFactory;

    protected $fillable = [
          'game_id'
        , 'player_id'
        , 'hidden_card'
        , 'symbol'
        , 'number_claimed'
    ];

    public function game() {
        return $this->belongsTo(Game::class, 'game_id', 'id');
    }

    public function player() {
        return $this->belongsTo(Player::class, 'player_id', 'id');
    }
}
