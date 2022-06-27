<?php

namespace App\Listeners;

use App\Models\Game;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class AdvancePlayerListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle($event)
    {
        $game = Game::find($event->game_id);
        $player = $game->advanceActivePlayer();
        if($game->hard_mode) {
            $player->advanceCard();
        }
    }
}
