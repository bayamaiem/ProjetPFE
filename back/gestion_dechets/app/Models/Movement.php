<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movement extends Model
{
    use HasFactory;
    protected $primaryKey = 'id';
    protected $fillable = [
        'date',
        'hour',
        'place',
        'conteneur_id',
        'IDdemandeur',
        'IDfournisseur'
    ];

    protected $casts = [
        'date' => 'datetime:Y-m-d',
        'hour' => 'datetime:H:i',
    ];

    public function getDateAttribute($value)
    {
        return Carbon::parse($value)->format('Y-m-d');
    }

    public function setDateAttribute($value)
    {
        $this->attributes['date'] = Carbon::createFromFormat('Y-m-d', $value);
    }

    public function getHourAttribute($value)
    {
        return Carbon::parse($value)->format('H:i');
    }

    public function setHourAttribute($value)
    {
        $this->attributes['hour'] = Carbon::createFromFormat('H:i', $value);
    }

    public function conteneur()
    {
        return $this->belongsTo(Conteneur::class,'conteneur_id');
    }

    public function conteneur2()
    {
        return $this->belongsTo(Movement::class,'conteneur_id');
    }


    
    

    public function fournisseur()
{
    return $this->belongsTo(User::class, 'IDfournisseur');
}

public function fournisseur2()
{
    return $this->belongsTo(User::class, 'IDdemandeur');
}
public function movements()
{
    return $this->hasMany(Movement::class);
}


public function demandes()
{
    return $this->hasMany(Demande::class,'conteneur_id');
}

public function demandeurrecycleur()
{
    return $this->belongsTo(User::class, 'IDdemandeurrecycleur');
}

public function depot()
{
    return $this->belongsTo(Depot::class, 'newdepot');
}


public function movement()
    {
        return $this->belongsTo(Movement::class, 'conteneur_id'); // Correction de la relation
    }
}
