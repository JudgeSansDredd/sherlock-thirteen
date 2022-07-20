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
        , 'raised_hand'
    ];

    protected $casts = [
          'id' => 'integer'
        , 'player_id' => 'integer'
        , 'hidden_card' => 'integer'
        , 'symbol_id' => 'integer'
        , 'raised_hand' => 'boolean'
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
