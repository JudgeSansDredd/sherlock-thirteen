<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Interrogation extends Model
{
    use HasFactory;

    protected $fillable = [
          'player_id'
        , 'hidden_card'
        , 'symbol'
        , 'number_claimed'
    ];

    protected $casts = [
          'id' => 'integer'
        , 'player_id' => 'integer'
        , 'hidden_card' => 'integer'
        , 'symbol_id' => 'integer'
        , 'number_claimed' => 'integer'
        , 'created_at' => 'datetime'
        , 'updated_at' => 'datetime'
    ];

    public function player() {
        return $this->belongsTo(Player::class, 'player_id', 'id');
    }

    public function symbol() {
        return $this->belongsTo(Symbol::class, 'symbol_id', 'id');
    }
}
