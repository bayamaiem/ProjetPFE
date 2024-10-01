<?php

namespace App\Http\Controllers;
use App\Models\Dechet;
use App\Models\Depot;
use App\Models\Demande;
use App\Models\Conteneur; // Importer le modèle Conteneur
use App\Models\Movement; // Importer le modèle Mouvement
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Models\User; 
use Illuminate\Support\Facades\Log; // Importation de la classe Log

class ConteneurController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }  
    public function index(Request $request)
    {
        // Get the authenticated user's ID
        $userId = auth()->user()->id;
    
        // Fetch containers related to the authenticated user
        $conteneurs = Conteneur::where('is_transformed', false)
            ->where('user_id', $userId) 
            ->with('codeModel') // Eager load the related Code model
            // Filter by the authenticated user's ID
            ->get();

        // Map the containers to include additional details
        $transformedConteneurs = $conteneurs->map(function ($conteneur) {
            $conteneurCode = $conteneur->codeModel->code ?? null;

            return [
                'conteneur' => $conteneur,
                'user_name' => $conteneur->user->username,
                'depot_name' => $conteneur->depot->nom,
                'dechet_name' => $conteneur->dechet->type,
                'conteneur_code' => $conteneurCode,
            ];
        });
    
        // Return the response as JSON
        return response()->json(['conteneurs' => $transformedConteneurs]);
    }
    
    
    public function getPublishedConteneurByTypeAndUser(Request $request, $dechetType, $userId)
    {
        $authenticatedUserId = auth()->id(); // Récupérer l'ID de l'utilisateur authentifié
    
        // Récupérer les conteneurs publiés pour l'utilisateur spécifié par type de déchet
        $publishedContainers = Conteneur::where('is_published', true)
            ->whereNull('est_vendu_usine')
            ->where('user_id', $userId)
            ->whereHas('dechet', function ($query) use ($dechetType) {
                $query->where('type', $dechetType);
            })
            // Exclure les conteneurs qui ont une demande par l'utilisateur authentifié
            ->whereDoesntHave('demande', function ($query) use ($authenticatedUserId) {
                $query->where('user_id', $authenticatedUserId)
                      ->whereColumn('conteneur_id', 'conteneurs.id');
            })
            ->with('user', 'depot', 'dechet')
            ->get();
            $publishedContainers = $publishedContainers->map(function ($conteneur) {
                $conteneurCode = $conteneur->codeModel->code ?? null;
                $poids= $conteneur->poids?? null;

        
                return [
                    'conteneur' => $conteneur,
                    'user_name' => $conteneur->user->username,
                    'depot_name' => $conteneur->depot->nom,
                    'dechet_name' => $conteneur->dechet->type,
                    'conteneur_code' => $conteneurCode,
                    'poids'=>$poids,
                ];
            });
    
        return response()->json(['published_containers' => $publishedContainers], 200);
    }

    public function getPublishedConteneurByTypetotal(Request $request, $dechetType)
    {
        $authenticatedUserId = auth()->id(); // Récupérer l'ID de l'utilisateur authentifié
    
        // Récupérer les conteneurs publiés pour l'utilisateur spécifié par type de déchet
        $publishedContainers = Conteneur::where('is_published', true)
            ->whereNull('est_vendu_usine')
            ->whereHas('dechet', function ($query) use ($dechetType) {
                $query->where('type', $dechetType);
            })
            // Exclure les conteneurs qui ont une demande par l'utilisateur authentifié
            ->whereDoesntHave('demande', function ($query) use ($authenticatedUserId) {
                $query->where('user_id', $authenticatedUserId)
                      ->whereColumn('conteneur_id', 'conteneurs.id');
            })
            ->with('user', 'depot', 'dechet')
            ->get();
    
        // Map the results correctly
        $publishedContainers = $publishedContainers->map(function ($conteneur) {
            $conteneurCode = $conteneur->codeModel->code ?? null;
    
            return [
                'conteneur' => $conteneur,
                'user_name' => $conteneur->user->username,
                'depot_name' => $conteneur->depot->nom,
                'dechet_name' => $conteneur->dechet->type,
                'conteneur_code' => $conteneurCode,
            ];
        });
    
        return response()->json(['published_containers' => $publishedContainers], 200);
    }
    
    public function getMovementsByTypeAndUser(Request $request, $dechetType, $userId)
    {
        $authenticatedUserId = auth()->id(); // Récupérer l'ID de l'utilisateur authentifié
    
        // Construire la requête
        $movements = Movement::where('IDdemandeur', $userId)
            ->where('is_published', true)
            ->whereHas('conteneur', function ($query) use ($dechetType) {
                $query->whereHas('dechet', function ($query) use ($dechetType) {
                    $query->where('type', $dechetType);
                });
            })
            ->whereDoesntHave('demandes', function ($query) use ($authenticatedUserId) {
                $query->where('user_id', $authenticatedUserId);
            })
            ->with(['conteneur' => function ($query) {
                // Eager load related models: user, depot, dechet
                $query->with('user', 'depot', 'dechet');
            }, 'fournisseur2']) // Eager load the fournisseur (user who provided the container)
            ->get();
    
        // Transform the movements to include related information
        $transformedMovements = $movements->map(function ($movement) {
            return [
                'movement' => $movement,
                'user_name' => $movement->fournisseur2->username ?? 'N/A', // Fetch fournisseur's username
                'depot_name' => $movement->conteneur->depot->nom ?? 'N/A',
                'dechet_type' => $movement->conteneur->dechet->type ?? 'N/A',
                'conteneurCode' => $movement->conteneur->codeModel->code ?? null

            ];
        });
    
        return response()->json(['movements' => $transformedMovements], 200);
    }
    
    public function getMovementsByType(Request $request, $dechetType)
    {
        $authenticatedUserId = auth()->id(); // Récupérer l'ID de l'utilisateur authentifié
    
        // Construire la requête
        $movements = Movement::
            where('is_published', true)
            ->whereHas('conteneur', function ($query) use ($dechetType) {
                $query->whereHas('dechet', function ($query) use ($dechetType) {
                    $query->where('type', $dechetType);
                });
            })
            ->whereDoesntHave('demandes', function ($query) use ($authenticatedUserId) {
                $query->where('user_id', $authenticatedUserId);
            })
            ->with(['conteneur' => function ($query) {
                // Eager load related models: user, depot, dechet
                $query->with('user', 'depot', 'dechet');
            }, 'fournisseur2']) // Eager load the fournisseur (user who provided the container)
            ->get();
    
        // Transform the movements to include related information
        $transformedMovements = $movements->map(function ($movement) {
            return [
                'movement' => $movement,
                'user_name' => $movement->fournisseur2->username ?? 'N/A', // Fetch fournisseur's username
                'depot_name' => $movement->conteneur->depot->nom ?? 'N/A',
                'dechet_type' => $movement->conteneur->dechet->type ?? 'N/A',
                'conteneurCode' => $movement->conteneur->codeModel->code ?? null

            ];
        });
    
        return response()->json(['movements' => $transformedMovements], 200);
    }
    
    
    
