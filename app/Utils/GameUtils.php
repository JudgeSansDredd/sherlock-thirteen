<?php

namespace App\Utils;

use App\Models\User;
use Carbon\Carbon;

class GameUtils {
    public static function getCurrentGame(User $user) {
        $game = $user->games()->latest()->with('players')->first();
        $isValidGame = !empty($game) && Carbon::now()->subDays(1)->isBefore($game->created_at);
        return $isValidGame ? $game : false;
    }
}