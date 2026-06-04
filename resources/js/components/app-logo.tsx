export default function AppLogo() {
    return (
        <>
            <img
                src="/logo-kyber.png"
                alt="KyberCup"
                className="size-9 object-contain drop-shadow-sm"
                style={{
                    filter: 'drop-shadow(0 0 6px var(--accent-primary-glow))',
                }}
            />
            <div className="ml-1 grid flex-1 text-left text-sm leading-tight">
                <span
                    className="truncate font-black tracking-widest uppercase"
                    style={{
                        fontFamily: 'Orbitron, sans-serif',
                        fontSize: '0.85rem',
                        color: 'var(--text-primary)',
                    }}
                >
                    Kyber
                    <span
                        style={{
                            color: 'var(--accent-primary)',
                            textShadow: '0 0 6px var(--accent-primary-glow)',
                        }}
                    >
                        Cup
                    </span>
                </span>
            </div>
        </>
    );
}
