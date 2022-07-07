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

    protected $casts = [
          'id' => 'integer'
        , 'name' => 'string'
        , 'is_user' => 'boolean'
        , 'game_id' => 'integer'
        , 'hidden_card' => 'integer'
        , 'created_at' => 'datetime'
        , 'udpated_at' => 'datetime'
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

    public function investigations() {
        return $this->hasMany(Investigation::class, 'player_id', 'id');
    }

    public function playerSymbols() {
        return $this->hasMany(PlayerSymbol::class, 'player_id', 'id');
    }

    public function advanceCard() {
        $game = $this->game;
        $handSize = 12 / $game->num_players;
        $this->hidden_card = $this->hidden_card == $handSize ? 1 : $this->hidden_card + 1;
        $this->save();
    }
}