// Autres méthodes...
  public function addMovement(Request $request, $conteneurID)
{
    // Validation des données de la requête
    $validated = $request->validate([
        'date' => 'required|date',
        'hour' => 'required|date_format:H:i',
        'place' => 'required|string|exists:users,username', // Valider le username
    ]);

    // Récupération de l'utilisateur à partir du username
    $user = User::where('username', $validated['place'])->first();
    if (!$user) {
        return response()->json(['message' => 'Utilisateur non trouvé'], 404);
    }

    // Création d'une nouvelle instance de Mouvement
    $mouvement = new Movement();
    $mouvement->date = $validated['date'];
    $mouvement->hour = $validated['hour'];
    $mouvement->conteneur_id = $conteneurID;
    $mouvement->place = $user->username;
    $mouvement->IDdemandeur=$user->id;
    $mouvement->IDfournisseur=auth()->id();;


    // Sauvegarde du mouvement
    $mouvement->save();

    return response()->json(['message' => 'Mouvement créé avec succès'], 201);
}
public function addMovement2(Request $request, $conteneurID)
{
    // Validation des données de la requête
    $validated = $request->validate([
        'date' => 'required|date',
        'hour' => 'required|date_format:H:i',
        'place' => 'required|string|exists:users,username', // Valider le username
    ]);

    // Récupération de l'utilisateur à partir du username
    $user = User::where('username', $validated['place'])->first();
    if (!$user) {
        Log::error('Utilisateur non trouvé', ['place' => $validated['place']]);
        return response()->json(['message' => 'Utilisateur non trouvé'], 404);
    }

    // Récupération du conteneur à partir de l'ID
    $conteneur = Conteneur::find($conteneurID);
    if (!$conteneur) {
        Log::error('Conteneur non trouvé', ['conteneurID' => $conteneurID]);
        return response()->json(['message' => 'Conteneur non trouvé'], 404);
    }

    // Récupération du demandeur avec le rôle 'recycleur'
    $demandeurRecycleur = Demande::whereHas('user', function($query) {
        $query->where('role', 'recycleur');
    })
    ->where('conteneur_id', $conteneurID)
    ->first();

    if (!$demandeurRecycleur) {
        Log::error('Demandeur recycleur non trouvé', ['conteneurID' => $conteneurID]);
        return response()->json(['message' => 'Demandeur recycleur non trouvé'], 404);
    }

    // Création d'une nouvelle instance de Mouvement
    $mouvement = new Movement();
    $mouvement->date = $validated['date'];
    $mouvement->hour = $validated['hour'];
    $mouvement->conteneur_id = $conteneurID;
    $mouvement->place = $user->username;
    $mouvement->IDdemandeur = auth()->id(); // Demandeur authentifié
    $mouvement->IDfournisseur = $conteneur->user_id; 
    $mouvement->IDdemandeurrecycleur = $demandeurRecycleur->user_id;

    // Vérifier si IDdemandeurrecycleur n'est pas null pour déterminer les valeurs des nouveaux champs
    if (!is_null($mouvement->IDdemandeurrecycleur)) {
        // Si IDdemandeurrecycleur n'est pas null, définir datecollecteur et hourcollecteur
        $mouvement->datecollecteur = $mouvement->date;
        $mouvement->hourcollecteur = $mouvement->hour;

        // Recherche du mouvement existant avec le même IDdemandeurrecycleur et conteneur_id
        $existingMovement = Movement::
            where('conteneur_id', $conteneurID)
            ->first();

        // Si un mouvement existant est trouvé, récupérer son prixcollecteur
        if ($existingMovement) {
            $mouvement->prixcollecteur = $existingMovement->prixcollecteur;
        } else {
            // Sinon, recherche de la demande confirmée avec etat = 1, user_id = IDdemandeurrecycleur, et conteneur_id correspondant
            $demandeConfirmee = Demande::where('conteneur_id', $conteneurID)
                ->where('etat', 1)
                ->where('user_id', $mouvement->IDdemandeurrecycleur)
                ->first();

            // Si une demande confirmée est trouvée avec les conditions, ajouter prixcollecteur au mouvement
            if ($demandeConfirmee) {
                $mouvement->prixcollecteur = $demandeConfirmee->prixcollecteur;
            }
        }
    } else {
        // Si IDdemandeurrecycleur est null, ces champs restent nuls
        $mouvement->datecollecteur = null;
        $mouvement->hourcollecteur = null;
        $mouvement->prixcollecteur = null;
    }

    // Sauvegarde du mouvement
    $mouvement->save();

    Log::info('Mouvement créé avec succès', ['mouvement' => $mouvement]);

    return response()->json(['message' => 'Mouvement créé avec succès'], 201);
}


    
public function store(Request $request)
{
    // Vérifier si le poids est présent dans la requête
    if (!$request->has('poids')) {
        return response()->json(['error' => 'Le champ poids est manquant'], 400);
    }

    $conteneur = new Conteneur($request->all());
    $conteneur->save();

    return response()->json($conteneur, 201);
}



    public function show($id)
    {
        $conteneurs = Conteneur::findOrFail($id);
        return response()->json(['conteneur' => $conteneurs]);
    }

    public function edit(Conteneur $conteneurs)
    {
        return response()->json(['conteneur' => $conteneurs]);
    }

  

    public function update(Request $request, $id)
    {
        $conteneurs = Conteneur::findOrFail($id);
        $conteneurs->update($request->all());
        return response()->json(['conteneur' => $conteneurs], 200);
    }

    public function stockerContainer(Request $request, $id)
    {
        $Movement = Movement::find($id);
        if (!$Movement) {
            return response()->json(['error' => 'Movement not found'], 404);
        }
    
        $Movement->newdepot = $request->input('newdepot');

        $Movement->prixcollecteur = $request->input('prixcollecteur');
        $Movement->date_stockage = $request->input('date_stockage'); 
        $Movement->estStoker = !$Movement->estStoker;
        $Movement->save();
    
        return response()->json(['success' => 'Movement updated successfully']);
    }



    public function postStockerConteneur(Request $request, $id)
    {
        $Movement = Movement::find($id);
        if (!$Movement) {
            return response()->json(['error' => 'Movement not found'], 404);
        }
    
        // Mettre à jour les propriétés
        $Movement->newdepot = $request->input('newdepot');
        $Movement->date_stockage = $request->input('date_stockage'); 
        $Movement->estStoker = !$Movement->estStoker; 
        $Movement->save();
    
        return response()->json(['success' => 'Movement updated successfully']);
    }
    

    public function postStockerConteneurTransformer(Request $request, $id)
    {
        $container = Conteneur::find($id);
    
        if (!$container) {
            return response()->json(['message' => 'Container not found'], 404);
        }
    
        // Mettre à jour les propriétés
        $container->depotContTransformer = $request->input('depotContTransformer');
        $container->coderecycleur = $request->input('coderecycleur');
        $success = $container->save();
    
        if ($success) {

           

            return response()->json(['success' => 'Container updated successfully']);
        } else {
            return response()->json(['message' => 'Failed to update container',
           
        ], 500);

           
        }
    }
    
    


    public function destroy($id)
    {
        $conteneurs = Conteneur::findOrFail($id);
        $conteneurs->delete();
        return response()->json(['message' => 'Conteneur deleted successfully'], 204);
    }

    public function TransformationConteneur($id)
    {
        $container = Conteneur::find($id);

        if (!$container) {
            return response()->json(['message' => 'Container not found'], 404);
        }

        $container->is_transformed = !$container->is_transformed;
        $container->save();

        return response()->json(['message' => 'Transformation state updated', 'container' => $container], 200);
    }
    public function PublierConteneur($id)
    {
        $container = Conteneur::find($id);

        if (!$container) {
            return response()->json(['message' => 'Container not found'], 404);
        }

        $container->is_published =! $container->is_published ;
        $container->save();

        return response()->json(['message' => 'published', 'container' => $container], 200);
    }
    public function PublierConteneurMouvement($id)
    {
        $Movement = Movement::find($id);

        if (!$Movement) {
            return response()->json(['message' => 'Movement not found'], 404);
        }

        $Movement->is_published  =   !$Movement->is_published;
        $Movement->save();

        return response()->json(['message' => 'published', 'Movement' => $Movement], 200);
    }


    public function Est_venduCollecteur($id){
    $conteneur = Conteneur::find($id);
    if (!$conteneur) {
        return response()->json(['message' => 'conteneur not found'], 404);
    }

    $conteneur->est_vendu_collecteur = !$conteneur->est_vendu_collecteur;
    $conteneur->save();

    return response()->json(['message' => 'published', 'est_vendu_collecteur' => $conteneur], 200);
}



