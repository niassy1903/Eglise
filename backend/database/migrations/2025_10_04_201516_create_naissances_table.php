<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('naissances', function (Blueprint $table) {
            $table->id();

            // Informations sur l'enfant
            $table->string('enfant_nom');
            $table->string('enfant_prenom');
            $table->date('date_naissance');
            $table->string('lieu_naissance')->nullable();

            // Informations sur les parents
            $table->string('pere_nom')->nullable();
            $table->string('pere_prenom')->nullable();
            $table->string('mere_nom')->nullable();
            $table->string('mere_prenom')->nullable();

            // Référence au prêtre qui enregistre
            $table->foreignId('pretre_id')->constrained('utilisateurs')->onDelete('cascade');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('naissances');
    }
};
