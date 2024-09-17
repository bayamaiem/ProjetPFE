<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Depot extends Model
{
    use HasFactory;
    protected $fillable = [
        'nom',
        'lieu',
        'user_id'

    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function conteneurs()
    {
        return $this->hasMany(Conteneur::class);
    }

    public function mouvement()
    {
        return $this->belongsTo(depot::class);
    }


    public function conteneurs2()
{
    return $this->hasMany(Conteneur::class, 'depotContTransformer');
}

}
