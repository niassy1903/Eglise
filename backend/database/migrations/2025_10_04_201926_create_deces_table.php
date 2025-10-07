<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('deces', function (Blueprint $table) {
            $table->id();

            // Informations sur la personne décédée
            $table->string('nom');
            $table->string('prenom');
            $table->date('date_deces');
            $table->string('lieu_deces')->nullable();
            $table->string('cause_deces')->nullable();

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
        Schema::dropIfExists('deces');
    }
};