public function Est_venduUsine($id){
    $conteneur = Conteneur::find($id);
    if (!$conteneur) {
        return response()->json(['message' => 'est_vendu_usine not found'], 404);
    }

    $conteneur->est_vendu_usine = !$conteneur->est_vendu_usine;
    $conteneur->save();

    return response()->json(['message' => 'est_vendu_usine', 'conteneur' =>   $conteneur], 200);
}



public function estdemanderrecycleur(Request $request, $id){
    $conteneur = Conteneur::find($id);
    if (!$conteneur) {
        return response()->json(['message' => 'estdemanderrecycleur not found'], 404);
    }
    $user = $request->user();
  $userId=$user->id;
    $conteneur->estdemanderrecycleur = !$conteneur->estdemanderrecycleur;
    $conteneur->save();

    return response()->json(['message' => 'estdemanderrecycleur', 'conteneur' =>   $conteneur], 200);
}


public function estdemandercollecteur($id){
    $conteneur = Conteneur::find($id);
    if (!$conteneur) {
        return response()->json(['message' => 'estdemandercollecteur not found'], 404);
    }

    $conteneur->estdemandercollecteur = !$conteneur->estdemandercollecteur;
    $conteneur->save();

    return response()->json(['message' => 'estdemandercollecteur', 'conteneur' =>   $conteneur], 200);
}


    public function getPublishedConteneur(Request $request)
    {
        // Récupérer l'utilisateur authentifié
        $user = $request->user();
    
        // Vérifiez si l'utilisateur est authentifié
        if (!$user) {
            return response()->json(['message' => 'User not authenticated'], 401);
        }
    
        // Fetch published containers for the authenticated user
        $publishedContainers = Conteneur::where('is_published', true)
            ->where('user_id', $user->id)
            ->with('user')
            ->get();
    
        return response()->json(['published_containers' => $publishedContainers], 200);
    }


    public function getPublishedConteneurByType(Request $request, $dechetType)
    {
        // Récupérer l'utilisateur authentifié
        $user = $request->user();
    
        // Vérifiez si l'utilisateur est authentifié
        if (!$user) {
            return response()->json(['message' => 'User not authenticated'], 401);
        }
    
        // Fetch published containers for the authenticated user by dechetType
        $publishedContainers = Conteneur::where('is_published', true)
            ->where('user_id', $user->id)
            ->whereHas('dechet', function ($query) use ($dechetType) {
                $query->where('type', $dechetType);
            })
            ->with(['user', 'depot', 'dechet']) // Inclure les relations
            ->get();
            $publishedContainers = $conteneurs->map(function ($conteneur) {
                $conteneurCode = $conteneur->codeModel->code ?? null;
    
                return [
                    'conteneur' => $conteneur,
                    'user_name' => $conteneur->user->username,
                    'depot_name' => $conteneur->depot->nom,
                    'dechet_name' => $conteneur->dechet->type,
                    'conteneur_code' => $conteneurCode,
                ];
            });
        

    
        return response()->json(['published_containers' => $publishedContainers], 200);
    }
    





    public function getTransformedConteneur(Request $request)
    {
        // Récupérer l'utilisateur authentifié
        $authenticatedUser = auth()->user();
    
        // Debug: Check if the authenticated user is retrieved correctly
        if ($authenticatedUser) {
            Log::info('Authenticated User: ', ['user' => $authenticatedUser->toArray()]);
        } else {
            Log::error('No authenticated user found');
            return response()->json(['error' => 'No authenticated user found'], 401);
        }
    
        // Retrieve transformed containers associated with the authenticated user's movements
        $transformedContainers = Conteneur::whereHas('movements', function ($query) use ($authenticatedUser) {
            $query->where('is_transformed', true)
                  ->where('IDdemandeurrecycleur', $authenticatedUser->id);
        })
        ->with(['depot', 'codeRecycleur']) // Load the related Depot and CodeRecycleur models
        ->get();
    
        // Iterate over each container to retrieve depot and code details
        $containersWithDepotDetails = $transformedContainers->map(function($container) {
            $conteneurCode = $container->codeModel->code ?? null;  // Make sure this matches your relationship
            
            $depotName = $container->depot2 ? $container->depot2->nom : null;  // Ensure depot relationship is correct
            $depotLieu = $container->depot2 ? $container->depot2->lieu : null;
          

           
            return [
                'container' => $container,
                'depotName' => $depotName,
                'depotLieu' => $depotLieu,
                'conteneur_code' => $conteneurCode,
                
            ];
        });
    
        // Debug: Log the retrieved transformed containers
        if ($transformedContainers->isEmpty()) {
            Log::info('No transformed containers found for user ID: ' . $authenticatedUser->id);
        } else {
            Log::info('Transformed Containers: ', ['containers' => $transformedContainers->toArray()]);
        }
    
        return response()->json(['transformed_containers' => $containersWithDepotDetails], 200);
    }
    


    public function getTypeSums(Request $request)
    {
        // Get the authenticated user's ID
        $idusine =  auth()->user(); // Retrieves the ID of the authenticated user
        if (!$idusine) {
            return response()->json(['message' => 'User not authenticated'], 401);
        }
        // Query to count containers by type for the authenticated user
        $counts = DB::table('conteneurs')
            ->join('dechets', 'conteneurs.dechet_id', '=', 'dechets.id')
            ->where('conteneurs.user_id', '=', $idusine->id)
            ->where('est_vendu_usine', Null)

            // Filter by authenticated user's ID
            ->select('dechets.type', DB::raw('COUNT(*) as total'))
            ->groupBy('dechets.type')
            ->get();
    
        // Check if no data is found
        if ($counts->isEmpty()) {
            return response()->json(['message' => 'No data found'], 404);
        }
    
        // Format the response
        $response = [];
        foreach ($counts as $count) {
            $response[$count->type] = $count->total;
        }
    
        // Return the response as JSON
        return response()->json($response);
    }
    

   
    
    public function getMovementSumsdate(Request $request)
    {
        // Récupérer l'utilisateur authentifié
        $idusine = auth()->user()->id; // Assure-toi de récupérer l'ID correct de l'utilisateur
    
        if (!$idusine) {
            return response()->json(['message' => 'User not authenticated'], 401);
        }
    
        // Vérifier si la date est passée en paramètre
        if (!$request->has('date')) {
            return response()->json(['message' => 'Date is required'], 400);
        }
    
        // Requête pour compter les mouvements par IDfournisseur et date, avec conteneur_id unique
        $counts = DB::table('movements')
            ->where('date', '=', $request->date)
            ->where('IDfournisseur', $idusine) // Filtrer par l'ID de l'usine (IDfournisseur)
            ->select('date', DB::raw('COUNT(DISTINCT conteneur_id) as total')) // Utilisation de COUNT(DISTINCT conteneur_id)
            ->groupBy('date')
            ->get();
    
        // Vérifier si aucun résultat n'a été trouvé
        if ($counts->isEmpty()) {
            return response()->json(['message' => 'No data found'], 404);
        }
    
        // Formater la réponse
        $response = [];
        foreach ($counts as $count) {
            $response[$count->date] = $count->total;
        }
    
        // Retourner la réponse sous format JSON
        return response()->json($response);
    }
    


    
    public function getMovementSumscollecteur(Request $request)
    {
        // Récupérer le nom du collecteur depuis la requête
        $collecteurNom = $request->input('username');
    
        // Vérifier si le nom du collecteur est fourni
        if (!$collecteurNom) {
            return response()->json(['message' => 'Collecteur name is required'], 400);
        }
    
        // Trouver l'utilisateur correspondant au nom du collecteur
        $collecteur = DB::table('users')->where('username', $collecteurNom)->first();
    
        // Vérifier si le collecteur existe
        if (!$collecteur) {
            return response()->json(['message' => 'Collecteur not found'], 404);
        }
    
        // Compter les mouvements par collecteur (IDdemandeur) avec des conteneur_id distincts
        $counts = DB::table('movements')
            ->where('IDdemandeur', $collecteur->id) // Filtrer par l'ID du collecteur (IDdemandeur)
            ->select(DB::raw('COUNT(DISTINCT conteneur_id) as total')) // Utiliser COUNT(DISTINCT conteneur_id)
            ->first();
    
        // Vérifier si aucun mouvement n'a été trouvé
        if (!$counts || $counts->total == 0) {
            return response()->json(['message' => 'No movements found for this collecteur'], 404);
        }
    
        // Retourner le nombre de mouvements sous format JSON
        return response()->json(['collecteur' => $collecteurNom, 'totalMovements' => $counts->total]);
    }
    
    public function filterMovements(Request $request)
    {
        // Initialiser la requête
        $query = DB::table('movements')
                    ->where('IDfournisseur', auth()->user()->id); // Filtrer par l'utilisateur authentifié
    
        // Filtrer par date si elle est fournie
        if ($request->has('date')) {
            $query->where('date', '=', $request->date);
        }
    
        // Filtrer par nom de collecteur si fourni
        if ($request->has('collecteur')) {
            // On joint la table 'users' pour filtrer par username
            $query->whereIn('IDdemandeur', function($subquery) use ($request) {
                $subquery->select('id')
                          ->from('users')
                          ->where('username', 'like', '%' . $request->collecteur . '%');
            });
        }
    
        // Exécuter la requête pour obtenir des mouvements uniques par conteneur_id
        $counts = $query->select('date', DB::raw('COUNT(DISTINCT conteneur_id) as total')) // Utilisation de DISTINCT
                        ->groupBy('date')
                        ->get();
    
        // Vérifier si aucun résultat n'a été trouvé
        if ($counts->isEmpty()) {
            return response()->json(['message' => 'No data found'], 404);
        }
    
        // Format de réponse
        $response = [
            'labels' => $counts->pluck('date'),
            'data' => $counts->pluck('total')
        ];
    
        return response()->json($response);
    }
    
    public function filterMovementscollecteurvente(Request $request)
    {
        // Initialiser la requête
        $query = DB::table('movements')
                    ->where('IDdemandeur', auth()->user()->id) // Filtrer par l'utilisateur authentifié
                    ->whereNull('IDdemandeurrecycleur'); // Ajouter une condition pour IDdemandeurrecycleur étant null
    
        // Filtrer par date si elle est fournie
        if ($request->has('date')) {
            $query->where('date', '=', $request->date);
        }
    
        // Filtrer par nom de collecteur si fourni
        if ($request->has('collecteur')) {
            // On joint la table 'users' pour filtrer par username
            $query->whereIn('IDdemandeur', function($subquery) use ($request) {
                $subquery->select('id')
                          ->from('users')
                          ->where('username', 'like', '%' . $request->collecteur . '%');
            });
        }
    
        // Exécuter la requête pour obtenir des mouvements uniques par conteneur_id
        $counts = $query->select('date', DB::raw('COUNT(DISTINCT conteneur_id) as total')) // Utilisation de DISTINCT
                        ->groupBy('date')
                        ->get();
    
        // Vérifier si aucun résultat n'a été trouvé
        if ($counts->isEmpty()) {
            return response()->json(['message' => 'No data found'], 404);
        }
    
        // Format de réponse
        $response = [
            'labels' => $counts->pluck('date'),
            'data' => $counts->pluck('total')
        ];
    
        return response()->json($response);
    }
    
    public function filterMovementscollecteursortie(Request $request)
    {
        // Initialiser la requête
        $query = DB::table('movements')
                    ->where('IDdemandeur', auth()->user()->id)// Filtrer par l'utilisateur authentifié
                    ->whereNotNull('IDdemandeurrecycleur'); // Ajouter une condition pour IDdemandeurrecycleur étant null

        // Filtrer par date si elle est fournie
        if ($request->has('date')) {
            $query->where('date', '=', $request->date);
        }
    
        // Filtrer par nom de collecteur si fourni
        if ($request->has('collecteur')) {
            // On joint la table 'users' pour filtrer par username
            $query->whereIn('IDdemandeur', function($subquery) use ($request) {
                $subquery->select('id')
                          ->from('users')
                          ->where('username', 'like', '%' . $request->collecteur . '%');
            });
        }
    
        // Exécuter la requête pour obtenir des mouvements uniques par conteneur_id
        $counts = $query->select('date', DB::raw('COUNT(DISTINCT conteneur_id) as total')) // Utilisation de DISTINCT
                        ->groupBy('date')
                        ->get();
    
        // Vérifier si aucun résultat n'a été trouvé
        if ($counts->isEmpty()) {
            return response()->json(['message' => 'No data found'], 404);
        }
    
        // Format de réponse
        $response = [
            'labels' => $counts->pluck('date'),
            'data' => $counts->pluck('total')
        ];
    
        return response()->json($response);
    }

    public function filterMovementsrecycleurachat(Request $request)
    {
        // Initialiser la requête
        $query = DB::table('movements')
                    ->where('IDdemandeurrecycleur', auth()->user()->id);// Filtrer par l'utilisateur authentifié

        // Filtrer par date si elle est fournie
        if ($request->has('date')) {
            $query->where('date', '=', $request->date);
        }
    
        // Filtrer par nom de collecteur si fourni
        if ($request->has('collecteur')) {
            // On joint la table 'users' pour filtrer par username
            $query->whereIn('IDdemandeur', function($subquery) use ($request) {
                $subquery->select('id')
                          ->from('users')
                          ->where('username', 'like', '%' . $request->collecteur . '%');
            });
        }
    
        // Exécuter la requête pour obtenir des mouvements uniques par conteneur_id
        $counts = $query->select('date', DB::raw('COUNT(DISTINCT conteneur_id) as total')) // Utilisation de DISTINCT
                        ->groupBy('date')
                        ->get();
    
        // Vérifier si aucun résultat n'a été trouvé
        if ($counts->isEmpty()) {
            return response()->json(['message' => 'No data found'], 404);
        }
    
        // Format de réponse
        $response = [
            'labels' => $counts->pluck('date'),
            'data' => $counts->pluck('total')
        ];
    
        return response()->json($response);
    }
    
    public function getTypeSumsAdmin()
{
    // Fetch counts of waste by type
    $counts = DB::table('conteneurs')
        ->join('dechets', 'conteneurs.dechet_id', '=', 'dechets.id')
        ->select('dechets.type', DB::raw('COUNT(*) as total'))
        ->groupBy('dechets.type')
        ->get();

    // Check if no data is found
    if ($counts->isEmpty()) {
        return response()->json(['message' => 'No data found'], 404);
    }

    // Prepare the response in key-value format
    $response = $counts->pluck('total', 'type')->toArray();

    return response()->json($response);
}

    public function getTypeSumsusinebyID(Request $request,$id)
    {
        // Get the authenticated user's ID
        if (!$id) {
            return response()->json(['message' => 'User not authenticated'], 401);
        }
        $authenticatedUserId = auth()->id();

        // Query to count containers by type for the authenticated user
        $counts = DB::table('conteneurs')
            ->join('dechets', 'conteneurs.dechet_id', '=', 'dechets.id')
            ->where('conteneurs.user_id', '=', $id) 
            ->where('est_vendu_usine', Null)
            ->where('conteneurs.is_published', true)
            ->whereNotExists(function ($query) use ($authenticatedUserId) {
                // Sous-requête pour vérifier les demandes
                $query->select(DB::raw(1))
                    ->from('demandes')
                    ->whereColumn('demandes.conteneur_id', 'conteneurs.id')
                    ->where('demandes.user_id', $authenticatedUserId);
            })
            // Filter by authenticated user's ID
            ->select('dechets.type', DB::raw('COUNT(*) as total'))
            ->groupBy('dechets.type')
            ->get();
    
        // Check if no data is found
        if ($counts->isEmpty()) {
            return response()->json(['message' => 'No data found'], 404);
        }
    
        // Format the response
        $response = [];
        foreach ($counts as $count) {
            $response[$count->type] = $count->total;
        }
    
        // Return the response as JSON
        return response()->json($response);
    }

    public function getTypeSumsTotal(Request $request)
    {
        // Get the authenticated user's ID
      
        $authenticatedUserId = auth()->id();

        // Query to count containers by type for the authenticated user
        $counts = DB::table('conteneurs')
            ->join('dechets', 'conteneurs.dechet_id', '=', 'dechets.id')
            ->where('est_vendu_usine', Null)
            ->where('conteneurs.is_published', true)
            ->whereNotExists(function ($query) use ($authenticatedUserId) {
                // Sous-requête pour vérifier les demandes
                $query->select(DB::raw(1))
                    ->from('demandes')
                    ->whereColumn('demandes.conteneur_id', 'conteneurs.id')
                    ->where('demandes.user_id', $authenticatedUserId);
            })
            // Filter by authenticated user's ID
            ->select('dechets.type', DB::raw('COUNT(*) as total'))
            ->groupBy('dechets.type')
            ->get();
    
        // Check if no data is found
        if ($counts->isEmpty()) {
            return response()->json(['message' => 'No data found'], 404);
        }
    
        // Format the response
        $response = [];
        foreach ($counts as $count) {
            $response[$count->type] = $count->total;
        }
    
        // Return the response as JSON
        return response()->json($response);
    }
    
    public function getTypeSumscollecteur(Request $request)
    {
        $idDemandeur =  auth()->user(); // Retrieves the ID of the authenticated user
    
        if (!$idDemandeur) {
            return response()->json(['message' => 'User not authenticated'], 401);
        }
    
        $counts = DB::table('movements')
            ->join('conteneurs', 'movements.conteneur_id', '=', 'conteneurs.id')
            ->join('dechets', 'conteneurs.dechet_id', '=', 'dechets.id')
            ->where('movements.IDdemandeur', $idDemandeur->id)
            ->whereNull('IDdemandeurrecycleur') 
            ->where('conteneurs.est_vendu_collecteur', Null)
            ->select('dechets.type', DB::raw('COUNT(*) as total'))
            ->groupBy('dechets.type')
            ->get();
    
        if ($counts->isEmpty()) {
            return response()->json(['message' => 'No data found'], 404);
        }
    
        $response = [];
        foreach ($counts as $count) {
            $response[$count->type] = $count->total;
        }
    
        return response()->json($response);
    }
    
    public function getTypeSumscollecteurByID(Request $request, $id)
    {
        if (!$id) {
            return response()->json(['message' => 'User not authenticated'], 401);
        }
    
        // Obtenir l'ID de l'utilisateur authentifié
        $authenticatedUserId = auth()->id();
    
        // Construire la requête principale
        $counts = DB::table('movements')
            ->join('conteneurs', 'movements.conteneur_id', '=', 'conteneurs.id')
            ->join('dechets', 'conteneurs.dechet_id', '=', 'dechets.id')
            ->where('movements.IDdemandeur', $id)
            ->whereNull('conteneurs.est_vendu_collecteur')
            ->where('movements.is_published', true)
            ->whereNotExists(function ($query) use ($authenticatedUserId) {
                // Sous-requête pour vérifier les demandes
                $query->select(DB::raw(1))
                    ->from('demandes')
                    ->whereColumn('demandes.conteneur_id', 'movements.conteneur_id')
                    ->where('demandes.user_id', $authenticatedUserId);
            })
            ->select('dechets.type', DB::raw('COUNT(*) as total'))
            ->groupBy('dechets.type')
            ->get();
    
        if ($counts->isEmpty()) {
            return response()->json(['message' => 'No data found'], 404);
        }
    
        $response = [];
        foreach ($counts as $count) {
            $response[$count->type] = $count->total;
        }
    
        return response()->json($response);
    }
    
