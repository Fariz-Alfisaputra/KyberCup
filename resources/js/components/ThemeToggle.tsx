import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import { ShieldAlert, ShieldCheck } from 'lucide-react';

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

export default function ThemeToggle() {
    const { resolvedAppearance, updateAppearance } = useAppearance();

    const toggleTheme = () => {
        updateAppearance(resolvedAppearance === 'light' ? 'dark' : 'light');
    };

    const isDark = resolvedAppearance === 'dark';

    return (
        <button
            onClick={toggleTheme}
            className={cn(
                "relative group flex items-center justify-between p-1.5 rounded-full border transition-all duration-500 overflow-hidden cursor-pointer",
                isDark 
                    ? "bg-neutral-900 border-red-900/50 text-red-500 hover:border-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]" 
                    : "bg-white border-blue-200 text-blue-600 hover:border-blue-500 hover:shadow-[0_0_15px_rgba(37,99,235,0.3)]"
            )}
            title={isDark ? "Switch to Jedi Light Side" : "Switch to Sith Dark Side"}
            aria-label="Toggle Star Wars Theme"
        >
            {/* Dynamic Sliding Glow Background */}
            <div 
                className={cn(
                    "absolute top-0 bottom-0 left-0 right-0 opacity-10 transition-all duration-500 -z-10",
                    isDark ? "bg-red-500" : "bg-blue-500"
                )} 
            />

            <div className="relative flex items-center gap-1.5 px-2 py-0.5">
                {/* Visual indicator (sliding capsule) */}
                <div 
                    className={cn(
                        "absolute top-0.5 bottom-0.5 w-7 rounded-full transition-all duration-500 -z-10 ease-out",
                        isDark 
                            ? "left-[calc(100%-1.875rem)] bg-red-600/20 border border-red-500/40" 
                            : "left-0.5 bg-blue-600/10 border border-blue-500/30"
                    )}
                />

                {/* Light Side emblem */}
                <div className={cn(
                    "transition-all duration-500",
                    isDark ? "opacity-35 scale-90" : "opacity-100 scale-100 drop-shadow-[0_0_4px_rgba(37,99,235,0.5)]"
                )}>
                    <RebelIcon />
                </div>

                {/* Theme name/text */}
                <span className={cn(
                    "text-[10px] font-black tracking-widest uppercase transition-all duration-500 select-none",
                    isDark ? "text-red-400" : "text-blue-500"
                )}>
                    {isDark ? "SITH" : "JEDI"}
                </span>

                {/* Dark Side emblem */}
                <div className={cn(
                    "transition-all duration-500",
                    isDark ? "opacity-100 scale-100 drop-shadow-[0_0_4px_rgba(239,68,68,0.5)]" : "opacity-35 scale-90"
                )}>
                    <EmpireIcon />
                </div>
            </div>
        </button>
    );
}
