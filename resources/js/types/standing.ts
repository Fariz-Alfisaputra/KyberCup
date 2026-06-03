import type { TeamListItem } from './team';

export interface Standing {
    posisi: number;
    menang: number;
    kalah: number;
    draw: number;
    poin: number;
    team: Pick<TeamListItem, 'id' | 'nama_tim' | 'logo_url'>;
}
