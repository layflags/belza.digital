// Persist the visitor's language choice when they use the EN/DE toggle, so a
// returning visitor is sent to their preferred language on the next visit
// (see the inline redirect in the default-locale home page <head>).
export const LANG_STORAGE_KEY = 'belza-lang';

function initLangToggle(): void {
  const links = document.querySelectorAll<HTMLAnchorElement>('.langtog a[data-lang]');
  links.forEach((a) => {
    a.addEventListener('click', () => {
      try {
        localStorage.setItem(LANG_STORAGE_KEY, a.dataset.lang || 'en');
      } catch {
        /* storage may be unavailable */
      }
    });
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', initLangToggle);
  else initLangToggle();
}
