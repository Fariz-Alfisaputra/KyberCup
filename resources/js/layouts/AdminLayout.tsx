import { Link, usePage } from '@inertiajs/react';
import {
    BarChart2,
    Gamepad2,
    Home,
    LayoutDashboard,
    LogOut,
    Menu,
    Shield,
    Trophy,
    Users,
    X,
} from 'lucide-react';
import { type PropsWithChildren, useState } from 'react';

const ADMIN_DASHBOARD = '/admin/dashboard';

interface AdminLayoutProps extends PropsWithChildren {
    title?: string;
}

const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/tournaments', label: 'Turnamen', icon: Trophy },
    { href: '/admin/games', label: 'Game', icon: Gamepad2 },
    { href: '/admin/users', label: 'Users', icon: Users },
    { href: '/admin/registrations', label: 'Pendaftaran', icon: BarChart2 },
    { href: '/admin/matches', label: 'Matches', icon: Shield },
];

export default function AdminLayout({ children, title }: AdminLayoutProps) {
    const { auth } = usePage().props as { auth: { user: { name: string; role: string } } };
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const currentPath = window.location.pathname;

    return (
        <div className="flex min-h-screen" style={{ background: '#0a0a0f' }}>
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
                    background: 'rgba(10,10,15,0.98)',
                    borderRight: '1px solid rgba(255,45,45,0.15)',
                    boxShadow: '4px 0 24px rgba(0,0,0,0.5)',
                }}
            >
                {/* Logo */}
                <div
                    className="flex h-16 items-center gap-3 px-6"
                    style={{ borderBottom: '1px solid rgba(255,45,45,0.12)' }}
                >
                    <Link
                        href="/"
                        className="flex items-center gap-3 cursor-pointer group"
                        aria-label="Kembali ke halaman utama"
                    >
                        <img
                            src="/logo-kyber.png"
                            alt="KyberCup"
                            className="h-10 w-10 object-contain"
                            style={{ filter: 'drop-shadow(0 0 8px rgba(255,45,45,0.5))' }}
                        />
                        <div>
                            <p
                                className="text-sm font-black tracking-widest uppercase"
                                style={{ fontFamily: 'Orbitron, sans-serif', color: '#f0f4ff', fontSize: '0.7rem' }}
                            >
                                Kyber<span style={{ color: 'var(--sw-red-sith)' }}>Cup</span>
                            </p>
                            <p
                                className="text-xs tracking-widest uppercase"
                                style={{ color: 'rgba(255,45,45,0.6)', fontFamily: 'Rajdhani, sans-serif', fontSize: '0.65rem' }}
                            >
                                ⚡ Admin Panel
                            </p>
                        </div>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="p-4">
                    <p
                        className="mb-3 px-3 text-xs font-semibold tracking-widest uppercase"
                        style={{ color: 'rgba(255,45,45,0.4)', fontFamily: 'Rajdhani, sans-serif' }}
                    >
                        Kontrol Panel
                    </p>
                    <ul className="space-y-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive =
                                currentPath === item.href ||
                                (item.href !== ADMIN_DASHBOARD && currentPath.startsWith(item.href));

                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200"
                                        style={
                                            isActive
                                                ? {
                                                      background: 'rgba(255,45,45,0.1)',
                                                      border: '1px solid rgba(255,45,45,0.3)',
                                                      color: 'var(--sw-red-sith)',
                                                      boxShadow: '0 0 10px rgba(255,45,45,0.12)',
                                                      fontFamily: 'Rajdhani, sans-serif',
                                                      letterSpacing: '0.05em',
                                                      textTransform: 'uppercase',
                                                      fontSize: '0.78rem',
                                                  }
                                                : {
                                                      color: 'rgba(240,244,255,0.55)',
                                                      fontFamily: 'Rajdhani, sans-serif',
                                                      letterSpacing: '0.05em',
                                                      textTransform: 'uppercase',
                                                      fontSize: '0.78rem',
                                                      border: '1px solid transparent',
                                                  }
                                        }
                                        onMouseEnter={(e) => {
                                            if (!isActive) {
                                                e.currentTarget.style.background = 'rgba(255,45,45,0.06)';
                                                e.currentTarget.style.color = '#f0f4ff';
                                                e.currentTarget.style.borderColor = 'rgba(255,45,45,0.15)';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!isActive) {
                                                e.currentTarget.style.background = 'transparent';
                                                e.currentTarget.style.color = 'rgba(240,244,255,0.55)';
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

                    <div className="mt-6 pt-4" style={{ borderTop: '1px solid rgba(255,45,45,0.1)' }}>
                        <ul className="space-y-1">
                            <li>
                                <Link
                                    href="/"
                                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200"
                                    style={{
                                        color: 'rgba(240,244,255,0.55)',
                                        fontFamily: 'Rajdhani, sans-serif',
                                        letterSpacing: '0.05em',
                                        textTransform: 'uppercase',
                                        fontSize: '0.78rem',
                                        border: '1px solid transparent',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(0,212,255,0.06)';
                                        e.currentTarget.style.color = 'var(--sw-blue-neon)';
                                        e.currentTarget.style.borderColor = 'rgba(0,212,255,0.15)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'transparent';
                                        e.currentTarget.style.color = 'rgba(240,244,255,0.55)';
                                        e.currentTarget.style.borderColor = 'transparent';
                                    }}
                                >
                                    <Home className="h-4 w-4" />
                                    Kembali ke App
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
                                        fontFamily: 'Rajdhani, sans-serif',
                                        letterSpacing: '0.05em',
                                        textTransform: 'uppercase',
                                        fontSize: '0.78rem',
                                        border: '1px solid transparent',
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
                </nav>

                {/* User info at bottom */}
                <div
                    className="absolute bottom-0 left-0 right-0 p-4"
                    style={{ borderTop: '1px solid rgba(255,45,45,0.1)' }}
                >
                    <div className="flex items-center gap-3">
                        <div
                            className="flex h-9 w-9 items-center justify-center rounded-full"
                            style={{
                                background: 'rgba(255,45,45,0.1)',
                                border: '2px solid rgba(255,45,45,0.3)',
                            }}
                        >
                            <span
                                className="text-xs font-bold"
                                style={{ color: 'var(--sw-red-sith)', fontFamily: 'Orbitron, sans-serif' }}
                            >
                                {auth.user.name.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div className="min-w-0 flex-1">
                            <p
                                className="truncate text-sm font-medium"
                                style={{ color: '#f0f4ff', fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}
                            >
                                {auth.user.name}
                            </p>
                            <p
                                className="text-xs capitalize"
                                style={{ color: 'var(--sw-red-sith)', fontFamily: 'Rajdhani, sans-serif' }}
                            >
                                ⚡ {auth.user.role}
                            </p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex flex-1 flex-col lg:min-w-0">
                {/* Top header */}
                <header
                    className="flex h-16 items-center gap-4 px-4 lg:px-6"
                    style={{
                        background: 'rgba(10,10,15,0.9)',
                        backdropFilter: 'blur(12px)',
                        borderBottom: '1px solid rgba(255,45,45,0.12)',
                    }}
                >
                    <button
                        className="rounded-lg p-2 transition-all duration-200 lg:hidden"
                        style={{ color: 'rgba(240,244,255,0.6)' }}
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(255,45,45,0.08)';
                            e.currentTarget.style.color = 'var(--sw-red-sith)';
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
                                    textShadow: '0 0 8px rgba(255,45,45,0.3)',
                                }}
                            >
                                {title}
                            </h1>
                        )}
                    </div>
                    {/* Admin badge */}
                    <div
                        className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold"
                        style={{
                            background: 'rgba(255,45,45,0.08)',
                            border: '1px solid rgba(255,45,45,0.25)',
                            color: 'var(--sw-red-sith)',
                            fontFamily: 'Rajdhani, sans-serif',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                        }}
                    >
                        <Shield className="h-3.5 w-3.5" />
                        Sith Admin
                    </div>
                </header>

                {/* Page content */}
                <main
                    className="flex-1 overflow-auto p-4 lg:p-6"
                    style={{
                        background: 'linear-gradient(180deg, #0a0a0f 0%, #0d1117 100%)',
                    }}
                >
                    {children}
                </main>
            </div>
        </div>
    );
}
