<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Symbol extends Model
{
    use HasFactory;

    protected $casts = [
          'id' => 'integer'
        , 'short_symbol' => 'string'
        , 'long_symbol' => 'string'
        , 'total_in_game' => 'string'
    ];

    public function suspects() {
        return $this->belongsToMany(
              Suspect::class
            , 'suspects_symbols'
            , 'symbol_id'
            , 'suspect_id'
            , 'id'
            , 'id'
        );
    }

    public function players() {
        return $this->belongsToMany(
              Player::class
            , 'player_symbols'
            , 'player_id'
            , 'symbol_id'
            , 'id'
            , 'id'
        );
    }

    public function investigations() {
        return $this->hasMany(Investigation::class, 'symbol_id', 'id');
    }

    public function interrogations() {
        return $this->hasMany(Interrogation::class, 'symbol_id', 'id');
    }
}
