<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\Auth\UserController as ApiUserController;
use App\Http\Controllers\FamilyController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ShopController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [ApiUserController::class, 'register']);
Route::post('/login', [ApiUserController::class, 'login']);

Route::group(['middleware' => 'jwt.auth'], function () {
    // Itt vannak az autentikált API útvonalak
    Route::middleware('auth:api')->get('/user', function (Request $request) {
        return $request->user();
    });
});



Route::middleware(['auth:api'])->group(function () {
    Route::post('/family/create', [FamilyController::class, 'create']);
    Route::post('/family/{familyId}/join', [FamilyController::class, 'join']);
    Route::get('/family/{familyId}/members', [FamilyController::class, 'members']);
    route::get('/user/families', [FamilyController::class, 'getUserFamilies']);

    route::post('/orders/create', [OrderController::class, 'create']);
    route::post('/orders/{orderId}/add-product', [OrderController::class, 'addProduct']);
    route::get('/orders', [OrderController::class, 'getOrdersByFamilyId']);
    route::get('/shops', [ShopController::class, 'index']);

  /*  Route::get('/activeUserDetails', [ApiUserController::class, 'getUserDetails']);
    Route::post('/buyFuel', [ApiUserController::class, 'buyFuel']);
    Route::post('/acceptMission', [ApiUserController::class, 'acceptMission']);
    Route::post('/seenFight', [ApiUserController::class, 'seenFight']);
    Route::patch('/doBattle', [ApiUserController::class, 'doBattle']);
    Route::get('/fightInfo', [ApiUserController::class, 'fightInfo']);
    //equipitem
    Route::post('/equipItem', [ApiUserController::class, 'equipItem']);
    Route::post('/unequipItem', [ApiUserController::class, 'unequipItem']);
    Route::post('/sellItem', [ApiUserController::class, 'sellItem']);
    //Route::post('/buyItem', [ApiUserController::class, 'buyItem']);
*/
});
