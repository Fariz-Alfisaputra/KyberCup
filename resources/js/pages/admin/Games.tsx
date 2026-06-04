import { Head, router, useForm } from '@inertiajs/react';
import { Edit2, Gamepad2, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import type { Game } from '@/types';

interface PaginatedGames {
    data: (Game & { tournaments_count: number })[];
    current_page: number;
    last_page: number;
    total: number;
    links: Array<{ url: string | null; label: string; active: boolean }>;
}

interface GamesProps {
    games: PaginatedGames;
}

export default function AdminGames({ games }: GamesProps) {
    const [showModal, setShowModal] = useState(false);
    const [editingGame, setEditingGame] = useState<Game | null>(null);

    const form = useForm({
        nama_game: '',
        genre: '',
        deskripsi: '',
        is_active: true as boolean,
        logo: null as File | null,
    });

    const openCreate = () => {
        form.reset();
        setEditingGame(null);
        setShowModal(true);
    };

    const openEdit = (game: Game) => {
        form.setData({
            nama_game: game.nama_game,
            genre: game.genre,
            deskripsi: game.deskripsi ?? '',
            is_active: game.is_active,
            logo: null,
        });
        setEditingGame(game);
        setShowModal(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingGame) {
            form.post(`/admin/games/${editingGame.id}?_method=PUT`, {
                forceFormData: true,
                onSuccess: () => setShowModal(false),
            });
        } else {
            form.post('/admin/games', {
                forceFormData: true,
                onSuccess: () => setShowModal(false),
            });
        }
    };

    const handleDelete = (id: number, nama: string) => {
        if (
            confirm(
                `Hapus game "${nama}"? Ini akan menghapus semua turnamen terkait.`,
            )
        ) {
            router.delete(`/admin/games/${id}`);
        }
    };

    return (
        <AdminLayout title="Manajemen Game">
            <Head title="Games - Admin EsportHub" />

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                        {games.total} game terdaftar
                    </p>
                    <button
                        onClick={openCreate}
                        className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                    >
                        <Plus className="h-4 w-4" />
                        Tambah Game
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {games.data.map((game) => (
                        <div
                            key={game.id}
                            className="rounded-xl border border-border bg-card p-4"
                        >
                            <div className="mb-3 flex items-start justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    {game.logo_url ? (
                                        <img
                                            loading="lazy"
                                            src={game.logo_url}
                                            alt={game.nama_game}
                                            className="h-12 w-12 rounded-xl object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                                            <Gamepad2 className="h-6 w-6 text-primary" />
                                        </div>
                                    )}
                                    <div>
                                        <p className="font-bold text-foreground">
                                            {game.nama_game}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {game.genre}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    <button
                                        onClick={() => openEdit(game)}
                                        className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                    >
                                        <Edit2 className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDelete(
                                                game.id,
                                                game.nama_game,
                                            )
                                        }
                                        className="rounded-lg p-1.5 text-muted-foreground hover:bg-red-500/10 hover:text-red-400"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">
                                    {game.tournaments_count} turnamen
                                </span>
                                <span
                                    className={`rounded-full px-2 py-0.5 font-medium ${game.is_active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-500/20 text-zinc-400'}`}
                                >
                                    {game.is_active ? 'Aktif' : 'Nonaktif'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl">
                        <h3 className="mb-4 text-lg font-bold">
                            {editingGame ? 'Edit Game' : 'Tambah Game'}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Nama Game
                                </label>
                                <input
                                    type="text"
                                    value={form.data.nama_game}
                                    onChange={(e) =>
                                        form.setData(
                                            'nama_game',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                                />
                                {form.errors.nama_game && (
                                    <p className="mt-1 text-xs text-destructive">
                                        {form.errors.nama_game}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Genre
                                </label>
                                <input
                                    type="text"
                                    value={form.data.genre}
                                    onChange={(e) =>
                                        form.setData('genre', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Logo
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        form.setData(
                                            'logo',
                                            e.target.files?.[0] ?? null,
                                        )
                                    }
                                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-muted-foreground focus:border-primary focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Deskripsi
                                </label>
                                <textarea
                                    value={form.data.deskripsi}
                                    onChange={(e) =>
                                        form.setData(
                                            'deskripsi',
                                            e.target.value,
                                        )
                                    }
                                    rows={3}
                                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={form.data.is_active}
                                    onChange={(e) =>
                                        form.setData(
                                            'is_active',
                                            e.target.checked,
                                        )
                                    }
                                    className="rounded border-border"
                                />
                                <label htmlFor="is_active" className="text-sm">
                                    Aktif
                                </label>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 rounded-lg border border-border py-2.5 text-sm text-muted-foreground hover:bg-muted/50"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={form.processing}
                                    className="flex-1 rounded-lg bg-primary py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                                >
                                    {form.processing
                                        ? 'Menyimpan...'
                                        : editingGame
                                          ? 'Simpan'
                                          : 'Tambah'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
