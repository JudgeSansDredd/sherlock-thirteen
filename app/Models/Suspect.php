<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Suspect extends Model
{
    use HasFactory;

    public function startingGames() {
        return $this->belongsToMany(
            Game::class,
            'games_suspects',
            'suspect_id',
            'game_id'
        );
    }

    public function symbols() {
        return $this->belongsToMany(
            Symbol::class,
            'suspects_symbols',
            'suspect_id',
            'symbol_id'
        );
    }
}
