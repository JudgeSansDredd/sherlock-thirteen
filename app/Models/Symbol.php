<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Symbol extends Model
{
    use HasFactory;

    public function suspects() {
        return $this->belongsToMany(
            Suspect::class,
            'suspects_symbols',
            'short_symbol',
            'suspect_name',
            'short_symbol',
            'name'
        );
    }
}
