// Reveal-on-scroll for sections, with a failsafe that always shows content and
// respects prefers-reduced-motion. Ported from the original inline script.
function setupReveal(): void {
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const els = Array.from(document.querySelectorAll<HTMLElement>('.sec, .stats, .hero'));
  if (reduce) {
    els.forEach((e) => {
      e.classList.remove('reveal');
      e.classList.add('in');
    });
    return;
  }
  els.forEach((e) => e.classList.add('reveal'));
  const show = (e: Element): void => {
    e.classList.add('in');
  };
  els.forEach((e) => {
    const r = e.getBoundingClientRect();
    if (r.top < (window.innerHeight || 800) * 0.92) show(e);
  });
  try {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px' }
    );
    els.forEach((e) => {
      if (!e.classList.contains('in')) io.observe(e);
    });
  } catch {
    els.forEach(show);
  }
  // failsafe: ensure everything is visible even if observers never fire
  setTimeout(() => els.forEach(show), 1600);
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setupReveal);
  else setupReveal();
}
