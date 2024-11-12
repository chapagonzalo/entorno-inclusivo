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
        Schema::create("answers", function (Blueprint $table) {
            $table->id();
            $table
                ->foreignId("assessment_id")
                ->constrained()
                ->onDelete("cascade");
            $table
                ->foreignId("question_id")
                ->constrained()
                ->onDelete("cascade");
            $table->text("content");
            $table->text("answer_text")->nullable();
            $table->string("answer_enum")->nullable();
            $table->decimal("answer_numeric", 10, 2)->nullable();
            $table->decimal("altura", 10, 2)->nullable();
            $table->decimal("longitud", 10, 2)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("answers");
    }
};
