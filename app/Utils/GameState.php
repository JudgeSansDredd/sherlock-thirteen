<?php

namespace App\Utils;

use App\Models\Game;
use App\Models\Symbol;

class GameState {
    private $playerSymbols;

    public function __construct(Game $game) {
        $players = $game->players;
        $symbols = Symbol::all();
        $handSize = $game->hand_size;
        $startingSymbols = $game->starting_symbols;
        $playerSymbols = [];
        foreach($symbols as $symbol) {
            $used = $startingSymbols->has($symbol->short_symbol)
                ? $startingSymbols[$symbol->short_symbol]
                : 0;
            $unused = $symbol->total_in_game - $used;
            foreach($players as $player) {
                $min = $player->is_user ? $used : 0;
                $max = $player->is_user ? $used : min($unused, $handSize);
                $playerSymbol = new PlayerSymbol($player, $symbol, $min, $max);
                array_push($playerSymbols, $playerSymbol);
            }
        }
        $this->playerSymbols = collect($playerSymbols);
    }

    public function getSymbolInfo(Symbol $symbol) {
        return $this->playerSymbols->filter(function($playerSymbol) use ($symbol) {
            return $playerSymbol->getSymbol()->id == $symbol->id;
        });
    }
}