<?php

namespace App\Events;

use App\Models\Player;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class CreateInvestigationEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $investigations;
    public $game_id;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($investigations)
    {
        $this->investigations = $investigations;
        $investigation = $investigations[0];
        $this->game_id = Player::where('id', $investigation->player_id)->pluck('game_id')->first();
    }

}
