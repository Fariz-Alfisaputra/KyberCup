import type { HTMLAttributes } from 'react';
import type { Appearance } from '@/hooks/use-appearance';
import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';

const LightSideIcon = () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M12 2C12 2 11.23 5.43 7.2 6.1C7.2 6.1 5.67 4 5.67 4C5.67 4 6.43 7.33 4.67 9.33C2.9 11.33 1.33 18 12 22C22.67 18 21.1 11.33 19.33 9.33C17.57 7.33 18.33 4 18.33 4C18.33 4 16.8 6.1 16.8 6.1C12.77 5.43 12 2 12 2ZM12 6.67C12.73 6.67 13.33 7.27 13.33 8V12C13.33 12.73 12.73 13.33 12 13.33C11.27 13.33 10.67 12.73 10.67 12V8C10.67 7.27 11.27 6.67 12 6.67Z" />
    </svg>
);

const DarkSideIcon = () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 1.5c4.69 0 8.5 3.81 8.5 8.5S16.69 20.5 12 20.5 3.5 16.69 3.5 12 7.31 3.5 12 3.5zm0 4.5c-1.93 0-3.5 1.57-3.5 3.5S10.07 15.5 12 15.5s3.5-1.57 3.5-3.5S13.93 8 12 8z" />
    </svg>
);

const tabs: { value: Appearance; icon: () => JSX.Element; label: string; description: string }[] = [
    {
        value: 'light-side',
        icon: LightSideIcon,
        label: 'Light Side',
        description: 'Sisi Terang — Jedi Order',
    },
    {
        value: 'dark-side',
        icon: DarkSideIcon,
        label: 'Dark Side',
        description: 'Sisi Gelap — Galactic Empire',
    },
];

export default function AppearanceToggleTab({
    className = '',
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    const { appearance, updateAppearance } = useAppearance();

    return (
        <div
            className={cn('flex gap-3', className)}
            {...props}
        >
            {tabs.map(({ value, icon: Icon, label, description }) => {
                const isActive = appearance === value;
                const isLight = value === 'light-side';

                return (
                    <button
                        key={value}
                        onClick={() => updateAppearance(value)}
                        className={cn(
                            'flex flex-1 flex-col items-center gap-2 rounded-xl border p-4 transition-all duration-300 cursor-pointer',
                            isActive
                                ? isLight
                                    ? 'border-blue-400 bg-blue-50 text-blue-700 shadow-[0_0_20px_rgba(24,95,165,0.15)]'
                                    : 'border-cyan-400/50 bg-[#111827] text-[#00d4ff] shadow-[0_0_20px_rgba(0,212,255,0.15)]'
                                : 'border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground',
                        )}
                        style={{
                            fontFamily: 'Rajdhani, sans-serif',
                        }}
                    >
                        {/* Theme preview mockup */}
                        <div
                            className={cn(
                                'w-full rounded-lg border p-3 transition-all duration-300',
                                isLight
                                    ? 'bg-[#f0f4ff] border-[rgba(24,95,165,0.2)]'
                                    : 'bg-[#0a0a0f] border-[rgba(0,212,255,0.15)]',
                            )}
                        >
                            <div className={cn('h-2 w-2/3 rounded-full mb-1.5', isLight ? 'bg-[#185FA5]' : 'bg-[#00d4ff]')} />
                            <div className={cn('h-1.5 w-full rounded-full mb-1', isLight ? 'bg-[rgba(24,95,165,0.2)]' : 'bg-[rgba(0,212,255,0.12)]')} />
                            <div className={cn('h-1.5 w-4/5 rounded-full', isLight ? 'bg-[rgba(24,95,165,0.15)]' : 'bg-[rgba(0,212,255,0.08)]')} />
                        </div>

                        {/* Icon + label */}
                        <div className="flex items-center gap-2">
                            <Icon />
                            <span className="font-bold tracking-wider text-sm uppercase">
                                {label}
                            </span>
                        </div>

                        <p className="text-xs opacity-60 text-center">{description}</p>

                        {isActive && (
                            <span className={cn(
                                'text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full',
                                isLight
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-cyan-400/10 text-[#00d4ff]',
                            )}>
                                Aktif
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}
