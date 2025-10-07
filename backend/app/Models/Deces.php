<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Deces extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom', 'prenom',
        'date_deces', 'lieu_deces', 'cause_deces',
        'pere_nom', 'pere_prenom',
        'mere_nom', 'mere_prenom',
        'pretre_id'
    ];

    // Relation avec le prêtre qui a enregistré
    public function pretre()
    {
        return $this->belongsTo(\App\Models\Utilisateur::class, 'pretre_id');
    }
}
