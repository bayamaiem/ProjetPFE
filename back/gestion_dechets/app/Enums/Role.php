<?php

namespace App\Enums;

enum Role: string
{
    case Admin = 'admin';
    case Collecteur = 'collecteur';
    case Recycleur = 'recycleur';
    case Usine = 'usine';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
