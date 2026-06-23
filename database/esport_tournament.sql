-- KyberCup Database Dump
-- Generated on 2026-06-23 14:32:55

SET FOREIGN_KEY_CHECKS=0;

-- --------------------------------------------------------
-- Table structure for table `cache`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `cache`;
CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` bigint(20) NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dump data for table `cache`
INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('esport-tournament-cache-a2c398955f047cc4cf56f40fd43820d6', 'i:1;', '1780474194'),
('esport-tournament-cache-a2c398955f047cc4cf56f40fd43820d6:timer', 'i:1780474194;', '1780474194'),
('kybercup-cache-131bc48a4169c62bc2f3f65187f23f3a', 'i:2;', '1780546650'),
('kybercup-cache-131bc48a4169c62bc2f3f65187f23f3a:timer', 'i:1780546650;', '1780546650'),
('kybercup-cache-3c790ca5e737c42b2900a3fb432c2677', 'i:1;', '1780550576'),
('kybercup-cache-3c790ca5e737c42b2900a3fb432c2677:timer', 'i:1780550576;', '1780550576'),
('kybercup-cache-a2c398955f047cc4cf56f40fd43820d6', 'i:1;', '1780549812'),
('kybercup-cache-a2c398955f047cc4cf56f40fd43820d6:timer', 'i:1780549812;', '1780549812'),
('kybercup-cache-b12c2b03b2c2195c8b25525148ab526e', 'i:1;', '1780550653'),
('kybercup-cache-b12c2b03b2c2195c8b25525148ab526e:timer', 'i:1780550653;', '1780550653'),
('kybercup-cache-eb2f75815c59a03124a3d3961b75ae0d', 'i:1;', '1780550421'),
('kybercup-cache-eb2f75815c59a03124a3d3961b75ae0d:timer', 'i:1780550421;', '1780550421');

-- --------------------------------------------------------
-- Table structure for table `cache_locks`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `cache_locks`;
CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` bigint(20) NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_locks_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dump data for table `cache_locks`
-- (No rows)

-- --------------------------------------------------------
-- Table structure for table `failed_jobs`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `connection` varchar(255) NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`),
  KEY `failed_jobs_connection_queue_failed_at_index` (`connection`,`queue`,`failed_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dump data for table `failed_jobs`
-- (No rows)

