<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Investigation extends Model
{
    use HasFactory;

    protected $fillable = [
          'player_id'
        , 'hidden_card'
        , 'symbol_id'
        , 'number_claimed'
    ];

    public function player() {
        return $this->belongsTo(Player::class, 'player_id', 'id');
    }

    public function symbol() {
        return $this->belongsTo(Symbol::class, 'symbol_id', 'id');
    }
}
