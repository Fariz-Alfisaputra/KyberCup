import { Head, Link } from '@inertiajs/react';
import {
    Calendar,
    ChevronRight,
    Clock,
    Shield,
    Swords,
    Trophy,
    Users,
} from 'lucide-react';
import AppLayout from '@/layouts/AppLayout';

interface MyTeam {
    id: number;
    nama_tim: string;
    slug: string;
    logo_url: string | null;
    members_count: number;
    role: string;
}

interface UpcomingMatch {
    id: number;
    round: number;
    status: string;
    jadwal: string | null;
    tournament: { id: number; nama: string; slug: string };
    team1: { id: number; nama_tim: string };
    team2: { id: number; nama_tim: string };
}

interface TeamRegistration {
    id: number;
    status: string;
    team: { id: number; nama_tim: string };
    tournament: { id: number; nama: string; slug: string };
}

interface DashboardProps {
    myTeams: MyTeam[];
    upcomingMatches: UpcomingMatch[];
    teamRegistrations: TeamRegistration[];
}

const statusConfig = {
    pending: {
        label: 'Pending',
        style: {
            background: 'var(--status-ongoing-bg)',
            color: 'var(--status-ongoing-text)',
            border: '1px solid rgba(245, 158, 11, 0.25)',
        },
    },
    approved: {
        label: 'Approved',
        style: {
            background: 'var(--status-open-bg)',
            color: 'var(--status-open-text)',
            border: '1px solid var(--border-accent)',
        },
    },
    rejected: {
        label: 'Rejected',
        style: {
            background: 'var(--status-cancel-bg)',
            color: 'var(--status-cancel-text)',
            border: '1px solid rgba(239, 68, 68, 0.25)',
        },
    },
};

const cardStyle: React.CSSProperties = {
    background: 'var(--bg-surface)',
    border: '1px solid var(--border-default)',
    borderRadius: '0.75rem',
    boxShadow: 'var(--shadow-card)',
};

