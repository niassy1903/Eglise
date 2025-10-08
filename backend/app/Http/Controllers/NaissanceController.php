<?php

namespace App\Http\Controllers;

use App\Models\Naissance;
use App\Models\Utilisateur;
use Illuminate\Http\Request;

class NaissanceController extends Controller
{
    // Liste de toutes les naissances
    public function index()
    {
        return response()->json(Naissance::with('pretre')->get(), 200);
    }

    // Créer une naissance
    public function store(Request $request)
    {
        $request->validate([
            'enfant_nom' => 'required|string',
            'enfant_prenom' => 'required|string',
            'date_naissance' => 'required|date',
            'lieu_naissance' => 'nullable|string',
            'pere_nom' => 'nullable|string',
            'pere_prenom' => 'nullable|string',
            'mere_nom' => 'nullable|string',
            'mere_prenom' => 'nullable|string',
            'pretre_id' => [
                'required',
                'exists:utilisateurs,id',
                function ($attribute, $value, $fail) {
                    $utilisateur = Utilisateur::find($value);
                    if ($utilisateur && $utilisateur->role !== 'pretre') {
                        $fail('Le prêtre sélectionné n\'a pas le rôle "pretre".');
                    }
                }
            ]
        ]);

        $naissance = Naissance::create($request->all());

        return response()->json($naissance->load('pretre'), 201);
    }

    // Afficher une naissance
    public function show($id)
    {
        $naissance = Naissance::with('pretre')->find($id);
        if (!$naissance) return response()->json(['message'=>'Naissance non trouvée'],404);
        return response()->json($naissance, 200);
    }

    // Modifier une naissance
    public function update(Request $request, $id)
    {
        $naissance = Naissance::find($id);
        if (!$naissance) return response()->json(['message'=>'Naissance non trouvée'],404);

        $request->validate([
            'enfant_nom' => 'sometimes|string',
            'enfant_prenom' => 'sometimes|string',
            'date_naissance' => 'sometimes|date',
            'lieu_naissance' => 'sometimes|string',
            'pere_nom' => 'sometimes|string',
            'pere_prenom' => 'sometimes|string',
            'mere_nom' => 'sometimes|string',
            'mere_prenom' => 'sometimes|string',
            'pretre_id' => [
                'sometimes',
                'exists:utilisateurs,id',
                function ($attribute, $value, $fail) {
                    $utilisateur = Utilisateur::find($value);
                    if ($utilisateur && $utilisateur->role !== 'pretre') {
                        $fail('Le prêtre sélectionné n\'a pas le rôle "pretre".');
                    }
                }
            ]
        ]);

        $naissance->update($request->all());

        return response()->json($naissance->load('pretre'), 200);
    }

    // Supprimer une naissance
    public function destroy($id)
    {
        $naissance = Naissance::find($id);
        if (!$naissance) return response()->json(['message'=>'Naissance non trouvée'],404);

        $naissance->delete();

        return response()->json(['message'=>'Naissance supprimée avec succès'],200);
    }

    public function countNaissances()
    {
        $total = Naissance::count();
        return response()->json(['naissances' => $total]);
    }

    /**
     * Statistiques mensuelles des naissances
     */
    public function statsMensuelles()
    {
        $data = Naissance::selectRaw('MONTH(date_naissance) as month, COUNT(*) as total')
            ->groupBy('month')
            ->pluck('total','month');

        return response()->json($data);
    }

}
