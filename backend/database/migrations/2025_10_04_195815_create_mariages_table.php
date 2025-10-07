<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('mariages', function (Blueprint $table) {
            $table->id();

            // Informations des conjoints
            $table->string('conjoint1_nom');
            $table->string('conjoint1_prenom');
            $table->string('conjoint2_nom');
            $table->string('conjoint2_prenom');

            // Informations sur le mariage
            $table->date('date_mariage');
            $table->string('lieu_mariage')->nullable();

            // Référence au prêtre qui enregistre
            $table->foreignId('pretre_id')->constrained('utilisateurs')->onDelete('cascade');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('mariages');
    }
};
