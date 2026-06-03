import { Head, router } from '@inertiajs/react';
import { Filter, Search, Trophy } from 'lucide-react';
import { useState } from 'react';
import TournamentCard from '@/components/tournament/TournamentCard';
import type { TournamentListItem, Game } from '@/types';

interface PaginatedTournaments {
    data: TournamentListItem[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{ url: string | null; label: string; active: boolean }>;
}

interface TournamentsIndexProps {
    tournaments: PaginatedTournaments;
    games: Pick<Game, 'id' | 'nama_game'>[];
}

const statusOptions = [
    { value: '', label: 'Semua Status' },
    { value: 'open', label: 'Open Registration' },
    { value: 'ongoing', label: 'Ongoing' },
    { value: 'selesai', label: 'Selesai' },
];

export default function TournamentsIndex({ tournaments, games }: TournamentsIndexProps) {
    const [search, setSearch] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedGame, setSelectedGame] = useState('');

    const handleFilter = () => {
        router.get(
            '/tournaments',
            { search, status: selectedStatus, game_id: selectedGame },
            { preserveState: true },
        );
    };

    return (
        <>
            <Head title="Turnamen - EsportHub" />

            <div className="dark min-h-screen bg-background text-foreground">
                {/* Header */}
                <div className="border-b border-border bg-card/50">
                    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl gaming-gradient">
                                <Trophy className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-black text-foreground">Semua Turnamen</h1>
                                <p className="text-sm text-muted-foreground">
                                    {tournaments.total} turnamen tersedia
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
                    {/* Filters */}
                    <div className="mb-8 flex flex-col gap-3 sm:flex-row">
                        <div className="relative flex-1">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Cari turnamen..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleFilter()}
                                className="w-full rounded-lg border border-border bg-card py-2.5 pr-4 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                        </div>

                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                            {statusOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>

                        <select
                            value={selectedGame}
                            onChange={(e) => setSelectedGame(e.target.value)}
                            className="rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                            <option value="">Semua Game</option>
                            {games.map((game) => (
                                <option key={game.id} value={game.id}>
                                    {game.nama_game}
                                </option>
                            ))}
                        </select>

                        <button
                            onClick={handleFilter}
                            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                        >
                            <Filter className="h-4 w-4" />
                            Filter
                        </button>
                    </div>

                    {/* Grid */}
                    {tournaments.data.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {tournaments.data.map((tournament) => (
                                    <TournamentCard key={tournament.id} tournament={tournament} />
                                ))}
                            </div>

                            {/* Pagination */}
                            {tournaments.last_page > 1 && (
                                <div className="mt-8 flex items-center justify-center gap-2">
                                    {tournaments.links.map((link, i) => (
                                        <button
                                            key={i}
                                            disabled={!link.url}
                                            onClick={() => link.url && router.visit(link.url)}
                                            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                                                link.active
                                                    ? 'bg-primary text-primary-foreground'
                                                    : link.url
                                                      ? 'border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
                                                      : 'cursor-not-allowed border border-border/30 text-muted-foreground/30'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <Trophy className="mb-4 h-16 w-16 text-muted-foreground/20" />
                            <h3 className="mb-2 text-lg font-bold text-foreground">Tidak Ada Turnamen</h3>
                            <p className="text-sm text-muted-foreground">
                                Belum ada turnamen yang sesuai dengan filter Anda.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
