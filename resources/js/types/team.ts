import type { User } from './user';

export type TeamMemberRole = 'captain' | 'member';

export interface TeamMember extends Pick<
    User,
    'id' | 'name' | 'username' | 'avatar_url'
> {
    role: TeamMemberRole;
    joined_at?: string;
}

export interface Team {
    id: number;
    nama_tim: string;
    slug: string;
    logo: string | null;
    logo_url: string | null;
    deskripsi: string | null;
    is_active: boolean;
    invite_code?: string;
    members_count?: number;
    captain: Pick<User, 'id' | 'name' | 'avatar_url'>;
    members?: TeamMember[];
}

export interface TeamListItem {
    id: number;
    nama_tim: string;
    slug: string;
    logo_url: string | null;
    deskripsi: string | null;
    members_count: number;
    captain: Pick<User, 'id' | 'name'>;
}
