<?php

namespace App\Utils\GameState;

use App\Models\Game;
use App\Models\Interrogation;
use App\Models\Investigation;
use App\Models\Player;
use App\Models\Symbol;
use Illuminate\Support\Collection;

class PlayerState {
    public Player $player;
    public Collection $symbolStates;
    public bool $hardMode;
    public int $handSize;

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

    private function _getSymbolState(Symbol $symbol) {
        return $this->symbolStates[$symbol->short_symbol];
    }

    private function _setSymbolMaximum(Symbol $symbol, int $numberClaimed) {
        $this->_getSymbolState($symbol)->setMaximum($numberClaimed);
    }

    private function _setSymbolMinimum(Symbol $symbol, int $numberClaimed) {
        $this->_getSymbolState($symbol)->setMinimum($numberClaimed);
    }

    public function interrogate(Interrogation $interrogation) {
        $this->_setSymbolMinimum($interrogation->symbol, $interrogation->numberClaimed);
        $this->_setSymbolMaximum($interrogation->symbol, $this->hardMode ? $interrogation->numberClaimed + 1 : $interrogation->numberClaimed);

        // Miscellaneous extra logic for hard mode
        if($this->hardMode) {
            $interrogations = $this->player->interrogations()->where(
                'symbol_id',
                $interrogation->symbol->id
            )->get();
            $multipleInterrogations = $interrogations->count() > 1;
            $duplicatesExist = $interrogations->count() !== $interrogations->unique('number_claimed')->count();
            if($multipleInterrogations && $duplicatesExist) {
                // Based on how the game works, if there are duplicates, they will all be duplicates
                if($interrogation->numberClaimed == 0) {
                    // "Seen" all cards, never had more than 0
                    $this->_setSymbolMaximum($interrogation->symbol, 0);
                } elseif($interrogation->numberClaimed == $this->handSize - 1) {
                    // "Seen" all cards, always has one less than hand size
                    $this->_setSymbolMinimum($interrogation->symbol, $this->handSize);
                }
            }
        }
    }

    public function investigate(Investigation $investigation) {
        if($investigation->raised_hand) {
            $this->_setSymbolMinimum($investigation->symbol, 1);
        } else {
            $this->_setSymbolMaximum($investigation->symbol, $this->hardMode ? 1 : 0);
        }

        // Misc extra logic for investigations
        if($this->hardMode) {
            $investigations = $this->player->investigations()->where(
                'symbol_id',
                $investigation->symbol_id
            )->get();
            $numRaised = $investigations->filter(function($i) {
                return $i->raised_hand;
            })->count();
            $numInvestigations = $investigations->count();

            if($numInvestigations > 1 and $numRaised === 0) {
                // "Seen" every card, never raised hand
                $this->_setSymbolMaximum($investigation->symbol, 0);
            }
            if($numRaised === $this->handSize) {
                // "Not Seen" every card, never dropped hand
                $this->_setSymbolMinimum($investigation->symbol, 2);
            }
        }
    }
}