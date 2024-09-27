<?php

use App\Http\Controllers\DemandeController;
use App\Http\Controllers\ForgotPasswordController;
use App\Http\Controllers\MovementController;
use Illuminate\Http\Request;
use App\Mail\WelcomeEmail;
use App\Mail\DemandeEtatChange;
use App\Models\User; // Ensure this import is correct
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Mail;
use App\Http\Controllers\ConteneurController;
use App\Http\Controllers\DechetController;
use App\Http\Controllers\DepotController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CodeController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('password.reset', [ForgotPasswordController::class, 'forgotPassword']);
Route::get('/send-welcome-email', function () {
    $user = User::find(4); // Fetch the user you want to send the email to
    $password = 'user_password'; // Provide the user's password

    Mail::to($user->email)->send(new WelcomeEmail($user, $password));

    return 'Welcome email sent!';
});
Route::post('/forget-password', [UserController::class, 'forgetPassword'])->withoutMiddleware('auth');
Route::post('/reset-password',[UserController::class,'resetPassword'])->withoutMiddleware('auth:sanctum');
Route::get('/verify-mail/{token}',[UserController::class,'verificationMail']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::middleware('auth:sanctum')->group(function () {
    // All connected users
    Route::put('/demandes/{id}', [DemandeController::class, 'updateEtat']);
    Route::delete('/depot/{id}/delete', [DepotController::class, 'destroy']);
    Route::get('/reset-password',[UserController::class,'resetPasswordLoad'])->withoutMiddleware('auth:sanctum');
    Route::get('/depot/{id}', [DepotController::class, 'show']);
    Route::get('/conteneurs/sums', [ConteneurController::class, 'getTypeSums']);
    Route::get('/conteneurs/sums/admin', [ConteneurController::class, 'getTypeSumsAdmin']);
    Route::post('/checkCode',[CodeController::class,'checkCode']);
    Route::post('/checkCodeinContainer',[CodeController::class,'checkCodeinContainer']);
    Route::post('/checkDepot',[DepotController::class,'checkDepot']);
    Route::post('/checkDepotUsine',[DepotController::class,'checkDepotUsine']);
    Route::post('/checkDepotCollecteur',[DepotController::class,'checkDepotCollecteur']);
    Route::post('/checkDepotrecycleur',[DepotController::class,'checkDepotrecycleur']);
    Route::post('/checkDepotConteneurTransformerrecycleur', [DepotController::class, 'checkDepotConteneurTransformerrecycleur']);
    Route::get('/user-counts', [UserController::class, 'showUserCounts']);
    Route::get('/getMovementSumsdate',[ConteneurController::class , 'getMovementSumsdate']);
    Route::get('/getMovementSumscollecteur',[ConteneurController::class ,'getMovementSumscollecteur']);
     Route::get('/filterMovements',[ConteneurController::class ,'filterMovements']);
     Route::get('/filterMovementscollecteurvente',[ConteneurController::class ,'filterMovementscollecteurvente']);
     Route::get('/filterMovementscollecteursortie',[ConteneurController::class ,'filterMovementscollecteursortie']);
     Route::get('/filterMovementsrecycleurachat',[ConteneurController::class ,'filterMovementsrecycleurachat']);


    Route::post('/checkCodeinContainerTransformer',[CodeController::class,'checkCodeinContainerTransformer']);
Route::post('/checkType',[DechetController::class,'checkType']);
Route::post('/checkTypeUsine',[DechetController::class,'checkTypeUsine']);

    Route::get('/getTypeSumsusinebyID/sums/{id}', [ConteneurController::class, 'getTypeSumsusinebyID']);
    Route::get('/getTypeSumsTotal/sums', [ConteneurController::class, 'getTypeSumsTotal']);

    Route::get('/getTypeSumscollecteur/sums', [ConteneurController::class, 'getTypeSumscollecteur']);
    Route::get('/getTypeSumscollecteurByID/sums/{id}', [ConteneurController::class, 'getTypeSumscollecteurByID']);
    Route::get('/getTypeSumsByDemandeurRecycleur/sums', [ConteneurController::class, 'getTypeSumsByDemandeurRecycleur']);
    Route::get('/conteneurs/{depotId}', [ConteneurController::class, 'getContainersByType']);
    Route::post('/check-email', [AuthController::class, 'checkEmail'])->withoutMiddleware(['auth:sanctum']);   
    Route::post('/check-password', [AuthController::class, 'checkPassword'])->withoutMiddleware(['auth:sanctum']);
    Route::post('/checkPhone_number', [AuthController::class, 'checkPhone_number'])->withoutMiddleware(['auth:sanctum']);
    Route::post('/checkUsername', [AuthController::class, 'checkUsername'])->withoutMiddleware(['auth:sanctum']);

     Route::patch('/conteneur/{id}/transformation', [ConteneurController::class, 'TransformationConteneur']);
    Route::patch('/conteneur/publier/{id}', [ConteneurController::class, 'PublierConteneur']);
    Route::get('/conteneur/transformed', [ConteneurController::class, 'getTransformedConteneur']);
    Route::get('/published-conteneurs', [ConteneurController::class, 'getPublishedConteneur']);
// routes/api.php

// routes/api.php

// routes/api.php
// routes/api.php

Route::get('getMovementsByTypeAndUser/{dechetType}/{userId}', [ConteneurController ::class, 'getMovementsByTypeAndUser']);
Route::get('getMovementsByType/{dechetType}', [ConteneurController ::class, 'getMovementsByType']);

Route::get('/PublierConteneur/{id}', [ConteneurController::class, 'PublierConteneur']);
Route::get('published-conteneurs/{dechetType}/{userId}', [ConteneurController::class, 'getPublishedConteneurByTypeAndUser']);
Route::get('/getPublishedConteneurByTypetotal/{dechetType}', [ConteneurController::class, 'getPublishedConteneurByTypetotal']);

    Route::get('/depots', [DepotController::class, 'index']);
    Route::post('/depot', [DepotController::class, 'store']);
    Route::put('/code/{id}/edit',[CodeController::class,'update']);
  
    Route::delete('/code/{id}/delete',[CodeController::class,'destroy']);

    Route::post('/storecode', [CodeController::class, 'storecode']);
    Route::get('/getCodes', [CodeController::class, 'index']);
    Route::get('/getCode/{id}', [CodeController::class, 'getCode']);


          Route::delete('/conteneur/{id}/delete', [ConteneurController::class, 'destroy']);


    Route::put('/conteneur/{id}/edit', [ConteneurController::class, 'update']);
    Route::get('/depot/{depot}/edit', [DepotController::class, 'edit']);
    Route::put('/depot/{id}/edit', [DepotController::class, 'update']);
    Route::delete('/depot/{id}/delete', [DepotController::class, 'destroy']);
    Route::post('/demande/{conteneurID}', [DemandeController::class, 'store']);
    Route::get('/demande/{id}', [DemandeController::class, 'show']);
    Route::get('/affichedemandecollecteur', [DemandeController ::class, 'affichedemandecollecteur']);
    Route::get('/demande/{demande}/edit', [DemandeController::class, 'edit']);
    Route::put('/demande/{id}/edit', [DemandeController::class, 'update']);
    Route::delete('/demande/{id}/delete', [DemandeController::class, 'destroy']);
    Route::get('/demandes', [DemandeController::class, 'index']);
    Route::get('/user/{id}', [UserController::class, 'show']);
    Route::put('/update-profile/{id}', [UserController::class, 'updateProfile']);
    Route::get('/dechets-by-role/{role}', [DechetController::class, 'getDechetByRole']);
    Route::post('/movement', [MovementController::class, 'store']);
    Route::get('/movement/{id}', [MovementController::class, 'show']);
    Route::get('/movements', [MovementController::class, 'index']);
    Route::get('/movements/collecteur', [MovementController::class, 'index2']);
   Route::get('/all/movements/collecteur', [MovementController::class, 'getAllCollecteurMouvement']);

    Route::get('/movement/{movement}/edit', [MovementController::class, 'edit']);
    Route::put('/movement/{id}/edit', [MovementController::class, 'update']);
    Route::delete('/movement/{id}/delete', [MovementController::class, 'destroy']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']); 
    Route::middleware('throttle:none')->get('/depots/{id}/name', [DepotController::class, 'getDepotNameById']);
    Route::get('/users/by-role/{role}', [UserController::class, 'getUserByRole']);
    Route::post('/conteneurs/{conteneurId}/movements', [ConteneurController::class, 'addMovement']);
    Route::post('/PublierConteneurMouvement/{id}', [ConteneurController::class, 'PublierConteneurMouvement']);
    Route::post('/Est_venduCollecteur/{id}', [ConteneurController::class, 'Est_venduCollecteur']);
    Route::post('/Est_venduUsine/{id}', [ConteneurController::class, 'Est_venduUsine']);
    Route::post('/estdemanderrecycleur/{id}', [ConteneurController::class, 'estdemanderrecycleur']);
    Route::post('/estdemandercollecteur/{id}', [ConteneurController::class, 'estdemandercollecteur']);

    Route::get('/users', [UserController::class, 'index']);
    Route::get('users/by-username/{username}', [UserController::class, 'getUserByUsername']);
    Route::post('/conteneurs/{conteneurId}/movements2', [ConteneurController::class, 'addMovement2']);
    Route::put('/stockerContainer/{id}', [ConteneurController::class, 'stockerContainer']);
    Route::put('StockerConteneurTransformer/{id}', [ConteneurController::class, 'postStockerConteneurTransformer']);

    Route::get('/movements/by-demandeur-recycleur/{page}', [MovementController::class, 'getMovementsByDemandeurRecycleur']);
    Route::get('/movements/by-demandeur-recycleur', [MovementController::class, 'getAllMovementsByDemandeurRecycleur']);

    Route::get('/movements/by-demandeur-recycleur/non_transformer', [MovementController::class, 'getMovementsByDemandeurRecycleurnonTransformer']);
    Route::get('/getMovementsByDemandeurestvenduecollecteur', [MovementController::class, 'getMovementsByDemandeurestvenduecollecteur']);
    Route::get('forgetpass', [AuthController::class, 'forgetpasse']);
    Route::post('forgetpass', [AuthController::class, 'forgetpasse']);
    Route::get('RestPassword/{token}', [AuthController::class, 'showResetPasswordForm']);
    Route::post('RestPassword/{token}', [AuthController::class, 'resetPassword']);
    Route::get('/movements/by-demandeur', [MovementController::class, 'getMovementsByDemandeur']);
    Route::get('/movements/by-demandeur/stocker', [MovementController::class, 'getMovementsByDemandeur']);
   
    // admin routes
        Route::middleware(['role:admin'])->group(function () {
        Route::post('/user', [UserController::class, 'store']);
        Route::put('user/{user}', [UserController::class, 'update']);
        Route::delete('/user/{id}/delete', [UserController::class, 'destroy']);
        Route::put('user/{user}/activate', [UserController::class, 'activate']);
    });
    Route::get('/test-demande-mail', function () {
        $user = User::find(1); // replace with a valid user ID
        Mail::to($user->email)->send(new DemandeEtatChange(true));
        return 'Mail Sent';
    });
    
    // collector routes
    Route::middleware(['role:collecteur'])->group(function () {

        Route::get('/conteneurs', [ConteneurController::class, 'index']);
        Route::post('/conteneurs', [ConteneurController::class, 'store']);
        Route::get('/conteneurs/{conteneurId}/movements', [ConteneurController::class, 'getMovements']);


    });

    // all roles routes
    Route::middleware(['multiplerolecheck:admin, recycleur, collecteur, usine'])->group(function () {
        Route::get('/dechets', [DechetController::class, 'index']);
        Route::get('/conteneurs', [ConteneurController::class, 'index']);
        Route::get('/dechet/{id}', [DechetController::class, 'show']);
        Route::post('/dechet', [DechetController::class, 'store']);
        Route::delete('/dechet/{id}/delete', [DechetController::class, 'destroy']);
        Route::put('/dechet/{id}/edit', [DechetController::class, 'update']);


    });

    Route::middleware(['multiplerolecheck:collecteur, usine'])->group(function () {
    });

    // all roles routes
    Route::middleware(['multiplerolecheck:admin, recycleur'])->group(function () {
    });

    // recyclor routes
    Route::middleware(['role:recycleur'])->group(function () {



    });

    // usine routes
    Route::middleware(['role:usine'])->group(function () {

        Route::post('/conteneurs', [ConteneurController::class, 'store']);
        Route::post('/conteneurs/{conteneurId}/movements', [ConteneurController::class, 'addMovement']);
        Route::get('/conteneurs/{conteneurId}/movements', [ConteneurController::class, 'getMovements']);
        Route::get('/conteneur/{id}', [ConteneurController::class, 'show']);
        Route::get('/conteneur/{conteneur}/edit', [ConteneurController::class, 'edit']);
    });


});
