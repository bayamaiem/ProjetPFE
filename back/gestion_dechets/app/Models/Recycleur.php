<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recycleur extends Model
{
    use HasFactory;

    protected $fillable = [
        'code_recycleur',
        'certificat'
    ];

    public function demandeur()
    {
        return $this->morphOne(Demandeur::class, 'role');
    }
}
