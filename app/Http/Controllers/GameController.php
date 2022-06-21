<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

/**
 * Class GameController
 *
 * Controls all post and get requests for game data
 */
class GameController extends Controller
{
    public function createGame(Request $request) {
        if(!auth()->check()) {
            return response('Unauthorized', 401);
        } else {
            $user = auth()->user();
        }

        $request->validate([
            'numPlayers' => 'bail|required|integer|gte:3|lte:4',
            'startingPlayer' => 'required|integer|gte:0|lte:4',
            'players' => "required|array|size:$request->numPlayers",
            'players.*' => 'required|string|distinct'
        ]);

        $game = new Game([
            'num_players' => $request->numPlayers,
            'active_player' => $request->startingPlayer
        ]);
        $user->games()->save($game);

        return response('Ok', 200);
    }
}
