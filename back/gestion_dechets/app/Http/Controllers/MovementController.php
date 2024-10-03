<?php

namespace App\Http\Controllers;

use App\Models\Movement;
use App\Models\User;
use Illuminate\Http\Request;

class MovementController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

   
    public function index(Request $request)
    {            $userId = auth()->user()->id;

        // Récupérer les utilisateurs ayant le rôle "collecteur"
        $collecteurs = User::where('role', 'collecteur')->pluck('id');
    
        // Récupérer les mouvements où IDdemandeur est dans la liste des collecteurs
        $movements = Movement::with('conteneur.dechet','fournisseur2')
                             ->whereIn('IDdemandeur', $collecteurs)
                             ->whereNull('IDdemandeurrecycleur')
                             ->where('IDfournisseur',$userId)

                             ->get();
    
        // Transformer les mouvements pour inclure les informations supplémentaires
        $mappedMovements = $movements->map(function ($movement) {
            if (is_null($movement->conteneur->codeModel)) {
                \Log::warning('Missing Code Model for Conteneur ID: ' . $movement->conteneur_id);
            }
            // Récupérer le type de conteneur basé sur le modèle Dechet
            $conteneurType = $movement->conteneur->dechet->type ?? null;
            $conteneurCode = $movement->conteneur->codeModel->code ?? null;
            $poids = $movement->conteneur->poids ?? null;
            $prix = $movement->conteneur->prix ?? null;


            return [
                'movement' => $movement,
                'conteneur_type' => $conteneurType,
                'collecteur_username' => $movement->fournisseur2->username,
                'collecteur_firstName' => $movement->fournisseur2->firstName,
                'collecteur_lastName' => $movement->fournisseur2->lastName,
                'collecteur_phone_number' => $movement->fournisseur2->phone_number,
                'conteneur_code' => $conteneurCode,
                'poids'=> $poids,
                'prix'=> $prix,




            ];
        });
    
        // Retourner les mouvements transformés en réponse JSON
        return response()->json(['movements' => $mappedMovements]);
    }
    

    public function index2(Request $request)
{
    // Récupérer l'utilisateur authentifié
    $authenticatedUser = auth()->user();

    // Vérifier si l'utilisateur authentifié a le rôle "recycleur"
    if ($authenticatedUser->role === 'recycleur') {
        return response()->json(['error' => 'Unauthorized'], 403);
    }

    // Récupérer les mouvements où IDdemandeur est l'utilisateur authentifié
    $movements = Movement::with(['conteneur.dechet', 'demandeurrecycleur'])
                         ->where('IDdemandeur', $authenticatedUser->id)
                         ->whereNotNull('IDdemandeurrecycleur')
                         ->get();

    // Transformer les mouvements pour inclure les informations supplémentaires
    $mappedMovements = $movements->map(function ($movement) {
        // Récupérer le type de conteneur basé sur le modèle Dechet
        $conteneurType = $movement->conteneur->dechet->type ?? null;
        $conteneurCode = $movement->conteneur->codeModel->code ?? null;
        $poids = $movement->conteneur->poids ?? null;


        return [
            'movement' => $movement,
            'conteneur_type' => $conteneurType,
            'recycleur_username' => $movement->demandeurrecycleur->username,
            'conteneur_code' => $conteneurCode,
             'poids' =>$poids,
            
        ];
    });

    // Retourner les mouvements transformés en réponse JSON
    return response()->json(['movements' => $mappedMovements]);
}