-- --------------------------------------------------------
-- Table structure for table `games`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `games`;
CREATE TABLE `games` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nama_game` varchar(255) NOT NULL,
  `genre` varchar(255) NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `deskripsi` text DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dump data for table `games`
INSERT INTO `games` (`id`, `nama_game`, `genre`, `logo`, `deskripsi`, `is_active`, `created_at`, `updated_at`) VALUES
('1', 'Mobile Legends: Bang Bang', 'MOBA', 'games/logos/lFCtxhj72NI6UJ9qlviHRTx6gx1kGmipjArMGFdz.png', 'Game MOBA paling populer di Asia Tenggara dengan lebih dari 100 juta pemain aktif.', '1', '2026-06-03 07:58:36', '2026-06-04 12:20:44'),
('2', 'VALORANT', 'Tactical Shooter', NULL, 'Game tactical shooter 5v5 dari Riot Games yang menggabungkan kemampuan unik agen.', '1', '2026-06-03 07:58:36', '2026-06-03 07:58:36'),
('3', 'PUBG Mobile', 'Battle Royale', NULL, 'Battle royale survival game dengan gameplay realistis untuk mobile.', '1', '2026-06-03 07:58:36', '2026-06-03 07:58:36'),
('4', 'Free Fire', 'Battle Royale', NULL, 'Battle royale game yang dirancang khusus untuk smartphone dengan gameplay cepat.', '1', '2026-06-03 07:58:36', '2026-06-03 07:58:36');

-- --------------------------------------------------------
-- Table structure for table `job_batches`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `job_batches`;
CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dump data for table `job_batches`
-- (No rows)

-- --------------------------------------------------------
-- Table structure for table `jobs`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `jobs`;
CREATE TABLE `jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` smallint(5) unsigned NOT NULL,
  `reserved_at` int(10) unsigned DEFAULT NULL,
  `available_at` int(10) unsigned NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dump data for table `jobs`
-- (No rows)

-- --------------------------------------------------------
-- Table structure for table `matches`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `matches`;
CREATE TABLE `matches` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tournament_id` bigint(20) unsigned NOT NULL,
  `team1_id` bigint(20) unsigned NOT NULL,
  `team2_id` bigint(20) unsigned NOT NULL,
  `winner_id` bigint(20) unsigned DEFAULT NULL,
  `skor_team1` int(11) NOT NULL DEFAULT 0,
  `skor_team2` int(11) NOT NULL DEFAULT 0,
  `round` int(11) NOT NULL DEFAULT 1,
  `bracket_position` int(11) NOT NULL DEFAULT 1,
  `status` enum('scheduled','ongoing','selesai','walkover') NOT NULL DEFAULT 'scheduled',
  `jadwal` datetime DEFAULT NULL,
  `catatan` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `matches_tournament_id_foreign` (`tournament_id`),
  KEY `matches_team1_id_foreign` (`team1_id`),
  KEY `matches_team2_id_foreign` (`team2_id`),
  KEY `matches_winner_id_foreign` (`winner_id`),
  CONSTRAINT `matches_team1_id_foreign` FOREIGN KEY (`team1_id`) REFERENCES `teams` (`id`) ON DELETE CASCADE,
  CONSTRAINT `matches_team2_id_foreign` FOREIGN KEY (`team2_id`) REFERENCES `teams` (`id`) ON DELETE CASCADE,
  CONSTRAINT `matches_tournament_id_foreign` FOREIGN KEY (`tournament_id`) REFERENCES `tournaments` (`id`) ON DELETE CASCADE,
  CONSTRAINT `matches_winner_id_foreign` FOREIGN KEY (`winner_id`) REFERENCES `teams` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dump data for table `matches`
INSERT INTO `matches` (`id`, `tournament_id`, `team1_id`, `team2_id`, `winner_id`, `skor_team1`, `skor_team2`, `round`, `bracket_position`, `status`, `jadwal`, `catatan`, `created_at`, `updated_at`) VALUES
('10', '1', '3', '1', '3', '2', '1', '1', '1', 'selesai', NULL, NULL, '2026-06-04 13:25:42', '2026-06-04 13:26:02'),
('11', '1', '2', '2', '2', '0', '0', '1', '2', 'walkover', NULL, NULL, '2026-06-04 13:25:42', '2026-06-04 13:25:42'),
('12', '1', '3', '2', NULL, '0', '0', '2', '1', 'scheduled', NULL, NULL, '2026-06-04 13:26:02', '2026-06-04 13:26:02');

-- --------------------------------------------------------
-- Table structure for table `migrations`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dump data for table `migrations`
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
('1', '0001_01_01_000000_create_users_table', '1'),
('2', '0001_01_01_000001_create_cache_table', '1'),
('3', '0001_01_01_000002_create_jobs_table', '1'),
('4', '2024_01_01_000000_create_passkeys_table', '1'),
('5', '2025_08_14_170933_add_two_factor_columns_to_users_table', '1'),
('6', '2026_06_03_073750_add_fields_to_users_table', '1'),
('7', '2026_06_03_073808_create_games_table', '1'),
('8', '2026_06_03_073808_create_teams_table', '1'),
('9', '2026_06_03_073808_create_tournaments_table', '1'),
('10', '2026_06_03_073809_create_matches_table', '1'),
('11', '2026_06_03_073809_create_standings_table', '1'),
('12', '2026_06_03_073809_create_team_members_table', '1'),
('13', '2026_06_03_073809_create_tournament_registrations_table', '1');

