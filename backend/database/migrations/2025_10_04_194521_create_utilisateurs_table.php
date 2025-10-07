<?php

// database/migrations/xxxx_xx_xx_create_utilisateurs_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('utilisateurs', function (Blueprint $table) {
            $table->id();

            // Informations personnelles
            $table->string('nom');
            $table->string('prenom');
            $table->string('email')->unique();
            $table->string('telephone')->nullable();
            $table->string('adresse')->nullable();

            // Informations sur les parents
            $table->string('prenom_papa')->nullable();
            $table->string('nom_papa')->nullable();
            $table->string('prenom_maman')->nullable();
            $table->string('nom_maman')->nullable();

            // Autres informations
            $table->enum('situation_matrimoniale', ['celibataire','marie','divorce','veuf'])->default('celibataire');
            $table->date('date_naissance')->nullable();

            // Authentification & rôle
            $table->string('mot_de_passe'); // 👈 au lieu de password
            $table->enum('role', ['admin', 'pretre'])->default('pretre');

            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('utilisateurs');
    }
};
