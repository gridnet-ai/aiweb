import { useCallback, useSyncExternalStore } from 'react';

export type LandingTheme = 'light' | 'dark';

const STORAGE_KEY = 'aiweb-landing-theme';

let theme: LandingTheme = readStoredTheme();
const listeners = new Set<() => void>();

function readStoredTheme(): LandingTheme {
  if (typeof window === 'undefined') return 'dark';
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    /* ignore */
  }
  return 'dark';
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function emit() {
  listeners.forEach((listener) => listener());
}

export function getLandingTheme(): LandingTheme {
  return theme;
}

export function applyLandingTheme(next: LandingTheme) {
  if (typeof document === 'undefined') return;

  document.documentElement.dataset.landingTheme = next;
  document.documentElement.style.colorScheme = next;

  document.querySelectorAll('.landing-v2').forEach((el) => {
    el.classList.toggle('landing-v2--dark', next === 'dark');
  });

  const shell = document.querySelector('.marketing-site');
  if (shell) {
    shell.classList.toggle('bg-black', next === 'dark');
    shell.classList.toggle('bg-white', next === 'light');
  }
}

export function setLandingTheme(next: LandingTheme) {
  theme = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* ignore */
  }
  applyLandingTheme(next);
  emit();
}

export function toggleLandingTheme() {
  setLandingTheme(theme === 'dark' ? 'light' : 'dark');
}

/** Subscribe to landing light/dark preference (defaults to dark). */
export function useLandingTheme() {
  const current = useSyncExternalStore(subscribe, getLandingTheme, () => 'dark' as LandingTheme);

  const setTheme = useCallback((next: LandingTheme) => {
    setLandingTheme(next);
  }, []);

  const toggle = useCallback(() => {
    toggleLandingTheme();
  }, []);

  return {
    theme: current,
    isDark: current === 'dark',
    isLight: current === 'light',
    setTheme,
    toggle,
  };
}
