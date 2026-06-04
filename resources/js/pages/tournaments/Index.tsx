import { Head, router } from '@inertiajs/react';
import { Search, Trophy, Gamepad2, X, Filter } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import TournamentCard from '@/components/tournament/TournamentCard';
import AppLayout from '@/layouts/AppLayout';
import type { TournamentListItem, Game } from '@/types';

interface PaginatedTournaments {
    data: TournamentListItem[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{ url: string | null; label: string; active: boolean }>;
}

interface Filters {
    search: string;
    status: string;
    game_id: string;
}

interface TournamentsIndexProps {
    tournaments: PaginatedTournaments;
    games: Pick<Game, 'id' | 'nama_game'>[];
    filters: Filters;
}

const STATUS_OPTIONS = [
    { value: '', label: 'Semua Status' },
    { value: 'open', label: '🟢 Open Registration' },
    { value: 'ongoing', label: '🟣 Ongoing' },
    { value: 'selesai', label: '🔵 Selesai' },
    { value: 'dibatalkan', label: '🔴 Dibatalkan' },
];

const inputStyle: React.CSSProperties = {
    background: 'rgba(10,10,15,0.8)',
    border: '1px solid rgba(0,212,255,0.2)',
    color: '#f0f4ff',
    borderRadius: '0.5rem',
    padding: '0.6rem 0.75rem',
    fontFamily: 'Rajdhani, sans-serif',
    fontSize: '0.85rem',
    letterSpacing: '0.04em',
    outline: 'none',
    appearance: 'auto' as const,
    transition: 'border-color 0.2s, box-shadow 0.2s',
};

export default function TournamentsIndex({ tournaments, games, filters }: TournamentsIndexProps) {
    const [search, setSearch] = useState(filters?.search || '');
    const [selectedStatus, setSelectedStatus] = useState(filters?.status || '');
    const [selectedGame, setSelectedGame] = useState(filters?.game_id || '');
    const [isFiltering, setIsFiltering] = useState(false);

    const hasActiveFilters = search !== '' || selectedStatus !== '' || selectedGame !== '';

    // Core filter dispatch
    const applyFilters = useCallback(
        (overrides: Partial<Filters> = {}) => {
            const params = {
                search: search,
                status: selectedStatus,
                game_id: selectedGame,
                ...overrides,
            };
            // Strip empty params to keep URL clean
            const clean = Object.fromEntries(
                Object.entries(params).filter(([, v]) => v !== '')
            );
            setIsFiltering(true);
            router.get('/tournaments', clean, {
                preserveState: true,
                preserveScroll: true,
                onFinish: () => setIsFiltering(false),
            });
        },
        [search, selectedStatus, selectedGame],
    );

    // Auto-submit when dropdown changes
    const handleStatusChange = (val: string) => {
        setSelectedStatus(val);
        applyFilters({ status: val });
    };

    const handleGameChange = (val: string) => {
        setSelectedGame(val);
        applyFilters({ game_id: val });
    };

    // Debounced search (400ms)
    useEffect(() => {
        const timer = setTimeout(() => {
            applyFilters({ search });
        }, 400);
        return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    const clearFilters = () => {
        setSearch('');
        setSelectedStatus('');
        setSelectedGame('');
        router.get('/tournaments', {}, { preserveState: false });
    };

    return (
        <AppLayout title="Turnamen">
            <Head title="Turnamen - KyberCup" />

            <div>
                {/* ── Page Title ── */}
                <div className="mb-6">
                    <h2
                        className="text-2xl font-black tracking-wider uppercase"
                        style={{ fontFamily: 'Rajdhani, sans-serif', color: '#f0f4ff' }}
                    >
                        Semua{' '}
                        <span
                            style={{
                                color: 'var(--sw-blue-neon)',
                                textShadow: '0 0 10px rgba(0,212,255,0.5)',
                            }}
                        >
                            Turnamen
                        </span>
                    </h2>
                    <p
                        className="text-sm mt-1"
                        style={{ color: 'rgba(240,244,255,0.4)', fontFamily: 'Rajdhani, sans-serif' }}
                    >
                        {tournaments.total} turnamen tersedia di galaksi
                    </p>
                </div>

                <div>
                    {/* ── Filter Bar ── */}
                    <div className="mb-6 flex flex-col gap-3 sm:flex-row">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search
                                className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
                                style={{ color: isFiltering ? 'rgba(0,212,255,0.8)' : 'rgba(0,212,255,0.5)' }}
                            />
                            <input
                                type="text"
                                id="tournament-search"
                                placeholder="Cari nama atau deskripsi turnamen..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
                                style={{ ...inputStyle, width: '100%', paddingLeft: '2.5rem', paddingRight: search ? '2.5rem' : undefined }}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--sw-blue-neon)';
                                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,212,255,0.1)';
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = 'rgba(0,212,255,0.2)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            />
                            {search && (
                                <button
                                    onClick={() => { setSearch(''); applyFilters({ search: '' }); }}
                                    className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <X className="h-3.5 w-3.5" />
                                </button>
                            )}
                        </div>

                        {/* Status filter */}
                        <select
                            id="tournament-status-filter"
                            value={selectedStatus}
                            onChange={(e) => handleStatusChange(e.target.value)}
                            style={inputStyle}
                        >
                            {STATUS_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value} style={{ background: '#0a0a0f' }}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>

                        {/* Game filter */}
                        <select
                            id="tournament-game-filter"
                            value={selectedGame}
                            onChange={(e) => handleGameChange(e.target.value)}
                            style={inputStyle}
                        >
                            <option value="" style={{ background: '#0a0a0f' }}>Semua Game</option>
                            {games.map((game) => (
                                <option key={game.id} value={game.id} style={{ background: '#0a0a0f' }}>
                                    {game.nama_game}
                                </option>
                            ))}
                        </select>

                        {/* Clear button — only when active filters exist */}
                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200"
                                style={{
                                    background: 'rgba(255,45,45,0.08)',
                                    border: '1px solid rgba(255,45,45,0.3)',
                                    color: 'var(--sw-red-sith)',
                                    fontFamily: 'Rajdhani, sans-serif',
                                    letterSpacing: '0.06em',
                                }}
                            >
                                <X className="h-4 w-4" />
                                Reset
                            </button>
                        )}
                    </div>

