<?php

namespace App\Listeners;

use App\Events\CreateInvestigationEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class CreateInvestigationListener
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
    public function handle(CreateInvestigationEvent $event)
    {
        // TODO: Only save if this "hidden card" hasn't already been hidden
        $event->investigations->each(function($investigation) { $investigation->save(); });
    }
}
