<?php

namespace App\Utils;

use App\Models\Game;
use App\Models\Player;
use App\Models\PlayerSymbol;
use App\Models\Suspect;
use App\Models\Symbol;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class GameUtils {
    public static function createGame(Request $request) {
        // Create the game
        $game = new Game([
            'num_players' => $request->numPlayers
        ]);

        // Attach the game to the user
        $request->user()->games()->save($game);

        // Attach the starting hand to the game
        $suspectIds = Suspect::whereIn('name', $request->startingHand)->pluck('id');
        $game->startingSuspects()->sync($suspectIds);

        // Create players in the database
        foreach ($request->players as $key => $playerName) {
            $player = new Player([
                'name' => $playerName,
                'is_user' => $key == 0
            ]);
            $game->players()->save($player);
        }

        // Set up the starting player
        $startingPlayerName = $request->players[$request->startingPlayer];
        $player = $game->players()->where('name', $startingPlayerName)->first();
        $game->active_player()->associate($player);
        $game->save();

        // Update known information on this game
        self::beginCalculationsOnStart($game);
    }

    private static function beginCalculationsOnStart(Game $game) {
        $players = $game->players()->where('is_user', false)->get();
        $symbols = Symbol::all();
        $startingSymbols = $game->starting_symbols;

        $symbols->each(function($symbol) use ($players, $startingSymbols) {
            $used = $startingSymbols->has($symbol->short_symbol)
                ? $startingSymbols[$symbol->short_symbol]
                : 0;
            $newMax = $symbol->total_in_game - $used;
            $players->each(function($player) use ($symbol, $newMax) {
                $playerSymbol = new PlayerSymbol([
                      'player_id' => $player->id
                    , 'symbol_id' => $symbol->id
                    , 'maximum' => $newMax
                ]);
                $playerSymbol->save();
            });
        });
    }

    public static function getCurrentGame(User $user): Game | false {
        $game = $user->games()->latest()->with('players')->first();
        $isValidGame = !empty($game) && Carbon::now()->subDays(1)->isBefore($game->created_at);
        return $isValidGame ? $game : false;
    }

    public static function calculateGameState(Game $game) {
        // Start by knowing nothing

        // Calculate information from starting hand
        $startingSymbols = $game->starting_symbols;
        // Calculate information from investigations
        // Calculate information from interrogations
    }
}