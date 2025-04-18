<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\Teams\NewTeamController;
use Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Onboarding route untuk membuat team
Route::prefix('/dashboard')->middleware(['auth', 'verified'])->group(function () {
    Route::resource('/new', NewTeamController::class)
        ->only('index', 'store')
        ->middleware([HandlePrecognitiveRequests::class]);
});

// Route yang membutuhkan user sudah punya tim
Route::prefix('/dashboard')->middleware(['auth', 'verified', 'hasTeam'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('products', ProductController::class);
});


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/teams.php';