public function getTypeSumsByDemandeurRecycleur(Request $request)
{ $IDdemandeurrecycleur=  auth()->user(); // Retrieves the ID of the authenticated user
    
    if (!$IDdemandeurrecycleur) {
        return response()->json(['message' => 'User not authenticated'], 401);
    }
    $counts = DB::table('movements')
        ->join('conteneurs', 'movements.conteneur_id', '=', 'conteneurs.id')
        ->join('dechets', 'conteneurs.dechet_id', '=', 'dechets.id')
        ->where('movements.IDdemandeurrecycleur', $IDdemandeurrecycleur->id)
        ->where('conteneurs.is_transformed', false)
        ->select('dechets.type', DB::raw('COUNT(*) as total'))
        ->groupBy('dechets.type')
        ->get();

        if ($counts->isEmpty()) {
            return response()->json(['message' => 'No data found'], 404);
        }
    
        $response = [];
        foreach ($counts as $count) {
            $response[$count->type] = $count->total;
        }
    
        return response()->json($response);
    }


    public function getContainersByType($type)
{
    // Trouver le déchet correspondant au type
    $dechet = Dechet::where('type', $type)->first();

    if (!$dechet) {
        return response()->json(['message' => 'Dechet not found'], 404);
    }

    // Charger les conteneurs associés au déchet avec leurs relations
    $containers = Conteneur::where('dechet_id', $dechet->id)
                ->with(['user', 'depot', 'dechet'])
                ->get();

    // Transformer les conteneurs pour inclure les informations supplémentaires
    $transformedConteneurs = $containers->map(function ($conteneur) {
        return [
            'conteneur' => $conteneur,
            'user_name' => $conteneur->user->username,
            'depot_name' => $conteneur->depot->nom,
            'dechet_name' => $conteneur->dechet->type,
            'owner_name' => $conteneur->user->username, // Nom du propriétaire
        ];
    });

    // Retourner les conteneurs transformés en réponse JSON
    return response()->json($transformedConteneurs);
}


}
