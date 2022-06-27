<?php

namespace App\Listeners;

use App\Events\CreateInterrogationEvent;

class CreateInterrogationListener
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
     * @param  \App\Events\CreateInterrogationEvent  $event
     * @return void
     */
    public function handle(CreateInterrogationEvent $event)
    {
        $event->interrogation->save();
    }
}
