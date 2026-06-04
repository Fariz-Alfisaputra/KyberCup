import { Medal, Shield, Trophy } from 'lucide-react';
import type { Standing } from '@/types';

interface StandingsTableProps {
    standings: Standing[];
}

export default function StandingsTable({ standings }: StandingsTableProps) {
    if (standings.length === 0) {
        return (
            <div
                className="flex flex-col items-center justify-center rounded-xl py-12 text-center"
                style={{
                    border: '1px dashed var(--border-default)',
                    background: 'var(--bg-surface-2)',
                }}
            >
                <Medal
                    className="mb-3 h-10 w-10"
                    style={{ color: 'var(--text-muted)' }}
                />
                <p
                    className="text-sm"
                    style={{
                        color: 'var(--text-muted)',
                        fontFamily: 'Rajdhani, sans-serif',
                    }}
                >
                    Standings belum tersedia
                </p>
            </div>
        );
    }

    return (
        <div
            className="overflow-hidden rounded-xl"
            style={{
                border: '1px solid var(--border-default)',
                background: 'var(--bg-surface)',
                backdropFilter: 'blur(10px)',
            }}
        >
            <table className="w-full text-sm">
                <thead>
                    <tr
                        style={{
                            background: 'var(--bg-hover)',
                            borderBottom: '1px solid var(--border-default)',
                        }}
                    >
                        {['#', 'Tim', 'M', 'K', 'D', 'Poin'].map((col) => (
                            <th
                                key={col}
                                className={`px-4 py-3 ${col === '#' || col === 'Tim' ? 'text-left' : 'text-center'}`}
                                style={{
                                    color: 'var(--accent-primary)',
                                    fontFamily: 'Rajdhani, sans-serif',
                                    fontWeight: 700,
                                    letterSpacing: '0.1em',
                                    textTransform: 'uppercase',
                                    fontSize: '0.7rem',
                                }}
                            >
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {standings.map((standing) => {
                        const isFirst = standing.posisi === 1;
                        const isSecond = standing.posisi === 2;
                        const isThird = standing.posisi === 3;

                        const rankColor = isFirst
                            ? 'var(--accent-gold)'
                            : isSecond
                              ? '#d4d4d8'
                              : isThird
                                ? '#c2773a'
                                : 'var(--text-muted)';

                        const rowStyle = isFirst
                            ? {
                                  background: 'var(--accent-gold-bg)',
                                  borderBottom:
                                      '1px solid var(--border-default)',
                              }
                            : {
                                  background: 'transparent',
                                  borderBottom:
                                      '1px solid var(--border-default)',
                              };

                        return (
                            <tr
                                key={standing.team.id}
                                style={rowStyle}
                                className="transition-colors duration-150 last:border-0"
                                onMouseEnter={(e) => {
                                    if (!isFirst) {
                                        e.currentTarget.style.background =
                                            'var(--bg-hover)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isFirst) {
                                        e.currentTarget.style.background =
                                            'transparent';
                                    }
                                }}
                            >
                                {/* Rank */}
                                <td className="px-4 py-3">
                                    {standing.posisi <= 3 ? (
                                        <span
                                            className="flex items-center gap-1 font-bold"
                                            style={{
                                                color: rankColor,
                                                textShadow: isFirst
                                                    ? '0 0 6px var(--accent-gold-bg)'
                                                    : undefined,
                                            }}
                                        >
                                            {isFirst ? (
                                                <Trophy className="h-4 w-4" />
                                            ) : (
                                                standing.posisi
                                            )}
                                        </span>
                                    ) : (
                                        <span
                                            style={{
                                                color: 'var(--text-muted)',
                                                fontFamily:
                                                    'Rajdhani, sans-serif',
                                            }}
                                        >
                                            {standing.posisi}
                                        </span>
                                    )}
                                </td>

                                {/* Team */}
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2.5">
                                        {standing.team.logo_url ? (
                                            <img
                                                loading="lazy"
                                                src={standing.team.logo_url}
                                                alt={standing.team.nama_tim}
                                                className="h-6 w-6 rounded object-cover"
                                                style={{
                                                    border: '1px solid var(--border-default)',
                                                }}
                                            />
                                        ) : (
                                            <Shield
                                                className="h-5 w-5"
                                                style={{
                                                    color: 'var(--text-muted)',
                                                }}
                                            />
                                        )}
                                        <span
                                            className="font-medium"
                                            style={{
                                                color: 'var(--text-primary)',
                                                fontFamily:
                                                    'Rajdhani, sans-serif',
                                                fontWeight: isFirst ? 700 : 500,
                                                fontSize: '0.85rem',
                                            }}
                                        >
                                            {standing.team.nama_tim}
                                        </span>
                                    </div>
                                </td>

                                {/* Wins */}
                                <td className="px-4 py-3 text-center">
                                    <span
                                        className="font-medium"
                                        style={{
                                            color: 'var(--accent-primary)',
                                            fontFamily: 'Rajdhani, sans-serif',
                                        }}
                                    >
                                        {standing.menang}
                                    </span>
                                </td>

                                {/* Losses */}
                                <td className="px-4 py-3 text-center">
                                    <span
                                        className="font-medium"
                                        style={{
                                            color: 'var(--status-cancel-text)',
                                            fontFamily: 'Rajdhani, sans-serif',
                                        }}
                                    >
                                        {standing.kalah}
                                    </span>
                                </td>

                                {/* Draw */}
                                <td className="px-4 py-3 text-center">
                                    <span
                                        className="font-medium"
                                        style={{
                                            color: 'var(--text-muted)',
                                            fontFamily: 'Rajdhani, sans-serif',
                                        }}
                                    >
                                        {standing.draw}
                                    </span>
                                </td>

                                {/* Points */}
                                <td className="px-4 py-3 text-center">
                                    <span
                                        className="rounded-full px-2.5 py-0.5 font-bold"
                                        style={{
                                            background:
                                                'var(--accent-primary-light)',
                                            color: 'var(--accent-primary)',
                                            border: '1px solid var(--border-accent)',
                                            fontFamily: 'Rajdhani, sans-serif',
                                            fontSize: '0.8rem',
                                        }}
                                    >
                                        {standing.poin}
                                    </span>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
