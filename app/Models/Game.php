<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory;

    protected $fillable = [
        'num_players',
        'active_player_id',
        'hard_mode'
    ];

    protected $casts = [
          'id' => 'integer'
        , 'user_id' => 'integer'
        , 'num_players' => 'integer'
        , 'active_player_id' => 'integer'
        , 'hard_mode' => 'boolean'
        , 'created_at' => 'datetime'
        , 'updated_at' => 'datetime'
    ];

    public function user() {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function players() {
        return $this->hasMany(Player::class, 'game_id', 'id');
    }

    public function active_player() {
        return $this->belongsTo(Player::class, 'active_player_id', 'id');
    }

    public function startingSuspects() {
        return $this->belongsToMany(
              Suspect::class
            , 'games_suspects'
            , 'game_id'
            , 'suspect_id'
            , 'id'
            , 'id'
        );
    }

    public function getStartingSymbolsAttribute() {
        return $this->startingSuspects->map(function($suspect) {
            return $suspect->symbols->pluck('short_symbol');
        })->collapse()->countBy();
    }

    public function advanceActivePlayer() {
        $activePlayer = $this->active_player;
        $players = $this->players;
        $index = $players->search(function($player) use ($activePlayer) {
            return $player->id == $activePlayer->id;
        });
        $index = ($index + 1) % $this->num_players;
        $newActivePlayer = $players[$index];
        $this->active_player()->associate($newActivePlayer);
        $this->save();
        return $newActivePlayer;
    }
}
