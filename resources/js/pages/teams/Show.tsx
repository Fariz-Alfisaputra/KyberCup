import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { Copy, Edit2, LogOut, Shield, ShieldAlert, UserMinus, Users } from 'lucide-react';
import { useState } from 'react';
import BackButton from '@/components/BackButton';
import AppLayout from '@/layouts/AppLayout';
import type { Team, TeamMember } from '@/types';

interface TeamShowProps {
    team: Team;
}

export default function TeamShow({ team }: TeamShowProps) {
    const { auth } = usePage().props as { auth: { user: { id: number; role: string } | null } };
    const [copied, setCopied] = useState(false);
    
    // Check user role in this team context
    const isMember = team.members?.some((m) => m.id === auth.user?.id);
    const isCaptain = team.captain.id === auth.user?.id;
    const isAdmin = auth.user?.role === 'admin';

    const handleCopyCode = () => {
        if (team.invite_code) {
            navigator.clipboard.writeText(team.invite_code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleKick = (member: TeamMember) => {
        if (confirm(`Keluarkan ${member.name} dari tim?`)) {
            router.post(`/teams/${team.slug}/kick/${member.id}`);
        }
    };

    const handleGenerateNewCode = () => {
        if (confirm('Generate kode undangan baru? Kode lama tidak akan bisa digunakan lagi.')) {
            router.post(`/teams/${team.slug}/invite-code`);
        }
    };

    const joinForm = useForm({
        invite_code: '',
    });

    return (
        <AppLayout title="Detail Tim">
            <Head title={`${team.nama_tim} - EsportHub`} />

            <BackButton fallbackUrl="/teams" className="mb-6" />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Left col: Team Profile */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="rounded-xl border border-border bg-card overflow-hidden">
                        <div className="h-24 gaming-gradient" />
                        <div className="px-6 pb-6 relative">
                            <div className="absolute -top-12 left-6">
                                {team.logo_url ? (
                                    <img
                                        src={team.logo_url}
                                        alt={team.nama_tim}
                                        className="h-24 w-24 rounded-2xl border-4 border-card object-cover"
                                    />
                                ) : (
                                    <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-card bg-primary/10">
                                        <Shield className="h-10 w-10 text-primary" />
                                    </div>
                                )}
                            </div>

                            <div className="mt-14">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h1 className="text-2xl font-black text-foreground">{team.nama_tim}</h1>
                                        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                                            <ShieldAlert className="h-4 w-4" />
                                            Captain: <span className="font-medium text-foreground">{team.captain.name}</span>
                                        </p>
                                    </div>
                                    {(isCaptain || isAdmin) && (
                                        <Link
                                            href={`/teams/${team.slug}/edit`}
                                            className="rounded-lg bg-secondary p-2 text-muted-foreground hover:bg-secondary/80 hover:text-foreground transition-colors"
                                            title="Edit Tim"
                                        >
                                            <Edit2 className="h-4 w-4" />
                                        </Link>
                                    )}
                                </div>

                                <div className="mt-6 border-t border-border pt-6">
                                    <h3 className="mb-2 text-sm font-bold text-foreground">Deskripsi Tim</h3>
                                    {team.deskripsi ? (
                                        <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                                            {team.deskripsi}
                                        </p>
                                    ) : (
                                        <p className="text-sm italic text-muted-foreground">Belum ada deskripsi.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Join / Invite Section */}
                    {auth.user && !isMember && (
                        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6">
                            <h3 className="mb-2 font-bold text-emerald-400">Bergabung dengan Tim</h3>
                            <p className="mb-4 text-sm text-muted-foreground">
                                Masukkan kode undangan 6 karakter untuk bergabung dengan tim ini.
                            </p>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    joinForm.post('/teams/join');
                                }}
                            >
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Kode Undangan"
                                        maxLength={6}
                                        value={joinForm.data.invite_code}
                                        onChange={(e) => joinForm.setData('invite_code', e.target.value.toUpperCase())}
                                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm uppercase focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                    />
                                    <button
                                        type="submit"
                                        disabled={joinForm.processing || joinForm.data.invite_code.length !== 6}
                                        className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-emerald-600 disabled:opacity-50 gaming-glow-emerald"
                                    >
                                        Gabung
                                    </button>
                                </div>
                                {joinForm.errors.invite_code && (
                                    <p className="mt-2 text-xs text-red-400">{joinForm.errors.invite_code}</p>
                                )}
                            </form>
                        </div>
                    )}

                    {(isCaptain || isAdmin) && team.invite_code && (
                        <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
                            <h3 className="mb-2 font-bold text-primary">Kode Undangan</h3>
                            <p className="mb-4 text-sm text-muted-foreground">
                                Bagikan kode ini ke anggota yang ingin diundang.
                            </p>
                            <div className="mb-3 flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3">
                                <span className="font-mono text-xl font-bold tracking-widest">{team.invite_code}</span>
                                <button
                                    onClick={handleCopyCode}
                                    className="rounded p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                                    title="Copy Code"
                                >
                                    <Copy className="h-4 w-4" />
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-primary">{copied ? 'Tersalin!' : ''}</span>
                                <button
                                    onClick={handleGenerateNewCode}
                                    className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
                                >
                                    Generate kode baru
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right col: Roster */}
                <div className="lg:col-span-2">
                    <div className="rounded-xl border border-border bg-card">
                        <div className="border-b border-border p-6 flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-bold text-foreground">Roster Tim</h2>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {team.members?.length} anggota terdaftar
                                </p>
                            </div>
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                                <Users className="h-5 w-5 text-muted-foreground" />
                            </div>
                        </div>

                        <div className="divide-y divide-border">
                            {team.members?.map((member) => (
                                <div key={member.id} className="flex items-center justify-between p-6">
                                    <div className="flex items-center gap-4">
                                        {member.avatar_url ? (
                                            <img
                                                src={member.avatar_url}
                                                alt={member.name}
                                                className="h-10 w-10 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                                                <span className="text-sm font-bold text-primary">
                                                    {member.name.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                        )}
                                        <div>
                                            <p className="font-bold text-foreground">{member.name}</p>
                                            <div className="flex items-center gap-2">
                                                <p className="text-sm text-muted-foreground">
                                                    {member.username ? `@${member.username}` : ''}
                                                </p>
                                                <span
                                                    className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                                                        member.role === 'captain'
                                                            ? 'bg-amber-500/20 text-amber-400'
                                                            : 'bg-primary/20 text-primary'
                                                    }`}
                                                >
                                                    {member.role}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {(isCaptain || isAdmin) && member.id !== team.captain.id && (
                                        <button
                                            onClick={() => handleKick(member)}
                                            className="rounded-lg p-2 text-muted-foreground hover:bg-red-500/10 hover:text-red-400 transition-colors"
                                            title="Keluarkan dari tim"
                                        >
                                            <UserMinus className="h-4 w-4" />
                                        </button>
                                    )}

                                    {/* Leave team button if user is member */}
                                    {auth.user?.id === member.id && member.id !== team.captain.id && (
                                        <button
                                            onClick={() => handleKick(member)}
                                            className="flex items-center gap-2 rounded-lg bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/20"
                                        >
                                            <LogOut className="h-3.5 w-3.5" />
                                            Keluar Tim
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
