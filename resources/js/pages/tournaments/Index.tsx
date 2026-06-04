import { Head, router } from '@inertiajs/react';
import { Search, Trophy, Gamepad2, X, Filter } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import TournamentCard from '@/components/tournament/TournamentCard';
import AppLayout from '@/layouts/AppLayout';
import { decodeHtmlEntities } from '@/lib/formatters';
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
    background: 'var(--bg-surface-2)',
    border: '1px solid var(--border-default)',
    color: 'var(--text-primary)',
    borderRadius: '0.5rem',
    padding: '0.6rem 0.75rem',
    fontFamily: 'Rajdhani, sans-serif',
    fontSize: '0.85rem',
    letterSpacing: '0.04em',
    outline: 'none',
    appearance: 'auto' as const,
    transition: 'border-color 0.2s, box-shadow 0.2s',
};

export default function TournamentsIndex({
    tournaments,
    games,
    filters,
}: TournamentsIndexProps) {
    const [search, setSearch] = useState(filters?.search || '');
    const [selectedStatus, setSelectedStatus] = useState(filters?.status || '');
    const [selectedGame, setSelectedGame] = useState(filters?.game_id || '');
    const [isFiltering, setIsFiltering] = useState(false);

    const hasActiveFilters =
        search !== '' || selectedStatus !== '' || selectedGame !== '';

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
                Object.entries(params).filter(([, v]) => v !== ''),
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
                        style={{
                            fontFamily: 'Rajdhani, sans-serif',
                            color: 'var(--text-primary)',
                        }}
                    >
                        Semua{' '}
                        <span
                            style={{
                                color: 'var(--accent-primary)',
                                textShadow:
                                    '0 0 10px var(--accent-primary-glow)',
                            }}
                        >
                            Turnamen
                        </span>
                    </h2>
                    <p
                        className="mt-1 text-sm"
                        style={{
                            color: 'var(--text-muted)',
                            fontFamily: 'Rajdhani, sans-serif',
                        }}
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
                                style={{
                                    color: isFiltering
                                        ? 'var(--accent-primary)'
                                        : 'var(--border-strong)',
                                }}
                            />
                            <input
                                type="text"
                                id="tournament-search"
                                placeholder="Cari nama atau deskripsi turnamen..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) =>
                                    e.key === 'Enter' && applyFilters()
                                }
                                style={{
                                    ...inputStyle,
                                    width: '100%',
                                    paddingLeft: '2.5rem',
                                    paddingRight: search ? '2.5rem' : undefined,
                                }}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor =
                                        'var(--accent-primary)';
                                    e.currentTarget.style.boxShadow =
                                        '0 0 0 3px var(--accent-primary-glow)';
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor =
                                        'var(--border-default)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            />
                            {search && (
                                <button
                                    onClick={() => {
                                        setSearch('');
                                        applyFilters({ search: '' });
                                    }}
                                    className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
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
                                <option
                                    key={opt.value}
                                    value={opt.value}
                                    style={{
                                        background: 'var(--bg-surface-2)',
                                    }}
                                >
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
                            <option
                                value=""
                                style={{ background: 'var(--bg-surface-2)' }}
                            >
                                Semua Game
                            </option>
                            {games.map((game) => (
                                <option
                                    key={game.id}
                                    value={game.id}
                                    style={{
                                        background: 'var(--bg-surface-2)',
                                    }}
                                >
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
                                    background: 'var(--status-cancel-bg)',
                                    border: '1px solid var(--border-strong)',
                                    color: 'var(--status-cancel-text)',
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
                            style={{
                                color: 'var(--text-muted)',
                                fontFamily: 'Rajdhani, sans-serif',
                            }}
                        >
                            {isFiltering ? (
                                <span
                                    style={{ color: 'var(--accent-primary)' }}
                                >
                                    Mencari...
                                </span>
                            ) : (
                                <>
                                    Menampilkan{' '}
                                    <span
                                        style={{
                                            color: 'var(--accent-primary)',
                                            fontWeight: 700,
                                        }}
                                    >
                                        {tournaments.data.length}
                                    </span>{' '}
                                    dari{' '}
                                    <span
                                        style={{
                                            fontWeight: 600,
                                            color: 'var(--text-primary)',
                                        }}
                                    >
                                        {tournaments.total}
                                    </span>{' '}
                                    turnamen
                                    {hasActiveFilters && (
                                        <span
                                            style={{
                                                color: 'var(--border-strong)',
                                            }}
                                        >
                                            {' '}
                                            (filter aktif)
                                        </span>
                                    )}
                                </>
                            )}
                        </p>

                        {/* Active filter chips */}
                        {hasActiveFilters && (
                            <div className="flex flex-wrap items-center justify-end gap-2">
                                {search && (
                                    <span
                                        className="flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium"
                                        style={{
                                            background: 'var(--status-open-bg)',
                                            color: 'var(--accent-primary)',
                                            border: '1px solid var(--border-accent)',
                                        }}
                                    >
                                        <Search className="h-3 w-3" /> "{search}
                                        "
                                    </span>
                                )}
                                {selectedStatus && (
                                    <span
                                        className="flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium"
                                        style={{
                                            background:
                                                'var(--status-ongoing-bg)',
                                            color: 'var(--status-ongoing-text)',
                                            border: '1px solid var(--border-default)',
                                        }}
                                    >
                                        <Filter className="h-3 w-3" />
                                        {
                                            STATUS_OPTIONS.find(
                                                (o) =>
                                                    o.value === selectedStatus,
                                            )?.label
                                        }
                                    </span>
                                )}
                                {selectedGame && (
                                    <span
                                        className="flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium"
                                        style={{
                                            background: 'var(--accent-gold-bg)',
                                            color: 'var(--accent-gold)',
                                            border: '1px solid var(--border-strong)',
                                        }}
                                    >
                                        <Gamepad2 className="h-3 w-3" />
                                        {
                                            games.find(
                                                (g) =>
                                                    String(g.id) ===
                                                    selectedGame,
                                            )?.nama_game
                                        }
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
                                    <TournamentCard
                                        key={tournament.id}
                                        tournament={tournament}
                                    />
                                ))}
                            </div>

                            {/* Pagination */}
                            {tournaments.last_page > 1 && (
                                <div className="mt-10 flex items-center justify-center gap-2">
                                    {tournaments.links.map((link, i) => (
                                        <button
                                            key={i}
                                            disabled={!link.url}
                                            onClick={() =>
                                                link.url &&
                                                router.visit(link.url)
                                            }
                                            className="rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200"
                                            style={
                                                link.active
                                                    ? {
                                                          background:
                                                              'var(--accent-primary-glow)',
                                                          border: '1px solid var(--border-accent)',
                                                          color: 'var(--accent-primary)',
                                                          boxShadow:
                                                              '0 0 10px var(--accent-primary-glow)',
                                                          fontFamily:
                                                              'Rajdhani, sans-serif',
                                                      }
                                                    : link.url
                                                      ? {
                                                            background:
                                                                'transparent',
                                                            border: '1px solid var(--border-default)',
                                                            color: 'var(--text-secondary)',
                                                            fontFamily:
                                                                'Rajdhani, sans-serif',
                                                        }
                                                      : {
                                                            background:
                                                                'transparent',
                                                            border: '1px solid var(--border-default)',
                                                            color: 'var(--text-muted)',
                                                            cursor: 'not-allowed',
                                                            fontFamily:
                                                                'Rajdhani, sans-serif',
                                                        }
                                            }
                                            dangerouslySetInnerHTML={undefined}
                                        >
                                            {decodeHtmlEntities(link.label)}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        /* ── Empty State ── */
                        <div className="flex flex-col items-center justify-center py-24 text-center">
                            {/* Animated icon */}
                            <div
                                className="relative mb-6"
                                style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    background: 'var(--accent-primary-light)',
                                    border: '1px solid var(--border-default)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Trophy
                                    className="h-10 w-10"
                                    style={{
                                        color: 'var(--accent-primary-glow)',
                                    }}
                                />
                                {/* Ping ring */}
                                <div
                                    className="absolute inset-0 rounded-full"
                                    style={{
                                        border: '1px solid var(--border-accent)',
                                        animation:
                                            'force-pulse 2.5s ease-in-out infinite',
                                    }}
                                />
                            </div>
                            <h3
                                className="mb-2 text-xl font-black tracking-wider uppercase"
                                style={{
                                    fontFamily: 'Rajdhani, sans-serif',
                                    color: 'var(--text-primary)',
                                }}
                            >
                                {hasActiveFilters
                                    ? 'Tidak Ada Hasil'
                                    : 'Belum Ada Turnamen'}
                            </h3>
                            <p
                                className="mb-6 max-w-xs text-sm"
                                style={{
                                    color: 'var(--text-muted)',
                                    fontFamily: 'Rajdhani, sans-serif',
                                    lineHeight: 1.6,
                                }}
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
                                        background:
                                            'var(--accent-primary-light)',
                                        border: '1px solid var(--border-accent)',
                                        color: 'var(--accent-primary)',
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
