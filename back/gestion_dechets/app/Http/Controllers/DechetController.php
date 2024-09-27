<?php

namespace App\Http\Controllers;
use App\Models\Conteneur;

use Illuminate\Http\Request;
use App\Models\Dechet;
use App\Enums\Role;
use Illuminate\Http\JsonResponse;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class DechetController extends Controller
{

    public function index(Request $request)
    {
        $dechets = Dechet::all();
       
        return response()->json(['dechets' => $dechets]);
    }
    public function store(Request $request)
    {
        $user = $request->user();

        $dechet = new Dechet($request->all());
        
        $dechet->save();

        return response()->json($dechet, 201);
    }
    public function show($id)
    {
        $dechet = Dechet::findOrFail($id);
        return response()->json(['dechets' => $dechet]);
    }

    public function edit(Dechet $dechets)
    {
        return response()->json(['dechet' => $dechets]);
    }

    public function update(Request $request, $id)
    {
        $dechet = Dechet::findOrFail($id);
        $dechet->update($request->all());
        return response()->json(['dechet' => $dechet], 200);
    }
    public function checkType(Request $request)
    {
        $code = $request->input('type');
    
        // Check if the Code exists for the authenticated user
        $exists = Dechet::where('type', $code)
                      ->exists();
    
        if ($exists) {
            return response()->json(['exists' => true], 200);
        } else {
            return response()->json(['exists' => false]);
        }
    }


    public function checkTypeUsine(Request $request)
    {
        // Récupérer l'ID de l'utilisateur connecté
       
    
        // Récupérer les inputs du formulaire
        $type = $request->input('type');
    
        // Charger les conteneurs liés à l'utilisateur connecté avec les dépôts associés
        $conteneurs = Conteneur::with('dechet')
                               ->get();
    
        // Itérer à travers les conteneurs pour vérifier si le dépôt correspond
        foreach ($conteneurs as $conteneur) {
            $dechet = $conteneur->dechet;
    
            // Vérifier si le dépôt existe et correspond au nom et au lieu fournis
            if ($dechet->type == $type ) {
                return response()->json(['exists' => true], 200); // Dépôt trouvé
            }
        }
    
        // Si aucun dépôt correspondant n'est trouvé
        return response()->json(['exists' => false]);
    }
    public function destroy($id)
    {
        $dechet = Dechet::findOrFail($id);
        $dechet->delete();
        return response()->json(['message' => 'Dechets deleted successfully'], 204);
    }
    public function getDechetByRole($role): JsonResponse
    {

        if (!Role::tryFrom($role)) {
            return response()->json(['error' => 'Invalid role'], 400);
        }

        $users = Dechet::where('user_role', $role)->get();

        return response()->json($users);
    }
}
