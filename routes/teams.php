<?php

use App\Http\Controllers\Teams\TeamController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'hasTeam'])->group(function () {
    Route::resource('teams', TeamController::class)->except('create');

    Route::prefix('teams')->group(function () {
        Route::get('switch/{teamId}', [TeamController::class, 'switchTeam'])->name('teams.switch');
    });
});
