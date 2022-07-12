<?php

namespace App\Utils;

use App\Models\Game;
use App\Models\Player;
use App\Models\Suspect;
use App\Models\User;
use App\Utils\GameState\GameState;
use App\Utils\GameState\PlayerState;
use Carbon\Carbon;
use Illuminate\Http\Request;

class GameUtils {
    public static function createGame(Request $request) {
        // Create the game
        $game = new Game([
              'num_players' => $request->numPlayers
            , 'hard_mode' => $request->hardMode
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
        $playerStates = [];
        // Iterate through players
        foreach($game->players as $player) {
            $playerState = new PlayerState($player, $game);
            // Handle interrogations
            foreach($player->interrogations as $interrogation) {
                $playerState->interrogate($interrogation);
            }
            // Handle investigations
            foreach($player->investigations as $investigation) {
                // TODO: Alter game state
            }
            array_push($playerStates, $playerState);
        }
        // Return game state
    }

    public static function getCurrentGame(User $user) {
        $game = $user->games()->latest()->with('players')->first();
        $isValidGame = !empty($game) && Carbon::now()->subDays(1)->isBefore($game->created_at);
        return $isValidGame ? $game : false;
    }
}