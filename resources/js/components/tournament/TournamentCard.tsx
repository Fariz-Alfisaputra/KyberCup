import { Link } from '@inertiajs/react';
import { Calendar, Clock, Trophy, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { TournamentListItem } from '@/types';

interface TournamentCardProps {
    tournament: TournamentListItem;
}

const statusConfig = {
    draft: {
        label: 'Draft',
        style: {
            background: 'rgba(113,113,122,0.12)',
            color: '#a1a1aa',
            border: '1px solid rgba(113,113,122,0.3)',
        },
    },
    open: {
        label: 'Open',
        style: {
            background: 'rgba(0,212,255,0.12)',
            color: '#00d4ff',
            border: '1px solid rgba(0,212,255,0.35)',
        },
    },
    ongoing: {
        label: 'Ongoing',
        style: {
            background: 'rgba(124,58,237,0.12)',
            color: '#a78bfa',
            border: '1px solid rgba(124,58,237,0.35)',
        },
    },
    selesai: {
        label: 'Selesai',
        style: {
            background: 'rgba(255,232,31,0.12)',
            color: '#FFE81F',
            border: '1px solid rgba(255,232,31,0.35)',
        },
    },
};

const formatConfig = {
    single_elimination: 'Single Elim',
    double_elimination: 'Double Elim',
    round_robin: 'Round Robin',
};

function CountdownTimer({ deadline }: { deadline: string }) {
    const [timeLeft, setTimeLeft] = useState<string>('');

    useEffect(() => {
        const calculate = () => {
            const diff = new Date(deadline).getTime() - Date.now();
            if (diff <= 0) {
                setTimeLeft('Ditutup');
                return;
            }
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

            if (days > 0) setTimeLeft(`${days}h ${hours}j`);
            else if (hours > 0) setTimeLeft(`${hours}j ${mins}m`);
            else setTimeLeft(`${mins}m`);
        };

        calculate();
        const interval = setInterval(calculate, 60000);

        return () => clearInterval(interval);
    }, [deadline]);

    return (
        <span
            className="flex items-center gap-1 text-xs"
            style={{ color: '#FFE81F', fontFamily: 'Rajdhani, sans-serif' }}
        >
            <Clock className="h-3 w-3" />
            {timeLeft}
        </span>
    );
}

export default function TournamentCard({ tournament }: TournamentCardProps) {
    const status = statusConfig[tournament.status];
    const progress = Math.min((tournament.registrations_count / tournament.max_tim) * 100, 100);

    return (
        <Link href={`/tournaments/${tournament.slug}`} className="group block">
            <div
                className="relative overflow-hidden rounded-xl scanline-card transition-all duration-400"
                style={{
                    background: 'rgba(10,10,15,0.8)',
                    border: '1px solid rgba(0,212,255,0.15)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                    transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease, border-color 0.35s ease',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.borderColor = 'rgba(0,212,255,0.4)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(0,212,255,0.12)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(0,212,255,0.15)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
                }}
            >
                {/* Banner */}
                <div
                    className="relative h-40 overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.08) 0%, rgba(124,58,237,0.12) 100%)' }}
                >
                    {tournament.banner_url ? (
                        <img
                            src={tournament.banner_url}
                            alt={tournament.nama}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center">
                            <Trophy
                                className="h-16 w-16"
                                style={{ color: 'rgba(0,212,255,0.2)' }}
                            />
                        </div>
                    )}
                    {/* gradient overlay */}
                    <div
                        className="absolute inset-0"
                        style={{ background: 'linear-gradient(to top, rgba(10,10,15,0.95) 0%, transparent 60%)' }}
                    />

                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                        <span
                            className="rounded-full px-2.5 py-0.5 text-xs font-semibold backdrop-blur-sm"
                            style={{
                                ...status.style,
                                fontFamily: 'Rajdhani, sans-serif',
                                letterSpacing: '0.05em',
                                textTransform: 'uppercase',
                            }}
                        >
                            {status.label}
                        </span>
                    </div>

                    {/* Game logo */}
                    {tournament.game.logo_url && (
                        <div className="absolute bottom-3 left-3">
                            <img
                                src={tournament.game.logo_url}
                                alt={tournament.game.nama_game}
                                className="h-8 w-8 rounded-lg object-cover"
                                style={{ border: '1px solid rgba(0,212,255,0.3)' }}
                            />
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-4">
                    <div className="mb-1 flex items-start justify-between gap-2">
                        <h3
                            className="line-clamp-1 text-sm font-bold transition-colors duration-200"
                            style={{
                                color: '#f0f4ff',
                                fontFamily: 'Rajdhani, sans-serif',
                                fontSize: '0.95rem',
                                letterSpacing: '0.03em',
                            }}
                        >
                            {tournament.nama}
                        </h3>
                        <span
                            className="shrink-0 rounded px-1.5 py-0.5 text-xs"
                            style={{
                                background: 'rgba(0,212,255,0.06)',
                                color: 'rgba(0,212,255,0.6)',
                                border: '1px solid rgba(0,212,255,0.15)',
                                fontFamily: 'Rajdhani, sans-serif',
                                fontSize: '0.7rem',
                            }}
                        >
                            {formatConfig[tournament.format]}
                        </span>
                    </div>

                    <p className="mb-3 text-xs" style={{ color: 'rgba(240,244,255,0.45)', fontFamily: 'Rajdhani, sans-serif' }}>
                        {tournament.game.nama_game}
                    </p>

                    {/* Prize */}
                    {tournament.hadiah && (
                        <div
                            className="mb-3 flex items-center gap-1.5"
                            style={{ color: '#FFE81F' }}
                        >
                            <Trophy className="h-3.5 w-3.5" />
                            <span
                                className="text-xs font-semibold"
                                style={{ fontFamily: 'Rajdhani, sans-serif', textShadow: '0 0 6px rgba(255,232,31,0.5)' }}
                            >
                                {tournament.hadiah}
                            </span>
                        </div>
                    )}

                    {/* Teams progress */}
                    <div className="mb-2">
                        <div className="mb-1 flex items-center justify-between text-xs">
                            <span
                                className="flex items-center gap-1"
                                style={{ color: 'rgba(240,244,255,0.45)', fontFamily: 'Rajdhani, sans-serif' }}
                            >
                                <Users className="h-3 w-3" />
                                {tournament.registrations_count}/{tournament.max_tim} Tim
                            </span>
                            {tournament.registration_deadline && tournament.status === 'open' && (
                                <CountdownTimer deadline={tournament.registration_deadline} />
                            )}
                        </div>
                        <div
                            className="h-1.5 overflow-hidden rounded-full"
                            style={{ background: 'rgba(255,255,255,0.06)' }}
                        >
                            <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{
                                    width: `${progress}%`,
                                    background: 'linear-gradient(90deg, #00d4ff, #7c3aed)',
                                    boxShadow: `0 0 6px rgba(0,212,255,${progress / 200})`,
                                }}
                            />
                        </div>
                    </div>

                    {/* Date */}
                    {tournament.tanggal_mulai && (
                        <div
                            className="flex items-center gap-1 text-xs"
                            style={{ color: 'rgba(240,244,255,0.35)', fontFamily: 'Rajdhani, sans-serif' }}
                        >
                            <Calendar className="h-3 w-3" />
                            {new Date(tournament.tanggal_mulai).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                            })}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}
