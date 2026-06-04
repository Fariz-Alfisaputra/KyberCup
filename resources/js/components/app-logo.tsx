export default function AppLogo() {
    return (
        <>
            <img
                src="/logo-kyber.png"
                alt="KyberCup"
                className="size-9 object-contain drop-shadow-sm"
                style={{ filter: 'drop-shadow(0 0 6px rgba(0,212,255,0.5))' }}
            />
            <div className="ml-1 grid flex-1 text-left text-sm leading-tight">
                <span
                    className="truncate font-black tracking-widest uppercase"
                    style={{
                        fontFamily: 'Orbitron, sans-serif',
                        fontSize: '0.85rem',
                        color: '#f0f4ff',
                    }}
                >
                    Kyber
                    <span
                        style={{
                            color: 'var(--sw-blue-neon)',
                            textShadow: '0 0 6px var(--sw-blue-neon)',
                        }}
                    >
                        Cup
                    </span>
                </span>
            </div>
        </>
    );
}
