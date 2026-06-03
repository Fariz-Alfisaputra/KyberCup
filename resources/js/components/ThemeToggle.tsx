import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import { playSaberIgnite } from '@/lib/audio';

const RebelIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={cn("w-5 h-5 fill-current", className)}>
        <path d="M12 2C12 2 11.23 5.43 7.2 6.1C7.2 6.1 5.67 4 5.67 4C5.67 4 6.43 7.33 4.67 9.33C2.9 11.33 1.33 18 12 22C22.67 18 21.1 11.33 19.33 9.33C17.57 7.33 18.33 4 18.33 4C18.33 4 16.8 6.1 16.8 6.1C12.77 5.43 12 2 12 2ZM12 6.67C12.73 6.67 13.33 7.27 13.33 8V12C13.33 12.73 12.73 13.33 12 13.33C11.27 13.33 10.67 12.73 10.67 12V8C10.67 7.27 11.27 6.67 12 6.67Z" />
    </svg>
);

const EmpireIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={cn("w-5 h-5 fill-current", className)}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 1.5c4.69 0 8.5 3.81 8.5 8.5S16.69 20.5 12 20.5 3.5 16.69 3.5 12 7.31 3.5 12 3.5zm0 1.5c-.55 0-1 .45-1 1v2.17c-.77.16-1.46.54-2 1.08L7.33 7.58c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41l1.67 1.67c-.54.54-.92 1.23-1.08 2H4.33c-.55 0-1 .45-1 1s.45 1 1 1h2.17c.16.77.54 1.46 1.08 2l-1.67 1.67c-.39.39-.39 1.02 0 1.41.2.2.46.3.71.3s.51-.1.71-.3l1.67-1.67c.54.54 1.23.92 2 1.08v2.17c0 .55.45 1 1 1s1-.45 1-1v-2.17c.77-.16 1.46-.54 2-1.08l1.67 1.67c.2.2.46.3.71.3s.51-.1.71-.3c.39-.39.39-1.02 0-1.41l-1.67-1.67c.54-.54.92-1.23 1.08-2h2.17c.55 0 1-.45 1-1s-.45-1-1-1h-2.17c-.16-.77-.54-1.46-1.08-2l1.67-1.67c.39-.39.39-1.02 0-1.41s-1.02-.39-1.41 0l-1.67 1.67c-.54-.54-1.23-.92-2-1.08V6c0-.55-.45-1-1-1zm0 3.5c1.93 0 3.5 1.57 3.5 3.5S13.93 15.5 12 15.5 8.5 13.93 8.5 12 10.07 9 12 9z" />
    </svg>
);

const NeutralIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={cn("w-5 h-5 fill-current", className)}>
        {/* Mandalorian Mythosaur Skull */}
        <path d="M12 2C11.5 2 11 2.4 10.8 2.8L9.5 5.5C9.2 6.1 9 6.8 9 7.5V11C9 12.5 10.2 13.8 11.7 14V17.5C11.7 18.3 11 19 10.2 19H8C7.4 19 7 19.4 7 20C7 20.6 7.4 21 8 21H16C16.6 21 17 20.6 17 20C17 19.4 16.6 19 16 19H13.8C13 19 12.3 18.3 12.3 17.5V14C13.8 13.8 15 12.5 15 11V7.5C15 6.8 14.8 6.1 14.5 5.5L13.2 2.8C13 2.4 12.5 2 12 2Z" />
        <path d="M7.5 7.5C6.7 7.5 6 8.2 6 9V11.5C6 13.5 7.3 15.2 9.1 15.8L7.5 19.5C7.3 20 7.5 20.6 8 20.8C8.5 21 9.1 20.8 9.3 20.3L11.3 15.8C10 15.3 9 14.2 8.5 12.8C8.1 12.4 8 11.9 8 11.5V9C8 8.7 8.1 8.5 8.2 8.3L7.5 7.5Z" />
        <path d="M16.5 7.5L15.8 8.3C15.9 8.5 16 8.7 16 9V11.5C16 11.9 15.9 12.4 15.5 12.8C15 14.2 14 15.3 12.7 15.8L14.7 20.3C14.9 20.8 15.5 21 16 20.8C16.5 20.6 16.7 20 16.5 19.5L14.9 15.8C16.7 15.2 18 13.5 18 11.5V9C18 8.2 17.3 7.5 16.5 7.5Z" />
    </svg>
);