                    {/* ── Result count ── */}
                    <div className="mb-5 flex items-center justify-between">
                        <p
                            className="text-sm"
                            style={{ color: 'rgba(240,244,255,0.45)', fontFamily: 'Rajdhani, sans-serif' }}
                        >
                            {isFiltering ? (
                                <span style={{ color: 'rgba(0,212,255,0.6)' }}>Mencari...</span>
                            ) : (
                                <>
                                    Menampilkan{' '}
                                    <span style={{ color: 'var(--sw-blue-neon)', fontWeight: 700 }}>
                                        {tournaments.data.length}
                                    </span>
                                    {' '}dari{' '}
                                    <span style={{ fontWeight: 600, color: '#f0f4ff' }}>
                                        {tournaments.total}
                                    </span>
                                    {' '}turnamen
                                    {hasActiveFilters && (
                                        <span style={{ color: 'rgba(0,212,255,0.5)' }}> (filter aktif)</span>
                                    )}
                                </>
                            )}
                        </p>

                        {/* Active filter chips */}
                        {hasActiveFilters && (
                            <div className="flex items-center gap-2 flex-wrap justify-end">
                                {search && (
                                    <span
                                        className="flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium"
                                        style={{ background: 'rgba(0,212,255,0.1)', color: 'var(--sw-blue-neon)', border: '1px solid rgba(0,212,255,0.2)' }}
                                    >
                                        <Search className="h-3 w-3" /> "{search}"
                                    </span>
                                )}
                                {selectedStatus && (
                                    <span
                                        className="flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium"
                                        style={{ background: 'rgba(124,58,237,0.1)', color: '#a78bfa', border: '1px solid rgba(124,58,237,0.2)' }}
                                    >
                                        <Filter className="h-3 w-3" />
                                        {STATUS_OPTIONS.find(o => o.value === selectedStatus)?.label}
                                    </span>
                                )}
                                {selectedGame && (
                                    <span
                                        className="flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium"
                                        style={{ background: 'rgba(255,232,31,0.08)', color: 'var(--sw-gold)', border: '1px solid rgba(255,232,31,0.2)' }}
                                    >
                                        <Gamepad2 className="h-3 w-3" />
                                        {games.find(g => String(g.id) === selectedGame)?.nama_game}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    {/* ── Tournament Grid ── */}
                    {tournaments.data.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {tournaments.data.map((tournament) => (
                                    <TournamentCard key={tournament.id} tournament={tournament} />
                                ))}
                            </div>

                            {/* Pagination */}
                            {tournaments.last_page > 1 && (
                                <div className="mt-10 flex items-center justify-center gap-2">
                                    {tournaments.links.map((link, i) => (
                                        <button
                                            key={i}
                                            disabled={!link.url}
                                            onClick={() => link.url && router.visit(link.url)}
                                            className="rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200"
                                            style={
                                                link.active
                                                    ? {
                                                          background: 'rgba(0,212,255,0.15)',
                                                          border: '1px solid rgba(0,212,255,0.4)',
                                                          color: 'var(--sw-blue-neon)',
                                                          boxShadow: '0 0 10px rgba(0,212,255,0.2)',
                                                          fontFamily: 'Rajdhani, sans-serif',
                                                      }
                                                    : link.url
                                                      ? {
                                                            background: 'transparent',
                                                            border: '1px solid rgba(255,255,255,0.1)',
                                                            color: 'rgba(240,244,255,0.5)',
                                                            fontFamily: 'Rajdhani, sans-serif',
                                                        }
                                                      : {
                                                            background: 'transparent',
                                                            border: '1px solid rgba(255,255,255,0.04)',
                                                            color: 'rgba(240,244,255,0.2)',
                                                            cursor: 'not-allowed',
                                                            fontFamily: 'Rajdhani, sans-serif',
                                                        }
                                            }
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        /* ── Empty State ── */
                        <div className="flex flex-col items-center justify-center py-24 text-center">
                            {/* Animated icon */}
                            <div
                                className="mb-6 relative"
                                style={{
                                    width: '80px', height: '80px',
                                    borderRadius: '50%',
                                    background: 'rgba(0,212,255,0.05)',
                                    border: '1px solid rgba(0,212,255,0.1)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}
                            >
                                <Trophy
                                    className="h-10 w-10"
                                    style={{ color: 'rgba(0,212,255,0.2)' }}
                                />
                                {/* Ping ring */}
                                <div
                                    className="absolute inset-0 rounded-full"
                                    style={{
                                        border: '1px solid rgba(0,212,255,0.15)',
                                        animation: 'force-pulse 2.5s ease-in-out infinite',
                                    }}
                                />
                            </div>
                            <h3
                                className="mb-2 text-xl font-black tracking-wider uppercase"
                                style={{ fontFamily: 'Rajdhani, sans-serif', color: '#f0f4ff' }}
                            >
                                {hasActiveFilters ? 'Tidak Ada Hasil' : 'Belum Ada Turnamen'}
                            </h3>
                            <p
                                className="text-sm mb-6 max-w-xs"
                                style={{ color: 'rgba(240,244,255,0.4)', fontFamily: 'Rajdhani, sans-serif', lineHeight: 1.6 }}
                            >
                                {hasActiveFilters
                                    ? 'Tidak ada turnamen yang sesuai dengan filter yang aktif. Coba ganti atau hapus filter.'
                                    : 'Galaksi ini belum memiliki turnamen. Cek lagi nanti, Padawan.'}
                            </p>
                            {hasActiveFilters && (
                                <button
                                    onClick={clearFilters}
                                    className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold transition-all"
                                    style={{
                                        background: 'rgba(0,212,255,0.1)',
                                        border: '1px solid rgba(0,212,255,0.3)',
                                        color: 'var(--sw-blue-neon)',
                                        fontFamily: 'Rajdhani, sans-serif',
                                        letterSpacing: '0.08em',
                                    }}
                                >
                                    <X className="h-4 w-4" />
                                    Hapus Semua Filter
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
