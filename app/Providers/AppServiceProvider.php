<?php

namespace App\Providers;

use App\Models\Team;
use App\Models\User;
use App\Policies\MemberTeamPolicy;
use App\Policies\TeamPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Gate::define('viewPulse', function (User $user) {
            return $user;
        });

        Gate::policy(Team::class, TeamPolicy::class);
    }
}
