<?php

namespace App\Events;

use App\Models\Interrogation;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class CreateInterrogationEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $interrogation;
    public $game_id;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Interrogation $interrogation)
    {
        $this->interrogation = $interrogation;
        $this->game_id = $interrogation->player->game_id;
    }
}
