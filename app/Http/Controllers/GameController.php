<?php

namespace App\Http\Controllers;

use App\Events\CreateInterrogationEvent;
use App\Events\CreateInvestigationEvent;
use App\Models\Game;
use App\Models\Interrogation;
use App\Models\Investigation;
use App\Models\Player;
use App\Models\Suspect;
use App\Models\Symbol;
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
        }

        // Validate the submission
        $request->validate([
            'numPlayers' => 'bail|required|integer|gte:3|lte:4',
            'startingPlayer' => 'required|integer|gte:0|lte:4',
            'startingHand' => "required|array|size:" . (12 / intval($request->numPlayers)),
            'startingHand.*' => 'required|string|in:' . implode(',', Suspect::pluck('name')->toArray()),
            'players' => "required|array|size:$request->numPlayers",
            'players.*' => 'required|string|distinct',
            'hardMode' => 'required|boolean'
        ]);

        GameUtils::createGame($request);

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
            'player_id' => 'required|integer',
            'symbol' => 'required|string',
            'numberClaimed' => 'required|integer|gte:0|lte:5'
        ]);

        $player = Player::find($request->player_id);
        if(empty($player)) {
            return response('Incorrect name given', 400);
        }
        $symbol = Symbol::where('short_symbol', $request->symbol)->first();
        $interrogation = new Interrogation([
              'player_id' => $player->id
            , 'hidden_card' => $player->hidden_card
            , 'symbol_id' => $symbol->id
            , 'number_claimed' => $request->numberClaimed
        ]);
        CreateInterrogationEvent::dispatch($interrogation);
        return response('Ok', 200);
    }

    public function saveInvestigation(Request $request) {
        // Validate the submission
        $request->validate([
            'results' => 'required|array',
            'results.*.player_id' => 'required|integer',
            'results.*.number_claimed' => 'required|integer|gte:0|lte:5',
            'symbol' => 'required|string',
        ]);

        $symbol = Symbol::where('short_symbol', $request->symbol)->first();

        $results = collect($request->results);
        $investigations = $results->map(function($result) use ($symbol) {
            $player = Player::find($result['player_id']);
            return new Investigation([
                  'player_id' => $player->id
                , 'hidden_card' => $player->hidden_card
                , 'symbol_id' => $symbol->id
                , 'number_claimed' => $result['number_claimed']
            ]);
        });

        CreateInvestigationEvent::dispatch($investigations);

        return response('OK', 200);
    }
}
