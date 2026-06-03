<?php

namespace Database\Seeders;

use App\Enums\TournamentFormat;
use App\Enums\TournamentStatus;
use App\Models\Game;
use App\Models\Tournament;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TournamentSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::where('role', 'admin')->first();
        $games = Game::all();

        $tournaments = [
            [
                'nama' => 'EsportHub ML Championship 2026',
                'game' => 'Mobile Legends: Bang Bang',
                'format' => TournamentFormat::SingleElimination,
                'status' => TournamentStatus::Open,
                'max_tim' => 8,
                'hadiah' => 'Rp 5.000.000',
                'prize_pool' => 5000000,
                'deskripsi' => "Kompetisi Mobile Legends bergengsi dengan format single elimination.\n\nSemua tim yang mendaftar harus memiliki minimal 5 anggota aktif. Pertandingan akan diadakan setiap akhir pekan.",
                'tanggal_mulai' => now()->addDays(14)->format('Y-m-d'),
                'tanggal_selesai' => now()->addDays(28)->format('Y-m-d'),
                'registration_deadline' => now()->addDays(7),
            ],
            [
                'nama' => 'VALORANT Open Series S1',
                'game' => 'VALORANT',
                'format' => TournamentFormat::DoubleElimination,
                'status' => TournamentStatus::Open,
                'max_tim' => 16,
                'hadiah' => 'Rp 10.000.000',
                'prize_pool' => 10000000,
                'deskripsi' => "Seri turnamen VALORANT terbuka pertama di platform EsportHub!\n\nFormat double elimination memberikan kesempatan kedua bagi tim yang kalah di round pertama.",
                'tanggal_mulai' => now()->addDays(21)->format('Y-m-d'),
                'tanggal_selesai' => now()->addDays(42)->format('Y-m-d'),
                'registration_deadline' => now()->addDays(10),
            ],
            [
                'nama' => 'PUBG Mobile Weekly Cup #4',
                'game' => 'PUBG Mobile',
                'format' => TournamentFormat::RoundRobin,
                'status' => TournamentStatus::Ongoing,
                'max_tim' => 8,
                'hadiah' => 'Rp 2.500.000',
                'prize_pool' => 2500000,
                'deskripsi' => 'Turnamen mingguan PUBG Mobile dengan format round robin. Semua tim bertemu satu kali.',
                'tanggal_mulai' => now()->subDays(3)->format('Y-m-d'),
                'tanggal_selesai' => now()->addDays(4)->format('Y-m-d'),
                'registration_deadline' => now()->subDays(5),
            ],
            [
                'nama' => 'Free Fire Grand Finals 2025',
                'game' => 'Free Fire',
                'format' => TournamentFormat::SingleElimination,
                'status' => TournamentStatus::Selesai,
                'max_tim' => 8,
                'hadiah' => 'Rp 7.500.000',
                'prize_pool' => 7500000,
                'deskripsi' => 'Grand finals turnamen Free Fire musim 2025. Selamat kepada para pemenang!',
                'tanggal_mulai' => now()->subDays(30)->format('Y-m-d'),
                'tanggal_selesai' => now()->subDays(16)->format('Y-m-d'),
                'registration_deadline' => now()->subDays(35),
            ],
        ];

        foreach ($tournaments as $data) {
            $game = $games->where('nama_game', $data['game'])->first();

            if (! $game) {
                continue;
            }

            Tournament::create([
                'nama' => $data['nama'],
                'slug' => Str::slug($data['nama']).'-'.strtolower(Str::random(6)),
                'game_id' => $game->id,
                'format' => $data['format'],
                'status' => $data['status'],
                'max_tim' => $data['max_tim'],
                'hadiah' => $data['hadiah'],
                'prize_pool' => $data['prize_pool'],
                'deskripsi' => $data['deskripsi'],
                'tanggal_mulai' => $data['tanggal_mulai'],
                'tanggal_selesai' => $data['tanggal_selesai'],
                'registration_deadline' => $data['registration_deadline'],
                'created_by' => $admin->id,
            ]);
        }
    }
}