-- --------------------------------------------------------
-- Table structure for table `passkeys`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `passkeys`;
CREATE TABLE `passkeys` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `credential_id` varchar(255) NOT NULL,
  `credential` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`credential`)),
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `passkeys_credential_id_unique` (`credential_id`),
  KEY `passkeys_user_id_index` (`user_id`),
  CONSTRAINT `passkeys_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dump data for table `passkeys`
-- (No rows)

-- --------------------------------------------------------
-- Table structure for table `password_reset_tokens`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `password_reset_tokens`;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dump data for table `password_reset_tokens`
-- (No rows)

-- --------------------------------------------------------
-- Table structure for table `sessions`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dump data for table `sessions`
INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('1E3WxnDviNSdOZzMuHA9TdR9hUMKMgQqQdLrmnAV', NULL, '127.0.0.1', 'curl/8.7.1', 'eyJfdG9rZW4iOiJOeHQ5azJ0d1Zsdm42eDFCVVdLRTBqRFZiSWpWamp4U3EyR3MyRkRUIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cLzEyNy4wLjAuMTo4MDAwXC9sb2dpbiIsInJvdXRlIjoibG9naW4ifSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', '1780550278'),
('9KMgzk9VstrdyypyRz3wwX11mG4PTNrN1AbpYW2r', NULL, '127.0.0.1', 'Symfony', 'eyJfdG9rZW4iOiI5RmtMNDA3ck5FUnBjdkxJMTdzeDA1ZmVTOUFaQUhDeWdrUWlVTjZVIiwiZXJyb3IiOiJTZXNpIHRlbGFoIGJlcmFraGlyLiBTaWxha2FuIGNvYmEgbGFnaS4iLCJfZmxhc2giOnsibmV3IjpbXSwib2xkIjpbImVycm9yIl19fQ==', '1780549986'),
('9lnJoVvQYmtZ9hMgn0lucKHFHb7oTslK6O9i4YM5', NULL, '127.0.0.1', 'Symfony', 'eyJfdG9rZW4iOiIzU0Fjbnc2RzVtb0FoUVY3cEdDb1RQY1ZPakJSTEFYbW1MNzV4N1dIIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdFwvbGVhZGVyYm9hcmQiLCJyb3V0ZSI6ImxlYWRlcmJvYXJkIn0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', '1780549521'),
('9RDNMYrkvoHedPOv0YLm1wXq7pO4yRvXNcVxJvGm', NULL, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.5 Safari/605.1.15', 'eyJfdG9rZW4iOiJINmdmVlpibzBxdnBYVGFQYVlZZWdPWVVKN0g1eWhIdlhQY0VSRDZFIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cLzEyNy4wLjAuMTo4MDAwIiwicm91dGUiOiJob21lIn0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', '1782211347'),
('cDgOevzuEv7y7Bi1MTD6UUtkzsYYX6uJGdDD34mC', '1', '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.5 Safari/605.1.15', 'eyJfdG9rZW4iOiJMdzV6QWpKV21WcjY0VnRNVG5rcnozTmt0dGhobTFNNkdFVUJpUTVoIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cLzEyNy4wLjAuMTo4MDAwXC9hZG1pblwvdG91cm5hbWVudHMiLCJyb3V0ZSI6ImFkbWluLnRvdXJuYW1lbnRzLmluZGV4In0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfSwibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiOjF9', '1780554374'),
('DhjYN84C0vPURGYC7vfyfhYtFGt3YhXFnXYrdLzN', NULL, '127.0.0.1', 'curl/8.7.1', 'eyJfdG9rZW4iOiJLbzZDVU9vQkkwSlg5TzBLaE5PeTU2c1llSmUyM1FOWlk1blF3OFlmIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cLzEyNy4wLjAuMTo4MDAwXC9sb2dpbiIsInJvdXRlIjoibG9naW4ifSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', '1780550290'),
('GSFkptFqBHnJ0Pjgpm5zmFJkbk1nfRjGL5vmzJGL', NULL, '127.0.0.1', 'curl/8.7.1', 'eyJfdG9rZW4iOiJJN0xvZ3BTYVZiYk10eUJpSHFFWWxFb0k3QzYyeTJjaDlFR2V3cXlCIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cLzEyNy4wLjAuMTo4MDAwXC9sb2dpbiIsInJvdXRlIjoibG9naW4ifSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', '1780550287'),
('HD4nEFoFTa5g13rhmCzjMbRYv2pNuFvGM4u7TLU5', NULL, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.5 Safari/605.1.15', 'eyJfdG9rZW4iOiJRUDhINkdtQWZ4MXpZR0ZXSE50a2s2Y0ZVYks4OHZ6aGpvdTgwbGNTIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cLzEyNy4wLjAuMTo4MDAwIiwicm91dGUiOiJob21lIn0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', '1782118046'),
('hprDqbCGyawpEwmv6ekvP3eVdwsxMIBxcBEXz0gD', NULL, '127.0.0.1', 'Symfony', 'eyJfdG9rZW4iOiJpWFF3a3Y2RFlJTTdaUVNFbms0VWVMdU03STRvZWpKbEptNjhTODBHIiwiX2ZsYXNoIjp7Im5ldyI6W10sIm9sZCI6W119fQ==', '1780549508'),
('kOfgkSsRLVDupqzoesehw2y6LdRNcK5xkcbqX7fo', NULL, '127.0.0.1', 'curl/8.7.1', 'eyJfdG9rZW4iOiJtdHdKZ2ViS3JkSUt1bGx1dmJlMkVmdUExOHRaVkNzc0JvSlJCNjhMIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cLzEyNy4wLjAuMTo4MDAwXC9sb2dpbiIsInJvdXRlIjoibG9naW4ifSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', '1780550278'),
('naPyRuWoWg04z8uAyZnPZhYHEEkhnyeCk7FcfHNE', NULL, '127.0.0.1', 'Symfony', 'eyJfdG9rZW4iOiJyU2VKeXNjTDlXZzJ2cTJiNzZnSGVzNmFLM0tvNGRNMTBIS2o5RFRBIiwiX2ZsYXNoIjp7Im5ldyI6W10sIm9sZCI6W119LCJfcHJldmlvdXMiOnsidXJsIjoiaHR0cDpcL1wvbG9jYWxob3N0XC9sZWFkZXJib2FyZCIsInJvdXRlIjoibGVhZGVyYm9hcmQifX0=', '1780549490'),
('OHHSriFgEkX3aZhD8hywJeMYMZOiRfsPaRRsywPO', NULL, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiI1SzhydEVQMWpJRTE4c0ZMd2w1VndId0V3anEzZ3VtWUJDbm9USDBtIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cLzEyNy4wLjAuMTo4MDAwXC9sb2dpbiIsInJvdXRlIjoibG9naW4ifSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', '1780550169'),
('p1fXJDBOSUjUcTFbgz9HLgtrkioDHVjyamxlatqO', NULL, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJWT0FqYWxubUh0aTZNRUdjbGZhQ0xyVWVnWmVsMHU2NjB5MmVlU2FmIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cLzEyNy4wLjAuMTo4MDAwIiwicm91dGUiOiJob21lIn0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', '1780548638'),
('ujvnCqbRElPbJ4CaNMBt76e8wHPmJBXs7J7rfXP5', NULL, '127.0.0.1', 'curl/8.7.1', 'eyJfdG9rZW4iOiJIWlBZdDlRbmhiTTFwQ3VPZTB4ZmMxWnJyZ2pLZks0ME9EamQwUWlRIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cLzEyNy4wLjAuMTo4MDAwXC9sb2dpbiIsInJvdXRlIjoibG9naW4ifSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', '1780550292'),
('vmehW8JlSygmjd4N9M8l2rGzj3xm3kVtLDrc7Mht', NULL, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJoN1BXdE1PVFpYQTJpSnJzMnVKMWZ3cWFQcFZyR25aRHlKaTBYZG91IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cLzEyNy4wLjAuMTo4MDAwXC9sb2dpbiIsInJvdXRlIjoibG9naW4ifSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', '1780550190'),
('Z4NdJXeUQLohra2hXNQ7hxtadlbCZFHYlpO53yBr', NULL, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.5 Safari/605.1.15', 'eyJfdG9rZW4iOiJManhab2g4a2wzQXl0SWdFc3dsVGtvcndSbjZIbXdvR3ZzYmZLMW1aIiwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', '1780554446');

-- --------------------------------------------------------
-- Table structure for table `standings`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `standings`;
CREATE TABLE `standings` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tournament_id` bigint(20) unsigned NOT NULL,
  `team_id` bigint(20) unsigned NOT NULL,
  `menang` int(11) NOT NULL DEFAULT 0,
  `kalah` int(11) NOT NULL DEFAULT 0,
  `draw` int(11) NOT NULL DEFAULT 0,
  `poin` int(11) NOT NULL DEFAULT 0,
  `posisi` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `standings_tournament_id_team_id_unique` (`tournament_id`,`team_id`),
  KEY `standings_team_id_foreign` (`team_id`),
  CONSTRAINT `standings_team_id_foreign` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`) ON DELETE CASCADE,
  CONSTRAINT `standings_tournament_id_foreign` FOREIGN KEY (`tournament_id`) REFERENCES `tournaments` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dump data for table `standings`
INSERT INTO `standings` (`id`, `tournament_id`, `team_id`, `menang`, `kalah`, `draw`, `poin`, `posisi`, `created_at`, `updated_at`) VALUES
('13', '1', '3', '1', '0', '0', '3', '1', '2026-06-04 13:25:42', '2026-06-04 13:26:02'),
('14', '1', '1', '0', '1', '0', '0', '2', '2026-06-04 13:25:42', '2026-06-04 13:26:02'),
('15', '1', '2', '0', '0', '0', '0', '3', '2026-06-04 13:25:42', '2026-06-04 13:26:02');

-- --------------------------------------------------------
-- Table structure for table `team_members`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `team_members`;
CREATE TABLE `team_members` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `team_id` bigint(20) unsigned NOT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  `role` enum('captain','member') NOT NULL DEFAULT 'member',
  `joined_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `team_members_team_id_user_id_unique` (`team_id`,`user_id`),
  KEY `team_members_user_id_foreign` (`user_id`),
  CONSTRAINT `team_members_team_id_foreign` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`) ON DELETE CASCADE,
  CONSTRAINT `team_members_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dump data for table `team_members`
