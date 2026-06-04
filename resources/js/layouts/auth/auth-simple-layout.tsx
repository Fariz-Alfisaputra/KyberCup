import { Link } from '@inertiajs/react';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div
            className="relative flex min-h-svh flex-col items-center justify-center gap-6 overflow-hidden p-6 md:p-10"
            style={{ background: 'var(--bg-page)' }}
        >
            {/* Starfield background */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    backgroundImage: `
                        radial-gradient(1.5px 1.5px at 8%  12%,  rgba(255,255,255,0.8) 0%, transparent 100%),
                        radial-gradient(1px   1px   at 22% 40%,  rgba(255,255,255,0.5) 0%, transparent 100%),
                        radial-gradient(2px   2px   at 35% 8%,   rgba(255,255,255,0.6) 0%, transparent 100%),
                        radial-gradient(1px   1px   at 55% 55%,  rgba(255,255,255,0.4) 0%, transparent 100%),
                        radial-gradient(1.5px 1.5px at 70% 20%,  rgba(255,255,255,0.7) 0%, transparent 100%),
                        radial-gradient(1px   1px   at 80% 75%,  rgba(255,255,255,0.5) 0%, transparent 100%),
                        radial-gradient(2px   2px   at 92% 88%,  var(--accent-primary-glow) 0%, transparent 100%),
                        radial-gradient(1px   1px   at 4%  85%,  var(--accent-gold-bg)  0%, transparent 100%),
                        radial-gradient(1.5px 1.5px at 48% 65%,  rgba(255,255,255,0.3) 0%, transparent 100%),
                        radial-gradient(1px   1px   at 28% 92%,  rgba(255,255,255,0.4) 0%, transparent 100%),
                        radial-gradient(1px   1px   at 63% 30%,  var(--accent-primary-glow)   0%, transparent 100%)
                    `,
                    backgroundSize: '500px 500px',
                    backgroundRepeat: 'repeat',
                }}
            />

            {/* Glow orbs */}
            <div
                className="pointer-events-none absolute"
                style={{
                    top: '20%',
                    left: '10%',
                    width: '300px',
                    height: '300px',
                    background:
                        'radial-gradient(circle, var(--accent-primary-glow) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(40px)',
                }}
            />
            <div
                className="pointer-events-none absolute"
                style={{
                    bottom: '15%',
                    right: '10%',
                    width: '250px',
                    height: '250px',
                    background:
                        'radial-gradient(circle, var(--accent-gold-bg) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(40px)',
                }}
            />

            {/* Logo */}
            <Link
                href={home()}
                className="group relative z-10 flex cursor-pointer items-center gap-2.5"
                aria-label="Kembali ke halaman utama"
            >
                <img
                    src="/logo-kyber.png"
                    alt="KyberCup"
                    className="h-14 w-14 object-contain transition-all duration-300 group-hover:scale-105"
                    style={{
                        filter: 'drop-shadow(0 0 10px var(--accent-primary-glow))',
                    }}
                />
                <span
                    className="text-2xl font-black tracking-widest uppercase"
                    style={{
                        fontFamily: 'Orbitron, sans-serif',
                        color: 'var(--text-primary)',
                    }}
                >
                    Kyber
                    <span
                        style={{
                            color: 'var(--accent-primary)',
                            textShadow: '0 0 8px var(--accent-primary-glow)',
                        }}
                    >
                        Cup
                    </span>
                </span>
            </Link>

            {/* Auth Card */}
            <div
                className="relative z-10 w-full max-w-sm"
                style={{
                    background: 'var(--bg-surface)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid var(--border-default)',
                    boxShadow:
                        '0 0 40px var(--accent-primary-glow), 0 20px 60px rgba(0,0,0,0.5)',
                    borderRadius: '1rem',
                    padding: '2rem',
                }}
            >
                {/* Top accent line */}
                <div
                    className="absolute top-0 right-8 left-8 h-px"
                    style={{
                        background:
                            'linear-gradient(90deg, transparent, var(--accent-primary), transparent)',
                    }}
                />

                {/* Title */}
                <div className="mb-6 text-center">
                    <h1
                        className="mb-1 text-xl font-bold tracking-wider"
                        style={{
                            fontFamily: 'Rajdhani, sans-serif',
                            color: 'var(--text-primary)',
                            textTransform: 'uppercase',
                        }}
                    >
                        {title}
                    </h1>
                    <p
                        className="text-sm"
                        style={{ color: 'var(--text-muted)' }}
                    >
                        {description}
                    </p>
                </div>

                {children}

                {/* Star Wars tagline */}
                <p
                    className="mt-6 text-center text-xs italic"
                    style={{
                        color: 'var(--accent-gold)',
                        fontFamily: 'Rajdhani, sans-serif',
                    }}
                >
                    "May the Force be with you."
                </p>

                {/* Bottom accent line */}
                <div
                    className="absolute right-8 bottom-0 left-8 h-px"
                    style={{
                        background:
                            'linear-gradient(90deg, transparent, var(--accent-primary), transparent)',
                    }}
                />
            </div>
        </div>
    );
}
