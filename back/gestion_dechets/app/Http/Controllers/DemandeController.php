<?php

namespace App\Http\Controllers;

use App\Mail\DemandeEtatChange;
use App\Models\Demande;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Models\Conteneur;
use App\Models\Movement;
use Carbon\Carbon;


class DemandeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }


    
  // afficher liste demande passer par collecteur (usine)
// afficher liste demande passer par collecteur (usine)

// afficher liste demande passer par collecteur (usine)
public function index()
{
    // Récupérer l'ID de l'utilisateur authentifié
    $userId = auth()->user()->id;

    // Récupérer tous les conteneurs associés à des demandes avec etat = 1 où le propriétaire du conteneur est l'utilisateur authentifié
    $conteneursAvecEtatUn = Demande::where('etat', 1)
        ->whereHas('conteneur', function($query) use ($userId) {
            $query->where('user_id', $userId); // Filtrer par l'utilisateur propriétaire du conteneur
        }) ->whereHas('user', function($query) {
            $query->where('role', 'collecteur');
        })
        ->pluck('conteneur_id')
        ->toArray();

    // Récupérer toutes les demandes où le propriétaire du conteneur est l'utilisateur authentifié
    $demandes = Demande::with(['user', 'conteneur.dechet','conteneur.depot','conteneur'])
    ->whereHas('user', function($query) {
        $query->where('role', 'collecteur');
    })
        ->whereHas('conteneur', function($query) use ($userId) {
            $query->where('user_id', $userId); // Filtrer par l'utilisateur propriétaire du conteneur
        })
        ->where('collecteur_id', $userId) // Ajouter la condition collecteur_id = $userId

        ->get();

    // Log les demandes récupérées
    \Log::info("Retrieved demandes: " . $demandes->toJson());

    // Filtrer les demandes pour exclure celles dont le conteneur_id se trouve dans $conteneursAvecEtatUn
    $demandesFiltrees = $demandes->reject(function ($demande) use ($conteneursAvecEtatUn) {
        return in_array($demande->conteneur_id, $conteneursAvecEtatUn);
    });

    // Mapper les demandes filtrées pour inclure le nom d'utilisateur
    $demande = $demandesFiltrees->map(function ($demande) {
        return [
            'demande' => $demande,
            'user_name' => $demande->user ? $demande->user->username : null,
        ];
    });

    // Log les demandes mappées
    \Log::info("Mapped demandes: " . json_encode($demande));

    // Retourner la réponse sous forme de JSON
    return response()->json(['demandes' => $demande]);
}
public function affichedemandecollecteur()
{
    // Récupérer l'ID de l'utilisateur authentifié
    $userId = auth()->user()->id;

    // Log de l'ID utilisateur
    \Log::info("ID utilisateur authentifié : " . $userId);

    // Récupérer les conteneurs où des demandes ont état = 1 pour un autre recycleur (autre que l'utilisateur authentifié)
    $conteneursAvecEtatUnAutreRecycleur = Demande::where('etat', 1)
        ->whereHas('user', function($query) use ($userId) {
            $query->where('role', 'recycleur')
                  ->where('id', '!=', $userId); // Exclure l'utilisateur authentifié
        })
        ->pluck('conteneur_id')
        ->toArray();

    // Log des conteneurs où l'état = 1 pour un autre recycleur
    \Log::info("Conteneurs avec état = 1 pour un autre recycleur : " . json_encode($conteneursAvecEtatUnAutreRecycleur));

    // Récupérer les demandes des recycleurs avec état = 0 pour les conteneurs qui n'ont pas l'état = 1 pour un autre recycleur
    $demandesRecycleur = Demande::with(['user'])
        ->whereHas('user', function($query) {
            $query->where('role', 'recycleur'); // Filtrer uniquement les utilisateurs ayant le rôle "recycleur"
        })
        ->where('etat', 0) // Filtrer uniquement les demandes avec état = 0
        ->whereNotIn('conteneur_id', $conteneursAvecEtatUnAutreRecycleur) // Exclure les conteneurs avec état = 1 pour un autre recycleur
        ->where('user_id', '!=', $userId) // Exclure les demandes du collecteur authentifié
        ->where('collecteur_id', $userId) // Ajouter la condition collecteur_id = $userId

        ->get();

    // Log des demandes récupérées pour les recycleurs
    \Log::info("Demandes récupérées pour les recycleurs : " . $demandesRecycleur->toJson());

    // Mapper les demandes pour inclure le nom d'utilisateur (recycleur), les détails du conteneur, newdepot et prixcollecteur
    $demandesMappees = $demandesRecycleur->map(function ($demande) use ($userId) {
        $conteneur = Conteneur::find($demande->conteneur_id);
        \Log::info("Conteneur récupéré pour la demande {$demande->id}: " . json_encode($conteneur));

        // Rechercher tous les mouvements
        $mouvements = Movement::where('IDdemandeur', $userId)
            ->whereNull('IDdemandeurrecycleur') // Commenté pour test
            ->where('conteneur_id', $demande->conteneur_id)
            ->get();

        \Log::info("Mouvements pour la demande {$demande->id}: " . $mouvements->toJson());

        $newdepot = null;
        $prixcollecteur = null;

        if ($mouvements->isNotEmpty()) {
            foreach ($mouvements as $movement) {
                \Log::info("Mouvement trouvé: newdepot = {$movement->newdepot}, prixcollecteur = {$movement->prixcollecteur}");

                if (!is_null($movement->newdepot)) {
                    $newdepot = Depot::find($movement->newdepot);
                    if ($newdepot) {
                        \Log::info("Depot trouvé pour newdepot = {$movement->newdepot}: " . json_encode($newdepot));
                    } else {
                        \Log::info("Depot non trouvé pour newdepot = {$movement->newdepot}");
                    }
                }
                if (!is_null($movement->prixcollecteur)) {
                    $prixcollecteur = $movement->prixcollecteur;
                }
            }
        }

        return [
            'demande' => $demande,
            'user_name' => $demande->user ? $demande->user->username : null,
            'conteneur' => $conteneur,
            'newdepot' => $newdepot,
            'prixcollecteur' => $prixcollecteur,
        ];
    });

    \Log::info("Demandes mappées : " . json_encode($demandesMappees));

    return response()->json(['demandes' => $demandesMappees]);
}
    public function store(Request $request , $conteneurID ,$IDdemandeur) 
    {
        
        $validatedData['date'] = Carbon::now()->toDateString(); // Ajoute la date actuelle
        $validatedData['user_id'] = auth()->id();
        $validatedData['conteneur_id'] = $conteneurID;
        $validatedData['collecteur_id'] = $IDdemandeur;

        $demande = Demande::create($validatedData);

        return response()->json(['demande' => $demande], 201);
    }

    public function show($id)
    {
        $demande = Demande::findOrFail($id);
        return response()->json(['demande' => $demande]);
    }

    public function edit(Demande $demande)
    {
        return response()->json(['demande' => $demande]);
    }

    public function update(Request $request, $id)
    {
        $demande = Demande::findOrFail($id);
        $demande->update($request->all());
        return response()->json(['demande' => $demande], 200);
    }

    public function destroy($id)
    {
        $demande = Demande::findOrFail($id);
        $demande->delete();
        return response()->json(['message' => 'Demande was deleted successfully'], 204);
    }

    public function updateEtat(Request $request, $id)
    {
        $request->validate([
            'etat' => 'required|boolean',
        ]);
        $etat = $request->input('etat');
        $demande = Demande::findOrFail($id);
        $demande->update(['etat' => $request->etat]);
        $demande->etat = $etat;
        $message = !$etat ? 'Youre demande is accpeted' : 'Youre demande is refused';
        return response()->json(['message' => $message]);
    }
}

