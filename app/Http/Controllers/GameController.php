<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GameController extends Controller
{
    public function index(Request $request) {
        if(!auth()->check()) {
            // No current user
        } else {
            $user = $request->user();
        }
    }
}
