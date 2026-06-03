import { Head, Link } from '@inertiajs/react';
import { Calendar, ChevronRight, Clock, Shield, Swords, Trophy, Users } from 'lucide-react';
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
    pending: { label: 'Pending', className: 'bg-yellow-500/20 text-yellow-400' },
    approved: { label: 'Approved', className: 'bg-emerald-500/20 text-emerald-400' },
    rejected: { label: 'Rejected', className: 'bg-red-500/20 text-red-400' },
};

export default function Dashboard({ myTeams, upcomingMatches, teamRegistrations }: DashboardProps) {
    return (
        <AppLayout title="Dashboard">
            <Head title="Dashboard - EsportHub" />

            <div className="space-y-6">
                {/* Upcoming Matches */}
                <section>
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-bold text-foreground">Jadwal Pertandingan</h2>
                    </div>

                    {upcomingMatches.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {upcomingMatches.map((match) => (
                                <div key={match.id} className="relative overflow-hidden rounded-xl border border-border bg-card p-5">
                                    <div className="absolute -right-6 -top-6 text-primary/5">
                                        <Swords className="h-24 w-24" />
                                    </div>
                                    <div className="relative">
                                        <div className="mb-4 flex items-center justify-between text-xs">
                                            <span className="font-semibold text-primary">{match.tournament.nama}</span>
                                            <span className="rounded bg-muted px-2 py-0.5 text-muted-foreground">
                                                Round {match.round}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex-1 truncate font-bold">{match.team1.nama_tim}</div>
                                            <div className="px-4 text-xs font-bold text-muted-foreground">VS</div>
                                            <div className="flex-1 truncate text-right font-bold">{match.team2.nama_tim}</div>
                                        </div>

                                        <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
                                            <Clock className="h-3.5 w-3.5" />
                                            {match.jadwal ? new Date(match.jadwal).toLocaleString('id-ID') : 'Jadwal belum ditentukan'}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-12 text-center">
                            <Calendar className="mb-3 h-10 w-10 text-muted-foreground/30" />
                            <p className="text-sm text-muted-foreground">Tidak ada jadwal pertandingan dalam waktu dekat.</p>
                        </div>
                    )}
                </section>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* My Teams */}
                    <section>
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-foreground">Tim Saya</h2>
                            <Link href="/teams/create" className="text-sm font-medium text-primary hover:text-primary/80">
                                Buat Tim Baru
                            </Link>
                        </div>

                        <div className="space-y-3">
                            {myTeams.length > 0 ? (
                                myTeams.map((team) => (
                                    <Link
                                        key={team.id}
                                        href={`/teams/${team.slug}`}
                                        className="group flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
                                    >
                                        <div className="flex items-center gap-4">
                                            {team.logo_url ? (
                                                <img src={team.logo_url} alt={team.nama_tim} className="h-12 w-12 rounded-lg object-cover" />
                                            ) : (
                                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                                    <Shield className="h-6 w-6 text-primary" />
                                                </div>
                                            )}
                                            <div>
                                                <h3 className="font-bold text-foreground group-hover:text-primary">{team.nama_tim}</h3>
                                                <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                                                    <span className="flex items-center gap-1">
                                                        <Users className="h-3.5 w-3.5" />
                                                        {team.members_count} Anggota
                                                    </span>
                                                    <span className="flex items-center gap-1 capitalize">
                                                        <div className={`h-1.5 w-1.5 rounded-full ${team.role === 'captain' ? 'bg-amber-400' : 'bg-primary'}`} />
                                                        {team.role}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                                    </Link>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-10 text-center">
                                    <Shield className="mb-3 h-8 w-8 text-muted-foreground/30" />
                                    <p className="text-sm text-muted-foreground">Kamu belum bergabung dengan tim manapun.</p>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Registrations Status */}
                    <section>
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-foreground">Status Pendaftaran Turnamen</h2>
                        </div>

                        <div className="space-y-3">
                            {teamRegistrations.length > 0 ? (
                                teamRegistrations.map((reg) => {
                                    const statusInfo = statusConfig[reg.status as keyof typeof statusConfig];

                                    return (
                                        <div key={reg.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
                                            <div>
                                                <Link
                                                    href={`/tournaments/${reg.tournament.slug}`}
                                                    className="font-bold text-foreground hover:text-primary"
                                                >
                                                    {reg.tournament.nama}
                                                </Link>
                                                <p className="mt-1 text-xs text-muted-foreground">Tim: {reg.team.nama_tim}</p>
                                            </div>
                                            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusInfo.className}`}>
                                                {statusInfo.label}
                                            </span>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-10 text-center">
                                    <Trophy className="mb-3 h-8 w-8 text-muted-foreground/30" />
                                    <p className="text-sm text-muted-foreground">Belum ada pendaftaran turnamen aktif.</p>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}
