import { Shield, Swords, Trophy } from 'lucide-react';
import type { TournamentMatch } from '@/types';

interface BracketTreeProps {
    matches: Record<string, TournamentMatch[]>;
}

const statusColors = {
    scheduled: 'border-zinc-700 bg-zinc-800/50',
    ongoing: 'border-yellow-500/50 bg-yellow-900/20',
    selesai: 'border-violet-500/30 bg-violet-900/10',
    walkover: 'border-zinc-600 bg-zinc-900/50',
};

interface MatchCardProps {
    match: TournamentMatch;
    isFinal?: boolean;
}

function MatchCard({ match, isFinal }: MatchCardProps) {
    const team1IsWinner = match.winner?.id === match.team1?.id;
    const team2IsWinner = match.winner?.id === match.team2?.id;

    return (
        <div
            className={`relative min-w-[220px] rounded-lg border transition-all duration-300 ${statusColors[match.status]} ${isFinal ? 'gaming-glow' : ''}`}
        >
            {isFinal && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-amber-500 px-2 py-0.5 text-xs font-bold text-black">
                        FINAL
                    </span>
                </div>
            )}

            {/* Team 1 */}
            <div
                className={`flex items-center justify-between rounded-t-lg px-3 py-2 ${team1IsWinner ? 'bg-violet-500/20' : ''}`}
            >
                <div className="flex min-w-0 items-center gap-2">
                    {match.team1?.logo_url ? (
                        <img
                            loading="lazy"
                            src={match.team1.logo_url}
                            alt=""
                            className="h-5 w-5 rounded object-cover"
                        />
                    ) : (
                        <Shield className="h-4 w-4 shrink-0 text-muted-foreground" />
                    )}
                    <span
                        className={`truncate text-sm font-medium ${team1IsWinner ? 'text-violet-300' : 'text-foreground'}`}
                    >
                        {match.team1?.nama_tim ?? 'TBD'}
                    </span>
                </div>
                <span
                    className={`ml-2 text-sm font-bold tabular-nums ${team1IsWinner ? 'text-violet-300' : 'text-muted-foreground'}`}
                >
                    {match.status !== 'scheduled' ? match.skor_team1 : '-'}
                </span>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-2 px-3">
                <div className="h-px flex-1 bg-border" />
                <Swords className="h-3 w-3 text-muted-foreground/50" />
                <div className="h-px flex-1 bg-border" />
            </div>

            {/* Team 2 */}
            <div
                className={`flex items-center justify-between rounded-b-lg px-3 py-2 ${team2IsWinner ? 'bg-violet-500/20' : ''}`}
            >
                <div className="flex min-w-0 items-center gap-2">
                    {match.team2?.logo_url ? (
                        <img
                            loading="lazy"
                            src={match.team2.logo_url}
                            alt=""
                            className="h-5 w-5 rounded object-cover"
                        />
                    ) : (
                        <Shield className="h-4 w-4 shrink-0 text-muted-foreground" />
                    )}
                    <span
                        className={`truncate text-sm font-medium ${team2IsWinner ? 'text-violet-300' : 'text-foreground'}`}
                    >
                        {match.team2?.nama_tim ?? 'TBD'}
                    </span>
                </div>
                <span
                    className={`ml-2 text-sm font-bold tabular-nums ${team2IsWinner ? 'text-violet-300' : 'text-muted-foreground'}`}
                >
                    {match.status !== 'scheduled' ? match.skor_team2 : '-'}
                </span>
            </div>

            {/* Winner badge */}
            {match.winner && (
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2">
                    <span className="flex items-center gap-1 rounded-full bg-violet-500/20 px-2 py-0.5 text-xs text-violet-300">
                        <Trophy className="h-2.5 w-2.5" />
                        {match.winner.nama_tim}
                    </span>
                </div>
            )}
        </div>
    );
}

export default function BracketTree({ matches }: BracketTreeProps) {
    const rounds = Object.keys(matches)
        .map(Number)
        .sort((a, b) => a - b);

    if (rounds.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center">
                <Trophy className="mb-3 h-12 w-12 text-muted-foreground/30" />
                <p className="text-sm text-muted-foreground">
                    Bracket belum di-generate
                </p>
            </div>
        );
    }

    const totalRounds = rounds.length;

    return (
        <div className="overflow-x-auto pb-8">
            <div className="flex min-w-max gap-8 px-4 pt-6">
                {rounds.map((round, roundIndex) => {
                    const roundMatches = matches[round];
                    const isFinalRound = roundIndex === totalRounds - 1;
                    const roundLabel = isFinalRound
                        ? 'Final'
                        : roundIndex === totalRounds - 2
                          ? 'Semi Final'
                          : `Round ${round}`;

                    return (
                        <div key={round} className="flex flex-col gap-4">
                            {/* Round header */}
                            <div className="mb-2 text-center">
                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase ${
                                        isFinalRound
                                            ? 'bg-amber-500/20 text-amber-400'
                                            : 'bg-violet-500/10 text-violet-400'
                                    }`}
                                >
                                    {roundLabel}
                                </span>
                            </div>

                            {/* Matches in this round with vertical spacing proportional to round */}
                            <div
                                className="flex flex-col justify-around"
                                style={{
                                    gap: `${Math.pow(2, roundIndex) * 16}px`,
                                    paddingTop: `${Math.pow(2, roundIndex) * 8}px`,
                                    paddingBottom: `${Math.pow(2, roundIndex) * 8}px`,
                                }}
                            >
                                {roundMatches.map((match) => (
                                    <MatchCard
                                        key={match.id}
                                        match={match}
                                        isFinal={isFinalRound}
                                    />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
