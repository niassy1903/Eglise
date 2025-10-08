:

🌟 Projet Église — Gestion des Fidèles et Événements Religieux
📘 Description

Ce projet est une application web complète développée avec Laravel pour le backend et React.js pour le frontend.
Elle permet la gestion des utilisateurs, des naissances, des mariages et des décès au sein d’une communauté religieuse (par exemple une église).

L’objectif est de faciliter la gestion des informations administratives de la paroisse via une interface moderne et intuitive.

🏗️ Architecture du projet
Backend (Laravel)

📂 backend/

app/Http/Controllers/

UtilisateurController.php

NaissanceController.php

MariageController.php

DecesController.php

app/Models/

Utilisateur.php

Naissance.php

Mariage.php

Deces.php

routes/api.php → Contient toutes les routes API (CRUD pour chaque ressource)

database/migrations/ → Définitions des tables

Technologies utilisées :

Laravel 10+

PHP 8.2+

MySQL 8

Sanctum (authentification par token)

Eloquent ORM

Frontend (React)

📂 frontend/

frontend/
│
├── public/
├── src/
│   ├── api/
│   │   └── api.js               → Fonctions d’appel à l’API Laravel
│   ├── assets/                  → Images, icônes, logos
│   ├── composants/
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   └── ProtectedRoute.jsx   → Protection des pages privées
│   ├── css/
│   │   └── *.css                → Feuilles de styles (Login, Dashboard…)
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── Inscription.jsx
│   │   ├── Utilisateurs.jsx
│   │   ├── Naissances.jsx
│   │   ├── Mariages.jsx
│   │   ├── Deces.jsx
│   │   └── Edit.jsx
│   ├── App.js
│   └── App.css
│
├── package.json
└── vite.config.js

Technologies utilisées :

React 18+

React Router DOM

Axios (appel API)

Boostrap ou CSS personnalisé

LocalStorage pour stocker le rôle et le token utilisateur

Installation du projet
1️⃣ Cloner le dépôt

git clone https://github.com/ton-repo/eglise.git
cd eglise

2️⃣ Installation du backend

cd backend
composer install
cp .env.example .env
php artisan key:generate

Configurer le fichier .env :

DB_DATABASE=eglise
DB_USERNAME=root
DB_PASSWORD=

Puis :

php artisan migrate --seed
php artisan serve

API disponible sur :
👉 http://127.0.0.1:8000/api

cd ../frontend
npm install
npm run dev

Frontend disponible sur :
👉 http://localhost:5173

🔐 Authentification et rôles

Un utilisateur se connecte via la page Login.jsx.

Son rôle (admin / super admin) est stocké dans le LocalStorage.

Le rôle détermine les accès :

admin → accès limité

super admin → accès complet à toutes les fonctionnalités

🧩 Fonctionnalités principales
👤 Gestion des utilisateurs

Inscription / connexion

Rôles : admin, super admin

Liste, modification, suppression

👶 Naissances

Ajouter, modifier, lister, supprimer une naissance

💍 Mariages

Gestion complète des mariages (CRUD)

⚰️ Décès

Enregistrement et suivi des décès

📊 Tableau de bord

Statistiques : nombre d’utilisateurs, mariages, décès, naissances

Graphiques dynamiques avec Chart.js

🧠 Structure API Laravel (exemple)
🔹 Routes (routes/api.php)
Route::apiResource('utilisateurs', UtilisateurController::class);
Route::apiResource('naissances', NaissanceController::class);
Route::apiResource('mariages', MariageController::class);
Route::apiResource('deces', DecesController::class);

🔹 Exemple de méthode Controller
public function index()
{
    return response()->json(Deces::all());
}

📈 Améliorations futures

Ajout d’un module Certificats (baptême, mariage, décès)

Système de notifications

Gestion des rôles dynamiques

Export PDF / Excel des registres

👨‍💻 Auteur

Projet développé par :
🧑‍💻 NPD
📅 Octobre 2025
📧 email :