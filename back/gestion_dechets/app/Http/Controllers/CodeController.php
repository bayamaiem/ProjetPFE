<?php

namespace App\Http\Controllers;
use App\Models\Code;
use Illuminate\Support\Facades\Auth;
use App\Models\Conteneur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class CodeController extends Controller
{
    public function storecode(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:255',
        ]);

        
    
        $storecode = Code::create([
            'code' => $validated['code'],
            'user_id' => Auth::id(),
        ]);
    
        return response()->json(['table_code' => $storecode], 201);
    }


    public function checkCodeinContainer(Request $request)
    {
        $codeInput = $request->input('code');
        
        // Get the authenticated user's ID
        $userId = auth()->id();
        
        // Retrieve only the Conteneurs that belong to the authenticated user
        $conteneurs = Conteneur::where('user_id', $userId)->get();
        
        foreach ($conteneurs as $conteneur) {
            // Retrieve the associated Code model
            $codeModel = $conteneur->codeModel;
            
            // Check if the code exists in the associated Code model
            if ($codeModel && $codeModel->code == $codeInput) {
                return response()->json(['exists' => true], 200);
            }
        }
        
        // If no matching Code is found, return exists => false
        return response()->json(['exists' => false]);
    }
    

    public function checkCodeinContainerTransformer(Request $request)
    {
        // Récupérer le code soumis via la requête
        $codeInput = $request->input('coderecycleur');
        \Log::info('Code input: ' . $codeInput);
    
        // Récupérer l'ID de l'utilisateur authentifié
        $userId = auth()->id();
    
        // Utiliser une requête directe pour vérifier si le code existe dans les conteneurs transformés
        // et si le code appartient à l'utilisateur authentifié via la relation coderecycleur
        $codeExists = Conteneur::where('is_transformed', true)
                        ->whereHas('coderecycleur', function ($query) use ($codeInput, $userId) {
                            $query->where('code', $codeInput)
                                  ->where('user_id', $userId); // Vérifier que l'utilisateur est lié au code
                        })
                        ->exists();
    
        if ($codeExists) {
            \Log::info('Code trouvé: ' . $codeInput);
            return response()->json(['exists' => true], 200);
        } else {
            \Log::info('Code non trouvé: ' . $codeInput);
            return response()->json(['exists' => false], 200);
        }
    }
    

    
    
    
        public function checkCode(Request $request)
{
    $code = $request->input('code');
    $userId = Auth::id();  // Get the authenticated user's ID

    // Check if the Code exists for the authenticated user
    $exists = Code::where('code', $code)
                  ->where('user_id', $userId)  // Ensure the code belongs to the authenticated user
                  ->exists();

    if ($exists) {
        return response()->json(['exists' => true], 200);
    } else {
        return response()->json(['exists' => false]);
    }
}
   

    public function index(Request $request)
    {
        $user = Auth::user();
        $codes = $user->codes()->get();
    
        return response()->json(['Codes' => $codes]);
    }
    

    public function getCode($id){
        $code = Code::findOrFail($id);
        return response()->json(['code' => $code], 200);
    }

    public function update(Request $request, $id)
    {
        $code = Code::findOrFail($id);
        $code->update($request->all());
        return response()->json(['table_code' => $code], 200);
    }

    public function destroy($id)
    {
        $code = Code::findOrFail($id);
        $code->delete();
        return response()->json(['message' => 'code deleted successfully'], 204);
    }
}
