# 🌌 KyberCup - Galactic Esport Tournament Platform

**KyberCup** adalah sistem manajemen turnamen esport lengkap bertema fiksi ilmiah luar angkasa (*Star Wars*) yang dibangun menggunakan teknologi modern. Aplikasi ini mendukung pembuatan tim, pendaftaran peserta, *automatic bracket generation*, pengelolaan skor pertandingan secara real-time, serta visualisasi bagan pertandingan (*bracket tree*).

Aplikasi web ini menghadirkan estetika premium dengan transisi interaktif antara **Light Side (Jedi Theme)** dan **Dark Side (Sith Theme)**, lengkap dengan animasi partikel canvas dan sintesis efek suara lightsaber secara real-time.

---

## 🚀 Fitur Utama

- **Role-Based Access Control (RBAC)**: Pembagian hak akses dinamis untuk 3 peran utama:
  - 👑 **Admin**: Mengelola game, menyetujui pendaftaran, generate bagan turnamen, dan menginput hasil pertandingan.
  - ⚔️ **Captain**: Membuat tim baru, merekrut anggota via *Invite Code*, dan mendaftarkan tim ke turnamen yang tersedia.
  - 🛡️ **Member**: Bergabung ke tim menggunakan kode undangan dan melihat jadwal tanding.
- **Automatic Single-Elimination Bracket**: Generator bagan tanding otomatis dengan penempatan *byes* apabila jumlah tim ganjil.
- **Dynamic Brackets & Standings**: Tampilan visual bagan turnamen interaktif (*Bracket Tree*) dan tabel klasemen otomatis untuk turnamen berformat *Round Robin*.
- **Interactive Star Wars Aesthetics**:
  - 🌓 **Dua Tema**: Mode Cerah (*Jedi Blue/Green*) dan Mode Gelap (*Sith Red/Yellow*) dengan tombol switch 3D emblem Aliansi Rebel vs Kekaisaran Empire.
  - 🌌 **Starfield Background**: Canvas dinamis di latar belakang yang merespons koordinat pergerakan kursor mouse (*Hyperspace effect*).
  - ⚔️ **Lightsaber Clash Widget**: Animasi benturan pedang laser interaktif di bagian Hero dengan percikan partikel energi (*sparks*) dan sintesis audio dengung (*lightsaber humming/clashing*) real-time melalui *Web Audio API*.
  - 💎 **Force Hover Cards**: Efek kemiringan 3D (*Parallax*) pada kartu turnamen saat disorot kursor mouse.

---

## 🛠️ Tech Stack

- **Backend**: Laravel 13 (PHP 8.3+)
- **Frontend**: React 19 + TypeScript
- **State & Routing**: Inertia.js v3 (Single Page Application)
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Database**: MySQL / SQLite (untuk development)
