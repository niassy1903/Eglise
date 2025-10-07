<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mariage extends Model
{
    use HasFactory;

    protected $fillable = [
        'conjoint1_nom', 'conjoint1_prenom',
        'conjoint2_nom', 'conjoint2_prenom',
        'date_mariage', 'lieu_mariage', 'pretre_id'
    ];

    // Relation avec le prêtre qui a enregistré
    public function pretre()
    {
        return $this->belongsTo(\App\Models\Utilisateur::class, 'pretre_id');
    }
}
