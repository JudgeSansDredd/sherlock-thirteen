<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
    ];

    protected $casts = [
          'id' => 'integer'
        , 'created_at' => 'datetime'
        , 'updated_at' => 'datetime'
    ];

    public function games() {
        return $this->hasMany(Game::class, 'user_id', 'id');
    }
}
