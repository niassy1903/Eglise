<?php

// app/Http/Controllers/UtilisateurController.php

namespace App\Http\Controllers;

use App\Models\Utilisateur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UtilisateurController extends Controller
{

    /**
 * Connexion utilisateur
 */
public function login(Request $request)
{
    // Validation des champs
    $request->validate([
        'email' => 'required|email',
        'mot_de_passe' => 'required|string',
    ]);

    // Chercher l'utilisateur par email
    $utilisateur = Utilisateur::where('email', $request->email)->first();

    if (!$utilisateur) {
        return response()->json(['message' => 'Email ou mot de passe incorrect'], 401);
    }

    // Vérifier le mot de passe
    if (!Hash::check($request->mot_de_passe, $utilisateur->mot_de_passe)) {
        return response()->json(['message' => 'Email ou mot de passe incorrect'], 401);
    }

    // Générer un token temporaire (si pas encore Sanctum/JWT installé)
    $token = Str::random(60);

    // Ajouter le rôle dans la réponse
    return response()->json([
        'utilisateur' => $utilisateur,
        'role' => $utilisateur->role, // 👈 Ajout du rôle ici
        'token' => $token
    ], 200);
}

    /**
     * Liste de tous les utilisateurs
     */
    public function index()
    {
        return response()->json(Utilisateur::all(), 200);
    }

    /**
     * Créer un utilisateur
     */
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'email' => 'required|email|unique:utilisateurs',
            'telephone' => 'nullable|string',
            'adresse' => 'nullable|string',
            'prenom_papa' => 'nullable|string',
            'nom_papa' => 'nullable|string',
            'prenom_maman' => 'nullable|string',
            'nom_maman' => 'nullable|string',
            'situation_matrimoniale' => 'required|in:celibataire,marie,divorce,veuf',
            'date_naissance' => 'nullable|date',
            'mot_de_passe' => 'required|string|min:6',
            'role' => 'required|in:admin,pretre',
        ]);

        $utilisateur = Utilisateur::create([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'email' => $request->email,
            'telephone' => $request->telephone,
            'adresse' => $request->adresse,
            'prenom_papa' => $request->prenom_papa,
            'nom_papa' => $request->nom_papa,
            'prenom_maman' => $request->prenom_maman,
            'nom_maman' => $request->nom_maman,
            'situation_matrimoniale' => $request->situation_matrimoniale,
            'date_naissance' => $request->date_naissance,
            'mot_de_passe' => Hash::make($request->mot_de_passe), // 👈 hash du mot de passe
            'role' => $request->role,
        ]);

        return response()->json($utilisateur, 201);
    }

    /**
     * Afficher un utilisateur
     */
    public function show(Utilisateur $utilisateur)
    {
        return response()->json($utilisateur, 200);
    }

    /**
     * Modifier un utilisateur
     */
    public function update(Request $request, Utilisateur $utilisateur)
    {
        $request->validate([
            'nom' => 'sometimes|string',
            'prenom' => 'sometimes|string',
            'email' => 'sometimes|email|unique:utilisateurs,email,'.$utilisateur->id,
            'telephone' => 'sometimes|string',
            'adresse' => 'sometimes|string',
            'prenom_papa' => 'sometimes|string',
            'nom_papa' => 'sometimes|string',
            'prenom_maman' => 'sometimes|string',
            'nom_maman' => 'sometimes|string',
            'situation_matrimoniale' => 'sometimes|in:celibataire,marie,divorce,veuf',
            'date_naissance' => 'sometimes|date',
            'mot_de_passe' => 'sometimes|string|min:6',
            'role' => 'sometimes|in:admin,pretre',
        ]);

        if($request->has('mot_de_passe')){
            $request['mot_de_passe'] = Hash::make($request->mot_de_passe);
        }

        $utilisateur->update($request->all());

        return response()->json($utilisateur, 200);
    }

    /**
     * Supprimer un utilisateur
     */
    public function destroy(Utilisateur $utilisateur)
    {
        $utilisateur->delete();
        return response()->json(['message' => 'Utilisateur supprimé avec succès'], 204);
    }

    
    public function countAdmins()
    {
        $total = Utilisateur::where('role', 'admin')->count();
        return response()->json(['admins' => $total]);
    }

    /**
     * Nombre total de prêtres
     */
    public function countPretres()
    {
        $total = Utilisateur::where('role', 'pretre')->count();
        return response()->json(['pretres' => $total]);
    }

    /**
     * Statistiques mensuelles des utilisateurs par rôle
     */
    public function statsMensuelles()
    {
        $admins = Utilisateur::selectRaw('MONTH(created_at) as month, COUNT(*) as total')
            ->where('role', 'admin')
            ->groupBy('month')
            ->pluck('total','month');

        $pretres = Utilisateur::selectRaw('MONTH(created_at) as month, COUNT(*) as total')
            ->where('role', 'pretre')
            ->groupBy('month')
            ->pluck('total','month');

        return response()->json([
            'admins' => $admins,
            'pretres' => $pretres
        ]);
    }


}