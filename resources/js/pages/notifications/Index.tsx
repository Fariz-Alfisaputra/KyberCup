import { Link, Head } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import { Bell, CheckCircle, XCircle, Clock } from 'lucide-react';
import { formatDate } from '@/lib/formatters';

interface Notification {
    id: number;
    type: string;
    status: string;
    message: string;
    tournament_slug: string;
    created_at: string;
}

interface Props {
    notifications: Notification[];
}

function statusConfig(status: string) {
    switch (status) {
        case 'approved':
            return {
                icon: CheckCircle,
                color: 'var(--status-active-text, #34d399)',
                bg: 'var(--status-active-bg, rgba(52,211,153,0.1))',
                borderColor: 'rgba(52,211,153,0.3)',
                label: 'Diterima',
            };
        case 'rejected':
            return {
                icon: XCircle,
                color: 'var(--status-cancel-text, #f87171)',
                bg: 'var(--status-cancel-bg, rgba(248,113,113,0.1))',
                borderColor: 'rgba(248,113,113,0.3)',
                label: 'Ditolak',
            };
        default:
            return {
                icon: Clock,
                color: 'var(--accent-gold, #FFE81F)',
                bg: 'var(--accent-gold-bg, rgba(255,232,31,0.08))',
                borderColor: 'rgba(255,232,31,0.3)',
                label: 'Menunggu',
            };
    }
}

export default function NotificationsIndex({ notifications }: Props) {
    return (
        <AppLayout title="Notifikasi">
            <Head title="Notifikasi" />

            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                {/* Header */}
                <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Bell
                        style={{
                            color: 'var(--accent-primary, #00d4ff)',
                            filter: 'drop-shadow(0 0 6px var(--accent-primary-glow))',
                        }}
                        size={24}
                    />
                    <h1
                        style={{
                            fontSize: '1.5rem',
                            fontFamily: 'Orbitron, sans-serif',
                            fontWeight: 700,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: 'var(--text-primary, #e2e8f0)',
                            margin: 0,
                        }}
                    >
                        Notifikasi
                    </h1>
                </div>

                {notifications.length === 0 ? (
                    <div
                        style={{
                            textAlign: 'center',
                            padding: '4rem 2rem',
                            background: 'var(--bg-card, #111827)',
                            borderRadius: '0.75rem',
                            border: '1px solid var(--border-default)',
                        }}
                    >
                        <Bell
                            style={{ color: 'var(--text-muted)', margin: '0 auto 1rem', opacity: 0.5 }}
                            size={48}
                        />
                        <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
                            Belum ada notifikasi.
                        </p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {notifications.map((notif) => {
                            const config = statusConfig(notif.status);
                            const Icon = config.icon;

                            return (
                                <Link
                                    key={notif.id}
                                    href={`/tournaments/${notif.tournament_slug}`}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '1rem',
                                        padding: '1rem 1.25rem',
                                        background: 'var(--bg-card, #111827)',
                                        borderRadius: '0.75rem',
                                        border: `1px solid ${config.borderColor}`,
                                        textDecoration: 'none',
                                        transition: 'all 0.2s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = config.color;
                                        e.currentTarget.style.boxShadow = `0 0 16px ${config.bg}`;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = config.borderColor;
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    <div
                                        style={{
                                            padding: '0.5rem',
                                            borderRadius: '0.5rem',
                                            background: config.bg,
                                            flexShrink: 0,
                                        }}
                                    >
                                        <Icon size={20} style={{ color: config.color }} />
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <p
                                            style={{
                                                color: 'var(--text-primary, #e2e8f0)',
                                                fontSize: '0.9rem',
                                                margin: '0 0 0.35rem',
                                                lineHeight: 1.5,
                                            }}
                                        >
                                            {notif.message}
                                        </p>
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.75rem',
                                                fontSize: '0.78rem',
                                            }}
                                        >
                                            <span
                                                style={{
                                                    padding: '0.15rem 0.5rem',
                                                    borderRadius: '999px',
                                                    background: config.bg,
                                                    color: config.color,
                                                    fontWeight: 600,
                                                    fontFamily: 'Rajdhani, sans-serif',
                                                    letterSpacing: '0.04em',
                                                    textTransform: 'uppercase',
                                                }}
                                            >
                                                {config.label}
                                            </span>
                                            <span style={{ color: 'var(--text-muted)' }}>
                                                {formatDate(notif.created_at, true)}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
