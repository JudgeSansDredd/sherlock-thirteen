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
            'symbol_id',
            'suspect_id'
        );
    }

    public function investigations() {
        return $this->hasMany(Investigation::class, 'symbol_id', 'id');
    }

    public function interrogations() {
        return $this->hasMany(Interrogation::class, 'symbol_id', 'id');
    }
}
