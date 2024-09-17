<?php

namespace App\Http\Controllers;
use App\Mail\UserActivated;
use App\Models\User;
use App\Models\PasswordRest; // Assurez-vous que le nom du modèle est correct

use App\Http\Requests\UserRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Enums\Role;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str; // Ajoutez cette ligne
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['forgetPassword', 'resetPasswordLoad', 'resetPassword']);
    }
    public function index(): JsonResponse
    {
        $users = User::where('role', '!=', Role::Admin->value)->get();
        return response()->json($users);
    }



public function sendnotification(){
$collecteurId = auth()->user()->id;
$collecteur = User::find($collecteurId); // Replace $collecteurId with the actual ID of the collecteur
$action = 'Some action performed by Responsableusine';

$collecteur->notify(new ResponsableActionNotification($action));}

public function forgetPassword(Request $request)
{
    try {
        // Trouver l'utilisateur par email
        $user = User::where('email', $request->email)->get();

        if (count($user) > 0) {
            // Générer un token unique
            $token = Str::random(40);

            // URL de base de l'application front-end
            $domain = 'http://localhost:4200/#/';            
            // Construire l'URL pour la réinitialisation du mot de passe
            $url = $domain . 'reset-password?token=' . $token;
            
            // Préparer les données de l'email
            $data['url'] = $url;
            $data['email'] = $request->email;
            $data['title'] = "Password Reset";
            $data['body'] = "Please click on the link below to reset your password.";
            
            // Envoyer l'email
            Mail::send('forgetPasswordMail', ['data' => $data], function ($message) use ($data) {
                $message->to($data['email'])->subject($data['title']);
            });

            // Enregistrer ou mettre à jour le token dans la base de données
            $datetime = Carbon::now()->format('Y-m-d H:i:s');
            PasswordRest::updateOrCreate(
                ['email' => $request->email],
                [
                    'email' => $request->email,
                    'token' => $token,
                    'created_at' => $datetime             
                ]
            ); 

            return response()->json(['success' => true, 'msg' => 'Please check your mail to reset your password']);
        } else {
            return response()->json(['success' => false, 'msg' => 'User not found!']);
        }
    } catch (\Exception $e) {
        // Retourner l'exception avec le message d'erreur
        return response()->json(['success' => false, 'msg' => 'Error: ' . $e->getMessage()]);
    }
}

public function resetPasswordLoad(Request $request)
{
    try {
        $resetData = PasswordRest::where('token', $request->token)->get();

        if (isset($request->token) && count($resetData) > 0) {
            $user = User::where('email', $resetData[0]['email'])->get();
            return response()->json(['success' => true, 'user' => $user])->header('Content-Type', 'application/json');
        } else {
            return response()->json(['success' => false, 'msg' => 'Invalid token or user not found.']);
        }
    } catch (\Exception $e) {
        return response()->json(['success' => false, 'msg' => 'Error: ' . $e->getMessage()]);
    }
}

    
    
public function resetPassword(Request $request)
{
    $request->validate([
        'id' => 'required|exists:users,id', // Ensure user ID exists in the database
        'password' => 'required|string|min:8|confirmed'
    ]);

    $user = User::find($request->id);
    $user->password = Hash::make($request->password);
    $user->save();
    PasswordRest::where('email', $user->email)->delete();

    return response()->json([
        'message' => 'Your password has been reset successfully.'
    ]);
}


    public function store(UserRequest $request): JsonResponse
    {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);
        $user = User::create($data);
        return response()->json($user, 201);
    }

    public function show($id)
    {
        $userById = User::findOrFail($id);
        return response()->json(['userById' => $userById]);
    }

    public function update(UserRequest $request, User $user): JsonResponse
    {
        $data = $request->validated();
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }
        $user->update($data);
        return response()->json($user);
    }



    public function getUserByUsername($username)
{
    $user = User::where('username', $username)->first();
    if ($user) {
        return response()->json(['userByName' => $user]);
    } else {
        return response()->json(['message' => 'User not found'], 404);
    }
}
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'User deleted successfully'], 204);
    }

    public function activate(Request $request): JsonResponse
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'active' => 'required|boolean',
        ]);
        $isActive = $request->input('active');
        $user = User::findOrFail($request->user_id);
        $user->update(['active' => $request->active]);
        $user->activate = $isActive;
        Mail::to($user->email)->send(new UserActivated($isActive));

        $message = $isActive ? 'User activated successfully.' : 'User deactivated successfully.';
        return response()->json(['message' => $message]);
    }

    public function getUserByRole($role): JsonResponse
    {

        if (!Role::tryFrom($role)) {
            return response()->json(['error' => 'Invalid role'], 400);
        }

        $users = User::where('role', $role)->get();

        return response()->json($users);
    }
    public function activateUser(User $user)
    {
        $user->active = true;
        $user->save();

        Mail::to(Auth::user()->email)->send(new UserActivated());

        return redirect()->back()->with('success', 'User activated successfully.');
    }
    public function updateProfile(Request $request, $id)
    {
        $user = User::find($id);

        $validator = Validator::make($request->all(), [
            'username' => 'nullable',
            'firstName' => 'nullable',
            'lastname' => 'nullable',
            'email' => 'nullable',
            'phone_number' => 'nullable',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $userData = [];
        if ($request->has('username')) {
            $userData['username'] = $request->username;
        }
        if ($request->has('firstName')) {
            $userData['firstName'] = $request->firstName;
        }
        if ($request->has('lastname')) {
            $userData['lastname'] = $request->lastname;
        }
        if ($request->has('email')) {
            $userData['email'] = $request->email;
        }
        if ($request->has('phone_number')) {
            $userData['phone_number'] = $request->phone_number;
        }

        $user->update($userData);

        return response()->json([
            'message' => 'Profile successfully updated',
        ], 200);
    }

}
