import { Link, Head } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import { Trophy, Medal, Award } from 'lucide-react';

interface TeamStat {
    id: number;
    rank: number;
    nama_tim: string;
    slug: string;
    logo_url: string | null;
    captain: string | null;
    wins: number;
    losses: number;
    total_matches: number;
    win_rate: number;
    points: number;
}

interface Props {
    teams: TeamStat[];
}

function getRankStyle(rank: number) {
    switch (rank) {
        case 1:
            return {
                color: '#FFD700',
                glow: 'rgba(255,215,0,0.3)',
                bg: 'rgba(255,215,0,0.08)',
                border: 'rgba(255,215,0,0.4)',
                icon: Trophy,
                label: '🥇',
            };
        case 2:
            return {
                color: '#C0C0C0',
                glow: 'rgba(192,192,192,0.3)',
                bg: 'rgba(192,192,192,0.06)',
                border: 'rgba(192,192,192,0.3)',
                icon: Medal,
                label: '🥈',
            };
        case 3:
            return {
                color: '#CD7F32',
                glow: 'rgba(205,127,50,0.3)',
                bg: 'rgba(205,127,50,0.06)',
                border: 'rgba(205,127,50,0.3)',
                icon: Award,
                label: '🥉',
            };
        default:
            return {
                color: 'var(--text-muted)',
                glow: 'transparent',
                bg: 'transparent',
                border: 'var(--border-default)',
                icon: null,
                label: `#${rank}`,
            };
    }
}

