<?php

namespace App\Http\Controllers;

use App\Events\CreateInterrogationEvent;
use App\Models\Game;
use App\Models\Interrogation;
use App\Models\Player;
use App\Models\Suspect;
use App\Utils\GameUtils;
use Illuminate\Http\Request;

/**
 * Class GameController
 *
 * Controls all post and get requests for game data
 */
class GameController extends Controller
{
    public function saveGame(Request $request) {
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
            'num_players' => $request->numPlayers
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
        $startingPlayerName = $request->players[$request->startingPlayer];
        $player = $game->players()->where('name', $startingPlayerName)->first();
        $game->active_player()->associate($player);
        $game->save();

        return response('Ok', 200);
    }

    public function saveInterrogation(Request $request) {
        if(!auth()->check()) {
            return response('Unauthorized', 401);
        }
        $game = GameUtils::getCurrentGame($request->user());
        if(!$game) {
            return response('No valid game', 400);
        }

        // Validate the submission
        $request->validate([
            'interrogatee' => 'bail|required|string',
            'symbol' => 'required|string',
            'numberClaimed' => 'required|integer|gte:0|lte:5'
        ]);

        $player = $game->players()->where('name', $request->interrogatee)->first();
        if(empty($player)) {
            return response('Incorrect name given', 400);
        }
        $interrogation = new Interrogation([
              'game_id' => $game->id
            , 'player_id' => $player->id
            , 'hidden_card' => $player->hidden_card
            , 'symbol' => $request->symbol
            , 'number_claimed' => $request->numberClaimed
        ]);
        CreateInterrogationEvent::dispatch($interrogation);
        return response('Ok', 200);
    }
}
