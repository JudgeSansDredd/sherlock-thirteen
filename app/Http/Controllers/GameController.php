<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class GameController extends Controller
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

        return Inertia::render('Home', compact('user'));
    }
}
