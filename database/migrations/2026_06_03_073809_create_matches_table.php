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
        Schema::create('matches', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tournament_id')->constrained('tournaments')->cascadeOnDelete();
            $table->foreignId('team1_id')->constrained('teams')->cascadeOnDelete();
            $table->foreignId('team2_id')->constrained('teams')->cascadeOnDelete();
            $table->foreignId('winner_id')->nullable()->constrained('teams')->nullOnDelete();
            $table->integer('skor_team1')->default(0);
            $table->integer('skor_team2')->default(0);
            $table->integer('round')->default(1);
            $table->integer('bracket_position')->default(1);
            $table->enum('status', ['scheduled', 'ongoing', 'selesai', 'walkover'])->default('scheduled');
            $table->dateTime('jadwal')->nullable();
            $table->text('catatan')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('matches');
    }
};