INSERT INTO `team_members` (`id`, `team_id`, `user_id`, `role`, `joined_at`, `created_at`, `updated_at`) VALUES
('1', '1', '2', 'captain', '2026-06-03 07:58:36', '2026-06-03 07:58:36', '2026-06-03 07:58:36'),
('2', '1', '6', 'member', '2026-06-03 07:58:36', '2026-06-03 07:58:36', '2026-06-03 07:58:36'),
('3', '2', '3', 'captain', '2026-06-03 07:58:36', '2026-06-03 07:58:36', '2026-06-03 07:58:36'),
('4', '2', '7', 'member', '2026-06-03 07:58:36', '2026-06-03 07:58:36', '2026-06-03 07:58:36'),
('5', '3', '4', 'captain', '2026-06-03 07:58:36', '2026-06-03 07:58:36', '2026-06-03 07:58:36'),
('6', '3', '8', 'member', '2026-06-03 07:58:36', '2026-06-03 07:58:36', '2026-06-03 07:58:36'),
('7', '4', '5', 'captain', '2026-06-03 07:58:36', '2026-06-03 07:58:36', '2026-06-03 07:58:36'),
('8', '4', '9', 'member', '2026-06-03 07:58:36', '2026-06-03 07:58:36', '2026-06-03 07:58:36'),
('9', '5', '6', 'captain', '2026-06-04 12:09:47', '2026-06-04 12:09:47', '2026-06-04 12:09:47');

