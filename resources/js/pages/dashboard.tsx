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
            border: '1px solid var(--border-default)',
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
            border: '1px solid var(--border-strong)',
        },
    },
};

const cardStyle: React.CSSProperties = {
    background: 'var(--bg-surface)',
    border: '1px solid var(--border-default)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    borderRadius: '0.75rem',
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
                        <div className="flex items-center gap-2">
                            <div
                                className="h-1 w-5 rounded-full"
                                style={{
                                    background: 'var(--accent-primary)',
                                    boxShadow:
                                        '0 0 6px var(--accent-primary-glow)',
                                }}
                            />
                            <h2
                                className="text-lg font-bold tracking-wider uppercase"
                                style={{
                                    fontFamily: 'Rajdhani, sans-serif',
                                    color: 'var(--text-primary)',
                                }}
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
                                    className="relative overflow-hidden rounded-xl p-5 transition-all duration-300"
                                    style={cardStyle}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor =
                                            'var(--border-accent)';
                                        e.currentTarget.style.boxShadow =
                                            '0 0 20px var(--accent-primary-glow)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor =
                                            'var(--border-default)';
                                        e.currentTarget.style.boxShadow =
                                            'none';
                                    }}
                                >
                                    {/* Decorative icon */}
                                    <div
                                        className="absolute -top-6 -right-6"
                                        style={{
                                            color: 'var(--accent-primary-glow)',
                                        }}
                                    >
                                        <Swords className="h-24 w-24" />
                                    </div>

                                    <div className="relative">
                                        <div className="mb-4 flex items-center justify-between text-xs">
                                            <span
                                                className="font-semibold"
                                                style={{
                                                    color: 'var(--accent-primary)',
                                                    fontFamily:
                                                        'Rajdhani, sans-serif',
                                                    letterSpacing: '0.04em',
                                                }}
                                            >
                                                {match.tournament.nama}
                                            </span>
                                            <span
                                                className="rounded px-2 py-0.5"
                                                style={{
                                                    background:
                                                        'var(--accent-primary-light)',
                                                    color: 'var(--accent-primary)',
                                                    border: '1px solid var(--border-accent)',
                                                    fontFamily:
                                                        'Rajdhani, sans-serif',
                                                }}
                                            >
                                                Round {match.round}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div
                                                className="flex-1 truncate font-bold"
                                                style={{
                                                    color: 'var(--text-primary)',
                                                    fontFamily:
                                                        'Rajdhani, sans-serif',
                                                    fontSize: '0.95rem',
                                                }}
                                            >
                                                {match.team1.nama_tim}
                                            </div>
                                            <div
                                                className="px-4 text-xs font-black"
                                                style={{
                                                    color: 'var(--status-cancel-text)',
                                                    fontFamily:
                                                        'Orbitron, sans-serif',
                                                    textShadow:
                                                        '0 0 6px var(--accent-primary-glow)',
                                                }}
                                            >
                                                VS
                                            </div>
                                            <div
                                                className="flex-1 truncate text-right font-bold"
                                                style={{
                                                    color: 'var(--text-primary)',
                                                    fontFamily:
                                                        'Rajdhani, sans-serif',
                                                    fontSize: '0.95rem',
                                                }}
                                            >
                                                {match.team2.nama_tim}
                                            </div>
                                        </div>

                                        <div
                                            className="mt-5 flex items-center gap-2 text-xs"
                                            style={{
                                                color: 'var(--text-muted)',
                                                fontFamily:
                                                    'Rajdhani, sans-serif',
                                            }}
                                        >
                                            <Clock
                                                className="h-3.5 w-3.5"
                                                style={{
                                                    color: 'var(--accent-primary)',
                                                }}
                                            />
                                            {match.jadwal
                                                ? new Date(
                                                      match.jadwal,
                                                  ).toLocaleString('id-ID')
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
                                background: 'var(--bg-surface-2)',
                            }}
                        >
                            <Calendar
                                className="mb-3 h-10 w-10"
                                style={{ color: 'var(--border-strong)' }}
                            />
                            <p
                                className="text-sm"
                                style={{
                                    color: 'var(--text-muted)',
                                    fontFamily: 'Rajdhani, sans-serif',
                                }}
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
                            <div className="flex items-center gap-2">
                                <div
                                    className="h-1 w-5 rounded-full"
                                    style={{
                                        background: 'var(--accent-primary)',
                                        boxShadow:
                                            '0 0 6px var(--accent-primary-glow)',
                                    }}
                                />
                                <h2
                                    className="text-lg font-bold tracking-wider uppercase"
                                    style={{
                                        fontFamily: 'Rajdhani, sans-serif',
                                        color: 'var(--text-primary)',
                                    }}
                                >
                                    Tim Saya
                                </h2>
                            </div>
                            <Link
                                href="/teams/create"
                                className="nav-link-sw text-sm font-medium transition-colors duration-200"
                                style={{ color: 'var(--accent-primary)' }}
                            >
                                + Buat Tim Baru
                            </Link>
                        </div>

                        <div className="space-y-3">
                            {myTeams.length > 0 ? (
                                myTeams.map((team) => (
                                    <Link
                                        key={team.id}
                                        href={`/teams/${team.slug}`}
                                        className="group flex items-center justify-between rounded-xl p-4 transition-all duration-300"
                                        style={cardStyle}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor =
                                                'var(--border-accent)';
                                            e.currentTarget.style.boxShadow =
                                                '0 0 16px var(--accent-primary-glow)';
                                            e.currentTarget.style.transform =
                                                'translateX(2px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor =
                                                'var(--border-default)';
                                            e.currentTarget.style.boxShadow =
                                                'none';
                                            e.currentTarget.style.transform =
                                                'translateX(0)';
                                        }}
                                    >
                                        <div className="flex items-center gap-4">
                                            {team.logo_url ? (
                                                <img
                                                    loading="lazy"
                                                    src={team.logo_url}
                                                    alt={team.nama_tim}
                                                    className="h-12 w-12 rounded-lg object-cover"
                                                    style={{
                                                        border: '1px solid var(--border-accent)',
                                                    }}
                                                />
                                            ) : (
                                                <div
                                                    className="flex h-12 w-12 items-center justify-center rounded-lg"
                                                    style={{
                                                        background:
                                                            'var(--accent-primary-light)',
                                                        border: '1px solid var(--border-default)',
                                                    }}
                                                >
                                                    <Shield
                                                        className="h-6 w-6"
                                                        style={{
                                                            color: 'var(--accent-primary)',
                                                        }}
                                                    />
                                                </div>
                                            )}
                                            <div>
                                                <h3
                                                    className="font-bold"
                                                    style={{
                                                        color: 'var(--text-primary)',
                                                        fontFamily:
                                                            'Rajdhani, sans-serif',
                                                        fontSize: '0.95rem',
                                                        letterSpacing: '0.03em',
                                                    }}
                                                >
                                                    {team.nama_tim}
                                                </h3>
                                                <div
                                                    className="mt-1 flex items-center gap-3 text-xs"
                                                    style={{
                                                        color: 'var(--text-muted)',
                                                        fontFamily:
                                                            'Rajdhani, sans-serif',
                                                    }}
                                                >
                                                    <span className="flex items-center gap-1">
                                                        <Users className="h-3.5 w-3.5" />
                                                        {team.members_count}{' '}
                                                        Anggota
                                                    </span>
                                                    <span className="flex items-center gap-1 capitalize">
                                                        <div
                                                            className="h-1.5 w-1.5 rounded-full"
                                                            style={{
                                                                background:
                                                                    team.role ===
                                                                    'captain'
                                                                        ? 'var(--accent-gold)'
                                                                        : 'var(--accent-primary)',
                                                                boxShadow:
                                                                    team.role ===
                                                                    'captain'
                                                                        ? '0 0 4px var(--accent-gold)'
                                                                        : '0 0 4px var(--accent-primary-glow)',
                                                            }}
                                                        />
                                                        {team.role}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <ChevronRight
                                            className="h-5 w-5 transition-transform group-hover:translate-x-1"
                                            style={{
                                                color: 'var(--border-strong)',
                                            }}
                                        />
                                    </Link>
                                ))
                            ) : (
                                <div
                                    className="flex flex-col items-center justify-center rounded-xl py-10 text-center"
                                    style={{
                                        border: '1px dashed var(--border-default)',
                                        background: 'var(--bg-surface-2)',
                                    }}
                                >
                                    <Shield
                                        className="mb-3 h-8 w-8"
                                        style={{
                                            color: 'var(--border-strong)',
                                        }}
                                    />
                                    <p
                                        className="text-sm"
                                        style={{
                                            color: 'var(--text-muted)',
                                            fontFamily: 'Rajdhani, sans-serif',
                                        }}
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
                            <div className="flex items-center gap-2">
                                <div
                                    className="h-1 w-5 rounded-full"
                                    style={{
                                        background: 'var(--accent-gold)',
                                        boxShadow:
                                            '0 0 6px var(--accent-gold-bg)',
                                    }}
                                />
                                <h2
                                    className="text-lg font-bold tracking-wider uppercase"
                                    style={{
                                        fontFamily: 'Rajdhani, sans-serif',
                                        color: 'var(--text-primary)',
                                    }}
                                >
                                    Status Pendaftaran
                                </h2>
                            </div>
                        </div>

                        <div className="space-y-3">
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
                                                    className="font-bold transition-colors duration-200"
                                                    style={{
                                                        color: 'var(--text-primary)',
                                                        fontFamily:
                                                            'Rajdhani, sans-serif',
                                                        fontSize: '0.95rem',
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.color =
                                                            'var(--accent-primary)';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.color =
                                                            'var(--text-primary)';
                                                    }}
                                                >
                                                    {reg.tournament.nama}
                                                </Link>
                                                <p
                                                    className="mt-1 text-xs"
                                                    style={{
                                                        color: 'var(--text-muted)',
                                                        fontFamily:
                                                            'Rajdhani, sans-serif',
                                                    }}
                                                >
                                                    Tim: {reg.team.nama_tim}
                                                </p>
                                            </div>
                                            {statusInfo && (
                                                <span
                                                    className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                                                    style={{
                                                        ...statusInfo.style,
                                                        fontFamily:
                                                            'Rajdhani, sans-serif',
                                                        letterSpacing: '0.05em',
                                                        textTransform:
                                                            'uppercase',
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
                                        background: 'var(--bg-surface-2)',
                                    }}
                                >
                                    <Trophy
                                        className="mb-3 h-8 w-8"
                                        style={{ color: 'var(--accent-gold)' }}
                                    />
                                    <p
                                        className="text-sm"
                                        style={{
                                            color: 'var(--text-muted)',
                                            fontFamily: 'Rajdhani, sans-serif',
                                        }}
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
