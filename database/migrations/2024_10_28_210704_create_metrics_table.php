<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create("metrics", function (Blueprint $table) {
            $table->id();
            $table->foreignId("element_id")->constrained()->onDelete("cascade");
            $table->string("name");
            $table->text("description");
            $table->decimal("weight", 5, 2); // Peso/ponderación de 0 a 100
            $table->timestamps();
        });

        Schema::create("metric_question", function (Blueprint $table) {
            $table->id();
            $table->foreignId("metric_id")->constrained()->onDelete("cascade");
            $table
                ->foreignId("question_id")
                ->constrained()
                ->onDelete("cascade");
            $table->decimal("question_weight", 5, 2); // Peso específico de la pregunta en la métrica
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("metric_question");
        Schema::dropIfExists("metrics");
    }
};
