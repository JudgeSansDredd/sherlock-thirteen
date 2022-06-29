<?php

use App\Http\Controllers\GameController;
use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [PageController::class, 'index'])->name('home');
Route::get('/create-game', [PageController::class, 'createGame'])->name('create-game');
Route::get('/interrogate', [PageController::class, 'createInterrogation'])->name('create-interrogation');
Route::get('/investigate', [PageController::class, 'createInvestigation'])->name('create-investigation');

Route::post('/save-game', [GameController::class, 'saveGame'])->name('save-game');
Route::post('save-interrogate', [GameController::class, 'saveInterrogation'])->name('save-interrogation');
