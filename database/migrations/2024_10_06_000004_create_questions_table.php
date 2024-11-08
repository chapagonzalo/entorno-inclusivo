<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create("questions", function (Blueprint $table) {
            $table->id();
            $table->text("content");
            $table->text("context");
            $table
                ->foreignId("element_id")
                ->constrained("elements")
                ->onDelete("cascade");
            $table->json("answer_types")->nullable(); // Cambiado a nullable
            $table->timestamps();
        });

        DB::statement(
            "ALTER TABLE questions ALTER answer_types SET DEFAULT (JSON_ARRAY('text'))"
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists("questions");
        Schema::enableForeignKeyConstraints();
    }
};
