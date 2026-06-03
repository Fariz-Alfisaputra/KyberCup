import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, ChevronRight, Gamepad2, Shield, Trophy, Users, Zap } from 'lucide-react';
import TournamentCard from '@/components/tournament/TournamentCard';
import type { TournamentListItem } from '@/types';
import { dashboard, login, register } from '@/routes';
import ThemeToggle from '@/components/ThemeToggle';
import StarfieldBackground from '@/components/StarfieldBackground';
import LightsaberClash from '@/components/LightsaberClash';

interface HomeProps {
    openTournaments: TournamentListItem[];
    ongoingTournaments: TournamentListItem[];
}

export default function Home({ openTournaments, ongoingTournaments }: HomeProps) {
    const { auth } = usePage().props as { auth: { user: { name: string } | null } };

    return (
        <>
            <Head title="KyberCup - Platform Turnamen Esport Galaksi" />

            <div className="min-h-screen bg-background text-foreground relative transition-colors duration-500 overflow-x-hidden">
                {/* Dynamic Starfield Particle Background */}
                <StarfieldBackground />

                {/* Navigation */}
                <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl transition-colors duration-500">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
                        <Link href="/" className="flex items-center gap-2.5">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg gaming-gradient shadow-md">
                                <Trophy className="h-4 w-4 text-white" />
                            </div>
                            <span className="text-xl font-black tracking-tight text-foreground">
                                Kyber<span className="text-primary transition-colors duration-500">Cup</span>
                            </span>
                        </Link>

                        <div className="hidden items-center gap-6 md:flex">
                            <Link
                                href="/tournaments"
                                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                            >
                                Turnamen
                            </Link>
                            <Link
                                href="/teams"
                                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                            >
                                Tim
                            </Link>
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Rebel vs Empire Theme Selector */}
                            <ThemeToggle />

                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/95 gaming-glow"
                                >
                                    Dashboard
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href={register()}
                                        className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/95 gaming-glow"
                                    >
                                        Daftar
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="relative overflow-hidden">
                    <div className="hero-grid absolute inset-0 opacity-20 dark:opacity-40 transition-opacity duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-background transition-all duration-500" />

                    <div className="relative mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:py-28">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary transition-all duration-500">
                            <Zap className="h-3.5 w-3.5 animate-pulse" />
                            Galactic Esport Tournament Platform
                        </div>

                        <h1 className="mb-6 text-5xl font-black leading-tight tracking-tight text-foreground lg:text-7xl transition-colors duration-500">
                            Buktikan{' '}
                            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent transition-all duration-500">
                                The Force
                            </span>
                            <br />
                            di Arena Digital
                        </h1>

                        <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground transition-colors duration-500">
                            Ikuti turnamen esport paling epik di galaksi. Jadilah Jedi Master atau Sith Lord di arena gaming
                            dan menangkan hadiah kredit galaksi yang berlimpah.
                        </p>

                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Link
                                href="/tournaments"
                                className="flex items-center gap-2 rounded-xl gaming-gradient px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:shadow-primary/45"
                            >
                                <Trophy className="h-5 w-5" />
                                Lihat Turnamen
                            </Link>
                            {!auth.user && (
                                <Link
                                    href={register()}
                                    className="flex items-center gap-2 rounded-xl border border-border bg-card/60 backdrop-blur-xs px-8 py-3.5 text-base font-bold text-foreground transition-all hover:border-primary/50 hover:bg-card"
                                >
                                    <Users className="h-5 w-5" />
                                    Daftar Gratis
                                </Link>
                            )}
                        </div>

                        {/* Interactive Lightsaber clash center widget */}
                        <LightsaberClash />

                        {/* Stats */}
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
                                        className="rounded-xl border border-border bg-card/50 p-5 backdrop-blur-xs force-card"
                                    >
                                        <Icon className="mb-2 h-5 w-5 text-primary transition-colors duration-500" />
                                        <p className="text-2xl font-black text-foreground transition-colors duration-500">{stat.value}</p>
                                        <p className="text-xs text-muted-foreground transition-colors duration-500">{stat.label}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Open Tournaments */}
                {openTournaments.length > 0 && (
                    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
                        <div className="mb-8 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-black text-foreground">
                                    Turnamen{' '}
                                    <span className="text-primary transition-colors duration-500">Terbuka</span>
                                </h2>
                                <p className="mt-1 text-sm text-muted-foreground transition-colors duration-500">Daftar sekarang sebelum kuota penuh</p>
                            </div>
                            <Link
                                href="/tournaments"
                                className="flex items-center gap-1 text-sm font-semibold text-primary transition-colors duration-500 hover:text-primary/80"
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

                {/* Ongoing Tournaments */}
                {ongoingTournaments.length > 0 && (
                    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
                        <div className="mb-8">
                            <div className="mb-1 flex items-center gap-2">
                                <div className="h-2 w-2 animate-pulse rounded-full bg-primary transition-colors duration-500" />
                                <span className="text-xs font-bold uppercase tracking-wider text-primary transition-colors duration-500">
                                    Live
                                </span>
                            </div>
                            <h2 className="text-2xl font-black text-foreground">
                                Sedang <span className="text-primary transition-colors duration-500">Berlangsung</span>
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {ongoingTournaments.map((tournament) => (
                                <TournamentCard key={tournament.id} tournament={tournament} />
                            ))}
                        </div>
                    </section>
                )}

                {/* CTA */}
                {!auth.user && (
                    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
                        <div className="relative overflow-hidden rounded-2xl gaming-gradient p-12 text-center shadow-xl">
                            <div className="hero-grid absolute inset-0 opacity-10" />
                            <div className="relative">
                                <h2 className="mb-4 text-3xl font-black text-white">
                                    Siap Menguasai Galaksi?
                                </h2>
                                <p className="mx-auto mb-8 max-w-lg text-white/90">
                                    Bergabung dengan ribuan pejuang terbaik di galaksi dan buktikan kekuatanmu di arena
                                    turnamen resmi. May the force be with you.
                                </p>
                                <Link
                                    href={register()}
                                    className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-bold text-black shadow-lg transition-all hover:scale-105 hover:bg-white/90"
                                >
                                    <Zap className="h-5 w-5" />
                                    Mulai Sekarang — Gratis
                                </Link>
                            </div>
                        </div>
                    </section>
                )}

                {/* Footer */}
                <footer className="border-t border-border/60 transition-colors duration-500">
                    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
                        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                            <div className="flex items-center gap-2">
                                <div className="flex h-6 w-6 items-center justify-center rounded gaming-gradient shadow-xs">
                                    <Trophy className="h-3 w-3 text-white" />
                                </div>
                                <span className="text-sm font-bold text-foreground transition-colors duration-500">KyberCup</span>
                            </div>
                            <p className="text-xs text-muted-foreground transition-colors duration-500">
                                © 2026 KyberCup. Platform Manajemen Turnamen di Galaksi Jauh, Jauh Sekali.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
