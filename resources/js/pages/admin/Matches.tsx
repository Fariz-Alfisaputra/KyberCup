import { Head, router, useForm } from '@inertiajs/react';
import { Plus, Swords, Trophy } from 'lucide-react';
import { useState } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import type { TournamentMatch } from '@/types';

interface AdminMatch extends TournamentMatch {
    tournament: { id: number; nama: string };
}

interface PaginatedMatches {
    data: AdminMatch[];
    current_page: number;
    last_page: number;
    total: number;
    links: Array<{ url: string | null; label: string; active: boolean }>;
}

interface MatchesProps {
    matches: PaginatedMatches;
}

const statusColors = {
    scheduled: 'bg-blue-500/20 text-blue-400',
    ongoing: 'bg-yellow-500/20 text-yellow-400',
    selesai: 'bg-emerald-500/20 text-emerald-400',
    walkover: 'bg-zinc-500/20 text-zinc-400',
};

export default function AdminMatches({ matches }: MatchesProps) {
    const [editingMatch, setEditingMatch] = useState<AdminMatch | null>(null);

    const form = useForm({
        winner_id: '',
        skor_team1: 0,
        skor_team2: 0,
        catatan: '',
    });

    const openEdit = (match: AdminMatch) => {
        form.setData({
            winner_id: match.winner?.id.toString() ?? '',
            skor_team1: match.skor_team1,
            skor_team2: match.skor_team2,
            catatan: match.catatan ?? '',
        });
        setEditingMatch(match);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!editingMatch) {
            return;
        }

        form.put(`/admin/matches/${editingMatch.id}/result`, {
            onSuccess: () => setEditingMatch(null),
        });
    };

    return (
        <AdminLayout title="Manajemen Match">
            <Head title="Matches - Admin EsportHub" />

            <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                    {matches.total} match terdaftar
                </p>

                <div className="overflow-x-auto rounded-xl border border-border bg-card">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border bg-muted/30">
                                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">
                                    Turnamen
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">
                                    Match
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground">
                                    Skor
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">
                                    Round
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">
                                    Status
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {matches.data.map((match) => (
                                <tr
                                    key={match.id}
                                    className="border-b border-border/50 last:border-0 hover:bg-muted/10"
                                >
                                    <td className="px-4 py-3 text-muted-foreground">
                                        {match.tournament.nama}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium">
                                                {match.team1?.nama_tim ?? 'TBD'}
                                            </span>
                                            <Swords className="h-3.5 w-3.5 text-muted-foreground" />
                                            <span className="font-medium">
                                                {match.team2?.nama_tim ?? 'TBD'}
                                            </span>
                                        </div>
                                        {match.winner && (
                                            <div className="mt-1 flex items-center gap-1 text-xs text-violet-400">
                                                <Trophy className="h-3 w-3" />
                                                {match.winner.nama_tim}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-center font-bold tabular-nums">
                                        {match.status !== 'scheduled' ? (
                                            <span>
                                                {match.skor_team1} -{' '}
                                                {match.skor_team2}
                                            </span>
                                        ) : (
                                            <span className="text-muted-foreground">
                                                vs
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">
                                        Round {match.round}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[match.status]}`}
                                        >
                                            {match.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        {match.status !== 'selesai' &&
                                            match.status !== 'walkover' && (
                                                <button
                                                    onClick={() =>
                                                        openEdit(match)
                                                    }
                                                    className="flex items-center gap-1 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
                                                >
                                                    <Plus className="h-3 w-3" />
                                                    Input Skor
                                                </button>
                                            )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Input Skor Modal */}
            {editingMatch && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl">
                        <h3 className="mb-1 text-lg font-bold">
                            Input Hasil Match
                        </h3>
                        <p className="mb-4 text-sm text-muted-foreground">
                            {editingMatch.team1?.nama_tim} vs{' '}
                            {editingMatch.team2?.nama_tim}
                        </p>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="mb-1.5 block text-sm font-medium">
                                    Pemenang
                                </label>
                                <select
                                    value={form.data.winner_id}
                                    onChange={(e) =>
                                        form.setData(
                                            'winner_id',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                                >
                                    <option value="">Pilih pemenang...</option>
                                    {editingMatch.team1 && (
                                        <option value={editingMatch.team1.id}>
                                            {editingMatch.team1.nama_tim}
                                        </option>
                                    )}
                                    {editingMatch.team2 && (
                                        <option value={editingMatch.team2.id}>
                                            {editingMatch.team2.nama_tim}
                                        </option>
                                    )}
                                </select>
                                {form.errors.winner_id && (
                                    <p className="mt-1 text-xs text-destructive">
                                        {form.errors.winner_id}
                                    </p>
                                )}
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium">
                                        Skor {editingMatch.team1?.nama_tim}
                                    </label>
                                    <input
                                        type="number"
                                        min={0}
                                        value={form.data.skor_team1}
                                        onChange={(e) =>
                                            form.setData(
                                                'skor_team1',
                                                parseInt(e.target.value),
                                            )
                                        }
                                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium">
                                        Skor {editingMatch.team2?.nama_tim}
                                    </label>
                                    <input
                                        type="number"
                                        min={0}
                                        value={form.data.skor_team2}
                                        onChange={(e) =>
                                            form.setData(
                                                'skor_team2',
                                                parseInt(e.target.value),
                                            )
                                        }
                                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="mb-1.5 block text-sm font-medium">
                                    Catatan (opsional)
                                </label>
                                <textarea
                                    value={form.data.catatan}
                                    onChange={(e) =>
                                        form.setData('catatan', e.target.value)
                                    }
                                    rows={2}
                                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                                />
                            </div>
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setEditingMatch(null)}
                                    className="flex-1 rounded-lg border border-border py-2.5 text-sm text-muted-foreground"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={form.processing}
                                    className="flex-1 rounded-lg bg-primary py-2.5 text-sm font-bold text-primary-foreground disabled:opacity-50"
                                >
                                    {form.processing
                                        ? 'Menyimpan...'
                                        : 'Simpan Hasil'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
