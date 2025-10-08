<?php

namespace App\Http\Controllers;

use App\Models\Deces;
use App\Models\Utilisateur;
use Illuminate\Http\Request;

class DecesController extends Controller
{
    // Liste de tous les décès
    public function index()
    {
        return response()->json(Deces::with('pretre')->get(), 200);
    }

    // Créer un décès
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'date_deces' => 'required|date',
            'lieu_deces' => 'nullable|string',
            'cause_deces' => 'nullable|string',
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

        $deces = Deces::create($request->all());

        return response()->json($deces->load('pretre'), 201);
    }

    // Afficher un décès
    public function show($id)
    {
        $deces = Deces::with('pretre')->find($id);
        if (!$deces) return response()->json(['message'=>'Décès non trouvé'],404);
        return response()->json($deces, 200);
    }

    // Modifier un décès
    public function update(Request $request, $id)
    {
        $deces = Deces::find($id);
        if (!$deces) return response()->json(['message'=>'Décès non trouvé'],404);

        $request->validate([
            'nom' => 'sometimes|string',
            'prenom' => 'sometimes|string',
            'date_deces' => 'sometimes|date',
            'lieu_deces' => 'sometimes|string',
            'cause_deces' => 'sometimes|string',
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

        $deces->update($request->all());

        return response()->json($deces->load('pretre'), 200);
    }

    // Supprimer un décès
    public function destroy($id)
    {
        $deces = Deces::find($id);
        if (!$deces) return response()->json(['message'=>'Décès non trouvé'],404);

        $deces->delete();

        return response()->json(['message'=>'Décès supprimé avec succès'],200);
    }

     public function countDeces()
    {
        $total = Deces::count();
        return response()->json(['deces' => $total]);
    }

    /**
     * Statistiques mensuelles des décès
     */
    public function statsMensuelles()
    {
        $data = Deces::selectRaw('MONTH(date_deces) as month, COUNT(*) as total')
            ->groupBy('month')
            ->pluck('total','month');

        return response()->json($data);
    }
}
