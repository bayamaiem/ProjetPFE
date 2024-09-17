<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Code extends Model
{
    use HasFactory;
    protected $table = 'table_code'; // Ajoutez cette ligne pour spécifier le nom de la table

    protected $fillable = [
        'code',
        'user_id'
        

    ];

    
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function conteneurs()
    {
        return $this->hasMany(Conteneur::class );
    }

   
}
