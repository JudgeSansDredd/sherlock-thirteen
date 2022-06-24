<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

/**
 * Class PageController
 *
 * Controls all get requests for pages or api requests for page data
 * via InertiaJS frontend calls
 */
class PageController extends Controller
{
    private function getUser(Request $request) {
        if(!auth()->check()) {
            // No current user
            $user = User::create();
            auth()->login($user);
        } else {
            $user = $request->user();
        }
        return $user;
    }

    public function index(Request $request) {
        $user = $this->getUser($request);

        $currentGame = $user->games()->latest()->first();
        $isValidGame = !empty($currentGame) && Carbon::now()->subDays(1)->isBefore($currentGame->created_at);

        if($isValidGame) {
            // TODO: Calculate game state
            $gameState = [
                'suspectState' => [
                    'cantHave' => [],
                    'mustHave' => []
                ]
            ];
        } else {
            return redirect(route('create-game'));
        }

        return Inertia::render('Home', compact('user', 'gameState'));
    }

    public function createGame(Request $request) {
        $user = $this->getUser($request);
        return Inertia::render('CreateGame', compact('user'));
    }
}
