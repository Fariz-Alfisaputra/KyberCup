import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Trophy, Upload } from 'lucide-react';
import AdminLayout from '@/layouts/AdminLayout';
import type { Game } from '@/types';

interface TournamentCreateProps {
    games: Pick<Game, 'id' | 'nama_game'>[];
}

export default function TournamentCreate({ games }: TournamentCreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        nama: '',
        game_id: '',
        format: 'single_elimination',
        max_tim: 8,
        hadiah: '',
        prize_pool: '',
        deskripsi: '',
        tanggal_mulai: '',
        tanggal_selesai: '',
        registration_deadline: '',
        banner: null as File | null,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/tournaments', { forceFormData: true });
    };

    return (
        <AdminLayout title="Buat Turnamen">
            <Head title="Buat Turnamen - Admin EsportHub" />

            <div className="mx-auto max-w-4xl">
                <div className="mb-6">
                    <Link
                        href="/admin/tournaments"
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Kembali ke Manajemen Turnamen
                    </Link>
                </div>

                <div className="rounded-xl border border-border bg-card p-6">
                    <div className="mb-6 flex items-center gap-3 border-b border-border pb-6">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                            <Trophy className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-foreground">
                                Detail Turnamen Baru
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Lengkapi informasi turnamen di bawah ini.
                            </p>
                        </div>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        {/* Banner Upload */}
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Banner Turnamen
                            </label>
                            <div className="flex items-center gap-6">
                                {data.banner ? (
                                    <img
                                        loading="lazy"
                                        src={URL.createObjectURL(data.banner)}
                                        alt="Preview"
                                        className="h-32 w-48 rounded-xl border border-border object-cover"
                                    />
                                ) : (
                                    <div className="flex h-32 w-48 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/50">
                                        <Upload className="mb-2 h-6 w-6 text-muted-foreground/50" />
                                        <span className="text-xs text-muted-foreground">
                                            16:9 Ratio
                                        </span>
                                    </div>
                                )}
                                <div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            setData(
                                                'banner',
                                                e.target.files?.[0] ?? null,
                                            )
                                        }
                                        className="hidden"
                                        id="banner-upload"
                                    />
                                    <label
                                        htmlFor="banner-upload"
                                        className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-secondary px-4 py-2 text-sm font-medium hover:bg-secondary/80"
                                    >
                                        Pilih Banner
                                    </label>
                                    <p className="mt-2 text-xs text-muted-foreground">
                                        Rekomendasi ukuran: 1920x1080px. Maks
                                        2MB.
                                    </p>
                                </div>
                            </div>
                            {errors.banner && (
                                <p className="mt-2 text-xs text-destructive">
                                    {errors.banner}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Nama Turnamen */}
                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-medium">
                                    Nama Turnamen{' '}
                                    <span className="text-destructive">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.nama}
                                    onChange={(e) =>
                                        setData('nama', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                                />
                                {errors.nama && (
                                    <p className="mt-2 text-xs text-destructive">
                                        {errors.nama}
                                    </p>
                                )}
                            </div>

                            {/* Game & Format */}
                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Game{' '}
                                    <span className="text-destructive">*</span>
                                </label>
                                <select
                                    value={data.game_id}
                                    onChange={(e) =>
                                        setData('game_id', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                                >
                                    <option value="">Pilih Game</option>
                                    {games.map((game) => (
                                        <option key={game.id} value={game.id}>
                                            {game.nama_game}
                                        </option>
                                    ))}
                                </select>
                                {errors.game_id && (
                                    <p className="mt-2 text-xs text-destructive">
                                        {errors.game_id}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Format Bracket{' '}
                                    <span className="text-destructive">*</span>
                                </label>
                                <select
                                    value={data.format}
                                    onChange={(e) =>
                                        setData('format', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                                >
                                    <option value="single_elimination">
                                        Single Elimination
                                    </option>
                                    <option value="double_elimination">
                                        Double Elimination
                                    </option>
                                    <option value="round_robin">
                                        Round Robin
                                    </option>
                                </select>
                                {errors.format && (
                                    <p className="mt-2 text-xs text-destructive">
                                        {errors.format}
                                    </p>
                                )}
                            </div>

                            {/* Kapasitas & Hadiah */}
                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Kapasitas Maksimal Tim{' '}
                                    <span className="text-destructive">*</span>
                                </label>
                                <input
                                    type="number"
                                    min={2}
                                    value={data.max_tim}
                                    onChange={(e) =>
                                        setData(
                                            'max_tim',
                                            parseInt(e.target.value),
                                        )
                                    }
                                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                                />
                                {errors.max_tim && (
                                    <p className="mt-2 text-xs text-destructive">
                                        {errors.max_tim}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Total Hadiah (Teks)
                                </label>
                                <input
                                    type="text"
                                    placeholder="Contoh: Rp 10.000.000"
                                    value={data.hadiah}
                                    onChange={(e) =>
                                        setData('hadiah', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                                />
                            </div>

                            {/* Tanggal */}
                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Tanggal Mulai{' '}
                                    <span className="text-destructive">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={data.tanggal_mulai}
                                    onChange={(e) =>
                                        setData('tanggal_mulai', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                                />
                                {errors.tanggal_mulai && (
                                    <p className="mt-2 text-xs text-destructive">
                                        {errors.tanggal_mulai}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Tanggal Selesai{' '}
                                    <span className="text-destructive">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={data.tanggal_selesai}
                                    onChange={(e) =>
                                        setData(
                                            'tanggal_selesai',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                                />
                                {errors.tanggal_selesai && (
                                    <p className="mt-2 text-xs text-destructive">
                                        {errors.tanggal_selesai}
                                    </p>
                                )}
                            </div>

                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-medium">
                                    Deadline Pendaftaran{' '}
                                    <span className="text-destructive">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={data.registration_deadline}
                                    onChange={(e) =>
                                        setData(
                                            'registration_deadline',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none md:w-1/2"
                                />
                                {errors.registration_deadline && (
                                    <p className="mt-2 text-xs text-destructive">
                                        {errors.registration_deadline}
                                    </p>
                                )}
                            </div>

                            {/* Deskripsi */}
                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-medium">
                                    Deskripsi Lengkap / Peraturan
                                </label>
                                <textarea
                                    value={data.deskripsi}
                                    onChange={(e) =>
                                        setData('deskripsi', e.target.value)
                                    }
                                    rows={6}
                                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                                />
                                {errors.deskripsi && (
                                    <p className="mt-2 text-xs text-destructive">
                                        {errors.deskripsi}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 border-t border-border pt-6">
                            <Link
                                href="/admin/tournaments"
                                className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-lg bg-primary px-6 py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                            >
                                {processing ? 'Menyimpan...' : 'Buat Turnamen'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