public function getAllCollecteurMouvement(Request $request)
{
    // Récupérer l'utilisateur authentifié
    $authenticatedUser = auth()->user();

    // Vérifier si l'utilisateur authentifié a le rôle "recycleur"
    if ($authenticatedUser->role === 'recycleur') {
        return response()->json(['error' => 'Unauthorized'], 403);
    }

    // Récupérer les mouvements où IDdemandeur est l'utilisateur authentifié
    $movements = Movement::with(['conteneur.dechet', 'demandeurrecycleur','fournisseur'])
                         ->where('IDdemandeur', $authenticatedUser->id)
                         ->get();

    // Transformer les mouvements pour inclure les informations supplémentaires
    $mappedMovements = $movements->map(function ($movement) {
        // Récupérer le type de conteneur basé sur le modèle Dechet
        $conteneurType = $movement->conteneur->dechet->type ?? null;
        $conteneurCode = $movement->conteneur->codeModel->code ?? null;
        $recycleurUsername = $movement->demandeurrecycleur ? $movement->demandeurrecycleur->username : 'N/A';

        $poids = $movement->conteneur->poids ?? null;

        return [
            'movement' => $movement,
            'conteneur_type' => $conteneurType,
            'recycleur_username' =>  $recycleurUsername,
            'conteneur_code' => $conteneurCode,
            'poids'=> $poids,
            
        ];
    });

    // Retourner les mouvements transformés en réponse JSON
    return response()->json(['movements' => $mappedMovements]);
}

    
    public function store(Request $request)
    {
        $movement = Movement::create($request->all());
        return response()->json(['movement' => $movement], 201);
    }

    public function show($id)
    {
        $movement = Movement::findOrFail($id);
        return response()->json(['movement' => $movement]);
    }

    public function edit(Movement $movement)
    {
        return response()->json(['movement' => $movement]);
    }

    public function update(Request $request, $id)
    {
        $movement = Movement::findOrFail($id);
        $movement->update($request->all());
        return response()->json(['movement' => $movement], 200);
    }

    public function destroy($id)
    {
        $movement = Movement::findOrFail($id);
        $movement->delete();
        return response()->json(['message' => 'Movement was deleted successfully'], 204);
    }



    public function getMovementsByDemandeurestvenduecollecteur()
{
    // Récupérer l'utilisateur authentifié
    $authenticatedUser = auth()->user();

    // Récupérer les mouvements où IDdemandeur est l'utilisateur authentifié
    $movements = Movement::with(['conteneur.dechet', 'demandeurrecycleur','depot'])
                         ->where('IDdemandeur', $authenticatedUser->id) 
                         ->whereNull('IDdemandeurrecycleur')
                         ->whereHas('conteneur', function ($query) {
                            $query->where('est_vendu_collecteur', Null);
                        })
                        ->get();

    // Transformer les mouvements pour inclure les informations supplémentaires
    $mappedMovements = $movements->map(function ($movement) {
        // Récupérer le type de conteneur basé sur le modèle Dechet
        $conteneurType = $movement->conteneur->dechet->type ?? null;

        // Inclure les informations du fournisseur (demandeur)
        $fournisseurName = $movement->fournisseur->name ?? null;
        $depot = $movement->depot; // Assurez-vous que le dépôt est correctement lié à votre modèle
        $conteneurCode = $movement->conteneur->codeModel->code ?? null;


        return [
            'movement' => $movement,
            'conteneur_type' => $conteneurType,
            'fournisseur_name' => $fournisseurName,
            'conteneur_code' => $conteneurCode,

            'depot' => $depot ? [
                'id' => $depot->id,
                'nom' => $depot->nom,
                'lieu' => $depot->lieu,


            ] : null,
        ];
    });

    // Retourner les mouvements transformés en réponse JSON
    return response()->json(['movements' => $mappedMovements]);
}

    public function getMovementsByDemandeur()
{
    // Récupérer l'utilisateur authentifié
    $authenticatedUser = auth()->user();

    // Récupérer les mouvements où IDdemandeur est l'utilisateur authentifié
    $movements = Movement::with(['conteneur.dechet', 'demandeurrecycleur','depot'])
                         ->where('IDdemandeur', $authenticatedUser->id) 
                         ->whereNull('IDdemandeurrecycleur')

                         ->get();

    // Transformer les mouvements pour inclure les informations supplémentaires
    $mappedMovements = $movements->map(function ($movement) {
        $conteneurCode = $movement->conteneur->codeModel->code ?? null;

        // Récupérer le type de conteneur basé sur le modèle Dechet
        $conteneurType = $movement->conteneur->dechet->type ?? null;

        $conteneurPrix = $movement->conteneur->prix ?? null;
        $prixcollecteur=$movement->prixcollecteur?? null;
        $prixcollecteur=$movement->prixcollecteur?? null;
        $estStoker=$movement->estStoker?? null;
        $is_published=$movement->is_published?? null;
        $poids = $movement->conteneur->poids ?? null;

        // Inclure les informations du fournisseur (demandeur)
        $fournisseurName = $movement->fournisseur->firstName
        ?? null;
        $fournisseurlastName = $movement->fournisseur->lastName
        ?? null;
        $fournisseuraddress = $movement->fournisseur->address
        ?? null;
        $depot = $movement->depot; // Assurez-vous que le dépôt est correctement lié à votre modèle
         $id=$movement->id;

        return [
            'movement' => $movement,
            'conteneur_code' => $conteneurCode,
            'conteneurPrix'=>$conteneurPrix,
            'poids'=>$poids,
            'conteneur_type' => $conteneurType,
            'fournisseurName' => $fournisseurName,
            'fournisseurlastName' => $fournisseurlastName,
            'fournisseuraddress' => $fournisseuraddress,
                 'prixcollecteur'=>$prixcollecteur,
                 'estStoker'=>$estStoker,
                 'is_published'=>$is_published,
                 
                 'id'=>$id,
            'depot' => $depot ? [
                'id' => $depot->id,
                'nom' => $depot->nom,
                'lieu' => $depot->lieu,

            ] : null,
        ];
    });

    // Retourner les mouvements transformés en réponse JSON
    return response()->json(['movements' => $mappedMovements]);
}
public function getMovementsByDemandeurstocker()
{
    // Récupérer l'utilisateur authentifié
    $authenticatedUser = auth()->user();

    // Récupérer les mouvements et appliquer le filtrage
    $movements = Movement::where('IDdemandeur', $authenticatedUser->id)
        ->whereNotNull('date_stockage')
        ->whereNotNull('estStoker')
        ->whereNotNull('newdepot')
        ->whereNull('IDdemandeurrecycleur')
        ->with(['conteneur.dechet', 'depot', 'fournisseur'])
        ->get();

    // Transformer les mouvements pour inclure les informations supplémentaires
    $mappedMovements = $movements->map(function ($movement) {
        $conteneurType = $movement->conteneur->dechet->type ?? 'Non spécifié';
        $conteneurCode = $movement->conteneur->codeModel->code ?? null;

        $fournisseurName = $movement->fournisseur ? $movement->fournisseur->username : 'Non spécifié';
        $depot = $movement->depot ? [
            'id' => $movement->depot->id,
            'nom' => $movement->depot->nom,
            'lieu' => $movement->depot->lieu,
        ] : null;

        return [
            'movement' => $movement,
            'conteneur_type' => $conteneurType,
            'fournisseur_name' => $fournisseurName,
            'conteneur_code' => $conteneurCode,

            'depot' => $depot,
        ];
    });

    // Retourner les mouvements transformés en réponse JSON
    return response()->json(['movements' => $mappedMovements]);
}


