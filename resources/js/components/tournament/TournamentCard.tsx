import { Link } from '@inertiajs/react';
import { Calendar, Clock, Trophy, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { TournamentListItem } from '@/types';

interface TournamentCardProps {
    tournament: TournamentListItem;
}

const statusConfig = {
    draft: { label: 'Draft', className: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30' },
    open: { label: 'Open Registration', className: 'bg-emerald-500/20 text-emerald-500/60 border-emerald-500/30 dark:text-emerald-400' },
    ongoing: { label: 'Ongoing', className: 'bg-primary/20 text-primary border-primary/30' },
    selesai: { label: 'Selesai', className: 'bg-blue-500/20 text-blue-500/60 border-blue-500/30 dark:text-blue-400' },
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
        <span className="flex items-center gap-1 text-xs text-amber-500 dark:text-amber-400">
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
            <div className="relative overflow-hidden rounded-xl border border-border bg-card force-card">
                {/* Banner */}
                <div className="relative h-40 overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/30">
                    {tournament.banner_url ? (
                        <img
                            src={tournament.banner_url}
                            alt={tournament.nama}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center">
                            <Trophy className="h-16 w-16 text-primary/30" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                        <span
                            className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold backdrop-blur-sm ${status.className}`}
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
                            />
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-4">
                    <div className="mb-1 flex items-start justify-between gap-2">
                        <h3 className="line-clamp-1 text-sm font-bold text-foreground group-hover:text-primary">
                            {tournament.nama}
                        </h3>
                        <span className="shrink-0 rounded bg-secondary px-1.5 py-0.5 text-xs text-muted-foreground">
                            {formatConfig[tournament.format]}
                        </span>
                    </div>

                    <p className="mb-3 text-xs text-muted-foreground">{tournament.game.nama_game}</p>

                    {/* Prize */}
                    {tournament.hadiah && (
                        <div className="mb-3 flex items-center gap-1.5 text-amber-500 dark:text-amber-400">
                            <Trophy className="h-3.5 w-3.5" />
                            <span className="text-xs font-semibold">{tournament.hadiah}</span>
                        </div>
                    )}

                    {/* Teams progress */}
                    <div className="mb-2">
                        <div className="mb-1 flex items-center justify-between text-xs">
                            <span className="flex items-center gap-1 text-muted-foreground">
                                <Users className="h-3 w-3" />
                                {tournament.registrations_count}/{tournament.max_tim} Tim
                            </span>
                            {tournament.registration_deadline && tournament.status === 'open' && (
                                <CountdownTimer deadline={tournament.registration_deadline} />
                            )}
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                            <div
                                className="h-full rounded-full gaming-gradient transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    {/* Date */}
                    {tournament.tanggal_mulai && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
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
