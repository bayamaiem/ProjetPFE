<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Demande extends Model
{
    use HasFactory;
    protected $primaryKey = 'id';

    protected $fillable = [
        'date',
        'etat',
        'user_id',
        'conteneur_id',
    ];

    protected $casts = [
        'date' => 'datetime',
        'etat' => 'boolean',
    ];

    protected $attributes = [
        'etat' => false,
    ];

    public function getDateAttribute($value)
    {
        return Carbon::parse($value)->format('Y-m-d');
    }

    public function setDateAttribute($value)
    {
        $this->attributes['date'] = Carbon::createFromFormat('Y-m-d', $value);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id'); // Assurez-vous que 'user_id' est la clé étrangère correcte
    }
    public function conteneur()
    {
        return $this->belongsTo(Conteneur::class, 'conteneur_id');
    }
    public function movement()
    {
        return $this->belongsTo(Conteneur::class, 'conteneur_id');
    }

    public function movements()
    {
        return $this->hasMany(Movement::class, 'IDdemandeur', 'user_id');
    }
    
}
