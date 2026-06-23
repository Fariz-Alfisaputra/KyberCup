import { useSyncExternalStore } from 'react';

export type ResolvedAppearance = 'light' | 'dark';
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

    // Legacy mapping from old Star Wars theme names
    if (stored === 'light' || stored === 'light-side' || stored === 'jedi') {
        return 'light';
    }

    if (stored === 'dark' || stored === 'dark-side' || stored === 'sith' || stored === 'neutral') {
        return 'dark';
    }

    if (stored === 'system') {
        return 'system';
    }

    return 'system';
};

const getResolvedAppearance = (appearance: Appearance): ResolvedAppearance => {
    if (appearance === 'system') {
        return prefersDark() ? 'dark' : 'light';
    }

    return appearance as ResolvedAppearance;
};

const applyTheme = (appearance: Appearance): void => {
    if (typeof document === 'undefined') {
        return;
    }

    const resolved = getResolvedAppearance(appearance);
    const isDark = resolved === 'dark';

    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';

    // Remove any legacy theme classes
    document.documentElement.classList.remove(
        'theme-jedi',
        'theme-sith',
        'theme-neutral',
    );

    // Set data attribute for CSS targeting
    document.documentElement.setAttribute('data-theme', resolved);
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

    // Set dark as default if nothing stored yet
    if (!localStorage.getItem('appearance')) {
        localStorage.setItem('appearance', 'dark');
        setCookie('appearance', 'dark');
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

    const resolvedAppearance: ResolvedAppearance =
        getResolvedAppearance(appearance);

    const updateAppearance = (mode: Appearance): void => {
        currentAppearance = mode;

        // Store in localStorage for client-side persistence
        localStorage.setItem('appearance', mode);

        // Store in cookie for SSR
        setCookie('appearance', mode);

        applyTheme(mode);
        notify();
    };

    return { appearance, resolvedAppearance, updateAppearance } as const;
}
