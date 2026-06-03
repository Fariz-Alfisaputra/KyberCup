<?php

namespace Database\Seeders;

use App\Enums\TeamMemberRole;
use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TeamSeeder extends Seeder
{
    public function run(): void
    {
        $captains = User::where('role', 'captain')->get();
        $members = User::where('role', 'member')->get();

        $teamData = [
            ['Alpha Force', 'Tim elit Mobile Legends dengan prestasi nasional.'],
            ['Dragon Squad', 'Squad VALORANT dengan strategi taktis terbaik.'],
            ['Phoenix Rising', 'Tim PUBG Mobile yang selalu bangkit dari kekalahan.'],
            ['Storm Breakers', 'Tim Free Fire dengan playstyle agresif.'],
        ];

        foreach ($teamData as $index => [$nama, $deskripsi]) {
            $captain = $captains->get($index);

            if (! $captain) {
                continue;
            }

            $team = Team::create([
                'nama_tim' => $nama,
                'slug' => Str::slug($nama).'-'.strtolower(Str::random(4)),
                'deskripsi' => $deskripsi,
                'captain_id' => $captain->id,
                'invite_code' => strtoupper(Str::random(6)),
                'is_active' => true,
            ]);

            // Add captain as member
            $team->members()->attach($captain->id, [
                'role' => TeamMemberRole::Captain->value,
                'joined_at' => now(),
            ]);

            // Add 1-2 regular members per team
            $teamMembers = $members->skip($index * 1)->take(1);
            foreach ($teamMembers as $member) {
                $team->members()->attach($member->id, [
                    'role' => TeamMemberRole::Member->value,
                    'joined_at' => now(),
                ]);
            }
        }
    }
}
