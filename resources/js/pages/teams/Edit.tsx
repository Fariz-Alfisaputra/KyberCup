import { Head, Link, useForm } from '@inertiajs/react';
import { Shield, Upload } from 'lucide-react';
import BackButton from '@/components/BackButton';
import AppLayout from '@/layouts/AppLayout';

interface TeamEditProps {
    team: {
        id: number;
        nama_tim: string;
        slug: string;
        logo_url: string | null;
        deskripsi: string | null;
    };
}

export default function TeamEdit({ team }: TeamEditProps) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        nama_tim: team.nama_tim,
        deskripsi: team.deskripsi ?? '',
        logo: null as File | null,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/teams/${team.slug}`, { forceFormData: true });
    };

    return (
        <AppLayout title="Edit Tim">
            <Head title={`Edit ${team.nama_tim} - EsportHub`} />

            <div className="mx-auto max-w-3xl">
                <BackButton
                    fallbackUrl={`/teams/${team.slug}`}
                    className="mb-6"
                />

                <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                    <div className="mb-6 flex items-center gap-3 border-b border-border pb-6">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                            <Shield className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-foreground">
                                Edit Informasi Tim
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Perbarui profil tim esport kamu.
                            </p>
                        </div>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        {/* Logo Upload */}
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Logo Tim
                            </label>
                            <div className="flex items-center gap-6">
                                {data.logo ? (
                                    <img
                                        loading="lazy"
                                        src={URL.createObjectURL(data.logo)}
                                        alt="Preview"
                                        className="h-24 w-24 rounded-xl border border-border object-cover"
                                    />
                                ) : team.logo_url ? (
                                    <img
                                        loading="lazy"
                                        src={team.logo_url}
                                        alt="Current Logo"
                                        className="h-24 w-24 rounded-xl border border-border object-cover"
                                    />
                                ) : (
                                    <div className="flex h-24 w-24 items-center justify-center rounded-xl border border-dashed border-border bg-muted/50">
                                        <Upload className="h-6 w-6 text-muted-foreground/50" />
                                    </div>
                                )}
                                <div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            setData(
                                                'logo',
                                                e.target.files?.[0] ?? null,
                                            )
                                        }
                                        className="hidden"
                                        id="logo-upload"
                                    />
                                    <label
                                        htmlFor="logo-upload"
                                        className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-secondary px-4 py-2 text-sm font-medium hover:bg-secondary/80"
                                    >
                                        Pilih Foto Baru
                                    </label>
                                    <p className="mt-2 text-xs text-muted-foreground">
                                        Rekomendasi: JPG, PNG, atau WEBP. Maks
                                        2MB.
                                    </p>
                                </div>
                            </div>
                            {errors.logo && (
                                <p className="mt-2 text-xs text-destructive">
                                    {errors.logo}
                                </p>
                            )}
                        </div>

                        {/* Nama Tim */}
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Nama Tim{' '}
                                <span className="text-destructive">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.nama_tim}
                                onChange={(e) =>
                                    setData('nama_tim', e.target.value)
                                }
                                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                                placeholder="Masukkan nama tim"
                            />
                            {errors.nama_tim && (
                                <p className="mt-2 text-xs text-destructive">
                                    {errors.nama_tim}
                                </p>
                            )}
                        </div>

                        {/* Deskripsi */}
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Deskripsi Tim
                            </label>
                            <textarea
                                value={data.deskripsi}
                                onChange={(e) =>
                                    setData('deskripsi', e.target.value)
                                }
                                rows={4}
                                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                                placeholder="Ceritakan tentang tim kamu, visi, atau pencapaian..."
                            />
                            {errors.deskripsi && (
                                <p className="mt-2 text-xs text-destructive">
                                    {errors.deskripsi}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center justify-end gap-3 border-t border-border pt-6">
                            <Link
                                href={`/teams/${team.slug}`}
                                className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-lg bg-primary px-6 py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                            >
                                {processing
                                    ? 'Menyimpan...'
                                    : 'Simpan Perubahan'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
