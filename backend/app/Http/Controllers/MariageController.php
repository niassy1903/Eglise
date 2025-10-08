<?php

namespace App\Http\Controllers;

use App\Models\Mariage;
use App\Models\Utilisateur;
use Illuminate\Http\Request;

class MariageController extends Controller
{
    // Liste de tous les mariages avec le prêtre qui les a enregistrés
    public function index()
    {
        return response()->json(Mariage::with('pretre')->get(), 200);
    }

    // Créer un mariage
    public function store(Request $request)
    {
        $request->validate([
            'conjoint1_nom' => 'required|string',
            'conjoint1_prenom' => 'required|string',
            'conjoint2_nom' => 'required|string',
            'conjoint2_prenom' => 'required|string',
            'date_mariage' => 'required|date',
            'lieu_mariage' => 'nullable|string',
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

        $mariage = Mariage::create($request->all());

        return response()->json($mariage->load('pretre'), 201);
    }

    // Afficher un mariage
    public function show($id)
    {
        $mariage = Mariage::with('pretre')->find($id);
        if (!$mariage) return response()->json(['message'=>'Mariage non trouvé'],404);
        return response()->json($mariage, 200);
    }

    // Modifier un mariage
    public function update(Request $request, $id)
    {
        $mariage = Mariage::find($id);
        if (!$mariage) return response()->json(['message'=>'Mariage non trouvé'],404);

        $request->validate([
            'conjoint1_nom' => 'sometimes|string',
            'conjoint1_prenom' => 'sometimes|string',
            'conjoint2_nom' => 'sometimes|string',
            'conjoint2_prenom' => 'sometimes|string',
            'date_mariage' => 'sometimes|date',
            'lieu_mariage' => 'sometimes|string',
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

        $mariage->update($request->all());

        return response()->json($mariage->load('pretre'), 200);
    }

    // Supprimer un mariage
    public function destroy($id)
    {
        $mariage = Mariage::find($id);
        if (!$mariage) return response()->json(['message'=>'Mariage non trouvé'],404);

        $mariage->delete();

        return response()->json(['message'=>'Mariage supprimé avec succès'],200);
    }

     public function countMariages()
    {
        $total = Mariage::count();
        return response()->json(['mariages' => $total]);
    }

    /**
     * Statistiques mensuelles des mariages
     */
    public function statsMensuelles()
    {
        $data = Mariage::selectRaw('MONTH(date_mariage) as month, COUNT(*) as total')
            ->groupBy('month')
            ->pluck('total','month');

        return response()->json($data);
    }
}
