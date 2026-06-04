import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    ChevronRight,
    Gamepad2,
    Play,
    Shield,
    Trophy,
    Users,
    Zap,
} from 'lucide-react';
import { useState } from 'react';
import LightsaberClash from '@/components/LightsaberClash';
import StarfieldBackground from '@/components/StarfieldBackground';
import StarWarsIntro from '@/components/StarWarsIntro';
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

    const [showIntro, setShowIntro] = useState(() => {
        if (typeof window !== 'undefined') {
            return sessionStorage.getItem('hasSeenIntro') !== 'true';
        }

        return false;
    });

    const handleCloseIntro = () => {
        setShowIntro(false);
        sessionStorage.setItem('hasSeenIntro', 'true');
    };

    return (
        <>
            {showIntro && <StarWarsIntro onClose={handleCloseIntro} />}

            <Head title="KyberCup - Platform Turnamen Esport Galaksi" />

            <div
                className="relative min-h-screen overflow-x-hidden text-foreground transition-colors duration-500"
                style={{ background: 'var(--background)' }}
            >
                {/* Dynamic Starfield Particle Background */}
                <StarfieldBackground />

                {/* ── NAVIGATION ── */}
                <nav
                    className="sticky top-0 z-50 transition-colors duration-500"
                    style={{
                        background: 'rgba(10,10,15,0.75)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        borderBottom: '1px solid rgba(0,212,255,0.12)',
                    }}
                >
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="group flex cursor-pointer items-center gap-2.5"
                            aria-label="Kembali ke halaman utama"
                        >
                            <img
                                loading="lazy"
                                src="/logo-kyber.png"
                                alt="KyberCup"
                                className="h-11 w-11 object-contain transition-all duration-300 group-hover:scale-105"
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

                        {/* Nav links */}
                        <div className="hidden items-center gap-8 md:flex">
                            {[
                                { href: '/tournaments', label: 'Turnamen' },
                                { href: '/teams', label: 'Tim' },
                            ].map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="nav-link-sw"
                                    style={{ color: 'var(--text-secondary)' }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color =
                                            'var(--text-primary)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color =
                                            'var(--text-secondary)';
                                    }}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>

                        {/* CTA buttons */}
                        <div className="flex items-center gap-3">
                            {/* Theme toggle */}
                            <ThemeToggle />

                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300"
                                    style={{
                                        background:
                                            'var(--accent-primary-light)',
                                        border: '1px solid var(--border-accent)',
                                        color: 'var(--accent-primary)',
                                        fontFamily: 'Rajdhani, sans-serif',
                                        letterSpacing: '0.08em',
                                        textTransform: 'uppercase',
                                        fontSize: '0.8rem',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background =
                                            'var(--accent-primary-glow)';
                                        e.currentTarget.style.boxShadow =
                                            '0 0 16px var(--accent-primary-glow)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background =
                                            'var(--accent-primary-light)';
                                        e.currentTarget.style.boxShadow =
                                            'none';
                                    }}
                                >
                                    Dashboard
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="nav-link-sw hidden text-sm font-semibold transition-colors md:block"
                                        style={{
                                            color: 'var(--text-secondary)',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.color =
                                                'var(--text-primary)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.color =
                                                'var(--text-secondary)';
                                        }}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href={register()}
                                        className="rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300"
                                        style={{
                                            background:
                                                'var(--accent-primary-light)',
                                            border: '1px solid var(--border-accent)',
                                            color: 'var(--accent-primary)',
                                            fontFamily: 'Rajdhani, sans-serif',
                                            letterSpacing: '0.08em',
                                            textTransform: 'uppercase',
                                            fontSize: '0.8rem',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background =
                                                'var(--accent-primary)';
                                            e.currentTarget.style.color =
                                                'var(--bg-page)';
                                            e.currentTarget.style.boxShadow =
                                                '0 0 20px var(--accent-primary-glow)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background =
                                                'var(--accent-primary-light)';
                                            e.currentTarget.style.color =
                                                'var(--accent-primary)';
                                            e.currentTarget.style.boxShadow =
                                                'none';
                                        }}
                                    >
                                        Daftar
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                {/* ── HERO SECTION ── */}
                <section className="relative overflow-hidden">
                    {/* Starfield dots */}
                    <div className="hero-grid absolute inset-0 opacity-20 transition-opacity duration-500 dark:opacity-40" />

                    {/* Gradient overlay */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background:
                                'linear-gradient(180deg, rgba(0,212,255,0.05) 0%, transparent 50%, rgba(10,10,15,0.8) 100%)',
                        }}
                    />

                    {/* Ambient glow orbs */}
                    <div
                        className="pointer-events-none absolute"
                        style={{
                            top: '-10%',
                            left: '-5%',
                            width: '500px',
                            height: '500px',
                            background:
                                'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)',
                            filter: 'blur(60px)',
                        }}
                    />
                    <div
                        className="pointer-events-none absolute"
                        style={{
                            top: '20%',
                            right: '-5%',
                            width: '400px',
                            height: '400px',
                            background:
                                'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
                            filter: 'blur(60px)',
                        }}
                    />

                    <div className="relative mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:py-32">
                        {/* Badge */}
                        <div
                            className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm"
                            style={{
                                background: 'var(--status-open-bg)',
                                border: '1px solid var(--border-accent)',
                                color: 'var(--status-open-text)',
                                fontFamily: 'Rajdhani, sans-serif',
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                fontSize: '0.75rem',
                            }}
                        >
                            <Zap className="h-3.5 w-3.5 animate-pulse" />
                            Galactic Esport Tournament Platform
                        </div>

                        {/* Headline */}
                        <h1
                            className="mb-6 text-5xl leading-tight font-black tracking-tight lg:text-7xl"
                            style={{
                                fontFamily: 'Rajdhani, sans-serif',
                                color: 'var(--text-primary)',
                                textShadow: '0 0 40px rgba(0,0,0,0.5)',
                            }}
                        >
                            Buktikan{' '}
                            <span
                                className="bg-clip-text text-transparent"
                                style={{
                                    backgroundImage: 'var(--gaming-gradient)',
                                    filter: 'drop-shadow(0 0 20px var(--accent-primary-glow))',
                                }}
                            >
                                The Force
                            </span>
                            <br />
                            <span style={{ color: 'var(--text-primary)' }}>
                                di Arena Digital
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p
                            className="mx-auto mb-10 max-w-2xl text-lg"
                            style={{
                                color: 'var(--text-secondary)',
                                fontFamily: 'Inter, sans-serif',
                                lineHeight: '1.7',
                            }}
                        >
                            Ikuti turnamen esport paling epik di galaksi.
                            Jadilah Jedi Master atau Sith Lord di arena gaming
                            dan menangkan hadiah kredit galaksi yang berlimpah.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            {/* Primary — Jedi Blue */}
                            <Link
                                href="/tournaments"
                                className="flex items-center gap-2 rounded-xl px-8 py-3.5 text-base font-bold transition-all duration-300 hover:scale-105"
                                style={{
                                    background: 'var(--status-open-bg)',
                                    border: '1px solid var(--border-accent)',
                                    color: 'var(--accent-primary)',
                                    boxShadow:
                                        '0 0 20px var(--accent-primary-glow)',
                                    fontFamily: 'Rajdhani, sans-serif',
                                    letterSpacing: '0.08em',
                                    textTransform: 'uppercase',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background =
                                        'var(--accent-primary)';
                                    e.currentTarget.style.color =
                                        'var(--bg-page)';
                                    e.currentTarget.style.boxShadow =
                                        '0 0 40px var(--accent-primary-glow)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background =
                                        'var(--status-open-bg)';
                                    e.currentTarget.style.color =
                                        'var(--accent-primary)';
                                    e.currentTarget.style.boxShadow =
                                        '0 0 20px var(--accent-primary-glow)';
                                }}
                            >
                                <Trophy className="h-5 w-5" />
                                Lihat Turnamen
                            </Link>

                            {/* Secondary — Sith Red (register) */}
                            {!auth.user && (
                                <Link
                                    href={register()}
                                    className="flex items-center gap-2 rounded-xl px-8 py-3.5 text-base font-bold transition-all duration-300 hover:scale-105"
                                    style={{
                                        background: 'var(--status-cancel-bg)',
                                        border: '1px solid var(--border-strong)',
                                        color: 'var(--status-cancel-text)',
                                        fontFamily: 'Rajdhani, sans-serif',
                                        letterSpacing: '0.08em',
                                        textTransform: 'uppercase',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background =
                                            'var(--status-cancel-text)';
                                        e.currentTarget.style.color =
                                            'var(--bg-page)';
                                        e.currentTarget.style.boxShadow =
                                            '0 0 40px var(--accent-primary-glow)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background =
                                            'var(--status-cancel-bg)';
                                        e.currentTarget.style.color =
                                            'var(--status-cancel-text)';
                                        e.currentTarget.style.boxShadow =
                                            'none';
                                    }}
                                >
                                    <Users className="h-5 w-5" />
                                    Daftar Gratis
                                </Link>
                            )}

                            {/* Replay intro */}
                            <button
                                onClick={() => setShowIntro(true)}
                                className="flex cursor-pointer items-center gap-2 rounded-xl px-8 py-3.5 text-base font-bold transition-all duration-300 hover:scale-105"
                                style={{
                                    background: 'rgba(255,255,255,0.04)',
                                    border: '1px solid var(--border-default)',
                                    color: 'var(--text-secondary)',
                                    fontFamily: 'Rajdhani, sans-serif',
                                    letterSpacing: '0.08em',
                                    textTransform: 'uppercase',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background =
                                        'var(--bg-hover)';
                                    e.currentTarget.style.color =
                                        'var(--text-primary)';
                                    e.currentTarget.style.borderColor =
                                        'var(--border-strong)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background =
                                        'rgba(255,255,255,0.04)';
                                    e.currentTarget.style.color =
                                        'var(--text-secondary)';
                                    e.currentTarget.style.borderColor =
                                        'var(--border-default)';
                                }}
                            >
                                <Play
                                    className="h-5 w-5 animate-pulse"
                                    style={{ color: 'var(--accent-primary)' }}
                                />
                                Putar Ulang Intro
                            </button>
                        </div>

                        {/* Interactive Lightsaber clash */}
                        <LightsaberClash />

                        {/* Stats grid */}
                        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
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
                                        className="rounded-xl p-5 transition-all duration-300"
                                        style={{
                                            background:
                                                'rgba(255,255,255,0.03)',
                                            border: '1px solid var(--border-default)',
                                            backdropFilter: 'blur(10px)',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background =
                                                'var(--bg-hover)';
                                            e.currentTarget.style.borderColor =
                                                'var(--border-accent)';
                                            e.currentTarget.style.boxShadow =
                                                '0 0 16px var(--accent-primary-glow)';
                                            e.currentTarget.style.transform =
                                                'translateY(-2px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background =
                                                'rgba(255,255,255,0.03)';
                                            e.currentTarget.style.borderColor =
                                                'var(--border-default)';
                                            e.currentTarget.style.boxShadow =
                                                'none';
                                            e.currentTarget.style.transform =
                                                'translateY(0)';
                                        }}
                                    >
                                        <Icon
                                            className="mb-2 h-5 w-5"
                                            style={{
                                                color: 'var(--accent-primary)',
                                            }}
                                        />
                                        <p
                                            className="text-2xl font-black"
                                            style={{
                                                fontFamily:
                                                    'Orbitron, sans-serif',
                                                color: 'var(--text-primary)',
                                                fontSize: '1.4rem',
                                            }}
                                        >
                                            {stat.value}
                                        </p>
                                        <p
                                            className="mt-0.5 text-xs"
                                            style={{
                                                color: 'var(--text-muted)',
                                                fontFamily:
                                                    'Rajdhani, sans-serif',
                                                letterSpacing: '0.05em',
                                            }}
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
                    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
                        <div className="mb-8 flex items-center justify-between">
                            <div>
                                <div className="mb-1 flex items-center gap-2">
                                    <div
                                        className="h-2 w-6 rounded-full"
                                        style={{
                                            background: 'var(--accent-primary)',
                                            boxShadow:
                                                '0 0 6px var(--accent-primary-glow)',
                                        }}
                                    />
                                    <span
                                        className="text-xs font-bold tracking-widest uppercase"
                                        style={{
                                            color: 'var(--accent-primary)',
                                            fontFamily: 'Rajdhani, sans-serif',
                                        }}
                                    >
                                        Open Registration
                                    </span>
                                </div>
                                <h2
                                    className="text-2xl font-black"
                                    style={{
                                        fontFamily: 'Rajdhani, sans-serif',
                                        color: 'var(--text-primary)',
                                    }}
                                >
                                    Turnamen{' '}
                                    <span
                                        style={{
                                            color: 'var(--accent-primary)',
                                            textShadow:
                                                '0 0 8px var(--accent-primary-glow)',
                                        }}
                                    >
                                        Terbuka
                                    </span>
                                </h2>
                                <p
                                    className="mt-1 text-sm"
                                    style={{
                                        color: 'var(--text-muted)',
                                        fontFamily: 'Rajdhani, sans-serif',
                                    }}
                                >
                                    Daftar sekarang sebelum kuota penuh
                                </p>
                            </div>
                            <Link
                                href="/tournaments"
                                className="nav-link-sw flex items-center gap-1 text-sm font-semibold transition-all duration-200"
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
                    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
                        <div className="mb-8">
                            <div className="mb-1 flex items-center gap-2">
                                <div
                                    className="h-2 w-2 animate-pulse rounded-full"
                                    style={{
                                        background: 'var(--status-cancel-text)',
                                        boxShadow:
                                            '0 0 6px var(--accent-primary-glow)',
                                    }}
                                />
                                <span
                                    className="text-xs font-bold tracking-widest uppercase"
                                    style={{
                                        color: 'var(--status-cancel-text)',
                                        fontFamily: 'Rajdhani, sans-serif',
                                    }}
                                >
                                    Live
                                </span>
                            </div>
                            <h2
                                className="text-2xl font-black"
                                style={{
                                    fontFamily: 'Rajdhani, sans-serif',
                                    color: 'var(--text-primary)',
                                }}
                            >
                                Sedang{' '}
                                <span
                                    style={{
                                        color: 'var(--status-ongoing-text)',
                                        textShadow:
                                            '0 0 8px var(--accent-primary-glow)',
                                    }}
                                >
                                    Berlangsung
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
                    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
                        <div
                            className="relative overflow-hidden rounded-2xl p-12 text-center"
                            style={{
                                background: 'var(--gaming-gradient)',
                                border: '1px solid var(--border-accent)',
                                backdropFilter: 'blur(10px)',
                            }}
                        >
                            {/* Top line accent */}
                            <div
                                className="absolute top-0 right-16 left-16 h-px"
                                style={{
                                    background:
                                        'linear-gradient(90deg, transparent, var(--accent-primary), transparent)',
                                }}
                            />
                            <div className="hero-grid absolute inset-0 opacity-5" />
                            <div className="relative">
                                <h2
                                    className="mb-4 text-3xl font-black"
                                    style={{
                                        fontFamily: 'Rajdhani, sans-serif',
                                        color: 'var(--text-primary)',
                                        letterSpacing: '0.05em',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    Siap Menguasai{' '}
                                    <span
                                        style={{
                                            color: 'var(--accent-primary)',
                                            textShadow:
                                                '0 0 12px var(--accent-primary-glow)',
                                        }}
                                    >
                                        Galaksi?
                                    </span>
                                </h2>
                                <p
                                    className="mx-auto mb-8 max-w-lg"
                                    style={{
                                        color: 'var(--text-secondary)',
                                        fontFamily: 'Inter, sans-serif',
                                    }}
                                >
                                    Bergabung dengan ribuan pejuang terbaik di
                                    galaksi dan buktikan kekuatanmu di arena
                                    turnamen resmi. May the force be with you.
                                </p>
                                <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                                    <Link
                                        href={register()}
                                        className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-base font-bold transition-all duration-300 hover:scale-105"
                                        style={{
                                            background: 'var(--accent-primary)',
                                            color: 'var(--bg-page)',
                                            fontFamily: 'Rajdhani, sans-serif',
                                            letterSpacing: '0.08em',
                                            textTransform: 'uppercase',
                                            boxShadow:
                                                '0 0 30px var(--accent-primary-glow)',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.boxShadow =
                                                '0 0 50px var(--accent-primary-glow)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.boxShadow =
                                                '0 0 30px var(--accent-primary-glow)';
                                        }}
                                    >
                                        <Zap className="h-5 w-5" />
                                        Mulai Sekarang — Gratis
                                    </Link>
                                    <Link
                                        href={login()}
                                        className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-base font-bold transition-all duration-300"
                                        style={{
                                            background: 'transparent',
                                            border: '1px solid var(--border-default)',
                                            color: 'var(--text-secondary)',
                                            fontFamily: 'Rajdhani, sans-serif',
                                            letterSpacing: '0.08em',
                                            textTransform: 'uppercase',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor =
                                                'var(--border-strong)';
                                            e.currentTarget.style.color =
                                                'var(--text-primary)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor =
                                                'var(--border-default)';
                                            e.currentTarget.style.color =
                                                'var(--text-secondary)';
                                        }}
                                    >
                                        Sudah punya akun? Login
                                    </Link>
                                </div>
                            </div>
                            {/* Bottom line accent */}
                            <div
                                className="absolute right-16 bottom-0 left-16 h-px"
                                style={{
                                    background:
                                        'linear-gradient(90deg, transparent, var(--border-accent), transparent)',
                                }}
                            />
                        </div>
                    </section>
                )}

                {/* ── FOOTER ── */}
                <footer
                    className="transition-colors duration-500"
                    style={{ borderTop: '1px solid var(--border-default)' }}
                >
                    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
                        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                            <div className="flex items-center gap-2">
                                <img
                                    loading="lazy"
                                    src="/logo-kyber.png"
                                    alt="KyberCup"
                                    className="h-8 w-8 object-contain"
                                    style={{
                                        filter: 'drop-shadow(0 0 4px var(--accent-primary-glow))',
                                    }}
                                />
                                <span
                                    className="text-sm font-bold tracking-widest uppercase"
                                    style={{
                                        fontFamily: 'Orbitron, sans-serif',
                                        color: 'var(--text-primary)',
                                        fontSize: '0.7rem',
                                    }}
                                >
                                    KyberCup
                                </span>
                            </div>
                            <p
                                className="text-xs"
                                style={{
                                    color: 'var(--text-muted)',
                                    fontFamily: 'Rajdhani, sans-serif',
                                }}
                            >
                                © 2026 KyberCup — Platform Manajemen Turnamen di
                                Galaksi Jauh, Jauh Sekali.
                            </p>
                            <p
                                className="text-xs italic"
                                style={{
                                    color: 'var(--accent-gold)',
                                    fontFamily: 'Rajdhani, sans-serif',
                                }}
                            >
                                "A long time ago in a galaxy far, far away..."
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
