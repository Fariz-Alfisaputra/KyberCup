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
            className="relative flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 overflow-hidden"
            style={{ background: '#0a0a0f' }}
        >
            {/* Starfield background */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `
                        radial-gradient(1.5px 1.5px at 8%  12%,  rgba(255,255,255,0.8) 0%, transparent 100%),
                        radial-gradient(1px   1px   at 22% 40%,  rgba(255,255,255,0.5) 0%, transparent 100%),
                        radial-gradient(2px   2px   at 35% 8%,   rgba(255,255,255,0.6) 0%, transparent 100%),
                        radial-gradient(1px   1px   at 55% 55%,  rgba(255,255,255,0.4) 0%, transparent 100%),
                        radial-gradient(1.5px 1.5px at 70% 20%,  rgba(255,255,255,0.7) 0%, transparent 100%),
                        radial-gradient(1px   1px   at 80% 75%,  rgba(255,255,255,0.5) 0%, transparent 100%),
                        radial-gradient(2px   2px   at 92% 88%,  rgba(0,212,255,0.4)   0%, transparent 100%),
                        radial-gradient(1px   1px   at 4%  85%,  rgba(255,232,31,0.3)  0%, transparent 100%),
                        radial-gradient(1.5px 1.5px at 48% 65%,  rgba(255,255,255,0.3) 0%, transparent 100%),
                        radial-gradient(1px   1px   at 28% 92%,  rgba(255,255,255,0.4) 0%, transparent 100%),
                        radial-gradient(1px   1px   at 63% 30%,  rgba(0,212,255,0.2)   0%, transparent 100%)
                    `,
                    backgroundSize: '500px 500px',
                    backgroundRepeat: 'repeat',
                }}
            />

            {/* Glow orbs */}
            <div
                className="absolute pointer-events-none"
                style={{
                    top: '20%',
                    left: '10%',
                    width: '300px',
                    height: '300px',
                    background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(40px)',
                }}
            />
            <div
                className="absolute pointer-events-none"
                style={{
                    bottom: '15%',
                    right: '10%',
                    width: '250px',
                    height: '250px',
                    background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(40px)',
                }}
            />

            {/* Logo */}
            <Link
                href={home()}
                className="relative flex items-center gap-2.5 z-10 group cursor-pointer"
                aria-label="Kembali ke halaman utama"
            >
                <img
                    src="/logo-kyber.png"
                    alt="KyberCup"
                    className="h-14 w-14 object-contain transition-all duration-300 group-hover:scale-105"
                    style={{ filter: 'drop-shadow(0 0 10px rgba(0,212,255,0.5))' }}
                />
                <span
                    className="text-2xl font-black tracking-widest uppercase"
                    style={{
                        fontFamily: 'Orbitron, sans-serif',
                        color: '#f0f4ff',
                    }}
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

            {/* Auth Card */}
            <div
                className="relative w-full max-w-sm z-10"
                style={{
                    background: 'rgba(10,10,15,0.85)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(0,212,255,0.2)',
                    boxShadow: '0 0 40px rgba(0,212,255,0.08), 0 20px 60px rgba(0,0,0,0.7)',
                    borderRadius: '1rem',
                    padding: '2rem',
                }}
            >
                {/* Top accent line */}
                <div
                    className="absolute top-0 left-8 right-8 h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, var(--sw-blue-neon), transparent)' }}
                />

                {/* Title */}
                <div className="mb-6 text-center">
                    <h1
                        className="text-xl font-bold tracking-wider mb-1"
                        style={{ fontFamily: 'Rajdhani, sans-serif', color: '#f0f4ff', textTransform: 'uppercase' }}
                    >
                        {title}
                    </h1>
                    <p className="text-sm" style={{ color: 'rgba(240,244,255,0.45)' }}>
                        {description}
                    </p>
                </div>

                {children}

                {/* Star Wars tagline */}
                <p
                    className="mt-6 text-center text-xs italic"
                    style={{ color: 'rgba(255,232,31,0.4)', fontFamily: 'Rajdhani, sans-serif' }}
                >
                    "May the Force be with you."
                </p>

                {/* Bottom accent line */}
                <div
                    className="absolute bottom-0 left-8 right-8 h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.3), transparent)' }}
                />
            </div>
        </div>
    );
}