export default function Dashboard({
    myTeams,
    upcomingMatches,
    teamRegistrations,
}: DashboardProps) {
    return (
        <AppLayout title="Dashboard">
            <Head title="Dashboard - KyberCup" />

            <div className="space-y-8">
                {/* ── Upcoming Matches ── */}
                <section>
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <div
                                className="accent-bar h-5 w-1"
                            />
                            <h2
                                className="text-base font-semibold"
                                style={{ color: 'var(--text-primary)' }}
                            >
                                Jadwal Pertandingan
                            </h2>
                        </div>
                    </div>

                    {upcomingMatches.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {upcomingMatches.map((match) => (
                                <div
                                    key={match.id}
                                    className="relative overflow-hidden rounded-xl p-5 transition-all duration-200"
                                    style={cardStyle}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--border-accent)';
                                        e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--border-default)';
                                        e.currentTarget.style.boxShadow = 'var(--shadow-card)';
                                    }}
                                >
                                    {/* Decorative icon */}
                                    <div
                                        className="absolute -top-5 -right-5 opacity-5"
                                        style={{ color: 'var(--accent-primary)' }}
                                    >
                                        <Swords className="h-20 w-20" />
                                    </div>

                                    <div className="relative">
                                        <div className="mb-4 flex items-center justify-between text-xs">
                                            <span
                                                className="font-semibold"
                                                style={{ color: 'var(--accent-primary)' }}
                                            >
                                                {match.tournament.nama}
                                            </span>
                                            <span
                                                className="rounded px-2 py-0.5"
                                                style={{
                                                    background: 'var(--accent-primary-light)',
                                                    color: 'var(--accent-primary)',
                                                    border: '1px solid var(--border-accent)',
                                                }}
                                            >
                                                Round {match.round}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div
                                                className="flex-1 truncate font-semibold"
                                                style={{
                                                    color: 'var(--text-primary)',
                                                    fontSize: '0.9rem',
                                                }}
                                            >
                                                {match.team1.nama_tim}
                                            </div>
                                            <div
                                                className="px-3 text-xs font-extrabold"
                                                style={{ color: 'var(--text-muted)' }}
                                            >
                                                VS
                                            </div>
                                            <div
                                                className="flex-1 truncate text-right font-semibold"
                                                style={{
                                                    color: 'var(--text-primary)',
                                                    fontSize: '0.9rem',
                                                }}
                                            >
                                                {match.team2.nama_tim}
                                            </div>
                                        </div>

                                        <div
                                            className="mt-4 flex items-center gap-2 text-xs"
                                            style={{ color: 'var(--text-muted)' }}
                                        >
                                            <Clock
                                                className="h-3.5 w-3.5"
                                                style={{ color: 'var(--accent-primary)' }}
                                            />
                                            {match.jadwal
                                                ? new Date(match.jadwal).toLocaleString('id-ID')
                                                : 'Jadwal belum ditentukan'}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div
                            className="flex flex-col items-center justify-center rounded-xl py-12 text-center"
                            style={{
                                border: '1px dashed var(--border-default)',
                                background: 'var(--bg-surface)',
                            }}
                        >
                            <Calendar
                                className="mb-3 h-9 w-9"
                                style={{ color: 'var(--text-muted)' }}
                            />
                            <p
                                className="text-sm"
                                style={{ color: 'var(--text-muted)' }}
                            >
                                Tidak ada jadwal pertandingan dalam waktu dekat.
                            </p>
                        </div>
                    )}
                </section>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* ── My Teams ── */}
                    <section>
                        <div className="mb-4 flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <div className="accent-bar h-5 w-1" />
                                <h2
                                    className="text-base font-semibold"
                                    style={{ color: 'var(--text-primary)' }}
                                >
                                    Tim Saya
                                </h2>
                            </div>
                            <Link
                                href="/teams/create"
                                className="text-sm font-medium transition-colors duration-200"
                                style={{ color: 'var(--accent-primary)' }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = 'var(--accent-primary-hover)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = 'var(--accent-primary)';
                                }}
                            >
                                + Buat Tim Baru
                            </Link>
                        </div>

                        <div className="space-y-2">
                            {myTeams.length > 0 ? (
                                myTeams.map((team) => (
                                    <Link
                                        key={team.id}
                                        href={`/teams/${team.slug}`}
                                        className="group flex items-center justify-between rounded-xl p-4 transition-all duration-200"
                                        style={cardStyle}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = 'var(--border-accent)';
                                            e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = 'var(--border-default)';
                                            e.currentTarget.style.boxShadow = 'var(--shadow-card)';
                                        }}
                                    >
                                        <div className="flex items-center gap-3">
                                            {team.logo_url ? (
                                                <img
                                                    loading="lazy"
                                                    src={team.logo_url}
                                                    alt={team.nama_tim}
                                                    className="h-11 w-11 rounded-lg object-cover"
                                                    style={{
                                                        border: '1px solid var(--border-default)',
                                                    }}
                                                />
                                            ) : (
                                                <div
                                                    className="flex h-11 w-11 items-center justify-center rounded-lg"
                                                    style={{
                                                        background: 'var(--accent-primary-light)',
                                                        border: '1px solid var(--border-default)',
                                                    }}
                                                >
                                                    <Shield
                                                        className="h-5 w-5"
                                                        style={{ color: 'var(--accent-primary)' }}
                                                    />
                                                </div>
                                            )}
                                            <div>
                                                <h3
                                                    className="font-semibold"
                                                    style={{
                                                        color: 'var(--text-primary)',
                                                        fontSize: '0.9rem',
                                                    }}
                                                >
                                                    {team.nama_tim}
                                                </h3>
                                                <div
                                                    className="mt-0.5 flex items-center gap-3 text-xs"
                                                    style={{ color: 'var(--text-muted)' }}
                                                >
                                                    <span className="flex items-center gap-1">
                                                        <Users className="h-3 w-3" />
                                                        {team.members_count} Anggota
                                                    </span>
                                                    <span className="flex items-center gap-1 capitalize">
                                                        <div
                                                            className="h-1.5 w-1.5 rounded-full"
                                                            style={{
                                                                background:
                                                                    team.role === 'captain'
                                                                        ? 'var(--accent-gold)'
                                                                        : 'var(--accent-primary)',
                                                            }}
                                                        />
                                                        {team.role}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <ChevronRight
                                            className="h-4 w-4 transition-transform group-hover:translate-x-1"
                                            style={{ color: 'var(--text-muted)' }}
                                        />
                                    </Link>
                                ))
                            ) : (
                                <div
                                    className="flex flex-col items-center justify-center rounded-xl py-10 text-center"
                                    style={{
                                        border: '1px dashed var(--border-default)',
                                        background: 'var(--bg-surface)',
                                    }}
                                >
                                    <Shield
                                        className="mb-3 h-8 w-8"
                                        style={{ color: 'var(--text-muted)' }}
                                    />
                                    <p
                                        className="text-sm"
                                        style={{ color: 'var(--text-muted)' }}
                                    >
                                        Kamu belum bergabung dengan tim manapun.
                                    </p>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* ── Tournament Registrations ── */}
                    <section>
                        <div className="mb-4 flex items-center">
                            <div className="flex items-center gap-2.5">
                                <div
                                    className="h-5 w-1 rounded-sm"
                                    style={{ background: 'var(--accent-gold)' }}
                                />
                                <h2
                                    className="text-base font-semibold"
                                    style={{ color: 'var(--text-primary)' }}
                                >
                                    Status Pendaftaran
                                </h2>
                            </div>
                        </div>

                        <div className="space-y-2">
                            {teamRegistrations.length > 0 ? (
                                teamRegistrations.map((reg) => {
                                    const statusInfo =
                                        statusConfig[
                                            reg.status as keyof typeof statusConfig
                                        ];

                                    return (
                                        <div
                                            key={reg.id}
                                            className="flex items-center justify-between rounded-xl p-4"
                                            style={cardStyle}
                                        >
                                            <div>
                                                <Link
                                                    href={`/tournaments/${reg.tournament.slug}`}
                                                    className="font-semibold transition-colors duration-200"
                                                    style={{
                                                        color: 'var(--text-primary)',
                                                        fontSize: '0.9rem',
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.color = 'var(--accent-primary)';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.color = 'var(--text-primary)';
                                                    }}
                                                >
                                                    {reg.tournament.nama}
                                                </Link>
                                                <p
                                                    className="mt-0.5 text-xs"
                                                    style={{ color: 'var(--text-muted)' }}
                                                >
                                                    Tim: {reg.team.nama_tim}
                                                </p>
                                            </div>
                                            {statusInfo && (
                                                <span
                                                    className="rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase"
                                                    style={{
                                                        ...statusInfo.style,
                                                        letterSpacing: '0.04em',
                                                        fontSize: '0.7rem',
                                                    }}
                                                >
                                                    {statusInfo.label}
                                                </span>
                                            )}
                                        </div>
                                    );
                                })
                            ) : (
                                <div
                                    className="flex flex-col items-center justify-center rounded-xl py-10 text-center"
                                    style={{
                                        border: '1px dashed var(--border-default)',
                                        background: 'var(--bg-surface)',
                                    }}
                                >
                                    <Trophy
                                        className="mb-3 h-8 w-8"
                                        style={{ color: 'var(--accent-gold)' }}
                                    />
                                    <p
                                        className="text-sm"
                                        style={{ color: 'var(--text-muted)' }}
                                    >
                                        Belum ada pendaftaran turnamen aktif.
                                    </p>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}
