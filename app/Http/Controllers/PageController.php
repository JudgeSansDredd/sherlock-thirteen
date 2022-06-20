<?php

namespace App\Http\Controllers;

use App\Models\User;
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
    public function index(Request $request) {
        if(!auth()->check()) {
            // No current user
            $name = Str::uuid();
            $user = User::create(compact('name'));
            auth()->login($user);
        } else {
            $user = $request->user();
        }

        $gameState = [
            'suspectState' => [
                'cantHave' => ['b', 'n'],
                'mustHave' => ['p']
            ]
        ];

        return Inertia::render('Home', compact('user', 'gameState'));
    }
}