-- --------------------------------------------------------
-- Table structure for table `teams`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `teams`;
CREATE TABLE `teams` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nama_tim` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `deskripsi` text DEFAULT NULL,
  `captain_id` bigint(20) unsigned NOT NULL,
  `invite_code` varchar(6) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `teams_slug_unique` (`slug`),
  UNIQUE KEY `teams_invite_code_unique` (`invite_code`),
  KEY `teams_captain_id_foreign` (`captain_id`),
  CONSTRAINT `teams_captain_id_foreign` FOREIGN KEY (`captain_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dump data for table `teams`
INSERT INTO `teams` (`id`, `nama_tim`, `slug`, `logo`, `deskripsi`, `captain_id`, `invite_code`, `is_active`, `created_at`, `updated_at`) VALUES
('1', 'Alpha Force', 'alpha-force-t8zg', NULL, 'Tim elit Mobile Legends dengan prestasi nasional.', '2', 'WHY1H7', '1', '2026-06-03 07:58:36', '2026-06-03 07:58:36'),
('2', 'Dragon Squad', 'dragon-squad-ekg2', NULL, 'Squad VALORANT dengan strategi taktis terbaik.', '3', 'BD91PW', '1', '2026-06-03 07:58:36', '2026-06-03 07:58:36'),
('3', 'Phoenix Rising', 'phoenix-rising-esog', NULL, 'Tim PUBG Mobile yang selalu bangkit dari kekalahan.', '4', 'MPSFIO', '1', '2026-06-03 07:58:36', '2026-06-03 07:58:36'),
('4', 'Storm Breakers', 'storm-breakers-qfzo', NULL, 'Tim Free Fire dengan playstyle agresif.', '5', 'GGS0YI', '1', '2026-06-03 07:58:36', '2026-06-03 07:58:36'),
('5', 'Kyver', 'kyver-asGD', 'teams/logos/FK3SDJskNKy8XWsJXzGeoSHk2XVJavWmMpG7ZmGd.png', 'tim ml', '6', 'SOAMO4', '1', '2026-06-04 12:09:47', '2026-06-04 12:09:47');