export default function ThemeToggle() {
    const { resolvedAppearance, updateAppearance } = useAppearance();

    const toggleTheme = () => {
        let nextTheme: 'jedi' | 'sith' | 'neutral';
        if (resolvedAppearance === 'jedi') {
            nextTheme = 'sith';
        } else if (resolvedAppearance === 'sith') {
            nextTheme = 'neutral';
        } else {
            nextTheme = 'jedi';
        }
        updateAppearance(nextTheme);
        playSaberIgnite(nextTheme);
    };

    return (
        <button
            onClick={toggleTheme}
            className={cn(
                "relative group flex items-center p-1 rounded-full border transition-all duration-500 overflow-hidden cursor-pointer",
                resolvedAppearance === 'jedi' && "bg-white border-blue-200 text-blue-600 hover:border-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.35)]",
                resolvedAppearance === 'neutral' && "bg-neutral-900 border-yellow-900/40 text-yellow-500 hover:border-yellow-500 hover:shadow-[0_0_15px_rgba(250,204,21,0.35)]",
                resolvedAppearance === 'sith' && "bg-neutral-900 border-red-900/50 text-red-500 hover:border-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.35)]"
            )}
            title={`Ganti Tema (Aktif: ${resolvedAppearance.toUpperCase()})`}
            aria-label="Toggle Star Wars Theme"
        >
            {/* Sliding Glow Background */}
            <div 
                className={cn(
                    "absolute inset-0 opacity-5 transition-all duration-500 -z-10",
                    resolvedAppearance === 'jedi' && "bg-blue-500",
                    resolvedAppearance === 'neutral' && "bg-yellow-500",
                    resolvedAppearance === 'sith' && "bg-red-500"
                )} 
            />

            <div className="relative flex items-center gap-3 px-2 py-0.5 z-10">
                {/* Visual indicator (sliding capsule) */}
                <div 
                    className={cn(
                        "absolute top-0.5 bottom-0.5 w-8 rounded-full transition-all duration-500 -z-10 ease-out",
                        resolvedAppearance === 'jedi' && "left-0.5 bg-blue-600/15 border border-blue-500/20",
                        resolvedAppearance === 'neutral' && "left-[calc(50%-1rem)] bg-yellow-500/15 border border-yellow-500/20",
                        resolvedAppearance === 'sith' && "left-[calc(100%-2.05rem)] bg-red-600/15 border border-red-500/20"
                    )}
                />

                {/* Light Side / JEDI */}
                <div className={cn(
                    "transition-all duration-500",
                    resolvedAppearance === 'jedi' 
                        ? "opacity-100 scale-100 drop-shadow-[0_0_4px_rgba(59,130,246,0.6)]" 
                        : "opacity-30 scale-85 hover:opacity-50"
                )}>
                    <RebelIcon />
                </div>

                {/* Neutral / MANDALORIAN / YELLOW */}
                <div className={cn(
                    "transition-all duration-500",
                    resolvedAppearance === 'neutral' 
                        ? "opacity-100 scale-100 drop-shadow-[0_0_4px_rgba(250,204,21,0.6)]" 
                        : "opacity-30 scale-85 hover:opacity-50"
                )}>
                    <NeutralIcon />
                </div>

                {/* Dark Side / SITH */}
                <div className={cn(
                    "transition-all duration-500",
                    resolvedAppearance === 'sith' 
                        ? "opacity-100 scale-100 drop-shadow-[0_0_4px_rgba(239,68,68,0.6)]" 
                        : "opacity-30 scale-85 hover:opacity-50"
                )}>
                    <EmpireIcon />
                </div>
            </div>
        </button>
    );
}

