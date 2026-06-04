import { Link } from '@inertiajs/react';

export default function NotFound() {
    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--bg-page, #0a0a0f)',
                color: 'var(--text-primary, #e2e8f0)',
                fontFamily: 'Rajdhani, Inter, sans-serif',
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            {/* Animated stars background */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                        'radial-gradient(2px 2px at 20px 30px, rgba(0,212,255,0.3), transparent),' +
                        'radial-gradient(2px 2px at 40px 70px, rgba(255,232,31,0.2), transparent),' +
                        'radial-gradient(1px 1px at 90px 40px, rgba(0,212,255,0.4), transparent),' +
                        'radial-gradient(1px 1px at 160px 120px, rgba(255,255,255,0.3), transparent),' +
                        'radial-gradient(2px 2px at 200px 50px, rgba(0,212,255,0.2), transparent),' +
                        'radial-gradient(1px 1px at 300px 80px, rgba(255,232,31,0.3), transparent)',
                    backgroundSize: '400px 200px',
                    animation: 'starDrift 60s linear infinite',
                    opacity: 0.6,
                }}
            />

            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '2rem' }}>
                {/* 404 number with glow */}
                <h1
                    style={{
                        fontSize: 'clamp(6rem, 20vw, 12rem)',
                        fontFamily: 'Orbitron, monospace',
                        fontWeight: 900,
                        lineHeight: 1,
                        color: 'var(--accent-primary, #00d4ff)',
                        textShadow:
                            '0 0 40px rgba(0,212,255,0.5), 0 0 80px rgba(0,212,255,0.2)',
                        margin: 0,
                        letterSpacing: '0.15em',
                    }}
                >
                    404
                </h1>

                {/* Lightsaber divider */}
                <div
                    style={{
                        width: '200px',
                        height: '3px',
                        margin: '1.5rem auto',
                        borderRadius: '3px',
                        background: 'linear-gradient(90deg, transparent, var(--accent-primary, #00d4ff), transparent)',
                        boxShadow: '0 0 12px var(--accent-primary, #00d4ff)',
                    }}
                />

                <h2
                    style={{
                        fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: 'var(--text-primary, #e2e8f0)',
                        margin: '0 0 0.75rem',
                    }}
                >
                    Halaman Ini Tidak Ada di Galaksi
                </h2>

                <p
                    style={{
                        fontSize: '1rem',
                        color: 'var(--text-muted, #94a3b8)',
                        maxWidth: '480px',
                        margin: '0 auto 2rem',
                        lineHeight: 1.6,
                    }}
                >
                    Halaman yang kamu cari tidak ditemukan. Mungkin telah berpindah ke galaksi
                    yang jauh… sangat jauh.
                </p>

                <Link
                    href="/"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.75rem 2rem',
                        borderRadius: '0.5rem',
                        border: '1px solid var(--accent-primary, #00d4ff)',
                        background: 'rgba(0,212,255,0.08)',
                        color: 'var(--accent-primary, #00d4ff)',
                        fontFamily: 'Rajdhani, sans-serif',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 0 16px rgba(0,212,255,0.15)',
                    }}
                >
                    ← Kembali ke Beranda
                </Link>
            </div>

            <style>{`
                @keyframes starDrift {
                    from { transform: translateY(0); }
                    to { transform: translateY(-200px); }
                }
            `}</style>
        </div>
    );
}
