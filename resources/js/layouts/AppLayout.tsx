import { Link, usePage } from '@inertiajs/react';
import {
    BarChart3,
    Bell,
    LayoutDashboard,
    LogOut,
    Menu,
    Settings,
    Shield,
    Trophy,
    Users,
    X,
} from 'lucide-react';
import { useState } from 'react';
import type { PropsWithChildren } from 'react';
import { dashboard, leaderboard } from '@/routes';
import { index as notificationsIndex } from '@/routes/notifications';
import { index as teamsIndex, create as teamsCreate } from '@/routes/teams';
import { index as tournamentsIndex } from '@/routes/tournaments';
import { toUrl } from '@/lib/utils';

interface AppLayoutProps extends PropsWithChildren {
    title?: string;
}

export default function AppLayout({ children, title }: AppLayoutProps) {
    const { auth } = usePage().props as {
        auth: {
            user: {
                name: string;
                role: string;
                avatar_url: string | null;
            } | null;
        };
    };
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const currentPath = window.location.pathname;

    const navItems = [
        { href: toUrl(dashboard()), label: 'Dashboard', icon: LayoutDashboard },
        { href: toUrl(tournamentsIndex()), label: 'Turnamen', icon: Trophy },
        { href: toUrl(teamsIndex()), label: 'Tim', icon: Users },
        { href: toUrl(leaderboard()), label: 'Leaderboard', icon: BarChart3 },
        {
            href: toUrl(notificationsIndex()),
            label: 'Notifikasi',
            icon: Bell,
            requiresAuth: true,
        },
        {
            href: toUrl(teamsCreate()),
            label: 'Buat Tim',
            icon: Shield,
            role: ['member', 'captain'],
        },
    ];

    return (
        <div
            className="flex min-h-screen"
            style={{ background: 'var(--bg-page)' }}
        >
            {/* Sidebar overlay on mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black/40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
                style={{
                    background: 'var(--bg-navbar)',
                    borderRight: '1px solid var(--border-default)',
                    boxShadow: '1px 0 0 var(--border-default)',
                }}
            >
                {/* Logo */}
                <div
                    className="flex h-16 items-center gap-3 px-5"
                    style={{ borderBottom: '1px solid var(--border-default)' }}
                >
                    <Link
                        href="/"
                        className="flex cursor-pointer items-center gap-2.5"
                        aria-label="Kembali ke halaman utama"
                    >
                        <img
                            src="/logo-kyber.png"
                            alt="KyberCup"
                            className="h-8 w-8 object-contain"
                        />
                        <span
                            className="logo-kybercup text-base"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            Kyber
                            <span style={{ color: 'var(--accent-primary)' }}>
                                Cup
                            </span>
                        </span>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="p-3">
                    <p
                        className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider"
                        style={{ color: 'var(--text-muted)' }}
                    >
                        Menu Utama
                    </p>
                    <ul className="space-y-0.5">
                        {navItems
                            .filter(
                                (item) => {
                                    if ('requiresAuth' in item && item.requiresAuth && !auth.user) return false;
                                    if (item.role && (!auth.user || !item.role.includes(auth.user.role))) return false;
                                    return true;
                                },
                            )
                            .map((item) => {
                                const Icon = item.icon;
                                const isActive =
                                    currentPath === item.href ||
                                    (item.href !== toUrl(dashboard()) &&
                                        currentPath.startsWith(item.href));

                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150"
                                            style={
                                                isActive
                                                    ? {
                                                          background: 'var(--accent-primary-light)',
                                                          color: 'var(--accent-primary)',
                                                          border: '1px solid var(--border-accent)',
                                                      }
                                                    : {
                                                          color: 'var(--text-secondary)',
                                                          border: '1px solid transparent',
                                                      }
                                            }
                                            onMouseEnter={(e) => {
                                                if (!isActive) {
                                                    e.currentTarget.style.background = 'var(--bg-hover)';
                                                    e.currentTarget.style.color = 'var(--text-primary)';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!isActive) {
                                                    e.currentTarget.style.background = 'transparent';
                                                    e.currentTarget.style.color = 'var(--text-secondary)';
                                                }
                                            }}
                                        >
                                            <Icon className="h-4 w-4 shrink-0" />
                                            {item.label}
                                        </Link>
                                    </li>
                                );
                            })}
                    </ul>

                    {auth.user && (
                        <div
                            className="mt-5 pt-4"
                            style={{ borderTop: '1px solid var(--border-default)' }}
                        >
                            <p
                                className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider"
                                style={{ color: 'var(--text-muted)' }}
                            >
                                Pengaturan
                            </p>
                            <ul className="space-y-0.5">
                                <li>
                                    <Link
                                        href="/settings/profile"
                                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150"
                                        style={{
                                            color: currentPath.startsWith('/settings')
                                                ? 'var(--accent-primary)'
                                                : 'var(--text-secondary)',
                                            background: currentPath.startsWith('/settings')
                                                ? 'var(--accent-primary-light)'
                                                : 'transparent',
                                            border: '1px solid transparent',
                                        }}
                                    >
                                        <Settings className="h-4 w-4" />
                                        Profile Settings
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/logout"
                                        method="post"
                                        as="button"
                                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150"
                                        style={{
                                            color: 'var(--status-cancel-text)',
                                            border: '1px solid transparent',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = 'var(--status-cancel-bg)';
                                            e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.25)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'transparent';
                                            e.currentTarget.style.borderColor = 'transparent';
                                        }}
                                    >
                                        <LogOut className="h-4 w-4" />
                                        Logout
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </nav>

                {/* User info or Guest CTA at bottom */}
                <div
                    className="absolute right-0 bottom-0 left-0 p-4"
                    style={{ borderTop: '1px solid var(--border-default)' }}
                >
                    {auth.user ? (
                        <div className="flex items-center gap-3">
                            {auth.user.avatar_url ? (
                                <img
                                    src={auth.user.avatar_url}
                                    alt={auth.user.name}
                                    className="h-9 w-9 rounded-full object-cover"
                                    style={{ border: '2px solid var(--border-default)' }}
                                />
                            ) : (
                                <div
                                    className="flex h-9 w-9 items-center justify-center rounded-full"
                                    style={{
                                        background: 'var(--accent-primary-light)',
                                        border: '2px solid var(--border-default)',
                                    }}
                                >
                                    <span
                                        className="text-xs font-bold"
                                        style={{ color: 'var(--accent-primary)' }}
                                    >
                                        {auth.user.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            )}
                            <div className="min-w-0 flex-1">
                                <p
                                    className="truncate text-sm font-semibold"
                                    style={{ color: 'var(--text-primary)' }}
                                >
                                    {auth.user.name}
                                </p>
                                <p
                                    className="text-xs capitalize"
                                    style={{ color: 'var(--text-muted)' }}
                                >
                                    {auth.user.role}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <Link
                                href="/login"
                                className="flex items-center justify-center rounded-lg py-2 text-sm font-semibold transition-all"
                                style={{
                                    border: '1px solid var(--border-default)',
                                    color: 'var(--text-secondary)',
                                    background: 'var(--bg-hover)',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--border-strong)';
                                    e.currentTarget.style.color = 'var(--text-primary)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--border-default)';
                                    e.currentTarget.style.color = 'var(--text-secondary)';
                                }}
                            >
                                Masuk
                            </Link>
                            <Link
                                href="/register"
                                className="flex items-center justify-center rounded-lg py-2 text-sm font-semibold transition-all"
                                style={{
                                    background: 'var(--accent-primary)',
                                    color: '#ffffff',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'var(--accent-primary-hover)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'var(--accent-primary)';
                                }}
                            >
                                Daftar
                            </Link>
                        </div>
                    )}
                </div>
            </aside>

            {/* Main content */}
            <div className="flex flex-1 flex-col lg:min-w-0">
                {/* Top header */}
                <header
                    className="flex h-14 items-center gap-4 px-4 lg:px-6"
                    style={{
                        background: 'var(--bg-navbar)',
                        borderBottom: '1px solid var(--border-default)',
                    }}
                >
                    <button
                        className="rounded-lg p-2 transition-all duration-150 lg:hidden"
                        style={{ color: 'var(--text-muted)' }}
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'var(--bg-hover)';
                            e.currentTarget.style.color = 'var(--text-primary)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = 'var(--text-muted)';
                        }}
                    >
                        {sidebarOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </button>
                    <div className="flex-1">
                        {title && (
                            <h1
                                className="text-base font-semibold"
                                style={{ color: 'var(--text-primary)' }}
                            >
                                {title}
                            </h1>
                        )}
                    </div>
                    {auth.user?.role === 'admin' && (
                        <Link
                            href="/admin/dashboard"
                            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-150"
                            style={{
                                border: '1px solid var(--border-default)',
                                color: 'var(--text-secondary)',
                                background: 'var(--bg-hover)',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'var(--border-strong)';
                                e.currentTarget.style.color = 'var(--text-primary)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'var(--border-default)';
                                e.currentTarget.style.color = 'var(--text-secondary)';
                            }}
                        >
                            <Shield className="h-3.5 w-3.5" />
                            Admin Panel
                        </Link>
                    )}
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-auto bg-background p-4 lg:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
