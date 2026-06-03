import { Head, Link, router, useForm } from '@inertiajs/react';
import { Plus, Trash2, Trophy, Zap } from 'lucide-react';
import AdminLayout from '@/layouts/AdminLayout';
import type { TournamentListItem, Game } from '@/types';

interface AdminTournament extends TournamentListItem {
    creator: { id: number; name: string };
    registrations_count: number;
    registration_deadline: string | null;
    game: Pick<Game, 'id' | 'nama_game' | 'logo_url'>;
}

interface PaginatedTournaments {
    data: AdminTournament[];
    current_page: number;
    last_page: number;
    total: number;
    links: Array<{ url: string | null; label: string; active: boolean }>;
}

interface TournamentsProps {
    tournaments: PaginatedTournaments;
}

const statusConfig = {
    draft: { label: 'Draft', className: 'bg-zinc-500/20 text-zinc-400' },
    open: { label: 'Open', className: 'bg-emerald-500/20 text-emerald-400' },
    ongoing: { label: 'Ongoing', className: 'bg-violet-500/20 text-violet-400' },
    selesai: { label: 'Selesai', className: 'bg-blue-500/20 text-blue-400' },
};

export default function AdminTournaments({ tournaments }: TournamentsProps) {
    const handleDelete = (id: number, nama: string) => {
        if (confirm(`Hapus turnamen "${nama}"? Semua data terkait (match, standing, registrasi) akan ikut terhapus.`)) {
            router.delete(`/admin/tournaments/${id}`);
        }
    };

    const handleGenerateBracket = (id: number, nama: string) => {
        if (confirm(`Generate bracket untuk turnamen "${nama}"? Bracket yang ada akan dihapus dan dibuat ulang.`)) {
            router.post(`/admin/tournaments/${id}/bracket`);
        }
    };

    return (
        <AdminLayout title="Manajemen Turnamen">
            <Head title="Tournaments - Admin EsportHub" />

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">{tournaments.total} turnamen terdaftar</p>
                    <Link
                        href="/admin/tournaments/create"
                        className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                    >
                        <Plus className="h-4 w-4" />
                        Buat Turnamen
                    </Link>
                </div>

                <div className="overflow-hidden rounded-xl border border-border bg-card">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border bg-muted/30">
                                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Turnamen</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Game</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Status</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground">Tim</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Mulai</th>
                                <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tournaments.data.map((tournament) => {
                                const statusInfo = statusConfig[tournament.status as keyof typeof statusConfig];

                                return (
                                    <tr key={tournament.id} className="border-b border-border/50 last:border-0 hover:bg-muted/10">
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2.5">
                                                {tournament.banner_url ? (
                                                    <img
                                                        src={tournament.banner_url}
                                                        alt={tournament.nama}
                                                        className="h-8 w-12 rounded object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-8 w-12 items-center justify-center rounded bg-primary/10">
                                                        <Trophy className="h-4 w-4 text-primary" />
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="font-medium text-foreground">{tournament.nama}</p>
                                                    {tournament.hadiah && (
                                                        <p className="text-xs text-amber-400">{tournament.hadiah}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">{tournament.game.nama_game}</td>
                                        <td className="px-4 py-3">
                                            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusInfo.className}`}>
                                                {statusInfo.label}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center text-muted-foreground">
                                            {tournament.registrations_count}/{tournament.max_tim}
                                        </td>
                                        <td className="px-4 py-3 text-xs text-muted-foreground">
                                            {tournament.tanggal_mulai
                                                ? new Date(tournament.tanggal_mulai).toLocaleDateString('id-ID')
                                                : '-'}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-end gap-2">
                                                {tournament.status !== 'selesai' && (
                                                    <button
                                                        onClick={() => handleGenerateBracket(tournament.id, tournament.nama)}
                                                        className="flex items-center gap-1 rounded-lg bg-emerald-500/10 px-2.5 py-1.5 text-xs font-medium text-emerald-400 hover:bg-emerald-500/20"
                                                        title="Generate Bracket"
                                                    >
                                                        <Zap className="h-3 w-3" />
                                                        Bracket
                                                    </button>
                                                )}
                                                <Link
                                                    href={`/admin/tournaments/${tournament.id}/edit`}
                                                    className="rounded-lg bg-primary/10 px-2.5 py-1.5 text-xs font-medium text-primary hover:bg-primary/20"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(tournament.id, tournament.nama)}
                                                    className="rounded-lg p-1.5 text-muted-foreground hover:bg-red-500/10 hover:text-red-400"
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {tournaments.data.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-16">
                            <Trophy className="mb-3 h-10 w-10 text-muted-foreground/30" />
                            <p className="text-sm text-muted-foreground">Belum ada turnamen.</p>
                        </div>
                    )}
                </div>

                {tournaments.last_page > 1 && (
                    <div className="flex items-center justify-center gap-2">
                        {tournaments.links.map((link, i) => (
                            <button
                                key={i}
                                disabled={!link.url}
                                onClick={() => link.url && router.visit(link.url)}
                                className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                                    link.active
                                        ? 'bg-primary text-primary-foreground'
                                        : link.url
                                          ? 'border border-border text-muted-foreground hover:text-foreground'
                                          : 'cursor-not-allowed border border-border/30 text-muted-foreground/30'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
