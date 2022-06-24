<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory;

    protected $fillable = [
        'num_players',
        'active_player'
    ];

    public function user() {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function players() {
        return $this->hasMany(Player::class, 'game_id', 'id');
    }

    public function startingSuspects() {
        return $this->belongsToMany(
            Suspect::class,
            'games_suspects',
            'game_id',
            'suspect_id'
        );
    }

    public function getStartingSymbolsAttribute() {
        return $this->startingSuspects()->map(function($suspect) {
            return $suspect->symbols->pluck('short_symbol');
        })->collapse()->countBy();
    }
}
