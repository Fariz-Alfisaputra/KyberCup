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
    const { auth } = usePage().props as { auth: { user: { name: string; role: string; avatar_url: string | null } } };
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const currentPath = window.location.pathname;

    const navItems = [
        { href: dashboard(), label: 'Dashboard', icon: LayoutDashboard },
        { href: '/tournaments', label: 'Cari Turnamen', icon: Trophy },
        { href: '/teams', label: 'Cari Tim', icon: Users },
        { href: '/teams/create', label: 'Buat Tim', icon: Shield, role: ['member', 'captain'] },
    ];

    return (
        <div className="flex min-h-screen bg-background">
            {/* Sidebar overlay on mobile */}
            {sidebarOpen && (
                <div
                    className="bg-black/50 fixed inset-0 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-30 w-64 transform border-r border-border bg-sidebar transition-transform duration-300 lg:relative lg:translate-x-0 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Logo */}
                <div className="flex h-16 items-center gap-3 border-b border-border px-6">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg gaming-gradient">
                            <Trophy className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-xl font-black tracking-tight text-foreground">
                            Kyber<span className="text-primary">Cup</span>
                        </span>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="p-4">
                    <p className="mb-2 px-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                        Menu Utama
                    </p>
                    <ul className="space-y-1">
                        {navItems
                            .filter((item) => !item.role || item.role.includes(auth.user.role))
                            .map((item) => {
                                const Icon = item.icon;
                                const isActive = currentPath === item.href || (item.href !== dashboard() && currentPath.startsWith(item.href));

                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                                                isActive
                                                    ? 'bg-primary text-primary-foreground gaming-glow'
                                                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                                            }`}
                                        >
                                            <Icon className="h-4 w-4" />
                                            {item.label}
                                        </Link>
                                    </li>
                                );
                            })}
                    </ul>

                    <div className="mt-6 border-t border-border pt-4">
                        <p className="mb-2 px-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                            Pengaturan
                        </p>
                        <ul className="space-y-1">
                            <li>
                                <Link
                                    href="/settings/profile"
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                                        currentPath.startsWith('/settings')
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                                    }`}
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
                                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive transition-all duration-200 hover:bg-destructive/10"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                {/* User info at bottom */}
                <div className="absolute bottom-0 left-0 right-0 border-t border-border p-4">
                    <div className="flex items-center gap-3">
                        {auth.user.avatar_url ? (
                            <img src={auth.user.avatar_url} alt={auth.user.name} className="h-8 w-8 rounded-full object-cover" />
                        ) : (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
                                <span className="text-xs font-bold">{auth.user.name.charAt(0).toUpperCase()}</span>
                            </div>
                        )}
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-foreground">{auth.user.name}</p>
                            <p className="text-xs text-muted-foreground capitalize">{auth.user.role}</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex flex-1 flex-col lg:min-w-0">
                {/* Top header */}
                <header className="flex h-16 items-center gap-4 border-b border-border bg-background px-4 lg:px-6">
                    <button
                        className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground lg:hidden"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                    <div className="flex-1">
                        {title && <h1 className="text-lg font-semibold text-foreground">{title}</h1>}
                    </div>
                    {auth.user.role === 'admin' && (
                        <Link
                            href="/admin/dashboard"
                            className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium hover:bg-muted"
                        >
                            <Shield className="h-4 w-4 text-primary" />
                            Admin Panel
                        </Link>
                    )}
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-auto p-4 lg:p-6">{children}</main>
            </div>
        </div>
    );
}
