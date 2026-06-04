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
                    className="fixed inset-0 z-20 bg-black/70 backdrop-blur-sm lg:hidden"
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
                    backdropFilter: 'blur(20px)',
                    borderRight: '1px solid var(--border-default)',
                    boxShadow: '4px 0 24px rgba(0,0,0,0.3)',
                }}
            >
                {/* Logo */}
                <div
                    className="flex h-16 items-center gap-3 px-6"
                    style={{ borderBottom: '1px solid var(--border-default)' }}
                >
                    <Link
                        href="/"
                        className="group flex cursor-pointer items-center gap-2.5"
                        aria-label="Kembali ke halaman utama"
                    >
                        <img
                            src="/logo-kyber.png"
                            alt="KyberCup"
                            className="h-10 w-10 object-contain"
                            style={{
                                filter: 'drop-shadow(0 0 8px var(--accent-primary-glow))',
                            }}
                        />
                        <span
                            className="text-xl font-black tracking-widest uppercase"
                            style={{
                                fontFamily: 'Orbitron, sans-serif',
                                color: 'var(--text-primary)',
                            }}
                        >
                            Kyber
                            <span
                                style={{
                                    color: 'var(--accent-primary)',
                                    textShadow:
                                        '0 0 8px var(--accent-primary-glow)',
                                }}
                            >
                                Cup
                            </span>
                        </span>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="p-4">
                    <p
                        className="mb-3 px-3 text-xs font-semibold tracking-widest uppercase"
                        style={{
                            color: 'var(--text-muted)',
                            fontFamily: 'Rajdhani, sans-serif',
                        }}
                    >
                        Menu Utama
                    </p>
                    <ul className="space-y-1">
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
                                            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                                                isActive ? 'text-white' : ''
                                            }`}
                                            style={
                                                isActive
                                                    ? {
                                                          background:
                                                              'var(--bg-hover)',
                                                          border: '1px solid var(--border-accent)',
                                                          color: 'var(--accent-primary)',
                                                          boxShadow:
                                                              '0 0 12px var(--accent-primary-glow)',
                                                          fontFamily:
                                                              'Rajdhani, sans-serif',
                                                          letterSpacing:
                                                              '0.05em',
                                                          textTransform:
                                                              'uppercase',
                                                          fontSize: '0.78rem',
                                                      }
                                                    : {
                                                          color: 'var(--text-muted)',
                                                          fontFamily:
                                                              'Rajdhani, sans-serif',
                                                          letterSpacing:
                                                              '0.05em',
                                                          textTransform:
                                                              'uppercase',
                                                          fontSize: '0.78rem',
                                                          border: '1px solid transparent',
                                                      }
                                            }
                                            onMouseEnter={(e) => {
                                                if (!isActive) {
                                                    e.currentTarget.style.background =
                                                        'var(--bg-hover)';
                                                    e.currentTarget.style.color =
                                                        'var(--text-primary)';
                                                    e.currentTarget.style.borderColor =
                                                        'var(--border-default)';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!isActive) {
                                                    e.currentTarget.style.background =
                                                        'transparent';
                                                    e.currentTarget.style.color =
                                                        'var(--text-muted)';
                                                    e.currentTarget.style.borderColor =
                                                        'transparent';
                                                }
                                            }}
                                        >
                                            <Icon className="h-4 w-4" />
                                            {item.label}
                                        </Link>
                                    </li>
                                );
                            })}
                    </ul>

                    {auth.user && (
                        <div
                            className="mt-6 pt-4"
                            style={{
                                borderTop: '1px solid var(--border-default)',
                            }}
                        >
                            <p
                                className="mb-3 px-3 text-xs font-semibold tracking-widest uppercase"
                                style={{
                                    color: 'var(--text-muted)',
                                    fontFamily: 'Rajdhani, sans-serif',
                                }}
                            >
                                Pengaturan
                            </p>
                            <ul className="space-y-1">
                                <li>
                                    <Link
                                        href="/settings/profile"
                                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200"
                                        style={{
                                            color: currentPath.startsWith(
                                                '/settings',
                                            )
                                                ? 'var(--accent-primary)'
                                                : 'var(--text-muted)',
                                            background: currentPath.startsWith(
                                                '/settings',
                                            )
                                                ? 'var(--bg-hover)'
                                                : 'transparent',
                                            border: '1px solid transparent',
                                            fontFamily: 'Rajdhani, sans-serif',
                                            letterSpacing: '0.05em',
                                            textTransform: 'uppercase',
                                            fontSize: '0.78rem',
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
                                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200"
                                        style={{
                                            color: 'var(--status-cancel-text)',
                                            border: '1px solid transparent',
                                            fontFamily: 'Rajdhani, sans-serif',
                                            letterSpacing: '0.05em',
                                            textTransform: 'uppercase',
                                            fontSize: '0.78rem',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background =
                                                'var(--status-cancel-bg)';
                                            e.currentTarget.style.borderColor =
                                                'var(--border-strong)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background =
                                                'transparent';
                                            e.currentTarget.style.borderColor =
                                                'transparent';
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
                                    style={{
                                        border: '2px solid var(--border-accent)',
                                        boxShadow:
                                            '0 0 8px var(--accent-primary-glow)',
                                    }}
                                />
                            ) : (
                                <div
                                    className="flex h-9 w-9 items-center justify-center rounded-full"
                                    style={{
                                        background: 'var(--bg-hover)',
                                        border: '2px solid var(--border-default)',
                                        boxShadow:
                                            '0 0 8px var(--accent-primary-glow)',
                                    }}
                                >
                                    <span
                                        className="text-xs font-bold"
                                        style={{
                                            color: 'var(--accent-primary)',
                                            fontFamily: 'Orbitron, sans-serif',
                                        }}
                                    >
                                        {auth.user.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            )}
                            <div className="min-w-0 flex-1">
                                <p
                                    className="truncate text-sm font-medium"
                                    style={{
                                        color: 'var(--text-primary)',
                                        fontFamily: 'Rajdhani, sans-serif',
                                        fontWeight: 600,
                                    }}
                                >
                                    {auth.user.name}
                                </p>
                                <p
                                    className="text-xs capitalize"
                                    style={{
                                        color: 'var(--accent-primary)',
                                        fontFamily: 'Rajdhani, sans-serif',
                                    }}
                                >
                                    {auth.user.role}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <Link
                                href="/login"
                                className="flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-bold transition-all"
                                style={{
                                    background: 'var(--bg-hover)',
                                    border: '1px solid var(--border-default)',
                                    color: 'var(--accent-primary)',
                                    fontFamily: 'Rajdhani, sans-serif',
                                    letterSpacing: '0.06em',
                                    textTransform: 'uppercase',
                                }}
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-bold transition-all"
                                style={{
                                    background: 'var(--bg-hover)',
                                    border: '1px solid var(--border-default)',
                                    color: 'var(--accent-gold)',
                                    fontFamily: 'Rajdhani, sans-serif',
                                    letterSpacing: '0.06em',
                                    textTransform: 'uppercase',
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
                    className="flex h-16 items-center gap-4 px-4 lg:px-6"
                    style={{
                        background: 'var(--bg-navbar)',
                        backdropFilter: 'blur(12px)',
                        borderBottom: '1px solid var(--border-default)',
                    }}
                >
                    <button
                        className="rounded-lg p-2 transition-all duration-200 lg:hidden"
                        style={{ color: 'var(--text-muted)' }}
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                                'var(--bg-hover)';
                            e.currentTarget.style.color =
                                'var(--accent-primary)';
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
                                className="text-lg font-bold tracking-wider uppercase"
                                style={{
                                    fontFamily: 'Rajdhani, sans-serif',
                                    color: 'var(--text-primary)',
                                    textShadow:
                                        '0 0 8px var(--accent-primary-glow)',
                                }}
                            >
                                {title}
                            </h1>
                        )}
                    </div>
                    {auth.user?.role === 'admin' && (
                        <Link
                            href="/admin/dashboard"
                            className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200"
                            style={{
                                border: '1px solid var(--border-default)',
                                color: 'var(--accent-gold)',
                                background: 'var(--bg-hover)',
                                fontFamily: 'Rajdhani, sans-serif',
                                letterSpacing: '0.05em',
                                textTransform: 'uppercase',
                                fontSize: '0.78rem',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                    'var(--bg-hover)';
                                e.currentTarget.style.boxShadow =
                                    '0 0 12px var(--accent-gold-bg)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                    'var(--bg-hover)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <Shield className="h-4 w-4" />
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
