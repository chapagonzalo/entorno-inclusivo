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
        Schema::create("reports", function (Blueprint $table) {
            $table->id();
            $table
                ->foreignId("assessment_id")
                ->constrained()
                ->onDelete("cascade");
            $table->decimal("final_score", 5, 2);
            $table->string("accessibility_level");
            $table->json("metrics_scores");
            $table->json("recommendations");
            $table->json("main_findings");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("reports");
    }
};
