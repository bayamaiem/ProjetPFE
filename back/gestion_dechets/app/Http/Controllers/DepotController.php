<?php

namespace App\Http\Controllers;
use App\Models\Conteneur;

use Illuminate\Http\Request;
use App\Models\Depot;
use App\Models\Movement;
use Illuminate\Support\Facades\Auth;



class DepotController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }
    public function index(Request $request)
    {
        $depots = Depot::all();
        $firstNames = [];
        foreach ($depots as $depot) {
            $firstName = $depot->user->firstName;
            $firstNames[] = $firstName;
        }
        return response()->json(['depots' => $depots, 'user_first_names' => $firstNames]);
    }


    public function checkDepot(Request $request)
    {
        $nom = $request->input('nom');
        $lieu = $request->input('lieu');
    
        $userId = Auth::id();  // Get the authenticated user's ID
    
        // Check if the depot exists for the authenticated user
        $exists = Depot::where('nom', $nom)
                       ->where('lieu', $lieu) // Separate where clause for 'lieu'
                       ->where('user_id', $userId)  // Ensure the depot belongs to the authenticated user
                       ->exists();
    
        if ($exists) {
            return response()->json(['exists' => true], 200);
        } else {
            return response()->json(['exists' => false]);
        }
    }
    


    public function checkDepotUsine(Request $request)
    {
        // Récupérer l'ID de l'utilisateur connecté
        $userId = Auth::id(); 
    
        // Récupérer les inputs du formulaire
        $nom = $request->input('nom');
        $lieu = $request->input('lieu');
    
        // Charger les conteneurs liés à l'utilisateur connecté avec les dépôts associés
        $conteneurs = Conteneur::with('depot')
                               ->where('user_id', $userId) // Filtrer par l'utilisateur connecté
                               ->get();
    
        // Itérer à travers les conteneurs pour vérifier si le dépôt correspond
        foreach ($conteneurs as $conteneur) {
            $depot = $conteneur->depot;
    
            // Vérifier si le dépôt existe et correspond au nom et au lieu fournis
            if ($depot && $depot->nom == $nom && $depot->lieu == $lieu) {
                return response()->json(['exists' => true], 200); // Dépôt trouvé
            }
        }
    
        // Si aucun dépôt correspondant n'est trouvé
        return response()->json(['exists' => false]);
    }
    
    


    public function checkDepotCollecteur(Request $request)
    {          $userId = Auth::id(); 

        $nom = $request->input('nom');
        $lieu = $request->input('lieu');
        
        // Itérer à travers tous les conteneurs
        $movements = Movement::with('depot')
       -> where('IDdemandeur',   $userId)
        ->whereNotNull('date_stockage')
        ->whereNotNull('estStoker')
        ->whereNotNull('newdepot')
        ->whereNull('IDdemandeurrecycleur') 
         
        ->get();
      
        foreach ($movements as   $movement) {
            // Vérifier si le dépôt associé existe et correspond au nom et au lieu
            $depot = $movement->depot;
            if ($depot && $depot->nom == $nom && $depot->lieu == $lieu) {
                return response()->json(['exists' => true], 200); // Dépôt trouvé
            }
        }
        
        // Si aucun dépôt correspondant n'est trouvé
        return response()->json(['exists' => false]);
    }




    public function checkDepotrecycleur(Request $request)
    {          $userId = Auth::id(); 

        $nom = $request->input('nom');
        $lieu = $request->input('lieu');
        
        // Itérer à travers tous les conteneurs
        $movements = Movement::with('depot')
       -> where('IDdemandeurrecycleur',   $userId)
        ->whereNotNull('date_stockage')
        ->whereNotNull('estStoker')
        ->whereNotNull('newdepot')         
        ->get();
      
        foreach ($movements as   $movement) {
            // Vérifier si le dépôt associé existe et correspond au nom et au lieu
            $depot = $movement->depot;
            if ($depot && $depot->nom == $nom && $depot->lieu == $lieu) {
                return response()->json(['exists' => true], 200); // Dépôt trouvé
            }
        }
        
        // Si aucun dépôt correspondant n'est trouvé
        return response()->json(['exists' => false]);
    }


    public function checkDepotConteneurTransformerrecycleur(Request $request)
    {          $userId = Auth::id(); 

        $nom = $request->input('nom');
        $lieu = $request->input('lieu');
        
        // Itérer à travers tous les conteneurs
        $movements = Conteneur::whereHas('movements', function ($query) use ($userId) {
            $query->where('is_transformed', true)
                  ->where('IDdemandeurrecycleur', $userId);
        })
       // Load the related Depot model
        ->get();
      
        foreach ($movements as   $movement) {
            // Vérifier si le dépôt associé existe et correspond au nom et au lieu
            $depot = $movement->depot3;
            if ($depot && $depot->nom == $nom && $depot->lieu == $lieu) {
                return response()->json(['exists' => true], 200); // Dépôt trouvé
            }
        }
        
        // Si aucun dépôt correspondant n'est trouvé
        return response()->json(['exists' => false]);
    }



    public function getDepotNameById($id)
    {
        // Rechercher le dépôt par ID
        $depot = Depot::find($id);

        // Si le dépôt est trouvé, retourner son nom
        if ($depot) {
            return response()->json(['nom' => $depot->nom], 200);
        }

        // Si le dépôt n'est pas trouvé, retourner une réponse avec un message d'erreur
        return response()->json(['error' => 'Depot not found'], 404);
    }

    public function store(Request $request)
    {
        $user = $request->user();

        $depot = new Depot($request->all());
        $depot->user_id = $user->id;
        $depot->save();

        return response()->json($depot, 201);
    }




    public function show($id)
    {
        $depot = Depot::findOrFail($id);
        return response()->json(['depots' => $depot]);
    }

    public function edit(Depot $depot)
    {
        return response()->json(['depots' => $depot]);
    }

    public function update(Request $request, $id)
    {
        $depot = Depot::findOrFail($id);
        $depot->update($request->all());
        return response()->json(['depots' => $depot], 200);
    }

    public function destroy($id)
    {
        $depot = Depot::findOrFail($id);
        $depot->delete();
        return response()->json(['message' => 'Depot deleted successfully'], 204);
    }

}
