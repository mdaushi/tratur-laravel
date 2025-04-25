<?php

use App\Http\Controllers\Teams\GeneralController;
use App\Http\Controllers\Teams\MemberController;
use App\Http\Controllers\Teams\TeamController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'hasTeam'])->prefix('teams')->name('teams.')->group(function () {
    Route::get('/', [TeamController::class, 'index'])->name('index');
    Route::get('{team}', [TeamController::class, 'show'])->name('show');
    Route::delete('{team}', [TeamController::class, 'destroy'])->name('destroy');

    Route::get('{team}/switch', [TeamController::class, 'switch'])->name('switch');

    Route::get('{team}/general', [GeneralController::class, 'edit'])->name('general.edit');
    Route::put('{team}/general', [GeneralController::class, 'update'])->name('general.update');

    Route::scopeBindings()->resource('{team}/members', MemberController::class);
});