-- --------------------------------------------------------
-- Table structure for table `tournament_registrations`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `tournament_registrations`;
CREATE TABLE `tournament_registrations` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tournament_id` bigint(20) unsigned NOT NULL,
  `team_id` bigint(20) unsigned NOT NULL,
  `status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
  `catatan` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tournament_registrations_tournament_id_team_id_unique` (`tournament_id`,`team_id`),
  KEY `tournament_registrations_team_id_foreign` (`team_id`),
  CONSTRAINT `tournament_registrations_team_id_foreign` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tournament_registrations_tournament_id_foreign` FOREIGN KEY (`tournament_id`) REFERENCES `tournaments` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dump data for table `tournament_registrations`
INSERT INTO `tournament_registrations` (`id`, `tournament_id`, `team_id`, `status`, `catatan`, `created_at`, `updated_at`) VALUES
('1', '1', '1', 'approved', NULL, '2026-06-04 12:14:53', '2026-06-04 12:20:07'),
('2', '1', '2', 'approved', NULL, '2026-06-04 12:22:28', '2026-06-04 12:22:39'),
('3', '1', '3', 'approved', NULL, '2026-06-04 12:23:24', '2026-06-04 12:23:40'),
('4', '2', '3', 'pending', NULL, '2026-06-04 13:27:00', '2026-06-04 13:27:00');

