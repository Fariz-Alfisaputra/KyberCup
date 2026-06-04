import { useAppearance } from '@/hooks/use-appearance';
import { playSaberIgnite } from '@/lib/audio';
import { cn } from '@/lib/utils';

/** Rebel Alliance (Jedi / Light Side) icon */
const LightSideIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={cn('h-5 w-5 fill-current', className)}>
        <path d="M12 2C12 2 11.23 5.43 7.2 6.1C7.2 6.1 5.67 4 5.67 4C5.67 4 6.43 7.33 4.67 9.33C2.9 11.33 1.33 18 12 22C22.67 18 21.1 11.33 19.33 9.33C17.57 7.33 18.33 4 18.33 4C18.33 4 16.8 6.1 16.8 6.1C12.77 5.43 12 2 12 2ZM12 6.67C12.73 6.67 13.33 7.27 13.33 8V12C13.33 12.73 12.73 13.33 12 13.33C11.27 13.33 10.67 12.73 10.67 12V8C10.67 7.27 11.27 6.67 12 6.67Z" />
    </svg>
);

/** Galactic Empire (Sith / Dark Side) icon */
const DarkSideIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={cn('h-5 w-5 fill-current', className)}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 1.5c4.69 0 8.5 3.81 8.5 8.5S16.69 20.5 12 20.5 3.5 16.69 3.5 12 7.31 3.5 12 3.5zm0 1.5c-.55 0-1 .45-1 1v2.17c-.77.16-1.46.54-2 1.08L7.33 7.58c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41l1.67 1.67c-.54.54-.92 1.23-1.08 2H4.33c-.55 0-1 .45-1 1s.45 1 1 1h2.17c.16.77.54 1.46 1.08 2l-1.67 1.67c-.39.39-.39 1.02 0 1.41.2.2.46.3.71.3s.51-.1.71-.3l1.67-1.67c.54.54 1.23.92 2 1.08v2.17c0 .55.45 1 1 1s1-.45 1-1v-2.17c.77-.16 1.46-.54 2-1.08l1.67 1.67c.2.2.46.3.71.3s.51-.1.71-.3c.39-.39.39-1.02 0-1.41l-1.67-1.67c.54-.54.92-1.23 1.08-2h2.17c.55 0 1-.45 1-1s-.45-1-1-1h-2.17c-.16-.77-.54-1.46-1.08-2l1.67-1.67c.39-.39.39-1.02 0-1.41s-1.02-.39-1.41 0l-1.67 1.67c-.54-.54-1.23-.92-2-1.08V6c0-.55-.45-1-1-1zm0 3.5c1.93 0 3.5 1.57 3.5 3.5S13.93 15.5 12 15.5 8.5 13.93 8.5 12 10.07 9 12 9z" />
    </svg>
);

export default function ThemeToggle() {
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const isLightSide = resolvedAppearance === 'light-side';

    const toggleTheme = () => {
        const next = isLightSide ? 'dark-side' : 'light-side';
        updateAppearance(next);
        playSaberIgnite(next === 'dark-side' ? 'sith' : 'jedi');
    };

    return (
        <button
            onClick={toggleTheme}
            className="group relative flex cursor-pointer items-center overflow-hidden rounded-full border border-[var(--border-default)] bg-[var(--bg-surface)] p-1 text-[var(--text-primary)] transition-all duration-500 hover:border-[var(--border-accent)] hover:shadow-[0_0_15px_var(--accent-primary-glow)]"
            title={`Ganti Tema (Aktif: ${isLightSide ? 'Light Side' : 'Dark Side'})`}
            aria-label="Toggle tema Light Side / Dark Side"
        >
            {/* Sliding glow background */}
            <div className="absolute inset-0 -z-10 bg-[var(--accent-primary)] opacity-5 transition-all duration-500" />

            <div className="relative z-10 flex items-center gap-1.5 px-2 py-0.5">
                {/* Sliding active capsule */}
                <div
                    className={cn(
                        'absolute top-0.5 bottom-0.5 -z-10 w-8 rounded-full border border-[var(--border-accent)] bg-[var(--accent-primary-light)] transition-all duration-500 ease-out',
                        isLightSide ? 'left-0.5' : 'left-[calc(100%-2.05rem)]',
                    )}
                />

                {/* ☀️ Light Side */}
                <div
                    className={cn(
                        'transition-all duration-500',
                        isLightSide
                            ? 'scale-100 text-[var(--accent-primary)] opacity-100 drop-shadow-[0_0_4px_var(--accent-primary-glow)]'
                            : 'scale-90 text-[var(--text-muted)] opacity-30 hover:opacity-50',
                    )}
                >
                    <LightSideIcon />
                </div>

                {/* 🌑 Dark Side */}
                <div
                    className={cn(
                        'transition-all duration-500',
                        !isLightSide
                            ? 'scale-100 text-[var(--accent-primary)] opacity-100 drop-shadow-[0_0_4px_var(--accent-primary-glow)]'
                            : 'scale-90 text-[var(--text-muted)] opacity-30 hover:opacity-50',
                    )}
                >
                    <DarkSideIcon />
                </div>
            </div>

            {/* Label tooltip inside button */}
            <span
                className="pr-2 text-xs font-semibold tracking-wider text-[var(--accent-primary)] transition-all duration-300"
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
            >
                {isLightSide ? 'LIGHT' : 'DARK'}
            </span>
        </button>
    );
}
