import type { TeamListItem } from './team';

export type MatchStatus = 'scheduled' | 'ongoing' | 'selesai' | 'walkover';

export interface TournamentMatch {
    id: number;
    round: number;
    bracket_position: number;
    status: MatchStatus;
    skor_team1: number;
    skor_team2: number;
    jadwal: string | null;
    catatan: string | null;
    team1: Pick<TeamListItem, 'id' | 'nama_tim' | 'logo_url'> | null;
    team2: Pick<TeamListItem, 'id' | 'nama_tim' | 'logo_url'> | null;
    winner: Pick<TeamListItem, 'id' | 'nama_tim'> | null;
    tournament?: { id: number; nama: string; slug: string };
}

export interface BracketRound {
    [round: number]: TournamentMatch[];
}
