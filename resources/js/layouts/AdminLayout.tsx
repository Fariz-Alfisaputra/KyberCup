import { Link, usePage } from '@inertiajs/react';
import {
    BarChart2,
    Gamepad2,
    Home,
    LayoutDashboard,
    LogOut,
    Menu,
    Settings,
    Shield,
    Trophy,
    Users,
    X,
} from 'lucide-react';
import { type PropsWithChildren, useState } from 'react';
import { adminDashboard } from '@/routes';

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
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg gaming-gradient">
                        <Trophy className="h-4 w-4 text-white" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-foreground">KyberCup</p>
                        <p className="text-xs text-muted-foreground">Admin Panel</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="p-4">
                    <p className="mb-2 px-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                        Management
                    </p>
                    <ul className="space-y-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = currentPath.startsWith(item.href);

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
                            Navigation
                        </p>
                        <ul className="space-y-1">
                            <li>
                                <Link
                                    href="/"
                                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                >
                                    <Home className="h-4 w-4" />
                                    Ke Halaman Utama
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/settings/profile"
                                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                >
                                    <Settings className="h-4 w-4" />
                                    Settings
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
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
                            <span className="text-xs font-bold">{auth.user.name.charAt(0).toUpperCase()}</span>
                        </div>
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
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-auto p-4 lg:p-6">{children}</main>
            </div>
        </div>
    );
}
