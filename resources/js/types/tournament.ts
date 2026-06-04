import type { Game } from './game';
import type { User } from './user';

export type TournamentStatus = 'draft' | 'open' | 'ongoing' | 'selesai';
export type TournamentFormat =
    | 'single_elimination'
    | 'double_elimination'
    | 'round_robin';

export interface Tournament {
    id: number;
    nama: string;
    slug: string;
    game: Pick<Game, 'id' | 'nama_game' | 'logo_url' | 'genre'>;
    format: TournamentFormat;
    status: TournamentStatus;
    max_tim: number;
    hadiah: string | null;
    prize_pool: number;
    deskripsi: string | null;
    banner_url: string | null;
    registration_deadline: string | null;
    tanggal_mulai: string | null;
    tanggal_selesai: string | null;
    registrations_count: number;
    creator?: Pick<User, 'id' | 'name'>;
}

export interface TournamentListItem {
    id: number;
    nama: string;
    slug: string;
    format: TournamentFormat;
    status: TournamentStatus;
    max_tim: number;
    hadiah: string | null;
    prize_pool: number;
    banner_url: string | null;
    registration_deadline: string | null;
    tanggal_mulai: string | null;
    registrations_count: number;
    game: Pick<Game, 'id' | 'nama_game' | 'logo_url'>;
}
