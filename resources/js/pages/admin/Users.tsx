import { Head, router } from '@inertiajs/react';
import { Shield, Users2 } from 'lucide-react';
import AdminLayout from '@/layouts/AdminLayout';
import { decodeHtmlEntities } from '@/lib/formatters';
import type { User } from '@/types';

interface AdminUser extends User {
    teams_count: number;
    created_at: string;
}

interface PaginatedUsers {
    data: AdminUser[];
    current_page: number;
    last_page: number;
    total: number;
    links: Array<{ url: string | null; label: string; active: boolean }>;
}

interface UsersProps {
    users: PaginatedUsers;
}

const roleConfig = {
    admin: { label: 'Admin', className: 'bg-red-500/20 text-red-400' },
    captain: {
        label: 'Captain',
        className: 'bg-yellow-500/20 text-yellow-400',
    },
    member: { label: 'Member', className: 'bg-blue-500/20 text-blue-400' },
};

export default function AdminUsers({ users }: UsersProps) {
    const handleRoleChange = (userId: number, newRole: string) => {
        router.put(`/admin/users/${userId}`, { role: newRole });
    };

    const handleDelete = (userId: number, name: string) => {
        if (
            confirm(
                `Hapus user "${name}"? Tindakan ini tidak dapat dibatalkan.`,
            )
        ) {
            router.delete(`/admin/users/${userId}`);
        }
    };

    return (
        <AdminLayout title="Manajemen User">
            <Head title="Users - Admin EsportHub" />

            <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                    {users.total} user terdaftar
                </p>

                <div className="overflow-x-auto rounded-xl border border-border bg-card">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border bg-muted/30">
                                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">
                                    User
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">
                                    Email
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">
                                    Role
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">
                                    Tim
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">
                                    Bergabung
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.data.map((user) => {
                                const roleInfo =
                                    roleConfig[
                                        user.role as keyof typeof roleConfig
                                    ];

                                return (
                                    <tr
                                        key={user.id}
                                        className="border-b border-border/50 last:border-0 hover:bg-muted/10"
                                    >
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2.5">
                                                {user.avatar_url ? (
                                                    <img
                                                        loading="lazy"
                                                        src={user.avatar_url}
                                                        alt={user.name}
                                                        className="h-8 w-8 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                                                        {user.name
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="font-medium text-foreground">
                                                        {user.name}
                                                    </p>
                                                    {user.username && (
                                                        <p className="text-xs text-muted-foreground">
                                                            @{user.username}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {user.email}
                                        </td>
                                        <td className="px-4 py-3">
                                            <select
                                                value={user.role}
                                                onChange={(e) =>
                                                    handleRoleChange(
                                                        user.id,
                                                        e.target.value,
                                                    )
                                                }
                                                className={`rounded-full border-0 px-2 py-0.5 text-xs font-medium focus:ring-1 focus:ring-primary focus:outline-none ${roleInfo.className}`}
                                            >
                                                <option value="admin">
                                                    Admin
                                                </option>
                                                <option value="captain">
                                                    Captain
                                                </option>
                                                <option value="member">
                                                    Member
                                                </option>
                                            </select>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-1 text-muted-foreground">
                                                <Users2 className="h-3.5 w-3.5" />
                                                {user.teams_count}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-xs text-muted-foreground">
                                            {user.created_at}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        user.id,
                                                        user.name,
                                                    )
                                                }
                                                className="rounded-lg px-2 py-1 text-xs text-red-400 hover:bg-red-500/10"
                                            >
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {users.data.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-16">
                            <Shield className="mb-3 h-10 w-10 text-muted-foreground/30" />
                            <p className="text-sm text-muted-foreground">
                                Belum ada user.
                            </p>
                        </div>
                    )}
                </div>

                {users.last_page > 1 && (
                    <div className="flex items-center justify-center gap-2">
                        {users.links.map((link, i) => (
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
