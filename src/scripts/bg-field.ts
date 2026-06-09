/* Belza Digital — interactive grid-mesh field
   A calm field of dots that "breathes" via layered flow. Around the pointer a
   glowing accent mesh springs up: nearby dots are pushed outward and brighten,
   and the grid lines between them light up — like a force-field warping the grid.
   On touch devices (and when the mouse is idle) a virtual pointer roams the
   screen automatically, so the effect is always alive — also on mobile.
   Theme-aware, pauses when hidden, honors prefers-reduced-motion. Decorative only.
   Ported verbatim (behavior-preserving) from the original bg-field.js. */
interface Palette {
  dot: [number, number, number];
  acc: [number, number, number];
  dotA: number;
  hot: number;
  line: number;
}

function initBgField(): void {
  if (typeof document === 'undefined') return;
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const canvas = document.createElement('canvas');
  canvas.id = 'bg-field';
  canvas.setAttribute('aria-hidden', 'true');
  const st = canvas.style;
  st.position = 'fixed';
  st.top = '0';
  st.left = '0';
  st.width = '100%';
  st.height = '100%';
  st.zIndex = '0';
  st.pointerEvents = 'none';
  st.opacity = '0';
  st.transition = 'opacity 1.2s ease';

  function mount(): void {
    document.body.insertBefore(canvas, document.body.firstChild);
    requestAnimationFrame(() => {
      st.opacity = '1';
    });
  }
  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount);

  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  let W = 0;
  let H = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let GAP = 0;
  let COLS = 0;
  let ROWS = 0;
  let MARGIN = 0;
  let px: number[] = [];
  let py: number[] = []; // base (flow) positions
  let x: number[] = [];
  let y: number[] = [];
  let vx: number[] = [];
  let vy: number[] = []; // live positions + velocity
  let R = 200; // pointer influence radius
  let mobile = false;

  function build(): void {
    W = window.innerWidth;
    H = window.innerHeight;
    mobile = Math.min(W, H) < 760;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    GAP = mobile ? 40 : 46;
    R = mobile ? 150 : 220;
    MARGIN = GAP;
    COLS = Math.ceil((W + MARGIN * 2) / GAP) + 1;
    ROWS = Math.ceil((H + MARGIN * 2) / GAP) + 1;
    px = [];
    py = [];
    x = [];
    y = [];
    vx = [];
    vy = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const bx = -MARGIN + c * GAP;
        const by = -MARGIN + r * GAP;
        px.push(bx);
        py.push(by);
        x.push(bx);
        y.push(by);
        vx.push(0);
        vy.push(0);
      }
    }
  }
  build();
  let rt: ReturnType<typeof setTimeout>;
  window.addEventListener('resize', () => {
    clearTimeout(rt);
    rt = setTimeout(build, 160);
  });

  // ---- pointer (real) + virtual roaming pointer ----
  let realX = W / 2;
  let realY = H / 2;
  let lastMove = -1e9;
  function onMove(mx: number, my: number): void {
    realX = mx;
    realY = my;
    lastMove = performance.now();
  }
  window.addEventListener(
    'pointermove',
    (e) => {
      onMove(e.clientX, e.clientY);
    },
    { passive: true }
  );
  window.addEventListener(
    'pointerdown',
    (e) => {
      onMove(e.clientX, e.clientY);
      ripple(e.clientX, e.clientY);
    },
    { passive: true }
  );
  window.addEventListener(
    'touchmove',
    (e) => {
      if (e.touches[0]) onMove(e.touches[0].clientX, e.touches[0].clientY);
    },
    { passive: true }
  );

  // click/tap ripple impulse
  let ripX = 0;
  let ripY = 0;
  let ripT = -1e9;
  function ripple(rx: number, ry: number): void {
    ripX = rx;
    ripY = ry;
    ripT = performance.now();
  }

  // current influence center (smoothed)
  let cx = W / 2;
  let cy = H / 2;

  function palette(): Palette {
    const light = document.documentElement.getAttribute('data-theme') === 'light';
    return light
      ? { dot: [42, 40, 34], acc: [38, 92, 205], dotA: 0.16, hot: 0.95, line: 0.42 }
      : { dot: [237, 234, 227], acc: [120, 168, 255], dotA: 0.14, hot: 1.0, line: 0.5 };
  }

  const t0 = performance.now();
  let paused = false;
  let rafId = 0;
  function schedule(): void {
    if (!reduce && !paused) {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(loop);
    }
  }
  document.addEventListener('visibilitychange', () => {
    paused = document.hidden;
    if (!paused) {
      schedule();
    }
  });

  function frame(now: number): void {
    const T = now - t0;
    const p = palette();
    const dr = p.dot[0];
    const dg = p.dot[1];
    const db = p.dot[2];
    const ar = p.acc[0];
    const ag = p.acc[1];
    const ab = p.acc[2];

    // choose influence point: real pointer if used recently, else virtual roam
    const useReal = now - lastMove < 2600;
    let tgX: number;
    let tgY: number;
    if (useReal) {
      tgX = realX;
      tgY = realY;
    } else {
      // smooth lissajous roam across the viewport
      const s = T * 0.00013;
      tgX = W * (0.5 + 0.42 * Math.sin(s * 1.0));
      tgY = H * (0.5 + 0.4 * Math.sin(s * 1.37 + 0.6));
    }
    const ease = useReal ? 0.18 : 0.05;
    cx += (tgX - cx) * ease;
    cy += (tgY - cy) * ease;

    // ripple expanding radius
    const rT = (now - ripT) / 1000; // seconds since tap
    const rActive = rT >= 0 && rT < 1.1;
    const rRad = rT * 620; // px/s
    const rWidth = 80;

    const R2 = R * R;
    let i = 0;
    // physics update
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++, i++) {
        // flowing base position (gentle breathing)
        const fx = px[i] + Math.sin(px[i] * 0.011 + py[i] * 0.013 + T * 0.0005) * (mobile ? 4 : 6);
        const fy = py[i] + Math.cos(px[i] * 0.012 - py[i] * 0.01 + T * 0.00043) * (mobile ? 4 : 6);

        // pointer repulsion
        const ddx = x[i] - cx;
        const ddy = y[i] - cy;
        const d2 = ddx * ddx + ddy * ddy;
        if (d2 < R2) {
          const d = Math.sqrt(d2) || 0.0001;
          const f = 1 - d / R;
          const push = f * f * (mobile ? 26 : 34);
          vx[i] += (ddx / d) * push * 0.05;
          vy[i] += (ddy / d) * push * 0.05;
        }
        // ripple impulse
        if (rActive) {
          const rdx = x[i] - ripX;
          const rdy = y[i] - ripY;
          const rd = Math.sqrt(rdx * rdx + rdy * rdy) || 0.0001;
          const band = Math.abs(rd - rRad);
          if (band < rWidth) {
            const rf = (1 - band / rWidth) * (1 - rT / 1.1);
            vx[i] += (rdx / rd) * rf * 4.2;
            vy[i] += (rdy / rd) * rf * 4.2;
          }
        }
        // spring back to flowing base + damping
        vx[i] += (fx - x[i]) * 0.045;
        vy[i] += (fy - y[i]) * 0.045;
        vx[i] *= 0.86;
        vy[i] *= 0.86;
        x[i] += vx[i];
        y[i] += vy[i];
      }
    }

    ctx.clearRect(0, 0, W, H);

    // influence helper
    function infl(ix: number): number {
      const dx = x[ix] - cx;
      const dy = y[ix] - cy;
      const d2i = dx * dx + dy * dy;
      if (d2i >= R2) return 0;
      const v = 1 - Math.sqrt(d2i) / R;
      return v * v;
    }

    // --- mesh lines (warped grid), bright only inside the influence bubble ---
    ctx.lineWidth = 1;
    i = 0;
    for (let r2 = 0; r2 < ROWS; r2++) {
      for (let c2 = 0; c2 < COLS; c2++, i++) {
        const inf = infl(i);
        if (inf <= 0.02) continue;
        // right neighbor
        if (c2 < COLS - 1) {
          const j = i + 1;
          const a = (inf + infl(j)) * 0.5 * p.line;
          if (a > 0.015) {
            ctx.strokeStyle = 'rgba(' + ar + ',' + ag + ',' + ab + ',' + a.toFixed(3) + ')';
            ctx.beginPath();
            ctx.moveTo(x[i], y[i]);
            ctx.lineTo(x[j], y[j]);
            ctx.stroke();
          }
        }
        // bottom neighbor
        if (r2 < ROWS - 1) {
          const k = i + COLS;
          const a2 = (inf + infl(k)) * 0.5 * p.line;
          if (a2 > 0.015) {
            ctx.strokeStyle = 'rgba(' + ar + ',' + ag + ',' + ab + ',' + a2.toFixed(3) + ')';
            ctx.beginPath();
            ctx.moveTo(x[i], y[i]);
            ctx.lineTo(x[k], y[k]);
            ctx.stroke();
          }
        }
      }
    }

    // --- dots ---
    i = 0;
    for (let r3 = 0; r3 < ROWS; r3++) {
      for (let c3 = 0; c3 < COLS; c3++, i++) {
        const inf2 = infl(i);
        const alpha = p.dotA + inf2 * (p.hot - p.dotA);
        const mix = inf2;
        const cr = (dr + (ar - dr) * mix) | 0;
        const cg = (dg + (ag - dg) * mix) | 0;
        const cb = (db + (ab - db) * mix) | 0;
        const sz = 1.1 + inf2 * 2.6;
        ctx.fillStyle = 'rgba(' + cr + ',' + cg + ',' + cb + ',' + alpha.toFixed(3) + ')';
        if (inf2 > 0.25) {
          ctx.beginPath();
          ctx.arc(x[i], y[i], sz, 0, 6.2832);
          ctx.fill();
        } else {
          ctx.fillRect(x[i] - sz / 2, y[i] - sz / 2, sz, sz);
        }
      }
    }

    // soft accent glow following the influence center
    const gr = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.15);
    gr.addColorStop(0, 'rgba(' + ar + ',' + ag + ',' + ab + ',' + (p.line * 0.12).toFixed(3) + ')');
    gr.addColorStop(1, 'rgba(' + ar + ',' + ag + ',' + ab + ',0)');
    ctx.fillStyle = gr;
    ctx.fillRect(cx - R * 1.2, cy - R * 1.2, R * 2.4, R * 2.4);
  }

  function loop(now: number): void {
    frame(now);
    schedule();
  }

  if (reduce) {
    setTimeout(() => {
      cx = -9999;
      cy = -9999;
      frame(performance.now());
    }, 60);
  } else schedule();
}

initBgField();
