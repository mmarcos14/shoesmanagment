<?php
namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    // Ajoutez les propriétés nécessaires ici
    protected $fillable = ['name', 'email', 'password'];

    // Si vous utilisez `remember_token`
    protected $hidden = ['password', 'remember_token'];
}

?>