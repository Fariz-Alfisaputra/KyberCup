import { Link, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    LogOut,
    Menu,
    Settings,
    Shield,
    Swords,
    Trophy,
    Users,
    X,
} from 'lucide-react';
import { type PropsWithChildren, useState } from 'react';
import { dashboard } from '@/routes';

interface AppLayoutProps extends PropsWithChildren {
    title?: string;
}

export default function AppLayout({ children, title }: AppLayoutProps) {
    const { auth } = usePage().props as { auth: { user: { name: string; role: string; avatar_url: string | null } | null } };
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const currentPath = window.location.pathname;

    const navItems = [
        { href: dashboard(), label: 'Dashboard', icon: LayoutDashboard },
        { href: '/tournaments', label: 'Turnamen', icon: Trophy },
        { href: '/teams', label: 'Tim', icon: Users },
        { href: '/teams/create', label: 'Buat Tim', icon: Shield, role: ['member', 'captain'] },
    ];

    return (
        <div className="flex min-h-screen" style={{ background: 'var(--sw-black)' }}>
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
                    background: 'rgba(10,10,15,0.95)',
                    backdropFilter: 'blur(20px)',
                    borderRight: '1px solid rgba(0,212,255,0.15)',
                    boxShadow: '4px 0 24px rgba(0,0,0,0.5)',
                }}
            >
                {/* Logo */}
                <div
                    className="flex h-16 items-center gap-3 px-6"
                    style={{ borderBottom: '1px solid rgba(0,212,255,0.12)' }}
                >
                    <Link
                        href="/"
                        className="flex items-center gap-2.5 group cursor-pointer"
                        aria-label="Kembali ke halaman utama"
                    >
                        <img
                            src="/logo-kyber.png"
                            alt="KyberCup"
                            className="h-10 w-10 object-contain"
                            style={{ filter: 'drop-shadow(0 0 8px rgba(0,212,255,0.5))' }}
                        />
                        <span
                            className="text-xl font-black tracking-widest uppercase"
                            style={{ fontFamily: 'Orbitron, sans-serif', color: '#f0f4ff' }}
                        >
                            Kyber
                            <span style={{ color: 'var(--sw-blue-neon)', textShadow: '0 0 8px var(--sw-blue-neon)' }}>
                                Cup
                            </span>
                        </span>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="p-4">
                    <p
                        className="mb-3 px-3 text-xs font-semibold tracking-widest uppercase"
                        style={{ color: 'rgba(0,212,255,0.5)', fontFamily: 'Rajdhani, sans-serif' }}
                    >
                        Menu Utama
                    </p>
                    <ul className="space-y-1">
                        {navItems
                            .filter((item) => !item.role || (auth.user && item.role.includes(auth.user.role)))
                            .map((item) => {
                                const Icon = item.icon;
                                const isActive =
                                    currentPath === item.href ||
                                    (item.href !== dashboard() && currentPath.startsWith(item.href));

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
                                                          background: 'rgba(0,212,255,0.12)',
                                                          border: '1px solid rgba(0,212,255,0.3)',
                                                          color: 'var(--sw-blue-neon)',
                                                          boxShadow: '0 0 12px rgba(0,212,255,0.15)',
                                                          fontFamily: 'Rajdhani, sans-serif',
                                                          letterSpacing: '0.05em',
                                                          textTransform: 'uppercase',
                                                          fontSize: '0.78rem',
                                                      }
                                                    : {
                                                          color: 'rgba(240,244,255,0.6)',
                                                          fontFamily: 'Rajdhani, sans-serif',
                                                          letterSpacing: '0.05em',
                                                          textTransform: 'uppercase',
                                                          fontSize: '0.78rem',
                                                          border: '1px solid transparent',
                                                      }
                                            }
                                            onMouseEnter={(e) => {
                                                if (!isActive) {
                                                    e.currentTarget.style.background = 'rgba(0,212,255,0.06)';
                                                    e.currentTarget.style.color = '#f0f4ff';
                                                    e.currentTarget.style.borderColor = 'rgba(0,212,255,0.15)';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!isActive) {
                                                    e.currentTarget.style.background = 'transparent';
                                                    e.currentTarget.style.color = 'rgba(240,244,255,0.6)';
                                                    e.currentTarget.style.borderColor = 'transparent';
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
                        <div className="mt-6 pt-4" style={{ borderTop: '1px solid rgba(0,212,255,0.1)' }}>
                            <p
                                className="mb-3 px-3 text-xs font-semibold tracking-widest uppercase"
                                style={{ color: 'rgba(0,212,255,0.5)', fontFamily: 'Rajdhani, sans-serif' }}
                            >
                                Pengaturan
                            </p>
                            <ul className="space-y-1">
                                <li>
                                    <Link
                                        href="/settings/profile"
                                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200"
                                        style={{
                                            color: currentPath.startsWith('/settings')
                                                ? 'var(--sw-blue-neon)'
                                                : 'rgba(240,244,255,0.6)',
                                            background: currentPath.startsWith('/settings')
                                                ? 'rgba(0,212,255,0.08)'
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
                                            color: 'var(--sw-red-sith)',
                                            border: '1px solid transparent',
                                            fontFamily: 'Rajdhani, sans-serif',
                                            letterSpacing: '0.05em',
                                            textTransform: 'uppercase',
                                            fontSize: '0.78rem',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = 'rgba(255,45,45,0.08)';
                                            e.currentTarget.style.borderColor = 'rgba(255,45,45,0.2)';
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
                    className="absolute bottom-0 left-0 right-0 p-4"
                    style={{ borderTop: '1px solid rgba(0,212,255,0.1)' }}
                >
                    {auth.user ? (
                        <div className="flex items-center gap-3">
                            {auth.user.avatar_url ? (
                                <img
                                    src={auth.user.avatar_url}
                                    alt={auth.user.name}
                                    className="h-9 w-9 rounded-full object-cover"
                                    style={{ border: '2px solid rgba(0,212,255,0.4)', boxShadow: '0 0 8px rgba(0,212,255,0.2)' }}
                                />
                            ) : (
                                <div
                                    className="flex h-9 w-9 items-center justify-center rounded-full"
                                    style={{
                                        background: 'rgba(0,212,255,0.12)',
                                        border: '2px solid rgba(0,212,255,0.3)',
                                        boxShadow: '0 0 8px rgba(0,212,255,0.15)',
                                    }}
                                >
                                    <span
                                        className="text-xs font-bold"
                                        style={{ color: 'var(--sw-blue-neon)', fontFamily: 'Orbitron, sans-serif' }}
                                    >
                                        {auth.user.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            )}
                            <div className="min-w-0 flex-1">
                                <p
                                    className="truncate text-sm font-medium"
                                    style={{ color: '#f0f4ff', fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}
                                >
                                    {auth.user.name}
                                </p>
                                <p
                                    className="text-xs capitalize"
                                    style={{ color: 'var(--sw-blue-neon)', fontFamily: 'Rajdhani, sans-serif' }}
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
                                    background: 'rgba(0,212,255,0.1)',
                                    border: '1px solid rgba(0,212,255,0.3)',
                                    color: 'var(--sw-blue-neon)',
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
                                    background: 'rgba(255,232,31,0.08)',
                                    border: '1px solid rgba(255,232,31,0.25)',
                                    color: 'var(--sw-gold)',
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
                        background: 'rgba(10,10,15,0.8)',
                        backdropFilter: 'blur(12px)',
                        borderBottom: '1px solid rgba(0,212,255,0.12)',
                    }}
                >
                    <button
                        className="rounded-lg p-2 transition-all duration-200 lg:hidden"
                        style={{ color: 'rgba(240,244,255,0.6)' }}
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(0,212,255,0.08)';
                            e.currentTarget.style.color = 'var(--sw-blue-neon)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = 'rgba(240,244,255,0.6)';
                        }}
                    >
                        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                    <div className="flex-1">
                        {title && (
                            <h1
                                className="text-lg font-bold tracking-wider uppercase"
                                style={{
                                    fontFamily: 'Rajdhani, sans-serif',
                                    color: '#f0f4ff',
                                    textShadow: '0 0 8px rgba(0,212,255,0.3)',
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
                                border: '1px solid rgba(255,232,31,0.3)',
                                color: 'var(--sw-gold)',
                                background: 'rgba(255,232,31,0.06)',
                                fontFamily: 'Rajdhani, sans-serif',
                                letterSpacing: '0.05em',
                                textTransform: 'uppercase',
                                fontSize: '0.78rem',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(255,232,31,0.12)';
                                e.currentTarget.style.boxShadow = '0 0 12px rgba(255,232,31,0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(255,232,31,0.06)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <Shield className="h-4 w-4" />
                            Admin Panel
                        </Link>
                    )}
                </header>

                {/* Page content */}
                <main
                    className="flex-1 overflow-auto p-4 lg:p-6"
                    style={{ background: 'linear-gradient(180deg, #0a0a0f 0%, #0d1117 100%)' }}
                >
                    {children}
                </main>
            </div>
        </div>
    );
}
