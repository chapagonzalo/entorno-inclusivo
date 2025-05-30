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
        Schema::create("element_instances", function (Blueprint $table) {
            $table->id();
            $table
                ->foreignId("location_id")
                ->constrained("locations")
                ->onDelete("cascade");
            $table
                ->foreignId("element_id")
                ->constrained("elements")
                ->onDelete("cascade");
            $table->string("description")->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists("element_instances");
    }
};
