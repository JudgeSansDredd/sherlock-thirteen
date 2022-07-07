<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlayerSymbol extends Model
{
    use HasFactory;

    protected $fillable = [
          'player_id'
        , 'symbol_id'
        , 'minimum'
        , 'maximum'
    ];

    public function player() {
        return $this->belongsTo(Player::class, 'player_id', 'id');
    }

    public function symbol() {
        return $this->belongsTo(Symbol::class, 'player_id', 'id');
    }

    public function setMinimum(int $value) {
        // Minimum always goes up, never goes down
        $minimum = max($value, $this->minimum);
        // Never set minimum higher than maximum
        $minimum = min($minimum, $this->maximum);

        $this->minimum = $minimum;
        $this->save();
    }

    public function setMaximum(int $value) {
        // Maximum always goes down, never goes up
        $maximum = min($value, $this->maximum);
        // Never set maximum lower than minimum
        $maximum = max($maximum, $this->minimum);

        $this->maximum = $maximum;
        $this->save();
    }
}
