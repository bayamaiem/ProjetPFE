<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usine extends Model
{
    use HasFactory;
    protected $fillable = [
        'code_usine'
    ];

    public function fournisseur()
    {
        return $this->morphOne(Fournisseur::class, 'role');
    }
}
