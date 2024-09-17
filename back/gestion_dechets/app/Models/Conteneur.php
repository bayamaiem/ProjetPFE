<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conteneur extends Model
{
    use HasFactory;
    protected $fillable = [
        'code',
        'prix',
        'user_id',
        'depot_id',
        'dechet_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function depot()
    {
        return $this->belongsTo(Depot::class);
    }

    public function depot2()
    {
        return $this->belongsTo(Depot::class,'depotContTransformer');
    }

    public function dechet()
    {
        return $this->belongsTo(Dechet::class);
    }
    public function codeModel()
    {
        return $this->belongsTo(Code::class, 'code');
    }

    public function codeRecycleur()
    {
        return $this->belongsTo(Code::class, 'coderecycleur');
        // 'coderecycleur' est la clé étrangère dans la table 'conteneur'
        // 'code' est la clé primaire de la table 'codes' qui contient les codes de recycleurs
    }
    
    
    

    public function movements()
    {
        return $this->hasMany(Movement::class);
    }

    public function depot3()
    {
        return $this->belongsTo(Depot::class, 'depotContTransformer');
    }
    
   
    public function demande()
    {
        return $this->hasMany(Demande::class, 'conteneur_id');
    }

    public function demandes()
{
    return $this->hasMany(Demande::class);
}
}