export default function LeaderboardIndex({ teams }: Props) {
    return (
        <AppLayout title="Leaderboard">
            <Head title="Leaderboard" />

            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                {/* Header */}
                <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Trophy
                        style={{
                            color: 'var(--accent-gold, #FFE81F)',
                            filter: 'drop-shadow(0 0 8px rgba(255,232,31,0.4))',
                        }}
                        size={28}
                    />
                    <h1
                        style={{
                            fontSize: '1.5rem',
                            fontFamily: 'Orbitron, sans-serif',
                            fontWeight: 700,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: 'var(--text-primary, #e2e8f0)',
                            margin: 0,
                        }}
                    >
                        Leaderboard
                    </h1>
                </div>

                {teams.length === 0 ? (
                    <div
                        style={{
                            textAlign: 'center',
                            padding: '4rem 2rem',
                            background: 'var(--bg-card, #111827)',
                            borderRadius: '0.75rem',
                            border: '1px solid var(--border-default)',
                        }}
                    >
                        <Trophy
                            style={{ color: 'var(--text-muted)', margin: '0 auto 1rem', opacity: 0.5 }}
                            size={48}
                        />
                        <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
                            Belum ada data pertandingan.
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Desktop Table */}
                        <div
                            style={{
                                overflowX: 'auto',
                                borderRadius: '0.75rem',
                                border: '1px solid var(--border-default)',
                            }}
                        >
                            <table
                                style={{
                                    width: '100%',
                                    borderCollapse: 'collapse',
                                    background: 'var(--bg-card, #111827)',
                                    fontFamily: 'Rajdhani, sans-serif',
                                }}
                            >
                                <thead>
                                    <tr
                                        style={{
                                            borderBottom: '1px solid var(--border-default)',
                                            background: 'var(--bg-hover, rgba(0,212,255,0.04))',
                                        }}
                                    >
                                        {['Rank', 'Tim', 'M', 'W', 'L', 'Win Rate', 'Poin'].map((header) => (
                                            <th
                                                key={header}
                                                style={{
                                                    padding: '0.85rem 1rem',
                                                    textAlign: header === 'Tim' ? 'left' : 'center',
                                                    fontSize: '0.78rem',
                                                    fontWeight: 700,
                                                    letterSpacing: '0.1em',
                                                    textTransform: 'uppercase',
                                                    color: 'var(--text-muted)',
                                                    whiteSpace: 'nowrap',
                                                }}
                                            >
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {teams.map((team) => {
                                        const rankStyle = getRankStyle(team.rank);
                                        return (
                                            <tr
                                                key={team.id}
                                                style={{
                                                    borderBottom: '1px solid var(--border-default)',
                                                    background: rankStyle.bg,
                                                    transition: 'background 0.2s',
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = 'var(--bg-hover)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = rankStyle.bg;
                                                }}
                                            >
                                                <td
                                                    style={{
                                                        padding: '0.85rem 1rem',
                                                        textAlign: 'center',
                                                        fontWeight: 800,
                                                        fontSize: team.rank <= 3 ? '1.2rem' : '0.95rem',
                                                        color: rankStyle.color,
                                                        textShadow: team.rank <= 3 ? `0 0 10px ${rankStyle.glow}` : 'none',
                                                        fontFamily: 'Orbitron, sans-serif',
                                                    }}
                                                >
                                                    {rankStyle.label}
                                                </td>
                                                <td style={{ padding: '0.85rem 1rem' }}>
                                                    <Link
                                                        href={`/teams/${team.slug}`}
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '0.75rem',
                                                            textDecoration: 'none',
                                                            color: 'var(--text-primary)',
                                                        }}
                                                    >
                                                        {team.logo_url ? (
                                                            <img
                                                                loading="lazy"
                                                                src={team.logo_url}
                                                                alt={team.nama_tim}
                                                                loading="lazy"
                                                                style={{
                                                                    width: '32px',
                                                                    height: '32px',
                                                                    borderRadius: '0.375rem',
                                                                    objectFit: 'cover',
                                                                    border: `1px solid ${rankStyle.border}`,
                                                                }}
                                                            />
                                                        ) : (
                                                            <div
                                                                style={{
                                                                    width: '32px',
                                                                    height: '32px',
                                                                    borderRadius: '0.375rem',
                                                                    background: 'var(--bg-hover)',
                                                                    border: '1px solid var(--border-default)',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    fontSize: '0.7rem',
                                                                    fontWeight: 700,
                                                                    color: 'var(--accent-primary)',
                                                                    fontFamily: 'Orbitron, sans-serif',
                                                                }}
                                                            >
                                                                {team.nama_tim.charAt(0)}
                                                            </div>
                                                        )}
                                                        <div>
                                                            <span
                                                                style={{
                                                                    fontWeight: 600,
                                                                    fontSize: '0.9rem',
                                                                }}
                                                            >
                                                                {team.nama_tim}
                                                            </span>
                                                            {team.captain && (
                                                                <span
                                                                    style={{
                                                                        display: 'block',
                                                                        fontSize: '0.75rem',
                                                                        color: 'var(--text-muted)',
                                                                    }}
                                                                >
                                                                    Captain: {team.captain}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </Link>
                                                </td>
                                                <td style={{ padding: '0.85rem 1rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                                    {team.total_matches}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: '0.85rem 1rem',
                                                        textAlign: 'center',
                                                        color: 'var(--status-active-text, #34d399)',
                                                        fontWeight: 700,
                                                        fontSize: '0.9rem',
                                                    }}
                                                >
                                                    {team.wins}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: '0.85rem 1rem',
                                                        textAlign: 'center',
                                                        color: 'var(--status-cancel-text, #f87171)',
                                                        fontWeight: 700,
                                                        fontSize: '0.9rem',
                                                    }}
                                                >
                                                    {team.losses}
                                                </td>
                                                <td style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>
                                                    <span
                                                        style={{
                                                            padding: '0.2rem 0.5rem',
                                                            borderRadius: '999px',
                                                            background:
                                                                team.win_rate >= 60
                                                                    ? 'rgba(52,211,153,0.1)'
                                                                    : team.win_rate >= 40
                                                                      ? 'rgba(255,232,31,0.08)'
                                                                      : 'rgba(248,113,113,0.1)',
                                                            color:
                                                                team.win_rate >= 60
                                                                    ? 'var(--status-active-text, #34d399)'
                                                                    : team.win_rate >= 40
                                                                      ? 'var(--accent-gold, #FFE81F)'
                                                                      : 'var(--status-cancel-text, #f87171)',
                                                            fontWeight: 700,
                                                            fontSize: '0.8rem',
                                                        }}
                                                    >
                                                        {team.win_rate}%
                                                    </span>
                                                </td>
                                                <td
                                                    style={{
                                                        padding: '0.85rem 1rem',
                                                        textAlign: 'center',
                                                        fontWeight: 800,
                                                        fontSize: '1rem',
                                                        color: 'var(--accent-primary, #00d4ff)',
                                                        fontFamily: 'Orbitron, sans-serif',
                                                    }}
                                                >
                                                    {team.points}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <p
                            style={{
                                marginTop: '1rem',
                                fontSize: '0.78rem',
                                color: 'var(--text-muted)',
                                textAlign: 'center',
                            }}
                        >
                            M = Match, W = Win, L = Loss · Poin: Win = 3 poin
                        </p>
                    </>
                )}
            </div>
        </AppLayout>
    );
}
