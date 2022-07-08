<?php

namespace App\Utils;

use App\Models\Game;
use App\Models\Player;
use App\Models\Suspect;
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
    }


    public static function calculateGameState(Game $game) {
        // Starting Game State
        $gameState = new GameState($game);

        // Iterate through players
        foreach($game->players as $player) {
            // Handle interrogations
            foreach($player->interrogations as $interrogation) {
                // TODO: Alter gamem state
            }
            // Handle investigations
            foreach($player->investigations as $investigation) {
                // TODO: Alter game state
            }
        }
        // Return game state
    }

    public static function getCurrentGame(User $user) {
        $game = $user->games()->latest()->with('players')->first();
        $isValidGame = !empty($game) && Carbon::now()->subDays(1)->isBefore($game->created_at);
        return $isValidGame ? $game : false;
    }
}