public function getMovementsByDemandeurRecycleur()
{
    // Récupérer l'utilisateur authentifié
    $authenticatedUser = auth()->user();

    // Récupérer les mouvements où IDdemandeurrecycleur est l'utilisateur authentifié
    $movements = Movement::with(['conteneur.dechet', 'fournisseur2', 'depot'])
    ->whereNotNull('IDdemandeurrecycleur')
    ->where('IDdemandeurrecycleur', $authenticatedUser->id)
    ->whereNull('prixcollecteur')
    ->get(); // Exécuter la requête pour récupérer les mouvements

    // Transformer les mouvements pour inclure les informations supplémentaires
    $mappedMovements = $movements->map(function ($movement) {
        // Récupérer le type de conteneur basé sur le modèle Dechet
        $conteneurType = $movement->conteneur->dechet->type ?? null;
        $conteneurCode = $movement->conteneur->codeModel->code ?? null;
        $is_transformed = $movement->conteneur->is_transformed ?? null;
        $poids = $movement->conteneur->poids ?? null;

        // Récupérer le nom du fournisseur (identifié par IDdemandeur dans la table users)
        $fournisseurName = $movement->fournisseur2->name ?? null;
        $depot = $movement->depot ? [
            'id' => $movement->depot->id,
            'nom' => $movement->depot->nom,
            'lieu' => $movement->depot->lieu
        ] : null;
        // Check if depot exists to avoid null access
   /*     $depotnom = $movement->depot->nom;
        $depotlieu = $movement->depot->lieu;
*/
        $poids = $movement->conteneur->poids ?? null;

        return [
            'movement' => $movement,
            'conteneur_type' => $conteneurType,
            'fournisseur_name' => $fournisseurName,
            'conteneur_code' => $conteneurCode,
            'is_transformed' => $is_transformed,
            'poids'=>$poids ,
      
            'depot' => $depot,
        ];
    });

    // Retourner les mouvements transformés en réponse JSON
    return response()->json(['movements' => $mappedMovements]);
}
 
    public function getAllMovementsByDemandeurRecycleur()
{
    // Récupérer l'utilisateur authentifié
    $authenticatedUser = auth()->user();
  
    // Récupérer les mouvements où IDdemandeurrecycleur est l'utilisateur authentifié
    $movements = Movement::with(['conteneur.dechet','fournisseur' ,'fournisseur2', 'depot'])
                         ->where('IDdemandeurrecycleur', $authenticatedUser->id)
                         ->get(); // Retrieve the movements from the database

    // Transformer les mouvements pour inclure les informations supplémentaires
    $mappedMovements = $movements->map(function ($movement) {
        // Récupérer le type de conteneur basé sur le modèle Dechet
        $conteneurType = $movement->conteneur->dechet->type ?? null;
        $conteneurCode = $movement->conteneur->codeModel->code ?? null;

        // Récupérer le nom du fournisseur (relation fournisseur2)
        $fournisseurName = $movement->fournisseur2->username ?? null;
        $UsineName = $movement->fournisseur->username ?? null;
        $firstNameCollecteur = $movement->fournisseur2->firstName ?? null;
        $lastNameCollecteur = $movement->fournisseur2->lastName?? null;
        $addresscollecteur=$movement->fournisseur2->address?? null;
        $addressusine=$movement->fournisseur->address?? null;
        $datecollecteur=$movement->datecollecteur?? null;
        $hourcollecteur=$movement->hourcollecteur?? null;
        $prixcollecteur=$movement->prixcollecteur?? null;

         $date=$movement->date??null;
         $hour=$movement->hour??null;

        // Récupérer le dépôt (si lié correctement)
        $depot = $movement->depot;
        $poids = $movement->conteneur->poids ?? null;


        return [
            'movement' => $movement,
            'conteneur_type' => $conteneurType,
            'Usine_name' =>  $UsineName,
            'Collecteur_name' =>   $fournisseurName,
            'lastNameCollecteur'=>$lastNameCollecteur,
            'firstNameCollecteur'=>$firstNameCollecteur,
            'conteneur_code' => $conteneurCode,
            'addresscollecteur'=>$addresscollecteur,
            'adressusine'=>$addressusine,
            'hourcollecteur'=>$hourcollecteur,
            'datecollecteur'=>$datecollecteur,
            'prixcollecteur'=>$prixcollecteur,
            'poids'=>  $poids,
            'date'=>$date,
            'hour'=>$hour,
            'depot' => $depot ? [
                'id' => $depot->id,
                'nom' => $depot->nom,
                'lieu' => $depot->lieu,
            ] : null,
        ];
    });

    // Retourner les mouvements transformés en réponse JSON
    return response()->json(['movements' => $mappedMovements]);
}


    public function getMovementsByDemandeurRecycleurnonTransformer()
{
    // Récupérer l'utilisateur authentifié
    $authenticatedUser = auth()->user();

    // Récupérer les mouvements où IDdemandeurrecycleur est l'utilisateur authentifié
    // et où le conteneur n'est pas encore transformé (is_transformed == false)
    $movements = Movement::with(['conteneur.dechet', 'fournisseur2','depot'])
                         ->where('IDdemandeurrecycleur', $authenticatedUser->id)
                         ->whereHas('conteneur', function ($query) {
                             $query->where('is_transformed', true);
                         })
                         ->get();

    // Transformer les mouvements pour inclure les informations supplémentaires
    $mappedMovements = $movements->map(function ($movement) {
        $conteneurCode = $movement->conteneur->codeModel->code ?? null;

        // Récupérer le type de conteneur basé sur le modèle Dechet
        $conteneurType = $movement->conteneur->dechet->type ?? null;

        // Récupérer le nom du fournisseur (identifié par IDdemandeur dans la table users)
        $fournisseurName = $movement->fournisseur2->name ?? null;
        $depot = $movement->depot; // Assurez-vous que le dépôt est correctement lié à votre modèle

        return [
            'movement' => $movement,
            'conteneur_type' => $conteneurType,
            'fournisseur_name' => $fournisseurName,
            'conteneur_code' => $conteneurCode,

            'depot' => $depot ? [
                'id' => $depot->id,
                'nom' => $depot->nom,
                'lieu' => $depot->lieu,
            ] : null, // Inclure le nom du fournisseur
        ];
    });

    // Retourner les mouvements transformés en réponse JSON
    return response()->json(['movements' => $mappedMovements]);
}

}