<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dechet extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'value',
        'user_role'


    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function conteneurs()
    {
        return $this->hasMany(Conteneur::class);
    }

    public function code()
    {
        return $this->hasMany(Code::class);
    }
}
