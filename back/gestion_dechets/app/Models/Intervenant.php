<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Intervenant extends Model
{
    use HasFactory;

    protected $fillable = [
        'firstName',
        'lastName',
        'address',
        'role'
    ];

    public function conteneurs()
    {
        return $this->hasMany(Conteneur::class, 'id_intervenant', 'id');
    }

    public function role()
    {
        return $this->morphTo();
    }
}
