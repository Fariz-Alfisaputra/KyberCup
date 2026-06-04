import { Head, Link, router } from '@inertiajs/react';
import { Search, Shield, Trophy, Users } from 'lucide-react';
import { useState } from 'react';
import { decodeHtmlEntities } from '@/lib/formatters';
import type { TeamListItem } from '@/types';

interface PaginatedTeams {
    data: TeamListItem[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{ url: string | null; label: string; active: boolean }>;
}

interface TeamsIndexProps {
    teams: PaginatedTeams;
}

export default function TeamsIndex({ teams }: TeamsIndexProps) {
    const [search, setSearch] = useState('');

    const handleSearch = () => {
        router.get('/teams', { search }, { preserveState: true });
    };

    return (
        <>
            <Head title="Tim Esport - EsportHub" />

            <div className="dark min-h-screen bg-background text-foreground">
                {/* Header */}
                <div className="border-b border-border bg-card/50">
                    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
                        <div className="flex items-center gap-3">
                            <div className="gaming-gradient flex h-10 w-10 items-center justify-center rounded-xl">
                                <Shield className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-black text-foreground">
                                    Direktori Tim
                                </h1>
                                <p className="text-sm text-muted-foreground">
                                    {teams.total} tim terdaftar
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
                    {/* Search bar */}
                    <div className="mb-8 flex flex-col gap-3 sm:flex-row">
                        <div className="relative flex-1">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Cari nama tim..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) =>
                                    e.key === 'Enter' && handleSearch()
                                }
                                className="w-full rounded-lg border border-border bg-card py-2.5 pr-4 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                            />
                        </div>
                        <button
                            onClick={handleSearch}
                            className="rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
                        >
                            Cari
                        </button>
                    </div>

                    {/* Grid */}
                    {teams.data.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {teams.data.map((team) => (
                                    <Link
                                        key={team.id}
                                        href={`/teams/${team.slug}`}
                                        className="group block"
                                    >
                                        <div className="rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                                            <div className="mb-4 flex items-center justify-between">
                                                {team.logo_url ? (
                                                    <img
                                                        loading="lazy"
                                                        src={team.logo_url}
                                                        alt={team.nama_tim}
                                                        className="h-16 w-16 rounded-xl object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
                                                        <Shield className="h-8 w-8 text-primary" />
                                                    </div>
                                                )}
                                                <div className="flex flex-col items-end">
                                                    <span className="flex items-center gap-1 rounded bg-secondary px-2 py-1 text-xs font-medium text-muted-foreground">
                                                        <Users className="h-3.5 w-3.5" />
                                                        {team.members_count}
                                                    </span>
                                                </div>
                                            </div>

                                            <h3 className="mb-1 text-lg font-bold text-foreground group-hover:text-primary">
                                                {team.nama_tim}
                                            </h3>
                                            {team.deskripsi ? (
                                                <p className="line-clamp-2 text-sm text-muted-foreground">
                                                    {team.deskripsi}
                                                </p>
                                            ) : (
                                                <p className="text-sm text-muted-foreground italic">
                                                    Tidak ada deskripsi
                                                </p>
                                            )}

                                            <div className="mt-4 flex items-center gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
                                                <span>Captain:</span>
                                                <span className="font-medium text-foreground">
                                                    {team.captain.name}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* Pagination */}
                            {teams.last_page > 1 && (
                                <div className="mt-8 flex items-center justify-center gap-2">
                                    {teams.links.map((link, i) => (
                                        <button
                                            key={i}
                                            disabled={!link.url}
                                            onClick={() =>
                                                link.url &&
                                                router.visit(link.url)
                                            }
                                            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                                                link.active
                                                    ? 'bg-primary text-primary-foreground'
                                                    : link.url
                                                      ? 'border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
                                                      : 'cursor-not-allowed border border-border/30 text-muted-foreground/30'
                                            }`}
                                            dangerouslySetInnerHTML={undefined}
                                        >
                                            {decodeHtmlEntities(link.label)}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <Shield className="mb-4 h-16 w-16 text-muted-foreground/20" />
                            <h3 className="mb-2 text-lg font-bold text-foreground">
                                Tidak Ada Tim
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Pencarian tidak menemukan hasil apapun.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
