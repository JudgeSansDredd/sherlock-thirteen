<?php

namespace App\Utils;

use App\Models\Player;
use App\Models\Symbol;

class PlayerSymbol {

    private $player;
    private $symbol;
    private $minimum;
    private $maximum;

    public function __construct(Player $player, Symbol $symbol, int $min, int $max) {
        $this->player = $player;
        $this->symbol = $symbol;
        $this->minimum = $min;
        $this->maximum = $max;
    }

    public function setMinimum(int $value) {
        // Minimum always goes up, never goes down
        $minimum = max($value, $this->minimum);
        // Never set minimum higher than maximum
        $minimum = min($minimum, $this->maximum);

        $this->minimum = $minimum;
    }

    public function setMaximum(int $value) {
        // Maximum always goes down, never goes up
        $maximum = min($value, $this->maximum);
        // Never set maximum lower than minimum
        $maximum = max($maximum, $this->minimum);

        $this->maximum = $maximum;
    }

    public function getSymbol() {
        return $this->symbol;
    }

    public function getPlayer() {
        return $this->player;
    }

    public function isSolved() {
        return $this->minimum == $this->maximum;
    }
}