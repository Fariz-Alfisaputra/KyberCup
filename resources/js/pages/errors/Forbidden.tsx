import { Link } from '@inertiajs/react';

export default function Forbidden() {
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
            {/* Red force barrier overlay */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                        'radial-gradient(ellipse at center, rgba(255,45,45,0.06) 0%, transparent 70%)',
                    animation: 'barrierPulse 3s ease-in-out infinite',
                }}
            />

            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '2rem' }}>
                {/* Force barrier icon */}
                <div
                    style={{
                        width: '120px',
                        height: '120px',
                        margin: '0 auto 1.5rem',
                        borderRadius: '50%',
                        border: '3px solid rgba(255,45,45,0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(255,45,45,0.05)',
                        boxShadow: '0 0 40px rgba(255,45,45,0.15), inset 0 0 30px rgba(255,45,45,0.08)',
                        animation: 'shieldPulse 2s ease-in-out infinite',
                    }}
                >
                    <span
                        style={{
                            fontSize: '3rem',
                            fontFamily: 'Orbitron, monospace',
                            fontWeight: 900,
                            color: 'var(--accent-danger, #ff2d2d)',
                            textShadow: '0 0 20px rgba(255,45,45,0.5)',
                        }}
                    >
                        ⊘
                    </span>
                </div>

                <h1
                    style={{
                        fontSize: 'clamp(4rem, 15vw, 8rem)',
                        fontFamily: 'Orbitron, monospace',
                        fontWeight: 900,
                        lineHeight: 1,
                        color: 'var(--accent-danger, #ff2d2d)',
                        textShadow: '0 0 40px rgba(255,45,45,0.4)',
                        margin: 0,
                        letterSpacing: '0.15em',
                    }}
                >
                    403
                </h1>

                {/* Red lightsaber divider */}
                <div
                    style={{
                        width: '200px',
                        height: '3px',
                        margin: '1.5rem auto',
                        borderRadius: '3px',
                        background: 'linear-gradient(90deg, transparent, var(--accent-danger, #ff2d2d), transparent)',
                        boxShadow: '0 0 12px rgba(255,45,45,0.5)',
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
                    Kamu Tidak Memiliki Izin, Padawan
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
                    Kamu tidak memiliki akses untuk melihat halaman ini. Hubungi admin jika kamu
                    merasa ini adalah kesalahan.
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
                @keyframes barrierPulse {
                    0%, 100% { opacity: 0.5; }
                    50% { opacity: 1; }
                }
                @keyframes shieldPulse {
                    0%, 100% { transform: scale(1); box-shadow: 0 0 40px rgba(255,45,45,0.15), inset 0 0 30px rgba(255,45,45,0.08); }
                    50% { transform: scale(1.05); box-shadow: 0 0 60px rgba(255,45,45,0.25), inset 0 0 40px rgba(255,45,45,0.12); }
                }
            `}</style>
        </div>
    );
}
