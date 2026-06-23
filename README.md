# 🏆 KyberCup - Modern Esports Tournament Platform

**KyberCup** adalah platform manajemen turnamen esports modern dan profesional yang dibangun dengan teknologi terbaru. Aplikasi ini mendukung pembuatan tim, pendaftaran peserta, *automatic bracket generation*, pengelolaan skor pertandingan secara real-time, serta visualisasi bagan pertandingan (*bracket tree*) yang bersih dan responsif.

Aplikasi ini menggunakan desain modern yang minimalis, intuitif, dan profesional (mengikuti estetika platform SaaS modern seperti Notion, Linear, atau Toornament) dengan dukungan mode gelap (*dark mode*) dan mode terang (*light mode*) yang elegan.

---

## 🚀 Fitur Utama

- **Role-Based Access Control (RBAC)**: Pembagian hak akses dinamis untuk 3 peran utama:
  - 👑 **Admin**: Mengelola game, menyetujui pendaftaran, generate bagan turnamen, dan menginput hasil pertandingan.
  - ⚔️ **Captain**: Membuat tim baru, merekrut anggota via *Invite Code*, dan mendaftarkan tim ke turnamen yang tersedia.
  - 🛡️ **Member**: Bergabung ke tim menggunakan kode undangan dan melihat jadwal tanding.
- **Automatic Single-Elimination Bracket**: Generator bagan tanding otomatis dengan penempatan *byes* apabila jumlah tim ganjil.
- **Dynamic Brackets & Standings**: Tampilan visual bagan turnamen interaktif (*Bracket Tree*) dan tabel klasemen otomatis untuk turnamen berformat *Round Robin*.
- **Premium SaaS Dashboard**: Antarmuka responsif dan modern dengan transisi mulus antara Light Mode dan Dark Mode.

---

## 🛠️ Tech Stack

- **Backend**: Laravel 13 (PHP 8.4)
- **Frontend**: React 19 + TypeScript
- **State & Routing**: Inertia.js v3 (Single Page Application)
- **Styling**: Tailwind CSS v4
- **Database**: MySQL / MariaDB

---

## ⚙️ Cara Menjalankan Project (Panduan Dosen / Penguji)

Untuk menjalankan project ini secara lokal, ikuti langkah-langkah di bawah ini:

### 1. Persiapan Awal
Pastikan Anda sudah menginstal:
- PHP >= 8.4
- Composer
- Node.js & npm
- MySQL / MariaDB (XAMPP / MAMP / Laragon)

### 2. Kloning Repository
```bash
git clone https://github.com/Fariz-Alfisaputra/KyberCup.git
cd KyberCup
```

### 3. Mengunduh Library / Dependency
Karena folder `vendor` dan `node_modules` tidak diunggah ke Git (sesuai standar pengembangan software profesional untuk menghindari ukuran file yang terlalu besar), unduh library menggunakan perintah berikut:

- **Instal library PHP (Composer):**
  ```bash
  composer install
  ```
- **Instal library Javascript (npm):**
  ```bash
  npm install
  ```

### 4. Konfigurasi Environment (`.env`)
Salin file `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```
Buka file `.env` dan sesuaikan kredensial database MySQL Anda:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=esport_tournament
DB_USERNAME=root
DB_PASSWORD=
```
Setelah itu, generate application key:
```bash
php artisan key:generate
```

### 5. Import Database (SQL Dump)
Kami telah menyediakan dump database di folder `database/esport_tournament.sql`.
1. Buat database kosong bernama `esport_tournament` di MySQL/phpMyAdmin Anda.
2. Import file `database/esport_tournament.sql` ke database tersebut.
   * *Alternatif:* Anda juga bisa menjalankan migrasi & seeder bawaan Laravel jika ingin memulai dengan database bersih:
     ```bash
     php artisan migrate --seed
     ```

### 6. Jalankan Aplikasi
Jalankan server backend Laravel dan server frontend Vite secara bersamaan:

- **Jalankan Laravel Backend:**
  ```bash
  php artisan serve
  ```
- **Jalankan Vite Frontend Compilation:**
  ```bash
  npm run dev
  ```

Buka browser Anda di `http://127.0.0.1:8000`.

---

## 🔑 Akun Uji Coba (Demo Accounts)

Anda dapat masuk menggunakan akun demo berikut:
- **Admin**: `admin@esport.id` (Password: `password`)
- **Captain**: `budi@esport.id` (Password: `password`)
- **Member**: `rini@esport.id` (Password: `password`)