-- --------------------------------------------------------
-- Table structure for table `tournaments`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `tournaments`;
CREATE TABLE `tournaments` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `game_id` bigint(20) unsigned NOT NULL,
  `format` enum('single_elimination','double_elimination','round_robin') NOT NULL DEFAULT 'single_elimination',
  `max_tim` int(11) NOT NULL DEFAULT 8,
  `hadiah` varchar(255) DEFAULT NULL,
  `prize_pool` decimal(15,2) NOT NULL DEFAULT 0.00,
  `deskripsi` text DEFAULT NULL,
  `banner` varchar(255) DEFAULT NULL,
  `status` enum('draft','open','ongoing','selesai') NOT NULL DEFAULT 'draft',
  `tanggal_mulai` date DEFAULT NULL,
  `tanggal_selesai` date DEFAULT NULL,
  `registration_deadline` datetime DEFAULT NULL,
  `created_by` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tournaments_slug_unique` (`slug`),
  KEY `tournaments_game_id_foreign` (`game_id`),
  KEY `tournaments_created_by_foreign` (`created_by`),
  CONSTRAINT `tournaments_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tournaments_game_id_foreign` FOREIGN KEY (`game_id`) REFERENCES `games` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dump data for table `tournaments`
INSERT INTO `tournaments` (`id`, `nama`, `slug`, `game_id`, `format`, `max_tim`, `hadiah`, `prize_pool`, `deskripsi`, `banner`, `status`, `tanggal_mulai`, `tanggal_selesai`, `registration_deadline`, `created_by`, `created_at`, `updated_at`) VALUES
('1', 'EsportHub ML Championship 2026', 'esporthub-ml-championship-2026-ikt6sk', '1', 'single_elimination', '8', 'Rp 5.000.000', '5000000.00', 'Kompetisi Mobile Legends bergengsi dengan format single elimination.\r\n\r\nSemua tim yang mendaftar harus memiliki minimal 5 anggota aktif. Pertandingan akan diadakan setiap akhir pekan.', NULL, 'ongoing', '2026-06-17', '2026-07-01', '2026-06-10 07:58:36', '1', '2026-06-03 07:58:36', '2026-06-04 13:25:42'),
('2', 'VALORANT Open Series S1', 'valorant-open-series-s1-9vfnzg', '2', 'double_elimination', '16', 'Rp 10.000.000', '10000000.00', 'Seri turnamen VALORANT terbuka pertama di platform EsportHub!\n\nFormat double elimination memberikan kesempatan kedua bagi tim yang kalah di round pertama.', NULL, 'open', '2026-06-24', '2026-07-15', '2026-06-13 07:58:36', '1', '2026-06-03 07:58:36', '2026-06-03 07:58:36'),
('3', 'PUBG Mobile Weekly Cup #4', 'pubg-mobile-weekly-cup-4-jr5kbp', '3', 'round_robin', '8', 'Rp 2.500.000', '2500000.00', 'Turnamen mingguan PUBG Mobile dengan format round robin. Semua tim bertemu satu kali.', NULL, 'ongoing', '2026-05-31', '2026-06-07', '2026-05-29 07:58:36', '1', '2026-06-03 07:58:36', '2026-06-03 07:58:36'),
('4', 'Free Fire Grand Finals 2025', 'free-fire-grand-finals-2025-fcn9rc', '4', 'single_elimination', '8', 'Rp 7.500.000', '7500000.00', 'Grand finals turnamen Free Fire musim 2025. Selamat kepada para pemenang!', NULL, 'selesai', '2026-05-04', '2026-05-18', '2026-04-29 07:58:36', '1', '2026-06-03 07:58:36', '2026-06-03 07:58:36');

-- --------------------------------------------------------
-- Table structure for table `users`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `role` enum('admin','captain','member') NOT NULL DEFAULT 'member',
  `avatar` varchar(255) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `two_factor_secret` text DEFAULT NULL,
  `two_factor_recovery_codes` text DEFAULT NULL,
  `two_factor_confirmed_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  UNIQUE KEY `users_username_unique` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dump data for table `users`
