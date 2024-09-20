<?php

namespace App\Models;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as AuthenticatableUser;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Enums\Role;

class User extends AuthenticatableUser implements Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'users';
    protected $primaryKey = 'id';
    public $timestamps = true; // Si vous utilisez les colonnes `created_at` et `updated_at` dans la base de données, changez cette valeur à `true`.

    protected $fillable = [
        'firstName',
        'lastName',
        'email',
        'role',
        'username',
        'password',
        'active',
        'phone_number',
        'certificat',
        'createdOn',
        'address',
        'activite'
    ];


    protected $casts = [
        'role' => Role::class,
        'active' => 'boolean', // Cast la colonne Active en boolean
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $attributes = [
        'active' => false,
    ];

    /**
     * Récupère le mot de passe haché de l'utilisateur.
     *
     * @return string
     */
    public function getAuthPassword()
    {
        return $this->Password;
    }

    public function conteneurs()
    {
        return $this->hasMany(Conteneur::class);
    }

    public function dechets()
    {
        return $this->hasMany(Dechet::class);
    }

    public function depot()
    {
        return $this->hasMany(Depot::class);
    }

    public function demande()
    {
        return $this->hasMany(Demande::class,'user_id');
    }

    public function movements()
{
    return $this->hasMany(Movement::class, 'IDfournisseur');
}

public function codes()
{
    return $this->hasMany(Code::class);
}
   

public static function countUsersByRole()
{
    $roles = ['usine', 'collecteur', 'recycleur'];

    $counts = [];

    foreach ($roles as $role) {
        $counts[$role] = self::where('role', $role)->count();
    }

    return $counts;
}


}
