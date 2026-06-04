import { Link } from '@inertiajs/react';

export default function ServerError() {
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
            {/* Hologram glitch scanlines */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                        'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.03) 2px, rgba(0,212,255,0.03) 4px)',
                    pointerEvents: 'none',
                    animation: 'scanlines 0.1s linear infinite',
                }}
            />

            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '2rem' }}>
                {/* Glitching 500 */}
                <div style={{ position: 'relative' }}>
                    <h1
                        style={{
                            fontSize: 'clamp(6rem, 20vw, 12rem)',
                            fontFamily: 'Orbitron, monospace',
                            fontWeight: 900,
                            lineHeight: 1,
                            color: 'var(--accent-gold, #FFE81F)',
                            textShadow: '0 0 40px rgba(255,232,31,0.4), 0 0 80px rgba(255,232,31,0.15)',
                            margin: 0,
                            letterSpacing: '0.15em',
                            animation: 'glitchText 3s ease-in-out infinite',
                        }}
                    >
                        500
                    </h1>
                </div>

                {/* Gold lightsaber divider */}
                <div
                    style={{
                        width: '200px',
                        height: '3px',
                        margin: '1.5rem auto',
                        borderRadius: '3px',
                        background: 'linear-gradient(90deg, transparent, var(--accent-gold, #FFE81F), transparent)',
                        boxShadow: '0 0 12px rgba(255,232,31,0.4)',
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
                    Gangguan di Server Galaksi
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
                    Terjadi kesalahan di server kami. Tim teknisi sedang memperbaiki transmisi ini.
                    Coba muat ulang halaman atau kembali nanti.
                </p>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.75rem 2rem',
                            borderRadius: '0.5rem',
                            border: '1px solid var(--accent-gold, #FFE81F)',
                            background: 'rgba(255,232,31,0.08)',
                            color: 'var(--accent-gold, #FFE81F)',
                            fontFamily: 'Rajdhani, sans-serif',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 0 16px rgba(255,232,31,0.15)',
                        }}
                    >
                        ↻ Muat Ulang
                    </button>

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
            </div>

            <style>{`
                @keyframes scanlines {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(4px); }
                }
                @keyframes glitchText {
                    0%, 90%, 100% { transform: translate(0); opacity: 1; }
                    92% { transform: translate(-3px, 1px); opacity: 0.8; }
                    94% { transform: translate(3px, -1px); opacity: 0.9; }
                    96% { transform: translate(-2px, 0); opacity: 0.85; }
                    98% { transform: translate(1px, 1px); opacity: 1; }
                }
            `}</style>
        </div>
    );
}
