import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Calendar, ChevronLeft, Gamepad2, Shield, Trophy, Users } from 'lucide-react';
import { useState } from 'react';
import BracketTree from '@/components/tournament/BracketTree';
import StandingsTable from '@/components/tournament/StandingsTable';
import type { Standing, Tournament, TournamentMatch, TeamListItem } from '@/types';

interface Registration {
    id: number;
    status: string;
    team: Pick<TeamListItem, 'id' | 'nama_tim' | 'logo_url' | 'slug'>;
}

interface TournamentShowProps {
    tournament: Tournament & {
        game: { id: number; nama_game: string; logo_url: string | null; genre: string };
    };
    matches: Record<string, TournamentMatch[]>;
    standings: Standing[];
    registrations: Registration[];
}

type TabType = 'info' | 'bracket' | 'standings' | 'teams';

const statusConfig = {
    draft: { label: 'Draft', className: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30' },
    open: { label: 'Open Registration', className: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
    ongoing: { label: 'Ongoing', className: 'bg-violet-500/20 text-violet-400 border-violet-500/30' },
    selesai: { label: 'Selesai', className: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
};

const formatLabels = {
    single_elimination: 'Single Elimination',
    double_elimination: 'Double Elimination',
    round_robin: 'Round Robin',
};

export default function TournamentShow({ tournament, matches, standings, registrations }: TournamentShowProps) {
    const { auth } = usePage().props as { auth: { user: { id: number; role: string } | null } };
    const [activeTab, setActiveTab] = useState<TabType>('info');
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const status = statusConfig[tournament.status as keyof typeof statusConfig];

    const registerForm = useForm({ team_id: '' });
    const approvedTeams = registrations.filter((r) => r.status === 'approved');
    const progress = Math.min((approvedTeams.length / tournament.max_tim) * 100, 100);

    const tabs: Array<{ id: TabType; label: string; count?: number }> = [
        { id: 'info', label: 'Info' },
        { id: 'bracket', label: 'Bracket' },
        { id: 'standings', label: 'Standings', count: standings.length },
        { id: 'teams', label: 'Tim', count: approvedTeams.length },
    ];

    return (
        <>
            <Head title={`${tournament.nama} - EsportHub`} />

            <div className="dark min-h-screen bg-background text-foreground">
                {/* Back button */}
                <div className="border-b border-border bg-card/50">
                    <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
                        <button
                            onClick={() => router.visit('/tournaments')}
                            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <ChevronLeft className="h-4 w-4" />
                            Kembali ke Turnamen
                        </button>
                    </div>
                </div>

                {/* Hero Banner */}
                <div className="relative h-72 overflow-hidden lg:h-96">
                    {tournament.banner_url ? (
                        <img
                            src={tournament.banner_url}
                            alt={tournament.nama}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-violet-900 to-zinc-900">
                            <Trophy className="h-32 w-32 text-violet-400/20" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

                    {/* Tournament title overlay */}
                    <div className="absolute bottom-0 left-0 right-0 px-4 pb-6 sm:px-6">
                        <div className="mx-auto max-w-7xl">
                            <div className="mb-2 flex items-center gap-3">
                                <span
                                    className={`rounded-full border px-3 py-1 text-xs font-bold ${status.className}`}
                                >
                                    {status.label}
                                </span>
                                <span className="rounded-full bg-card/80 px-3 py-1 text-xs text-muted-foreground backdrop-blur-sm">
                                    {formatLabels[tournament.format]}
                                </span>
                            </div>
                            <h1 className="text-3xl font-black text-white drop-shadow-lg lg:text-4xl">
                                {tournament.nama}
                            </h1>
                            <div className="mt-2 flex items-center gap-4 text-sm text-zinc-300">
                                {tournament.game.logo_url && (
                                    <img
                                        src={tournament.game.logo_url}
                                        alt={tournament.game.nama_game}
                                        className="h-5 w-5 rounded object-cover"
                                    />
                                )}
                                <span className="flex items-center gap-1">
                                    <Gamepad2 className="h-4 w-4" />
                                    {tournament.game.nama_game}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {/* Left: Tabs + Content */}
                        <div className="lg:col-span-2">
                            {/* Tabs */}
                            <div className="mb-6 flex gap-1 rounded-xl border border-border bg-card/50 p-1">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-medium transition-all ${
                                            activeTab === tab.id
                                                ? 'bg-primary text-primary-foreground shadow-sm'
                                                : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                    >
                                        {tab.label}
                                        {tab.count !== undefined && (
                                            <span
                                                className={`rounded-full px-1.5 py-0.5 text-xs ${
                                                    activeTab === tab.id
                                                        ? 'bg-primary-foreground/20 text-primary-foreground'
                                                        : 'bg-muted text-muted-foreground'
                                                }`}
                                            >
                                                {tab.count}
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Tab content */}
                            {activeTab === 'info' && (
                                <div className="rounded-xl border border-border bg-card p-6">
                                    <h2 className="mb-4 text-lg font-bold">Tentang Turnamen</h2>
                                    {tournament.deskripsi ? (
                                        <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                                            {tournament.deskripsi}
                                        </p>
                                    ) : (
                                        <p className="text-sm italic text-muted-foreground">
                                            Tidak ada deskripsi tersedia.
                                        </p>
                                    )}
                                </div>
                            )}

                            {activeTab === 'bracket' && (
                                <div className="rounded-xl border border-border bg-card p-6">
                                    <h2 className="mb-4 text-lg font-bold">Bracket Turnamen</h2>
                                    <BracketTree matches={matches} />
                                </div>
                            )}

                            {activeTab === 'standings' && (
                                <div className="rounded-xl border border-border bg-card p-6">
                                    <h2 className="mb-4 text-lg font-bold">Standings</h2>
                                    <StandingsTable standings={standings} />
                                </div>
                            )}

                            {activeTab === 'teams' && (
                                <div className="rounded-xl border border-border bg-card p-6">
                                    <h2 className="mb-4 text-lg font-bold">Tim Terdaftar</h2>
                                    {approvedTeams.length > 0 ? (
                                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                            {approvedTeams.map((reg) => (
                                                <a
                                                    key={reg.id}
                                                    href={`/teams/${reg.team.slug}`}
                                                    className="flex items-center gap-2.5 rounded-lg border border-border bg-card/50 p-3 transition-all hover:border-primary/50"
                                                >
                                                    {reg.team.logo_url ? (
                                                        <img
                                                            src={reg.team.logo_url}
                                                            alt={reg.team.nama_tim}
                                                            className="h-8 w-8 rounded-lg object-cover"
                                                        />
                                                    ) : (
                                                        <Shield className="h-7 w-7 text-muted-foreground" />
                                                    )}
                                                    <span className="truncate text-sm font-medium">
                                                        {reg.team.nama_tim}
                                                    </span>
                                                </a>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-muted-foreground">Belum ada tim yang disetujui.</p>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Right: Info sidebar */}
                        <div className="space-y-4">
                            {/* Registration CTA */}
                            {tournament.status === 'open' && auth.user && (
                                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5">
                                    <h3 className="mb-1 font-bold text-emerald-400">Daftar Tim</h3>
                                    <p className="mb-4 text-xs text-muted-foreground">
                                        Daftarkan tim kamu ke turnamen ini!
                                    </p>
                                    <button
                                        onClick={() => setShowRegisterModal(true)}
                                        className="w-full rounded-lg bg-emerald-500 py-2.5 text-sm font-bold text-white transition-all hover:bg-emerald-500/90 gaming-glow-emerald"
                                    >
                                        Daftar Sekarang
                                    </button>
                                </div>
                            )}

                            {/* Tournament Info */}
                            <div className="rounded-xl border border-border bg-card p-5">
                                <h3 className="mb-4 font-bold">Info Turnamen</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Format</span>
                                        <span className="font-medium">{formatLabels[tournament.format]}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Maksimal Tim</span>
                                        <span className="font-medium">{tournament.max_tim} tim</span>
                                    </div>
                                    {tournament.hadiah && (
                                        <div className="flex items-center justify-between">
                                            <span className="text-muted-foreground">Hadiah</span>
                                            <span className="font-bold text-amber-400">{tournament.hadiah}</span>
                                        </div>
                                    )}
                                    {tournament.tanggal_mulai && (
                                        <div className="flex items-center justify-between">
                                            <span className="text-muted-foreground">Mulai</span>
                                            <span className="font-medium">
                                                {new Date(tournament.tanggal_mulai).toLocaleDateString('id-ID')}
                                            </span>
                                        </div>
                                    )}
                                    {tournament.tanggal_selesai && (
                                        <div className="flex items-center justify-between">
                                            <span className="text-muted-foreground">Selesai</span>
                                            <span className="font-medium">
                                                {new Date(tournament.tanggal_selesai).toLocaleDateString('id-ID')}
                                            </span>
                                        </div>
                                    )}
                                    {tournament.registration_deadline && (
                                        <div className="flex items-center justify-between">
                                            <span className="text-muted-foreground">Deadline</span>
                                            <span className="font-medium text-amber-400">
                                                {new Date(tournament.registration_deadline).toLocaleDateString('id-ID')}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Teams count */}
                                <div className="mt-4 border-t border-border pt-4">
                                    <div className="mb-1.5 flex items-center justify-between text-xs">
                                        <span className="flex items-center gap-1 text-muted-foreground">
                                            <Users className="h-3 w-3" />
                                            {approvedTeams.length}/{tournament.max_tim} Tim
                                        </span>
                                        <span className="text-muted-foreground">{Math.round(progress)}%</span>
                                    </div>
                                    <div className="h-2 overflow-hidden rounded-full bg-secondary">
                                        <div
                                            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-violet-400"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Register Modal */}
            {showRegisterModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl">
                        <h3 className="mb-1 text-lg font-bold">Daftar ke Turnamen</h3>
                        <p className="mb-4 text-sm text-muted-foreground">Pilih tim yang ingin kamu daftarkan.</p>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                registerForm.post(`/tournaments/${tournament.slug}/register`, {
                                    onSuccess: () => setShowRegisterModal(false),
                                });
                            }}
                        >
                            <div className="mb-4">
                                <label className="mb-1.5 block text-sm font-medium">Tim</label>
                                <input
                                    type="number"
                                    placeholder="Masukkan Team ID"
                                    value={registerForm.data.team_id}
                                    onChange={(e) => registerForm.setData('team_id', e.target.value)}
                                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                                {registerForm.errors.team_id && (
                                    <p className="mt-1 text-xs text-destructive">{registerForm.errors.team_id}</p>
                                )}
                            </div>
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowRegisterModal(false)}
                                    className="flex-1 rounded-lg border border-border py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted/50"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={registerForm.processing}
                                    className="flex-1 rounded-lg bg-primary py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                                >
                                    {registerForm.processing ? 'Mendaftar...' : 'Daftar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
