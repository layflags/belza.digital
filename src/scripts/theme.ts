// Theme: Auto (system) / Light / Dark — persisted in localStorage.
// Pure logic is separated from the DOM binding so it can be unit-tested.

export type ThemeMode = 'auto' | 'light' | 'dark';
export type ResolvedTheme = 'light' | 'dark';

export const THEME_MODES: ThemeMode[] = ['auto', 'light', 'dark'];
export const THEME_STORAGE_KEY = 'belza-theme';

/** Coerce any stored value into a valid mode; unknown values fall back to 'auto'. */
export function normalizePref(stored: string | null | undefined): ThemeMode {
  return stored === 'auto' || stored === 'light' || stored === 'dark' ? stored : 'auto';
}

/** Resolve a mode to the concrete theme to apply, given the system preference. */
export function resolveTheme(pref: ThemeMode, systemPrefersDark: boolean): ResolvedTheme {
  return pref === 'auto' ? (systemPrefersDark ? 'dark' : 'light') : pref;
}

/** Next mode in the Auto → Light → Dark → Auto cycle. */
export function nextMode(current: ThemeMode): ThemeMode {
  const i = THEME_MODES.indexOf(current);
  return THEME_MODES[(i + 1) % THEME_MODES.length];
}

function initTheme(): void {
  const btn = document.getElementById('themetog');
  if (!btn) return;

  const labels: Record<ThemeMode, string> = {
    auto: btn.dataset.labelAuto || 'Auto',
    light: btn.dataset.labelLight || 'Light',
    dark: btn.dataset.labelDark || 'Dark',
  };
  const mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  const pref = (): ThemeMode => normalizePref(localStorage.getItem(THEME_STORAGE_KEY));
  const updateLabel = (): void => {
    const el = btn.querySelector('.lbl');
    if (el) el.textContent = labels[pref()];
  };
  const apply = (p: ThemeMode): void => {
    document.documentElement.setAttribute('data-theme', resolveTheme(p, !!(mq && mq.matches)));
    try {
      localStorage.setItem(THEME_STORAGE_KEY, p);
    } catch {
      /* storage may be unavailable */
    }
    updateLabel();
  };

  btn.addEventListener('click', () => apply(nextMode(pref())));
  apply(pref());

  if (mq) {
    const onSystemChange = (): void => {
      if (pref() === 'auto') apply('auto');
    };
    if (mq.addEventListener) mq.addEventListener('change', onSystemChange);
    else mq.addListener(onSystemChange);
  }
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initTheme);
  else initTheme();
}
