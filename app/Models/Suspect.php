<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Suspect extends Model
{
    use HasFactory;

    public function symbols() {
        return $this->belongsToMany(
            Symbol::class,
            'suspects_symbols',
            'suspect_name',
            'short_symbol',
            'name',
            'short_symbol'
        );
    }
}
