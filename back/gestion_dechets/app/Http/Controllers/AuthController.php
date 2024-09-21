<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Http\Requests\UserRequest;

//*********nagmer fi hajet eli zedtihom */
use App\Mail\WelcomeEmail;
use Illuminate\Support\Facades\Password;
 /*hethi bech tecrpti mot passe*/

/***** */

class AuthController extends Controller
{
    public function register(UserRequest $request)
    {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);
        $user = User::create($data);
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'role' => $user->role,
            'userId' => $user->id,
            'active' => $user->active,
            'token_type' => 'Bearer',
        ]);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json('Logged out successfully', 200);
    }

/***************** */

public function forgetpass(Request $request)
  {
      $request->validate([
          'email' => 'required|email',
      ]);
  
      $status = Password::sendResetLink($request->only('email'));
  
      return $status === Password::RESET_LINK_SENT
          ? back()->with('status', __($status))
          : back()->withErrors(['email' => __($status)]);
  }

public function showResetPasswordForm(Request $request, $token)
{
    return view('auth.ResetPassword', ['token' => $token]);
}

public function resetPassword(Request $request , $token){
    $request->validate([
        'token' => 'required',
        'email' => 'required|email',
        'password' => 'required|confirmed',
    ]);

    $status = Passsword::reset(
    $request->only('email','password','password_confirmation','token'),
    function($user , $password){

    }
);

if ($status == Password::PASSWORD_RESET){
    return redirect()->back()->with('success','Rénitialisation du mot de passe réussie!');
}
else{
    return back()->withErrors(['email'=> __($status)]);
}
}

public static function emailExists($email)
{
    return self::where('email', $email)->exists();
}

public function checkEmail(Request $request)
    {
        $email = $request->input('email');
        
        if (User::where('email', $email)->exists()) {
            return response()->json(['exists' => true], 200);
        } else {
            return response()->json(['exists' => false]);
        }
    }

    public function checkUsername(Request $request)
    {
        $username = $request->input('username');
        
        if (User::where('username', $username)->exists()) {
            return response()->json(['exists' => true], 200);
        } else {
            return response()->json(['exists' => false]);
        }
    }

    public function checkPhone_number(Request $request)
    {
        $phone_number = $request->input('phone_number');
        
        if (User::where('phone_number', $phone_number)->exists()) {
            return response()->json(['exists' => true], 200);
        } else {
            return response()->json(['exists' => false]);
        }
    }


    public function checkPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
    
        $user = User::where('email', $request->email)->first();
    
        if ($user && Hash::check($request->password, $user->password)) {
            return response()->json(['exists' => true], 200);
        } else {
            return response()->json(['exists' => false]);
        }
    }
}
