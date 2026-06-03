export type UserRole = 'admin' | 'captain' | 'member';

export interface User {
    id: number;
    name: string;
    username: string | null;
    email: string;
    role: UserRole;
    avatar: string | null;
    avatar_url: string | null;
    bio: string | null;
}

export interface AuthUser extends User {
    email_verified_at?: string | null;
}
