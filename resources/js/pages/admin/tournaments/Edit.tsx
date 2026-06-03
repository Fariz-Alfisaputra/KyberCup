import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Trophy, Upload } from 'lucide-react';
import AdminLayout from '@/layouts/AdminLayout';
import type { Game, Tournament } from '@/types';

interface TournamentEditProps {
    tournament: Tournament;
    games: Pick<Game, 'id' | 'nama_game'>[];
}

export default function TournamentEdit({ tournament, games }: TournamentEditProps) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        nama: tournament.nama,
        game_id: tournament.game_id,
        format: tournament.format,
        status: tournament.status,
        max_tim: tournament.max_tim,
        hadiah: tournament.hadiah ?? '',
        prize_pool: tournament.prize_pool ?? '',
        deskripsi: tournament.deskripsi ?? '',
        tanggal_mulai: tournament.tanggal_mulai?.split(' ')[0] ?? '',
        tanggal_selesai: tournament.tanggal_selesai?.split(' ')[0] ?? '',
        registration_deadline: tournament.registration_deadline?.split(' ')[0] ?? '',
        banner: null as File | null,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/admin/tournaments/${tournament.id}`, { forceFormData: true });
    };

    return (
        <AdminLayout title="Edit Turnamen">
            <Head title={`Edit ${tournament.nama} - Admin EsportHub`} />

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
                            <h2 className="text-xl font-bold text-foreground">Edit Turnamen</h2>
                            <p className="text-sm text-muted-foreground">Perbarui informasi turnamen di bawah ini.</p>
                        </div>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        {/* Banner Upload */}
                        <div>
                            <label className="mb-2 block text-sm font-medium">Banner Turnamen</label>
                            <div className="flex items-center gap-6">
                                {data.banner ? (
                                    <img
                                        src={URL.createObjectURL(data.banner)}
                                        alt="Preview"
                                        className="h-32 w-48 rounded-xl border border-border object-cover"
                                    />
                                ) : tournament.banner_url ? (
                                    <img
                                        src={tournament.banner_url}
                                        alt="Current Banner"
                                        className="h-32 w-48 rounded-xl border border-border object-cover"
                                    />
                                ) : (
                                    <div className="flex h-32 w-48 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/50">
                                        <Upload className="mb-2 h-6 w-6 text-muted-foreground/50" />
                                        <span className="text-xs text-muted-foreground">16:9 Ratio</span>
                                    </div>
                                )}
                                <div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setData('banner', e.target.files?.[0] ?? null)}
                                        className="hidden"
                                        id="banner-upload"
                                    />
                                    <label
                                        htmlFor="banner-upload"
                                        className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-secondary px-4 py-2 text-sm font-medium hover:bg-secondary/80"
                                    >
                                        Pilih Banner Baru
                                    </label>
                                    <p className="mt-2 text-xs text-muted-foreground">
                                        Rekomendasi ukuran: 1920x1080px. Maks 2MB.
                                    </p>
                                </div>
                            </div>
                            {errors.banner && <p className="mt-2 text-xs text-destructive">{errors.banner}</p>}
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Nama Turnamen */}
                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-medium">Nama Turnamen <span className="text-destructive">*</span></label>
                                <input
                                    type="text"
                                    value={data.nama}
                                    onChange={(e) => setData('nama', e.target.value)}
                                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                                {errors.nama && <p className="mt-2 text-xs text-destructive">{errors.nama}</p>}
                            </div>

                            {/* Game & Format */}
                            <div>
                                <label className="mb-2 block text-sm font-medium">Game <span className="text-destructive">*</span></label>
                                <select
                                    value={data.game_id}
                                    onChange={(e) => setData('game_id', parseInt(e.target.value))}
                                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                >
                                    <option value="">Pilih Game</option>
                                    {games.map(game => (
                                        <option key={game.id} value={game.id}>{game.nama_game}</option>
                                    ))}
                                </select>
                                {errors.game_id && <p className="mt-2 text-xs text-destructive">{errors.game_id}</p>}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium">Status <span className="text-destructive">*</span></label>
                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                >
                                    <option value="draft">Draft</option>
                                    <option value="open">Open Registration</option>
                                    <option value="ongoing">Ongoing</option>
                                    <option value="selesai">Selesai</option>
                                </select>
                                {errors.status && <p className="mt-2 text-xs text-destructive">{errors.status}</p>}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium">Format Bracket <span className="text-destructive">*</span></label>
                                <select
                                    value={data.format}
                                    onChange={(e) => setData('format', e.target.value)}
                                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                >
                                    <option value="single_elimination">Single Elimination</option>
                                    <option value="double_elimination">Double Elimination</option>
                                    <option value="round_robin">Round Robin</option>
                                </select>
                                {errors.format && <p className="mt-2 text-xs text-destructive">{errors.format}</p>}
                            </div>

                            {/* Kapasitas & Hadiah */}
                            <div>
                                <label className="mb-2 block text-sm font-medium">Kapasitas Maksimal Tim <span className="text-destructive">*</span></label>
                                <input
                                    type="number"
                                    min={2}
                                    value={data.max_tim}
                                    onChange={(e) => setData('max_tim', parseInt(e.target.value))}
                                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                                {errors.max_tim && <p className="mt-2 text-xs text-destructive">{errors.max_tim}</p>}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium">Total Hadiah (Teks)</label>
                                <input
                                    type="text"
                                    placeholder="Contoh: Rp 10.000.000"
                                    value={data.hadiah}
                                    onChange={(e) => setData('hadiah', e.target.value)}
                                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                            </div>

                            {/* Tanggal */}
                            <div>
                                <label className="mb-2 block text-sm font-medium">Tanggal Mulai <span className="text-destructive">*</span></label>
                                <input
                                    type="date"
                                    value={data.tanggal_mulai}
                                    onChange={(e) => setData('tanggal_mulai', e.target.value)}
                                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                                {errors.tanggal_mulai && <p className="mt-2 text-xs text-destructive">{errors.tanggal_mulai}</p>}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium">Tanggal Selesai <span className="text-destructive">*</span></label>
                                <input
                                    type="date"
                                    value={data.tanggal_selesai}
                                    onChange={(e) => setData('tanggal_selesai', e.target.value)}
                                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                                {errors.tanggal_selesai && <p className="mt-2 text-xs text-destructive">{errors.tanggal_selesai}</p>}
                            </div>

                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-medium">Deadline Pendaftaran <span className="text-destructive">*</span></label>
                                <input
                                    type="date"
                                    value={data.registration_deadline}
                                    onChange={(e) => setData('registration_deadline', e.target.value)}
                                    className="w-full md:w-1/2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                                {errors.registration_deadline && <p className="mt-2 text-xs text-destructive">{errors.registration_deadline}</p>}
                            </div>

                            {/* Deskripsi */}
                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-medium">Deskripsi Lengkap / Peraturan</label>
                                <textarea
                                    value={data.deskripsi}
                                    onChange={(e) => setData('deskripsi', e.target.value)}
                                    rows={6}
                                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                                {errors.deskripsi && <p className="mt-2 text-xs text-destructive">{errors.deskripsi}</p>}
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
                                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
