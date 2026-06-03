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
        Schema::create('teams', function (Blueprint $table) {
            $table->id();
            $table->string('nama_tim');
            $table->string('slug')->unique();
            $table->string('logo')->nullable();
            $table->text('deskripsi')->nullable();
            $table->foreignId('captain_id')->constrained('users')->cascadeOnDelete();
            $table->string('invite_code', 6)->unique()->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teams');
    }
};
