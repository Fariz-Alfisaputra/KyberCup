<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Admin
        User::create([
            'name' => 'Administrator',
            'username' => 'admin',
            'email' => 'admin@esport.id',
            'password' => bcrypt('password'),
            'role' => UserRole::Admin,
            'bio' => 'Administrator Platform EsportHub',
        ]);

        // Captains
        User::create([
            'name' => 'Budi Santoso',
            'username' => 'budi_cap',
            'email' => 'budi@esport.id',
            'password' => bcrypt('password'),
            'role' => UserRole::Captain,
            'bio' => 'Captain Tim Alpha Force',
        ]);

        User::create([
            'name' => 'Siti Rahayu',
            'username' => 'siti_cap',
            'email' => 'siti@esport.id',
            'password' => bcrypt('password'),
            'role' => UserRole::Captain,
            'bio' => 'Captain Tim Dragon Squad',
        ]);

        User::create([
            'name' => 'Ahmad Rizki',
            'username' => 'rizki_cap',
            'email' => 'rizki@esport.id',
            'password' => bcrypt('password'),
            'role' => UserRole::Captain,
            'bio' => 'Captain Tim Phoenix',
        ]);

        User::create([
            'name' => 'Dewi Kurnia',
            'username' => 'dewi_cap',
            'email' => 'dewi@esport.id',
            'password' => bcrypt('password'),
            'role' => UserRole::Captain,
            'bio' => 'Captain Tim Storm',
        ]);

        // Members
        $memberNames = [
            ['Fajar Nugroho', 'fajar_m', 'fajar@esport.id'],
            ['Rini Putri', 'rini_m', 'rini@esport.id'],
            ['Dani Hermawan', 'dani_m', 'dani@esport.id'],
            ['Lina Susanti', 'lina_m', 'lina@esport.id'],
            ['Hendra Wijaya', 'hendra_m', 'hendra@esport.id'],
        ];

        foreach ($memberNames as [$name, $username, $email]) {
            User::create([
                'name' => $name,
                'username' => $username,
                'email' => $email,
                'password' => bcrypt('password'),
                'role' => UserRole::Member,
            ]);
        }
    }
}
