<?php

namespace Database\Seeders;

use App\Models\Game;
use Illuminate\Database\Seeder;

class GameSeeder extends Seeder
{
    public function run(): void
    {
        $games = [
            [
                'nama_game' => 'Mobile Legends: Bang Bang',
                'genre' => 'MOBA',
                'deskripsi' => 'Game MOBA paling populer di Asia Tenggara dengan lebih dari 100 juta pemain aktif.',
                'is_active' => true,
            ],
            [
                'nama_game' => 'VALORANT',
                'genre' => 'Tactical Shooter',
                'deskripsi' => 'Game tactical shooter 5v5 dari Riot Games yang menggabungkan kemampuan unik agen.',
                'is_active' => true,
            ],
            [
                'nama_game' => 'PUBG Mobile',
                'genre' => 'Battle Royale',
                'deskripsi' => 'Battle royale survival game dengan gameplay realistis untuk mobile.',
                'is_active' => true,
            ],
            [
                'nama_game' => 'Free Fire',
                'genre' => 'Battle Royale',
                'deskripsi' => 'Battle royale game yang dirancang khusus untuk smartphone dengan gameplay cepat.',
                'is_active' => true,
            ],
        ];

        foreach ($games as $game) {
            Game::create($game);
        }
    }
}
