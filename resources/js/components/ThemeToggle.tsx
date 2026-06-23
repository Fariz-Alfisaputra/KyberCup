import { Moon, Sun } from 'lucide-react';
import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';

export default function ThemeToggle() {
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const isDark = resolvedAppearance === 'dark';

    const toggleTheme = () => {
        updateAppearance(isDark ? 'light' : 'dark');
    };

    return (
        <button
            id="theme-toggle"
            onClick={toggleTheme}
            className={cn(
                'relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg transition-all duration-200',
                'border border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--text-secondary)]',
                'hover:border-[var(--border-strong)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]',
            )}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
            {isDark ? (
                <Sun className="h-4 w-4 transition-transform duration-300" />
            ) : (
                <Moon className="h-4 w-4 transition-transform duration-300" />
            )}
        </button>
    );
}
