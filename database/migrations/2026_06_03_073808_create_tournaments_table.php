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
        Schema::create('tournaments', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('slug')->unique();
            $table->foreignId('game_id')->constrained('games')->cascadeOnDelete();
            $table->enum('format', ['single_elimination', 'double_elimination', 'round_robin'])->default('single_elimination');
            $table->integer('max_tim')->default(8);
            $table->string('hadiah')->nullable();
            $table->decimal('prize_pool', 15, 2)->default(0);
            $table->text('deskripsi')->nullable();
            $table->string('banner')->nullable();
            $table->enum('status', ['draft', 'open', 'ongoing', 'selesai'])->default('draft');
            $table->date('tanggal_mulai')->nullable();
            $table->date('tanggal_selesai')->nullable();
            $table->dateTime('registration_deadline')->nullable();
            $table->foreignId('created_by')->constrained('users')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tournaments');
    }
};
