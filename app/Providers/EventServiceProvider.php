<?php

namespace App\Providers;

use App\Events\CreateInterrogationEvent;
use App\Events\CreateInvestigationEvent;
use App\Listeners\AdvancePlayerListener;
use App\Listeners\CreateInterrogationListener;
use App\Listeners\CreateInvestigationListener;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        CreateInterrogationEvent::class => [
            CreateInterrogationListener::class,
            AdvancePlayerListener::class
        ],
        CreateInvestigationEvent::class => [
            CreateInvestigationListener::class,
            AdvancePlayerListener::class
        ]
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