INSERT INTO `users` (`id`, `name`, `username`, `role`, `avatar`, `bio`, `email`, `email_verified_at`, `password`, `two_factor_secret`, `two_factor_recovery_codes`, `two_factor_confirmed_at`, `remember_token`, `created_at`, `updated_at`) VALUES
('1', 'Administrator', 'admin', 'admin', NULL, 'Administrator Platform EsportHub', 'admin@esport.id', NULL, '$2y$12$98ZOtTO6XE/wDsuRuE/4gOnepwqyLEuy/zn0n2vNkkASAXRe0t.4W', NULL, NULL, NULL, NULL, '2026-06-03 07:58:34', '2026-06-03 07:58:34'),
('2', 'Budi Santoso', 'budi_cap', 'captain', NULL, 'Captain Tim Alpha Force', 'budi@esport.id', NULL, '$2y$12$0vo/uZ5qM0d7NMnSodQNZ.QzEOt1LnZwpDLKScW33LlqsywiQQwVq', NULL, NULL, NULL, 'YUrZcrcxIDJOnFEUvx59wuVZsy6Gqo5irZ8CMqxj4DxaRVOmLxGpoACOamO4', '2026-06-03 07:58:34', '2026-06-03 07:58:34'),
('3', 'Siti Rahayu', 'siti_cap', 'captain', NULL, 'Captain Tim Dragon Squad', 'siti@esport.id', NULL, '$2y$12$MKxVe43QU.c2jRY6r.37Puz/uzVPXq984262fK8HdC4PX8IeM3s8S', NULL, NULL, NULL, NULL, '2026-06-03 07:58:34', '2026-06-03 07:58:34'),
('4', 'Ahmad Rizki', 'rizki_cap', 'captain', NULL, 'Captain Tim Phoenix', 'rizki@esport.id', NULL, '$2y$12$d4sGq/yRjLlha698iSA/subdg8qLrOzyw8TJ.dj.NBx6VdveaBobW', NULL, NULL, NULL, NULL, '2026-06-03 07:58:34', '2026-06-03 07:58:34'),
('5', 'Dewi Kurnia', 'dewi_cap', 'captain', NULL, 'Captain Tim Storm', 'dewi@esport.id', NULL, '$2y$12$2LIUYBpoREdi7zPVUR83a.ddolsQXhShR3WRroMZozDc2EKaRZzH6', NULL, NULL, NULL, NULL, '2026-06-03 07:58:35', '2026-06-03 07:58:35'),
('6', 'Fajar Nugroho', 'fajar_m', 'captain', NULL, NULL, 'fajar@esport.id', NULL, '$2y$12$RjyeZkr9OsjkyZ6NY3eF/OtSB1kDpqOZSLl3QILLLmJRbDVkXGmlW', NULL, NULL, NULL, NULL, '2026-06-03 07:58:35', '2026-06-04 12:09:47'),
('7', 'Rini Putri', 'rini_m', 'member', NULL, NULL, 'rini@esport.id', NULL, '$2y$12$wVLbf1DHn9VILYCqQVEaV..6LRHEgXponX7aPCBnEJWdlAS5GzlIi', NULL, NULL, NULL, NULL, '2026-06-03 07:58:35', '2026-06-03 07:58:35'),
('8', 'Dani Hermawan', 'dani_m', 'member', NULL, NULL, 'dani@esport.id', NULL, '$2y$12$Jw84Jzjc/e.Qc2shVt2tdOqwhJd08GJdFmTe9ETPfNMbKuIaMjOF2', NULL, NULL, NULL, NULL, '2026-06-03 07:58:35', '2026-06-03 07:58:35'),
('9', 'Lina Susanti', 'lina_m', 'member', NULL, NULL, 'lina@esport.id', NULL, '$2y$12$4mW6BMMcIMbELMT90kMc1eSJ8g9PxI5ptCrBREbupx2qPgpiYygxO', NULL, NULL, NULL, NULL, '2026-06-03 07:58:36', '2026-06-03 07:58:36'),
('10', 'Hendra Wijaya', 'hendra_m', 'member', NULL, NULL, 'hendra@esport.id', NULL, '$2y$12$r6qwF3Zu/GyCfo8iPGbTsOJ3X8qc4CG2s56qEU0KTKM.pE6bobEEK', NULL, NULL, NULL, NULL, '2026-06-03 07:58:36', '2026-06-03 07:58:36'),
('11', 'Fariz', NULL, 'member', NULL, NULL, 'fariz@gmail.com', NULL, '$2y$12$yTS5CWVdUhgnW.F6PVaIH.436FhoKLLhVBEPXjF4s9H4bGNuoyfs2', NULL, NULL, NULL, NULL, '2026-06-03 11:05:57', '2026-06-03 11:05:57');

SET FOREIGN_KEY_CHECKS=1;
