import { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, ChevronRight, Gamepad2, Play, Shield, Trophy, Users, Zap } from 'lucide-react';
import TournamentCard from '@/components/tournament/TournamentCard';
import type { TournamentListItem } from '@/types';
import { dashboard, login, register } from '@/routes';
import ThemeToggle from '@/components/ThemeToggle';
import StarfieldBackground from '@/components/StarfieldBackground';
import LightsaberClash from '@/components/LightsaberClash';
import StarWarsIntro from '@/components/StarWarsIntro';

interface HomeProps {
    openTournaments: TournamentListItem[];
    ongoingTournaments: TournamentListItem[];
}

export default function Home({ openTournaments, ongoingTournaments }: HomeProps) {
    const { auth } = usePage().props as { auth: { user: { name: string } | null } };

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
                className="min-h-screen text-foreground relative transition-colors duration-500 overflow-x-hidden"
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
                            className="flex items-center gap-2.5 group cursor-pointer"
                            aria-label="Kembali ke halaman utama"
                        >
                            <img
                                src="/logo-kyber.png"
                                alt="KyberCup"
                                className="h-11 w-11 object-contain transition-all duration-300 group-hover:scale-105"
                                style={{ filter: 'drop-shadow(0 0 8px rgba(0,212,255,0.5))' }}
                            />
                            <span
                                className="text-xl font-black tracking-widest uppercase"
                                style={{ fontFamily: 'Orbitron, sans-serif', color: '#f0f4ff' }}
                            >
                                Kyber
                                <span
                                    style={{
                                        color: 'var(--sw-blue-neon)',
                                        textShadow: '0 0 8px var(--sw-blue-neon)',
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
                                    style={{ color: 'rgba(240,244,255,0.6)' }}
                                    onMouseEnter={(e) => { e.currentTarget.style.color = '#f0f4ff'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(240,244,255,0.6)'; }}
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
                                        background: 'rgba(0,212,255,0.1)',
                                        border: '1px solid rgba(0,212,255,0.35)',
                                        color: 'var(--sw-blue-neon)',
                                        fontFamily: 'Rajdhani, sans-serif',
                                        letterSpacing: '0.08em',
                                        textTransform: 'uppercase',
                                        fontSize: '0.8rem',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(0,212,255,0.18)';
                                        e.currentTarget.style.boxShadow = '0 0 16px rgba(0,212,255,0.25)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'rgba(0,212,255,0.1)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    Dashboard
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="hidden text-sm font-semibold transition-colors md:block nav-link-sw"
                                        style={{ color: 'rgba(240,244,255,0.6)' }}
                                        onMouseEnter={(e) => { e.currentTarget.style.color = '#f0f4ff'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(240,244,255,0.6)'; }}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href={register()}
                                        className="rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300"
                                        style={{
                                            background: 'rgba(0,212,255,0.1)',
                                            border: '1px solid rgba(0,212,255,0.35)',
                                            color: 'var(--sw-blue-neon)',
                                            fontFamily: 'Rajdhani, sans-serif',
                                            letterSpacing: '0.08em',
                                            textTransform: 'uppercase',
                                            fontSize: '0.8rem',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = 'var(--sw-blue-neon)';
                                            e.currentTarget.style.color = '#0a0a0f';
                                            e.currentTarget.style.boxShadow = '0 0 20px rgba(0,212,255,0.4)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'rgba(0,212,255,0.1)';
                                            e.currentTarget.style.color = 'var(--sw-blue-neon)';
                                            e.currentTarget.style.boxShadow = 'none';
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
                    <div className="hero-grid absolute inset-0 opacity-20 dark:opacity-40 transition-opacity duration-500" />

                    {/* Gradient overlay */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: 'linear-gradient(180deg, rgba(0,212,255,0.05) 0%, transparent 50%, rgba(10,10,15,0.8) 100%)',
                        }}
                    />

                    {/* Ambient glow orbs */}
                    <div
                        className="absolute pointer-events-none"
                        style={{
                            top: '-10%',
                            left: '-5%',
                            width: '500px',
                            height: '500px',
                            background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)',
                            filter: 'blur(60px)',
                        }}
                    />
                    <div
                        className="absolute pointer-events-none"
                        style={{
                            top: '20%',
                            right: '-5%',
                            width: '400px',
                            height: '400px',
                            background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
                            filter: 'blur(60px)',
                        }}
                    />

                    <div className="relative mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:py-32">
                        {/* Badge */}
                        <div
                            className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm"
                            style={{
                                background: 'rgba(0,212,255,0.08)',
                                border: '1px solid rgba(0,212,255,0.25)',
                                color: 'var(--sw-blue-neon)',
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
                            className="mb-6 text-5xl font-black leading-tight tracking-tight lg:text-7xl"
                            style={{
                                fontFamily: 'Rajdhani, sans-serif',
                                color: '#f0f4ff',
                                textShadow: '0 0 40px rgba(0,0,0,0.5)',
                            }}
                        >
                            Buktikan{' '}
                            <span
                                className="bg-clip-text text-transparent"
                                style={{
                                    backgroundImage: 'linear-gradient(135deg, var(--sw-blue-neon) 0%, #7c3aed 100%)',
                                    filter: 'drop-shadow(0 0 20px rgba(0,212,255,0.4))',
                                }}
                            >
                                The Force
                            </span>
                            <br />
                            <span style={{ color: '#f0f4ff' }}>di Arena Digital</span>
                        </h1>

                        {/* Subtitle */}
                        <p
                            className="mx-auto mb-10 max-w-2xl text-lg"
                            style={{ color: 'rgba(240,244,255,0.55)', fontFamily: 'Inter, sans-serif', lineHeight: '1.7' }}
                        >
                            Ikuti turnamen esport paling epik di galaksi. Jadilah Jedi Master atau Sith Lord di arena gaming
                            dan menangkan hadiah kredit galaksi yang berlimpah.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            {/* Primary — Jedi Blue */}
                            <Link
                                href="/tournaments"
                                className="flex items-center gap-2 rounded-xl px-8 py-3.5 text-base font-bold transition-all duration-300 hover:scale-105"
                                style={{
                                    background: 'rgba(0,212,255,0.12)',
                                    border: '1px solid rgba(0,212,255,0.4)',
                                    color: 'var(--sw-blue-neon)',
                                    boxShadow: '0 0 20px rgba(0,212,255,0.15)',
                                    fontFamily: 'Rajdhani, sans-serif',
                                    letterSpacing: '0.08em',
                                    textTransform: 'uppercase',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'var(--sw-blue-neon)';
                                    e.currentTarget.style.color = '#0a0a0f';
                                    e.currentTarget.style.boxShadow = '0 0 40px rgba(0,212,255,0.5)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(0,212,255,0.12)';
                                    e.currentTarget.style.color = 'var(--sw-blue-neon)';
                                    e.currentTarget.style.boxShadow = '0 0 20px rgba(0,212,255,0.15)';
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
                                        background: 'rgba(255,45,45,0.08)',
                                        border: '1px solid rgba(255,45,45,0.3)',
                                        color: 'var(--sw-red-sith)',
                                        fontFamily: 'Rajdhani, sans-serif',
                                        letterSpacing: '0.08em',
                                        textTransform: 'uppercase',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'var(--sw-red-sith)';
                                        e.currentTarget.style.color = '#fff';
                                        e.currentTarget.style.boxShadow = '0 0 40px rgba(255,45,45,0.4)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'rgba(255,45,45,0.08)';
                                        e.currentTarget.style.color = 'var(--sw-red-sith)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    <Users className="h-5 w-5" />
                                    Daftar Gratis
                                </Link>
                            )}

                            {/* Replay intro */}
                            <button
                                onClick={() => setShowIntro(true)}
                                className="flex items-center gap-2 rounded-xl px-8 py-3.5 text-base font-bold transition-all duration-300 hover:scale-105 cursor-pointer"
                                style={{
                                    background: 'rgba(255,255,255,0.04)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: 'rgba(240,244,255,0.6)',
                                    fontFamily: 'Rajdhani, sans-serif',
                                    letterSpacing: '0.08em',
                                    textTransform: 'uppercase',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                                    e.currentTarget.style.color = '#f0f4ff';
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                                    e.currentTarget.style.color = 'rgba(240,244,255,0.6)';
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                                }}
                            >
                                <Play
                                    className="h-5 w-5 animate-pulse"
                                    style={{ color: 'var(--sw-blue-neon)' }}
                                />
                                Putar Ulang Intro
                            </button>
                        </div>

                        {/* Interactive Lightsaber clash */}
                        <LightsaberClash />

                        {/* Stats grid */}
                        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
                            {[
                                { label: 'Turnamen Aktif', value: openTournaments.length, icon: Trophy },
                                { label: 'Game Tersedia', value: '4+', icon: Gamepad2 },
                                { label: 'Tim Terdaftar', value: '50+', icon: Shield },
                                { label: 'Total Hadiah', value: 'Rp 10M+', icon: Zap },
                            ].map((stat) => {
                                const Icon = stat.icon;
                                return (
                                    <div
                                        key={stat.label}
                                        className="rounded-xl p-5 transition-all duration-300"
                                        style={{
                                            background: 'rgba(255,255,255,0.03)',
                                            border: '1px solid rgba(0,212,255,0.12)',
                                            backdropFilter: 'blur(10px)',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = 'rgba(0,212,255,0.06)';
                                            e.currentTarget.style.borderColor = 'rgba(0,212,255,0.25)';
                                            e.currentTarget.style.boxShadow = '0 0 16px rgba(0,212,255,0.1)';
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                                            e.currentTarget.style.borderColor = 'rgba(0,212,255,0.12)';
                                            e.currentTarget.style.boxShadow = 'none';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                        }}
                                    >
                                        <Icon
                                            className="mb-2 h-5 w-5"
                                            style={{ color: 'var(--sw-blue-neon)' }}
                                        />
                                        <p
                                            className="text-2xl font-black"
                                            style={{ fontFamily: 'Orbitron, sans-serif', color: '#f0f4ff', fontSize: '1.4rem' }}
                                        >
                                            {stat.value}
                                        </p>
                                        <p
                                            className="text-xs mt-0.5"
                                            style={{ color: 'rgba(240,244,255,0.45)', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.05em' }}
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
                                        style={{ background: 'var(--sw-blue-neon)', boxShadow: '0 0 6px var(--sw-blue-neon)' }}
                                    />
                                    <span
                                        className="text-xs font-bold uppercase tracking-widest"
                                        style={{ color: 'var(--sw-blue-neon)', fontFamily: 'Rajdhani, sans-serif' }}
                                    >
                                        Open Registration
                                    </span>
                                </div>
                                <h2
                                    className="text-2xl font-black"
                                    style={{ fontFamily: 'Rajdhani, sans-serif', color: '#f0f4ff' }}
                                >
                                    Turnamen{' '}
                                    <span style={{ color: 'var(--sw-blue-neon)', textShadow: '0 0 8px rgba(0,212,255,0.4)' }}>
                                        Terbuka
                                    </span>
                                </h2>
                                <p className="mt-1 text-sm" style={{ color: 'rgba(240,244,255,0.4)', fontFamily: 'Rajdhani, sans-serif' }}>
                                    Daftar sekarang sebelum kuota penuh
                                </p>
                            </div>
                            <Link
                                href="/tournaments"
                                className="flex items-center gap-1 text-sm font-semibold transition-all duration-200 nav-link-sw"
                                style={{ color: 'var(--sw-blue-neon)' }}
                            >
                                Lihat Semua <ChevronRight className="h-4 w-4" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {openTournaments.map((tournament) => (
                                <TournamentCard key={tournament.id} tournament={tournament} />
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
                                    className="h-2 w-2 rounded-full animate-pulse"
                                    style={{ background: 'var(--sw-red-sith)', boxShadow: '0 0 6px var(--sw-red-sith)' }}
                                />
                                <span
                                    className="text-xs font-bold uppercase tracking-widest"
                                    style={{ color: 'var(--sw-red-sith)', fontFamily: 'Rajdhani, sans-serif' }}
                                >
                                    Live
                                </span>
                            </div>
                            <h2
                                className="text-2xl font-black"
                                style={{ fontFamily: 'Rajdhani, sans-serif', color: '#f0f4ff' }}
                            >
                                Sedang{' '}
                                <span style={{ color: '#a78bfa', textShadow: '0 0 8px rgba(124,58,237,0.4)' }}>
                                    Berlangsung
                                </span>
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {ongoingTournaments.map((tournament) => (
                                <TournamentCard key={tournament.id} tournament={tournament} />
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
                                background: 'linear-gradient(135deg, rgba(0,212,255,0.08) 0%, rgba(124,58,237,0.12) 50%, rgba(255,45,45,0.06) 100%)',
                                border: '1px solid rgba(0,212,255,0.2)',
                                backdropFilter: 'blur(10px)',
                            }}
                        >
                            {/* Top line accent */}
                            <div
                                className="absolute top-0 left-16 right-16 h-px"
                                style={{ background: 'linear-gradient(90deg, transparent, var(--sw-blue-neon), transparent)' }}
                            />
                            <div className="hero-grid absolute inset-0 opacity-5" />
                            <div className="relative">
                                <h2
                                    className="mb-4 text-3xl font-black"
                                    style={{
                                        fontFamily: 'Rajdhani, sans-serif',
                                        color: '#f0f4ff',
                                        letterSpacing: '0.05em',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    Siap Menguasai{' '}
                                    <span style={{ color: 'var(--sw-blue-neon)', textShadow: '0 0 12px rgba(0,212,255,0.5)' }}>
                                        Galaksi?
                                    </span>
                                </h2>
                                <p
                                    className="mx-auto mb-8 max-w-lg"
                                    style={{ color: 'rgba(240,244,255,0.55)', fontFamily: 'Inter, sans-serif' }}
                                >
                                    Bergabung dengan ribuan pejuang terbaik di galaksi dan buktikan kekuatanmu di arena
                                    turnamen resmi. May the force be with you.
                                </p>
                                <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                                    <Link
                                        href={register()}
                                        className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-base font-bold transition-all duration-300 hover:scale-105"
                                        style={{
                                            background: 'var(--sw-blue-neon)',
                                            color: '#0a0a0f',
                                            fontFamily: 'Rajdhani, sans-serif',
                                            letterSpacing: '0.08em',
                                            textTransform: 'uppercase',
                                            boxShadow: '0 0 30px rgba(0,212,255,0.4)',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.boxShadow = '0 0 50px rgba(0,212,255,0.6)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.boxShadow = '0 0 30px rgba(0,212,255,0.4)';
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
                                            border: '1px solid rgba(240,244,255,0.2)',
                                            color: 'rgba(240,244,255,0.7)',
                                            fontFamily: 'Rajdhani, sans-serif',
                                            letterSpacing: '0.08em',
                                            textTransform: 'uppercase',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = 'rgba(240,244,255,0.4)';
                                            e.currentTarget.style.color = '#f0f4ff';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = 'rgba(240,244,255,0.2)';
                                            e.currentTarget.style.color = 'rgba(240,244,255,0.7)';
                                        }}
                                    >
                                        Sudah punya akun? Login
                                    </Link>
                                </div>
                            </div>
                            {/* Bottom line accent */}
                            <div
                                className="absolute bottom-0 left-16 right-16 h-px"
                                style={{ background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.5), transparent)' }}
                            />
                        </div>
                    </section>
                )}

                {/* ── FOOTER ── */}
                <footer
                    className="transition-colors duration-500"
                    style={{ borderTop: '1px solid rgba(0,212,255,0.1)' }}
                >
                    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
                        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                            <div className="flex items-center gap-2">
                                <img
                                    src="/logo-kyber.png"
                                    alt="KyberCup"
                                    className="h-8 w-8 object-contain"
                                    style={{ filter: 'drop-shadow(0 0 4px rgba(0,212,255,0.4))' }}
                                />
                                <span
                                    className="text-sm font-bold tracking-widest uppercase"
                                    style={{ fontFamily: 'Orbitron, sans-serif', color: '#f0f4ff', fontSize: '0.7rem' }}
                                >
                                    KyberCup
                                </span>
                            </div>
                            <p
                                className="text-xs"
                                style={{ color: 'rgba(240,244,255,0.3)', fontFamily: 'Rajdhani, sans-serif' }}
                            >
                                © 2026 KyberCup — Platform Manajemen Turnamen di Galaksi Jauh, Jauh Sekali.
                            </p>
                            <p
                                className="text-xs italic"
                                style={{ color: 'rgba(255,232,31,0.35)', fontFamily: 'Rajdhani, sans-serif' }}
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
