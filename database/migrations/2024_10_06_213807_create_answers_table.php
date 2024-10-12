<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('answers', function (Blueprint $table) {
            $table->id();
            $table->text('content');
            $table->foreignId('question_id')->constrained('questions')->onDelete('cascade');
            $table->foreignId('assessment_id')->constrained('assessments')->onDelete('cascade');

            // Columnas para almacenar distintos tipos de respuestas
            $table->text('answer_text')->nullable(); // Respuesta en formato texto
            $table->enum('answer_enum', ['Sí', 'No', 'Bueno', 'Regular', 'Malo'])->nullable(); // Respuesta en formato predefinido
            $table->decimal('answer_numeric', 10, 2)->nullable(); // Respuesta numérica
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('answers');
    }
};
