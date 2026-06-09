// Parallax: the hero lifts and fades on scroll; [data-px] elements drift in
// proportion to their distance from the viewport center. Honors
// prefers-reduced-motion. Ported from the original inline script.
let pxHero: HTMLElement | null = null;
let pxEls: HTMLElement[] = [];
let pxBound = false;
let pxTick = false;
const pxReduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function pxUpdate(): void {
  pxTick = false;
  if (pxReduce) return;
  const sy = window.pageYOffset || document.documentElement.scrollTop || 0;
  const vh = window.innerHeight || 800;
  if (pxHero) {
    const p = Math.min(sy / (vh * 0.8), 1);
    pxHero.style.transform = 'translate3d(0,' + (sy * 0.14).toFixed(1) + 'px,0)';
    pxHero.style.opacity = (1 - p * 0.92).toFixed(3);
  }
  for (let i = 0; i < pxEls.length; i++) {
    const el = pxEls[i];
    const r = el.getBoundingClientRect();
    const off = (r.top + r.height / 2 - vh / 2) / vh;
    const factor = parseFloat(el.dataset.px || '0') || 0;
    el.style.transform = 'translate3d(0,' + (off * factor * -0.6).toFixed(1) + 'px,0)';
  }
}

function pxOnScroll(): void {
  if (!pxTick) {
    pxTick = true;
    requestAnimationFrame(pxUpdate);
  }
}

function setupParallax(): void {
  pxHero = document.querySelector('.hero-inner');
  pxEls = Array.from(document.querySelectorAll<HTMLElement>('[data-px]'));
  if (!pxBound && !pxReduce) {
    pxBound = true;
    window.addEventListener('scroll', pxOnScroll, { passive: true });
    window.addEventListener('resize', pxOnScroll, { passive: true });
  }
  pxUpdate();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', setupParallax);
  else setupParallax();
}
