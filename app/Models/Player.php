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

    public function game() {
        return $this->belongsTo(Game::class, 'game_id', 'id');
    }

    public function readyGame() {
        return $this->hasMany(Game::class, 'active_player_id', 'id');
    }

    public function interrogations() {
        return $this->hasMany(Interrogation::class, 'player_id', 'id');
    }

    public function advanceCard() {
        $game = $this->game;
        $handSize = 12 / $game->num_players;
        $this->hidden_card = $this->hidden_card == $handSize ? 1 : $this->hidden_card + 1;
        $this->save();
    }
}
