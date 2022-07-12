<?php

namespace App\Utils\GameState;

use App\Models\Symbol;

class SymbolState {
    private int $minimum;
    private int $maximum;

    public function __construct(int $minimum, int $maximum) {
        $this->minimum = $minimum;
        $this->maximum = $maximum;
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

    public function isSolved() {
        return $this->minimum == $this->maximum;
    }

    public function getMaximum() {
        return $this->maximum;
    }

    public function getMinimum() {
        return $this->minimum;
    }
}