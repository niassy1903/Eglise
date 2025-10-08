<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


use App\Http\Controllers\UtilisateurController;

// Routes CRUD pour les utilisateurs
Route::get('/utilisateurs', [UtilisateurController::class, 'index']);        // GET  : liste des utilisateurs
Route::post('/utilisateurs', [UtilisateurController::class, 'store']);       // POST : créer un utilisateur
Route::get('/utilisateurs/{utilisateur}', [UtilisateurController::class, 'show']);   // GET  : afficher un utilisateur
Route::put('/utilisateurs/{utilisateur}', [UtilisateurController::class, 'update']); // PUT  : modifier un utilisateur
Route::delete('/utilisateurs/{utilisateur}', [UtilisateurController::class, 'destroy']); // DELETE : supprimer un utilisateur


use App\Http\Controllers\MariageController;

Route::apiResource('mariages', MariageController::class);

use App\Http\Controllers\NaissanceController;

Route::apiResource('naissances', NaissanceController::class);


use App\Http\Controllers\DecesController;

Route::apiResource('deces', DecesController::class);



Route::post('/login', [UtilisateurController::class, 'login']);


// Utilisateurs
Route::get('count/admins', [UtilisateurController::class, 'countAdmins']);
Route::get('count/pretres', [UtilisateurController::class, 'countPretres']);
Route::get('stats/utilisateurs', [UtilisateurController::class, 'statsMensuelles']);

// Naissances
Route::get('count/naissances', [NaissanceController::class, 'countNaissances']);
Route::get('stats/naissances', [NaissanceController::class, 'statsMensuelles']);

// Mariages
Route::get('count/mariages', [MariageController::class, 'countMariages']);
Route::get('stats/mariages', [MariageController::class, 'statsMensuelles']);

// Décès
Route::get('count/deces', [DecesController::class, 'countDeces']);
Route::get('stats/deces', [DecesController::class, 'statsMensuelles']);