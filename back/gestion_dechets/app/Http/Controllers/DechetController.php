<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Dechet;
use App\Enums\Role;
use Illuminate\Http\JsonResponse;
use App\Models\User;

class DechetController extends Controller
{

    public function index(Request $request)
    {
        $dechets = Dechet::all();
        $firstNames = [];
        foreach ($dechets as $dechet) {
            $firstName = $dechet->user->firstName;
            $firstNames[] = $firstName;
        }
        return response()->json(['dechets' => $dechets, 'user_first_names' => $firstNames]);
    }
    public function store(Request $request)
    {
        $user = $request->user();

        $dechet = new Dechet($request->all());
        $dechet->user_id = $user->id;
        $dechet->user_role = $user->role;
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
