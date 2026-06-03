import { useSyncExternalStore } from 'react';

export type ResolvedAppearance = 'jedi' | 'sith' | 'neutral';
export type Appearance = ResolvedAppearance | 'system';

export type UseAppearanceReturn = {
    readonly appearance: Appearance;
    readonly resolvedAppearance: ResolvedAppearance;
    readonly updateAppearance: (mode: Appearance) => void;
};

const listeners = new Set<() => void>();
let currentAppearance: Appearance = 'system';

const prefersDark = (): boolean => {
    if (typeof window === 'undefined') {
        return false;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const setCookie = (name: string, value: string, days = 365): void => {
    if (typeof document === 'undefined') {
        return;
    }

    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

const getStoredAppearance = (): Appearance => {
    if (typeof window === 'undefined') {
        return 'system';
    }

    const stored = localStorage.getItem('appearance');
    if (stored === 'light') return 'jedi';
    if (stored === 'dark') return 'sith';
    return (stored as Appearance) || 'system';
};

const getResolvedAppearance = (appearance: Appearance): ResolvedAppearance => {
    if (appearance === 'system') {
        return prefersDark() ? 'sith' : 'jedi';
    }
    if (appearance === 'dark') {
        return 'sith';
    }
    if (appearance === 'light') {
        return 'jedi';
    }
    return appearance as ResolvedAppearance;
};

const isDarkMode = (appearance: Appearance): boolean => {
    const resolved = getResolvedAppearance(appearance);
    return resolved === 'sith' || resolved === 'neutral';
};

const applyTheme = (appearance: Appearance): void => {
    if (typeof document === 'undefined') {
        return;
    }

    const resolved = getResolvedAppearance(appearance);
    const isDark = resolved === 'sith' || resolved === 'neutral';

    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';

    // Set theme classes on document Element
    document.documentElement.classList.toggle('theme-jedi', resolved === 'jedi');
    document.documentElement.classList.toggle('theme-sith', resolved === 'sith');
    document.documentElement.classList.toggle('theme-neutral', resolved === 'neutral');
};

const subscribe = (callback: () => void) => {
    listeners.add(callback);

    return () => listeners.delete(callback);
};

const notify = (): void => listeners.forEach((listener) => listener());

const mediaQuery = (): MediaQueryList | null => {
    if (typeof window === 'undefined') {
        return null;
    }

    return window.matchMedia('(prefers-color-scheme: dark)');
};

const handleSystemThemeChange = (): void => applyTheme(currentAppearance);

export function initializeTheme(): void {
    if (typeof window === 'undefined') {
        return;
    }

    if (!localStorage.getItem('appearance')) {
        localStorage.setItem('appearance', 'system');
        setCookie('appearance', 'system');
    }

    currentAppearance = getStoredAppearance();
    applyTheme(currentAppearance);

    // Set up system theme change listener
    mediaQuery()?.addEventListener('change', handleSystemThemeChange);
}

export function useAppearance(): UseAppearanceReturn {
    const appearance: Appearance = useSyncExternalStore(
        subscribe,
        () => currentAppearance,
        () => 'system',
    );

    const resolvedAppearance: ResolvedAppearance = getResolvedAppearance(appearance);

    const updateAppearance = (mode: Appearance): void => {
        currentAppearance = mode;

        // Store in localStorage for client-side persistence...
        localStorage.setItem('appearance', mode);

        // Store in cookie for SSR...
        setCookie('appearance', mode);

        applyTheme(mode);
        notify();
    };

    return { appearance, resolvedAppearance, updateAppearance } as const;
}

