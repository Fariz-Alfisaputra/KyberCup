export interface Game {
    id: number;
    nama_game: string;
    genre: string;
    logo: string | null;
    logo_url: string | null;
    deskripsi: string | null;
    is_active: boolean;
    tournaments_count?: number;
}
