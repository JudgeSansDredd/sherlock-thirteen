<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Player;
use App\Models\Suspect;
use Illuminate\Http\Request;

/**
 * Class GameController
 *
 * Controls all post and get requests for game data
 */
class GameController extends Controller
{
    public function createGame(Request $request) {
        // Are we authenticated?
        if(!auth()->check()) {
            return response('Unauthorized', 401);
        } else {
            $user = auth()->user();
        }

        // Validate the submission
        $request->validate([
            'numPlayers' => 'bail|required|integer|gte:3|lte:4',
            'startingPlayer' => 'required|integer|gte:0|lte:4',
            'startingHand' => "required|array|size:" . (12 / intval($request->numPlayers)),
            'startingHand.*' => 'required|string|in:' . implode(',', Suspect::pluck('name')->toArray()),
            'players' => "required|array|size:$request->numPlayers",
            'players.*' => 'required|string|distinct'
        ]);

        // Create the game
        $game = new Game([
            'num_players' => $request->numPlayers,
            'active_player' => $request->startingPlayer
        ]);

        // Attach the game to the user
        $user->games()->save($game);

        // Attach the starting hand to the game
        $suspectIds = Suspect::whereIn('name', $request->startingHand)->pluck('id');
        $game->startingSuspects()->sync($suspectIds);

        foreach ($request->players as $key => $playerName) {
            $player = new Player([
                'name' => $playerName,
                'is_user' => $key == 0
            ]);
            $game->players()->save($player);
        }

        return response('Ok', 200);
    }
}
