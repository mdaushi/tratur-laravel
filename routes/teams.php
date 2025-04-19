<?php

use App\Http\Controllers\Teams\GeneralController;
use App\Http\Controllers\Teams\MemberController;
use App\Http\Controllers\Teams\TeamController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'hasTeam'])->group(function () {
    Route::resource('teams', TeamController::class)->only('index','show', 'destroy');

    Route::prefix('teams')->group(function () {
        Route::get('switch/{teamId}', [TeamController::class, 'switchTeam'])->name('teams.switch');

        Route::get('{team}/general', [GeneralController::class, 'edit'])->name('teams.general.edit');
        Route::put('{team}/general', [GeneralController::class, 'update'])->name('teams.general.update');

        Route::get('{team}/member', [MemberController::class, 'edit'])->name('teams.member.edit');

    });
});
