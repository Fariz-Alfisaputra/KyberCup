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
                    border: '1px dashed rgba(0,212,255,0.2)',
                    background: 'rgba(0,212,255,0.02)',
                }}
            >
                <Medal className="mb-3 h-10 w-10" style={{ color: 'rgba(0,212,255,0.2)' }} />
                <p className="text-sm" style={{ color: 'rgba(240,244,255,0.4)', fontFamily: 'Rajdhani, sans-serif' }}>
                    Standings belum tersedia
                </p>
            </div>
        );
    }

    return (
        <div
            className="overflow-hidden rounded-xl"
            style={{
                border: '1px solid rgba(0,212,255,0.18)',
                background: 'rgba(10,10,15,0.7)',
                backdropFilter: 'blur(10px)',
            }}
        >
            <table className="w-full text-sm">
                <thead>
                    <tr
                        style={{
                            background: 'rgba(0,212,255,0.06)',
                            borderBottom: '1px solid rgba(0,212,255,0.2)',
                        }}
                    >
                        {['#', 'Tim', 'M', 'K', 'D', 'Poin'].map((col) => (
                            <th
                                key={col}
                                className={`px-4 py-3 ${col === '#' || col === 'Tim' ? 'text-left' : 'text-center'}`}
                                style={{
                                    color: 'var(--sw-blue-neon)',
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
                        const isFirst  = standing.posisi === 1;
                        const isSecond = standing.posisi === 2;
                        const isThird  = standing.posisi === 3;

                        const rankColor = isFirst
                            ? '#FFE81F'
                            : isSecond
                              ? '#d4d4d8'
                              : isThird
                                ? '#c2773a'
                                : 'rgba(240,244,255,0.4)';

                        const rowStyle = isFirst
                            ? { background: 'rgba(255,232,31,0.05)', borderBottom: '1px solid rgba(255,232,31,0.1)' }
                            : { background: 'transparent', borderBottom: '1px solid rgba(255,255,255,0.04)' };

                        return (
                            <tr
                                key={standing.team.id}
                                style={rowStyle}
                                className="transition-colors duration-150 last:border-0"
                                onMouseEnter={(e) => {
                                    if (!isFirst) e.currentTarget.style.background = 'rgba(0,212,255,0.04)';
                                }}
                                onMouseLeave={(e) => {
                                    if (!isFirst) e.currentTarget.style.background = 'transparent';
                                }}
                            >
                                {/* Rank */}
                                <td className="px-4 py-3">
                                    {standing.posisi <= 3 ? (
                                        <span
                                            className="flex items-center gap-1 font-bold"
                                            style={{ color: rankColor, textShadow: `0 0 6px ${rankColor}` }}
                                        >
                                            {isFirst ? (
                                                <Trophy className="h-4 w-4" />
                                            ) : (
                                                standing.posisi
                                            )}
                                        </span>
                                    ) : (
                                        <span style={{ color: 'rgba(240,244,255,0.35)', fontFamily: 'Rajdhani, sans-serif' }}>
                                            {standing.posisi}
                                        </span>
                                    )}
                                </td>

                                {/* Team */}
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2.5">
                                        {standing.team.logo_url ? (
                                            <img
                                                src={standing.team.logo_url}
                                                alt={standing.team.nama_tim}
                                                className="h-6 w-6 rounded object-cover"
                                                style={{ border: '1px solid rgba(0,212,255,0.25)' }}
                                            />
                                        ) : (
                                            <Shield
                                                className="h-5 w-5"
                                                style={{ color: 'rgba(0,212,255,0.3)' }}
                                            />
                                        )}
                                        <span
                                            className="font-medium"
                                            style={{
                                                color: '#f0f4ff',
                                                fontFamily: 'Rajdhani, sans-serif',
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
                                        style={{ color: '#00d4ff', fontFamily: 'Rajdhani, sans-serif' }}
                                    >
                                        {standing.menang}
                                    </span>
                                </td>

                                {/* Losses */}
                                <td className="px-4 py-3 text-center">
                                    <span
                                        className="font-medium"
                                        style={{ color: 'var(--sw-red-sith)', fontFamily: 'Rajdhani, sans-serif' }}
                                    >
                                        {standing.kalah}
                                    </span>
                                </td>

                                {/* Draw */}
                                <td className="px-4 py-3 text-center">
                                    <span
                                        className="font-medium"
                                        style={{ color: 'rgba(240,244,255,0.4)', fontFamily: 'Rajdhani, sans-serif' }}
                                    >
                                        {standing.draw}
                                    </span>
                                </td>

                                {/* Points */}
                                <td className="px-4 py-3 text-center">
                                    <span
                                        className="rounded-full px-2.5 py-0.5 font-bold"
                                        style={{
                                            background: 'rgba(0,212,255,0.1)',
                                            color: 'var(--sw-blue-neon)',
                                            border: '1px solid rgba(0,212,255,0.25)',
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
