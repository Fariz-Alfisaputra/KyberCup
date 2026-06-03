import { Medal, Shield, Trophy } from 'lucide-react';
import type { Standing } from '@/types';

interface StandingsTableProps {
    standings: Standing[];
}

const positionColors = {
    1: 'text-amber-400',
    2: 'text-zinc-300',
    3: 'text-amber-600',
};

export default function StandingsTable({ standings }: StandingsTableProps) {
    if (standings.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-12 text-center">
                <Medal className="mb-3 h-10 w-10 text-muted-foreground/30" />
                <p className="text-sm text-muted-foreground">Standings belum tersedia</p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-border bg-muted/30">
                        <th className="px-4 py-3 text-left font-semibold text-muted-foreground">#</th>
                        <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Tim</th>
                        <th className="px-4 py-3 text-center font-semibold text-muted-foreground">M</th>
                        <th className="px-4 py-3 text-center font-semibold text-muted-foreground">K</th>
                        <th className="px-4 py-3 text-center font-semibold text-muted-foreground">D</th>
                        <th className="px-4 py-3 text-center font-semibold text-muted-foreground">Poin</th>
                    </tr>
                </thead>
                <tbody>
                    {standings.map((standing) => {
                        const positionColor = positionColors[standing.posisi as keyof typeof positionColors];
                        const isTop3 = standing.posisi <= 3;

                        return (
                            <tr
                                key={standing.team.id}
                                className={`border-b border-border/50 transition-colors last:border-0 hover:bg-muted/20 ${
                                    standing.posisi === 1 ? 'bg-amber-500/5' : ''
                                }`}
                            >
                                <td className="px-4 py-3">
                                    {isTop3 ? (
                                        <span className={`font-bold ${positionColor}`}>
                                            {standing.posisi === 1 ? (
                                                <Trophy className="inline h-4 w-4" />
                                            ) : (
                                                standing.posisi
                                            )}
                                        </span>
                                    ) : (
                                        <span className="text-muted-foreground">{standing.posisi}</span>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2.5">
                                        {standing.team.logo_url ? (
                                            <img
                                                src={standing.team.logo_url}
                                                alt={standing.team.nama_tim}
                                                className="h-6 w-6 rounded object-cover"
                                            />
                                        ) : (
                                            <Shield className="h-5 w-5 text-muted-foreground" />
                                        )}
                                        <span className="font-medium text-foreground">{standing.team.nama_tim}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-center font-medium text-emerald-400">
                                    {standing.menang}
                                </td>
                                <td className="px-4 py-3 text-center font-medium text-red-400">{standing.kalah}</td>
                                <td className="px-4 py-3 text-center font-medium text-zinc-400">{standing.draw}</td>
                                <td className="px-4 py-3 text-center">
                                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-bold text-primary">
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
