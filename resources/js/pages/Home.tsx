import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    ChevronRight,
    Gamepad2,
    Shield,
    Trophy,
    Users,
    Zap,
} from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import TournamentCard from '@/components/tournament/TournamentCard';
import { dashboard, login, register } from '@/routes';
import type { TournamentListItem } from '@/types';

interface HomeProps {
    openTournaments: TournamentListItem[];
    ongoingTournaments: TournamentListItem[];
}

export default function Home({
    openTournaments,
    ongoingTournaments,
}: HomeProps) {
    const { auth } = usePage().props as {
        auth: { user: { name: string } | null };
    };

    return (
        <>
            <Head title="KyberCup — Platform Turnamen Esport" />

            <div
                className="relative min-h-screen overflow-x-hidden text-foreground"
                style={{ background: 'var(--bg-page)' }}
            >
                {/* ── NAVIGATION ── */}
                <nav
                    className="sticky top-0 z-50"
                    style={{
                        background: 'var(--bg-navbar)',
                        borderBottom: '1px solid var(--border-default)',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                    }}
                >
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="flex cursor-pointer items-center gap-2.5"
                            aria-label="KyberCup — Halaman Utama"
                        >
                            <img
                                loading="lazy"
                                src="/logo-kyber.png"
                                alt="KyberCup"
                                className="h-9 w-9 object-contain"
                            />
                            <span
                                className="logo-kybercup text-lg"
                                style={{ color: 'var(--text-primary)' }}
                            >
                                Kyber
                                <span style={{ color: 'var(--accent-primary)' }}>
                                    Cup
                                </span>
                            </span>
                        </Link>

                        {/* Nav links */}
                        <div className="hidden items-center gap-6 md:flex">
                            {[
                                { href: '/tournaments', label: 'Turnamen' },
                                { href: '/teams', label: 'Tim' },
                            ].map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="nav-link-sw text-sm font-medium"
                                    style={{ color: 'var(--text-secondary)' }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = 'var(--text-primary)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = 'var(--text-secondary)';
                                    }}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>

                        {/* CTA buttons */}
                        <div className="flex items-center gap-2.5">
                            <ThemeToggle />

                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200"
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
                                    Dashboard
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="hidden text-sm font-medium transition-colors md:block"
                                        style={{ color: 'var(--text-secondary)' }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.color = 'var(--text-primary)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.color = 'var(--text-secondary)';
                                        }}
                                    >
                                        Masuk
                                    </Link>
                                    <Link
                                        href={register()}
                                        className="rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200"
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
                                        Daftar Gratis
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                {/* ── HERO SECTION ── */}
                <section className="hero-mesh relative overflow-hidden">
                    {/* Subtle dot grid */}
                    <div className="dot-grid absolute inset-0 opacity-40" />

                    {/* Gradient bottom fade */}
                    <div
                        className="absolute inset-x-0 bottom-0 h-32"
                        style={{
                            background: 'linear-gradient(to top, var(--bg-page), transparent)',
                        }}
                    />

                    <div className="relative mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:py-28">
                        {/* Badge */}
                        <div
                            className="mb-5 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold"
                            style={{
                                background: 'var(--status-open-bg)',
                                border: '1px solid var(--border-accent)',
                                color: 'var(--status-open-text)',
                                letterSpacing: '0.05em',
                            }}
                        >
                            <span
                                className="h-1.5 w-1.5 rounded-full animate-pulse"
                                style={{ background: 'var(--accent-primary)' }}
                            />
                            Platform Turnamen Esport
                        </div>

                        {/* Headline */}
                        <h1
                            className="mb-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            Kompetisi Esport{' '}
                            <span
                                className="bg-clip-text text-transparent"
                                style={{
                                    backgroundImage:
                                        'linear-gradient(135deg, var(--accent-primary) 0%, #6366F1 100%)',
                                }}
                            >
                                Tanpa Batas
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p
                            className="mx-auto mb-8 max-w-xl text-base leading-relaxed sm:text-lg"
                            style={{
                                color: 'var(--text-secondary)',
                                lineHeight: '1.75',
                            }}
                        >
                            Daftarkan tim, ikuti turnamen, dan buktikan kemampuan
                            terbaik kamu di arena kompetisi resmi KyberCup.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <Link
                                href="/tournaments"
                                className="flex items-center gap-2 rounded-xl px-7 py-3 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
                                style={{
                                    background: 'var(--accent-primary)',
                                    color: '#ffffff',
                                    boxShadow: '0 4px 14px rgba(59, 130, 246, 0.3)',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'var(--accent-primary-hover)';
                                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'var(--accent-primary)';
                                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(59, 130, 246, 0.3)';
                                }}
                            >
                                <Trophy className="h-4 w-4" />
                                Lihat Turnamen
                            </Link>

                            {!auth.user && (
                                <Link
                                    href={register()}
                                    className="flex items-center gap-2 rounded-xl px-7 py-3 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
                                    style={{
                                        background: 'var(--bg-surface)',
                                        border: '1px solid var(--border-default)',
                                        color: 'var(--text-primary)',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--border-strong)';
                                        e.currentTarget.style.boxShadow = 'var(--shadow-card-md)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--border-default)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    <Users className="h-4 w-4" />
                                    Daftar Gratis
                                </Link>
                            )}
                        </div>

                        {/* Stats grid */}
                        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
                            {[
                                {
                                    label: 'Turnamen Aktif',
                                    value: openTournaments.length,
                                    icon: Trophy,
                                },
                                {
                                    label: 'Game Tersedia',
                                    value: '4+',
                                    icon: Gamepad2,
                                },
                                {
                                    label: 'Tim Terdaftar',
                                    value: '50+',
                                    icon: Shield,
                                },
                                {
                                    label: 'Total Hadiah',
                                    value: 'Rp 10M+',
                                    icon: Zap,
                                },
                            ].map((stat) => {
                                const Icon = stat.icon;

                                return (
                                    <div
                                        key={stat.label}
                                        className="rounded-xl p-5 transition-all duration-200"
                                        style={{
                                            background: 'var(--bg-surface)',
                                            border: '1px solid var(--border-default)',
                                            boxShadow: 'var(--shadow-card)',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = 'var(--border-accent)';
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                            e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = 'var(--border-default)';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = 'var(--shadow-card)';
                                        }}
                                    >
                                        <Icon
                                            className="mb-2 h-5 w-5"
                                            style={{ color: 'var(--accent-primary)' }}
                                        />
                                        <p
                                            className="text-2xl font-bold"
                                            style={{ color: 'var(--text-primary)' }}
                                        >
                                            {stat.value}
                                        </p>
                                        <p
                                            className="mt-0.5 text-xs"
                                            style={{ color: 'var(--text-muted)' }}
                                        >
                                            {stat.label}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ── OPEN TOURNAMENTS ── */}
                {openTournaments.length > 0 && (
                    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
                        <div className="mb-7 flex items-center justify-between">
                            <div>
                                <div className="mb-1 flex items-center gap-2">
                                    <div
                                        className="accent-bar h-5 w-1"
                                    />
                                    <span
                                        className="text-xs font-semibold uppercase tracking-widest"
                                        style={{ color: 'var(--accent-primary)' }}
                                    >
                                        Pendaftaran Dibuka
                                    </span>
                                </div>
                                <h2
                                    className="text-2xl font-bold"
                                    style={{ color: 'var(--text-primary)' }}
                                >
                                    Turnamen{' '}
                                    <span style={{ color: 'var(--accent-primary)' }}>
                                        Terbuka
                                    </span>
                                </h2>
                                <p
                                    className="mt-1 text-sm"
                                    style={{ color: 'var(--text-muted)' }}
                                >
                                    Daftar sekarang sebelum kuota penuh
                                </p>
                            </div>
                            <Link
                                href="/tournaments"
                                className="nav-link-sw flex items-center gap-1 text-sm font-medium transition-all duration-200"
                                style={{ color: 'var(--accent-primary)' }}
                            >
                                Lihat Semua <ChevronRight className="h-4 w-4" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {openTournaments.map((tournament) => (
                                <TournamentCard
                                    key={tournament.id}
                                    tournament={tournament}
                                />
                            ))}
                        </div>
                    </section>
                )}

                {/* ── ONGOING TOURNAMENTS ── */}
                {ongoingTournaments.length > 0 && (
                    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
                        <div className="mb-7">
                            <div className="mb-1 flex items-center gap-2">
                                <span
                                    className="h-2 w-2 animate-pulse rounded-full"
                                    style={{ background: '#EF4444' }}
                                />
                                <span
                                    className="text-xs font-semibold uppercase tracking-widest"
                                    style={{ color: '#EF4444' }}
                                >
                                    Sedang Berlangsung
                                </span>
                            </div>
                            <h2
                                className="text-2xl font-bold"
                                style={{ color: 'var(--text-primary)' }}
                            >
                                Turnamen{' '}
                                <span style={{ color: 'var(--status-ongoing-text)' }}>
                                    Live
                                </span>
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {ongoingTournaments.map((tournament) => (
                                <TournamentCard
                                    key={tournament.id}
                                    tournament={tournament}
                                />
                            ))}
                        </div>
                    </section>
                )}

                {/* ── CTA SECTION ── */}
                {!auth.user && (
                    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
                        <div
                            className="relative overflow-hidden rounded-2xl p-12 text-center"
                            style={{
                                background: 'var(--accent-primary)',
                            }}
                        >
                            {/* Subtle grid overlay */}
                            <div className="dot-grid absolute inset-0 opacity-10" />

                            <div className="relative">
                                <h2
                                    className="mb-3 text-3xl font-bold"
                                    style={{ color: '#ffffff' }}
                                >
                                    Siap Berkompetisi?
                                </h2>
                                <p
                                    className="mx-auto mb-7 max-w-md text-base"
                                    style={{ color: 'rgba(255,255,255,0.85)' }}
                                >
                                    Bergabung dengan ribuan pemain dan buktikan kemampuan
                                    terbaik kamu di turnamen resmi KyberCup.
                                </p>
                                <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                                    <Link
                                        href={register()}
                                        className="inline-flex items-center gap-2 rounded-xl px-8 py-3 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
                                        style={{
                                            background: '#ffffff',
                                            color: 'var(--accent-primary)',
                                            boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.15)';
                                        }}
                                    >
                                        <Zap className="h-4 w-4" />
                                        Mulai Sekarang — Gratis
                                    </Link>
                                    <Link
                                        href={login()}
                                        className="inline-flex items-center gap-2 rounded-xl px-8 py-3 text-sm font-semibold transition-all duration-200"
                                        style={{
                                            background: 'transparent',
                                            border: '1px solid rgba(255,255,255,0.4)',
                                            color: 'rgba(255,255,255,0.9)',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'transparent';
                                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
                                        }}
                                    >
                                        Sudah punya akun? Masuk
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* ── FOOTER ── */}
                <footer
                    style={{ borderTop: '1px solid var(--border-default)' }}
                >
                    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
                        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                            <div className="flex items-center gap-2">
                                <img
                                    loading="lazy"
                                    src="/logo-kyber.png"
                                    alt="KyberCup"
                                    className="h-7 w-7 object-contain"
                                />
                                <span
                                    className="logo-kybercup text-sm"
                                    style={{
                                        color: 'var(--text-primary)',
                                    }}
                                >
                                    KyberCup
                                </span>
                            </div>
                            <p
                                className="text-xs"
                                style={{ color: 'var(--text-muted)' }}
                            >
                                © 2026 KyberCup — Platform Manajemen Turnamen Esport.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
