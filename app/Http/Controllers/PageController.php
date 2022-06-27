<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Utils\GameUtils;
use Carbon\Carbon;
use Illuminate\Http\Request;
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
        $game = GameUtils::getCurrentGame($user);
        if(!$game) {
            return redirect(route('create-game'));
        }
        return Inertia::render('Home', compact('user', 'game'));
    }

    public function createGame(Request $request) {
        $user = $this->getUser($request);
        return Inertia::render('CreateGame', compact('user'));
    }

    public function createInterrogation(Request $request) {
        $user = $this->getUser($request);
        $game = GameUtils::getCurrentGame($user);
        if(!$game) {
            return redirect(route('create-game'));
        }
        return Inertia::render('Interrogate', compact('user', 'game'));
    }
}
