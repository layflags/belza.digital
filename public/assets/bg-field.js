/* Belza Digital — interactive grid-mesh field
   A calm field of dots that "breathes" via layered flow. Around the pointer a
   glowing accent mesh springs up: nearby dots are pushed outward and brighten,
   and the grid lines between them light up — like a force-field warping the grid.
   On touch devices (and when the mouse is idle) a virtual pointer roams the
   screen automatically, so the effect is always alive — also on mobile.
   Theme-aware, pauses when hidden, honors prefers-reduced-motion. Decorative only. */
(function () {
  if (typeof document === 'undefined') return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var canvas = document.createElement('canvas');
  canvas.id = 'bg-field';
  canvas.setAttribute('aria-hidden', 'true');
  var st = canvas.style;
  st.position = 'fixed'; st.top = '0'; st.left = '0';
  st.width = '100%'; st.height = '100%';
  st.zIndex = '0'; st.pointerEvents = 'none';
  st.opacity = '0'; st.transition = 'opacity 1.2s ease';

  function mount() {
    document.body.insertBefore(canvas, document.body.firstChild);
    requestAnimationFrame(function () { st.opacity = '1'; });
  }
  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount);

  var ctx = canvas.getContext('2d');
  var W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
  var GAP, COLS, ROWS, MARGIN;
  var px = [], py = [];           // base (flow) positions
  var x = [], y = [], vx = [], vy = []; // live positions + velocity
  var R = 200;                    // pointer influence radius
  var mobile = false;

  function build() {
    W = window.innerWidth; H = window.innerHeight;
    mobile = Math.min(W, H) < 760;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    GAP = mobile ? 40 : 46;
    R = mobile ? 150 : 220;
    MARGIN = GAP;
    COLS = Math.ceil((W + MARGIN * 2) / GAP) + 1;
    ROWS = Math.ceil((H + MARGIN * 2) / GAP) + 1;
    px = []; py = []; x = []; y = []; vx = []; vy = [];
    for (var r = 0; r < ROWS; r++) {
      for (var c = 0; c < COLS; c++) {
        var bx = -MARGIN + c * GAP, by = -MARGIN + r * GAP;
        px.push(bx); py.push(by); x.push(bx); y.push(by); vx.push(0); vy.push(0);
      }
    }
  }
  build();
  var rt;
  window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(build, 160); });

  // ---- pointer (real) + virtual roaming pointer ----
  var realX = W / 2, realY = H / 2, lastMove = -1e9;
  function onMove(cx, cy) { realX = cx; realY = cy; lastMove = performance.now(); }
  window.addEventListener('pointermove', function (e) { onMove(e.clientX, e.clientY); }, { passive: true });
  window.addEventListener('pointerdown', function (e) { onMove(e.clientX, e.clientY); ripple(e.clientX, e.clientY); }, { passive: true });
  window.addEventListener('touchmove', function (e) { if (e.touches[0]) onMove(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true });

  // click/tap ripple impulse
  var ripX = 0, ripY = 0, ripT = -1e9;
  function ripple(cx, cy) { ripX = cx; ripY = cy; ripT = performance.now(); }

  // current influence center (smoothed)
  var cx = W / 2, cy = H / 2;

  function palette() {
    var light = document.documentElement.getAttribute('data-theme') === 'light';
    return light
      ? { dot: [42, 40, 34], acc: [38, 92, 205], dotA: 0.16, hot: 0.95, line: 0.42 }
      : { dot: [237, 234, 227], acc: [120, 168, 255], dotA: 0.14, hot: 1.0, line: 0.5 };
  }

  var t0 = performance.now();
  var paused = false, rafId = 0;
  function schedule() { if (!reduce && !paused) { cancelAnimationFrame(rafId); rafId = requestAnimationFrame(loop); } }
  document.addEventListener('visibilitychange', function () {
    paused = document.hidden; if (!paused) { schedule(); }
  });

  function frame(now) {
    var T = now - t0;
    var p = palette();
    var dr = p.dot[0], dg = p.dot[1], db = p.dot[2];
    var ar = p.acc[0], ag = p.acc[1], ab = p.acc[2];

    // choose influence point: real pointer if used recently, else virtual roam
    var useReal = (now - lastMove) < 2600;
    var tgX, tgY;
    if (useReal) { tgX = realX; tgY = realY; }
    else {
      // smooth lissajous roam across the viewport
      var s = T * 0.00013;
      tgX = W * (0.5 + 0.42 * Math.sin(s * 1.0));
      tgY = H * (0.5 + 0.40 * Math.sin(s * 1.37 + 0.6));
    }
    var ease = useReal ? 0.18 : 0.05;
    cx += (tgX - cx) * ease; cy += (tgY - cy) * ease;

    // ripple expanding radius
    var rT = (now - ripT) / 1000;            // seconds since tap
    var rActive = rT >= 0 && rT < 1.1;
    var rRad = rT * 620;                       // px/s
    var rWidth = 80;

    var R2 = R * R;
    var i = 0;
    // physics update
    for (var r = 0; r < ROWS; r++) {
      for (var c = 0; c < COLS; c++, i++) {
        // flowing base position (gentle breathing)
        var fx = px[i] + Math.sin(px[i] * 0.011 + py[i] * 0.013 + T * 0.0005) * (mobile ? 4 : 6);
        var fy = py[i] + Math.cos(px[i] * 0.012 - py[i] * 0.010 + T * 0.00043) * (mobile ? 4 : 6);

        // pointer repulsion
        var ddx = x[i] - cx, ddy = y[i] - cy;
        var d2 = ddx * ddx + ddy * ddy;
        if (d2 < R2) {
          var d = Math.sqrt(d2) || 0.0001;
          var f = (1 - d / R);
          var push = f * f * (mobile ? 26 : 34);
          vx[i] += (ddx / d) * push * 0.05;
          vy[i] += (ddy / d) * push * 0.05;
        }
        // ripple impulse
        if (rActive) {
          var rdx = x[i] - ripX, rdy = y[i] - ripY;
          var rd = Math.sqrt(rdx * rdx + rdy * rdy) || 0.0001;
          var band = Math.abs(rd - rRad);
          if (band < rWidth) {
            var rf = (1 - band / rWidth) * (1 - rT / 1.1);
            vx[i] += (rdx / rd) * rf * 4.2;
            vy[i] += (rdy / rd) * rf * 4.2;
          }
        }
        // spring back to flowing base + damping
        vx[i] += (fx - x[i]) * 0.045;
        vy[i] += (fy - y[i]) * 0.045;
        vx[i] *= 0.86; vy[i] *= 0.86;
        x[i] += vx[i]; y[i] += vy[i];
      }
    }

    ctx.clearRect(0, 0, W, H);

    // influence helper
    function infl(ix) {
      var dx = x[ix] - cx, dy = y[ix] - cy;
      var d2 = dx * dx + dy * dy;
      if (d2 >= R2) return 0;
      var v = 1 - Math.sqrt(d2) / R;
      return v * v;
    }

    // --- mesh lines (warped grid), bright only inside the influence bubble ---
    ctx.lineWidth = 1;
    i = 0;
    for (var r2 = 0; r2 < ROWS; r2++) {
      for (var c2 = 0; c2 < COLS; c2++, i++) {
        var inf = infl(i);
        if (inf <= 0.02) continue;
        // right neighbor
        if (c2 < COLS - 1) {
          var j = i + 1;
          var a = (inf + infl(j)) * 0.5 * p.line;
          if (a > 0.015) {
            ctx.strokeStyle = 'rgba(' + ar + ',' + ag + ',' + ab + ',' + a.toFixed(3) + ')';
            ctx.beginPath(); ctx.moveTo(x[i], y[i]); ctx.lineTo(x[j], y[j]); ctx.stroke();
          }
        }
        // bottom neighbor
        if (r2 < ROWS - 1) {
          var k = i + COLS;
          var a2 = (inf + infl(k)) * 0.5 * p.line;
          if (a2 > 0.015) {
            ctx.strokeStyle = 'rgba(' + ar + ',' + ag + ',' + ab + ',' + a2.toFixed(3) + ')';
            ctx.beginPath(); ctx.moveTo(x[i], y[i]); ctx.lineTo(x[k], y[k]); ctx.stroke();
          }
        }
      }
    }

    // --- dots ---
    i = 0;
    for (var r3 = 0; r3 < ROWS; r3++) {
      for (var c3 = 0; c3 < COLS; c3++, i++) {
        var inf2 = infl(i);
        var alpha = p.dotA + inf2 * (p.hot - p.dotA);
        var mix = inf2;
        var cr = (dr + (ar - dr) * mix) | 0;
        var cg = (dg + (ag - dg) * mix) | 0;
        var cb = (db + (ab - db) * mix) | 0;
        var sz = 1.1 + inf2 * 2.6;
        ctx.fillStyle = 'rgba(' + cr + ',' + cg + ',' + cb + ',' + alpha.toFixed(3) + ')';
        if (inf2 > 0.25) {
          ctx.beginPath(); ctx.arc(x[i], y[i], sz, 0, 6.2832); ctx.fill();
        } else {
          ctx.fillRect(x[i] - sz / 2, y[i] - sz / 2, sz, sz);
        }
      }
    }

    // soft accent glow following the influence center
    var gr = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.15);
    gr.addColorStop(0, 'rgba(' + ar + ',' + ag + ',' + ab + ',' + (p.line * 0.12).toFixed(3) + ')');
    gr.addColorStop(1, 'rgba(' + ar + ',' + ag + ',' + ab + ',0)');
    ctx.fillStyle = gr;
    ctx.fillRect(cx - R * 1.2, cy - R * 1.2, R * 2.4, R * 2.4);
  }

  function loop(now) { frame(now); schedule(); }

  if (reduce) { setTimeout(function () { cx = -9999; cy = -9999; frame(performance.now()); }, 60); }
  else schedule();
})();
