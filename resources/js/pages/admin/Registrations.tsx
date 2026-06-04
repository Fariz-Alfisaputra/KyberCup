import { Head, router } from '@inertiajs/react';
import { CheckCircle2, Loader2, XCircle } from 'lucide-react';
import AdminLayout from '@/layouts/AdminLayout';
import { decodeHtmlEntities } from '@/lib/formatters';

interface Registration {
    id: number;
    status: string;
    catatan: string | null;
    created_at: string;
    tournament: { id: number; nama: string; game: { nama_game: string } };
    team: {
        id: number;
        nama_tim: string;
        logo_url: string | null;
        captain: { name: string };
    };
}

interface PaginatedRegistrations {
    data: Registration[];
    current_page: number;
    last_page: number;
    total: number;
    links: Array<{ url: string | null; label: string; active: boolean }>;
}

interface RegistrationsProps {
    registrations: PaginatedRegistrations;
}

const statusConfig = {
    pending: {
        label: 'Pending',
        className: 'bg-yellow-500/20 text-yellow-400',
    },
    approved: {
        label: 'Approved',
        className: 'bg-emerald-500/20 text-emerald-400',
    },
    rejected: { label: 'Rejected', className: 'bg-red-500/20 text-red-400' },
};

export default function AdminRegistrations({
    registrations,
}: RegistrationsProps) {
    const handleApprove = (id: number) => {
        router.post(`/admin/registrations/${id}/approve`);
    };

    const handleReject = (id: number) => {
        router.post(`/admin/registrations/${id}/reject`);
    };

    return (
        <AdminLayout title="Manajemen Pendaftaran">
            <Head title="Pendaftaran - Admin EsportHub" />

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                        {registrations.total} total pendaftaran
                    </p>
                </div>

                <div className="overflow-x-auto rounded-xl border border-border bg-card">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border bg-muted/30">
                                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">
                                    Tim
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">
                                    Turnamen
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">
                                    Captain
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">
                                    Status
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">
                                    Tanggal
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {registrations.data.map((reg) => {
                                const statusInfo =
                                    statusConfig[
                                        reg.status as keyof typeof statusConfig
                                    ];

                                return (
                                    <tr
                                        key={reg.id}
                                        className="border-b border-border/50 last:border-0 hover:bg-muted/10"
                                    >
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                {reg.team.logo_url ? (
                                                    <img
                                                        loading="lazy"
                                                        src={reg.team.logo_url}
                                                        alt={reg.team.nama_tim}
                                                        className="h-7 w-7 rounded object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-7 w-7 items-center justify-center rounded bg-muted">
                                                        <span className="text-xs font-bold text-muted-foreground">
                                                            {reg.team.nama_tim.charAt(
                                                                0,
                                                            )}
                                                        </span>
                                                    </div>
                                                )}
                                                <span className="font-medium text-foreground">
                                                    {reg.team.nama_tim}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <p className="font-medium text-foreground">
                                                {reg.tournament.nama}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {reg.tournament.game.nama_game}
                                            </p>
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {reg.team.captain.name}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span
                                                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusInfo.className}`}
                                            >
                                                {statusInfo.label}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-xs text-muted-foreground">
                                            {reg.created_at}
                                        </td>
                                        <td className="px-4 py-3">
                                            {reg.status === 'pending' && (
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() =>
                                                            handleApprove(
                                                                reg.id,
                                                            )
                                                        }
                                                        title="Approve"
                                                        className="rounded-lg p-1.5 text-emerald-400 transition-colors hover:bg-emerald-500/10"
                                                    >
                                                        <CheckCircle2 className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleReject(reg.id)
                                                        }
                                                        title="Reject"
                                                        className="rounded-lg p-1.5 text-red-400 transition-colors hover:bg-red-500/10"
                                                    >
                                                        <XCircle className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {registrations.data.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <Loader2 className="mb-3 h-10 w-10 text-muted-foreground/30" />
                            <p className="text-sm text-muted-foreground">
                                Belum ada pendaftaran.
                            </p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {registrations.last_page > 1 && (
                    <div className="flex items-center justify-center gap-2">
                        {registrations.links.map((link, i) => (
                            <button
                                key={i}
                                disabled={!link.url}
                                onClick={() =>
                                    link.url && router.visit(link.url)
                                }
                                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                                    link.active
                                        ? 'bg-primary text-primary-foreground'
                                        : link.url
                                          ? 'border border-border text-muted-foreground hover:text-foreground'
                                          : 'cursor-not-allowed border border-border/30 text-muted-foreground/30'
                                }`}
                                dangerouslySetInnerHTML={undefined}
                            >
                                {decodeHtmlEntities(link.label)}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
