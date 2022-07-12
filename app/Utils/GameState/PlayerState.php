<?php

namespace App\Utils\GameState;

use App\Models\Game;
use App\Models\Interrogation;
use App\Models\Investigation;
use App\Models\Player;
use App\Models\Symbol;
use Illuminate\Support\Collection;

class PlayerState {
    private Player $player;
    private Collection $symbolStates;
    private bool $hardMode;
    private int $handSize;

    public function __construct(Player $player, Game $game) {
        $this->hardMode = $game->hard_mode;
        $this->handSize = $game->handSize;
        $startingSymbols = $game->startingSymbols;
        $this->player = $player;
        $symbolStates = [];
        foreach(Symbol::all() as $symbol) {
            $used = $startingSymbols->has($symbol->short_symbol)
                ? $startingSymbols[$symbol->short_symbol]
                : 0;
            $unused = $symbol->total_in_game - $used;
            $min = $player->is_user ? $used : 0;
            $max = $player->is_user ? $used : min($unused, $this->handSize);
            $symbolStates[$symbol->short_symbol] = new SymbolState($min, $max);
        }
        $this->symbolStates = collect($symbolStates);
    }

    private function getSymbolState(Symbol $symbol) {
        return $this->symbolStates[$symbol->short_symbol];
    }

    private function setSymbolMaximum(Symbol $symbol, int $numberClaimed) {
        $this->getSymbolState($symbol)->setMaximum($numberClaimed);
    }

    private function setSymbolMinimum(Symbol $symbol, int $numberClaimed) {
        $this->getSymbolState($symbol)->setMinimum($numberClaimed);
    }

    public function interrogate(Interrogation $interrogation) {
        $symbol = $interrogation->symbol;
        $numberClaimed = $interrogation->number_claimed;

        $this->setSymbolMinimum($symbol, $numberClaimed);
        $this->setSymbolMaximum($symbol, $this->hardMode ? $numberClaimed + 1 : $numberClaimed);

        // Miscellaneous extra logic for hard mode
        if($this->hardMode) {
            $interrogations = $this->player->interrogations()->pluck('number_claimed');
            $allNumsMatch = $interrogations->count() === $interrogations->unique()->values()->count();
            if($interrogations->count() > 1 && $allNumsMatch) {
                if($numberClaimed == 0) {
                    // "Seen" all cards, never had more than 0
                    $this->setSymbolMaximum($symbol, 0);
                } elseif($numberClaimed == $this->handSize - 1) {
                    // "Seen" all cards, always has one less than hand size
                    $this->setSymbolMinimum($symbol, $this->handSize);
                }
            }
        }
    }

    public function investigate(Investigation $investigation) {
        // TODO: Add investigate logic
        // TODO: Adjust investigate view: they only raise their hands
    }

    // public function getPlayer() {
    //     return $this->player;
    // }



    // public function getSymbolSolved(Symbol $symbol) {
    //     return $this->getSymbolState($symbol)->isSolved();
    // }
}