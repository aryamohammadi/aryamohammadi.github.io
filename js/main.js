// Portfolio interactions. All content is pre-rendered in index.html.

var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', function () {
    setupLift();
    setupKeyboard();
});

// Project cards: section gets .in when the grid is well on screen;
// each card gets .up (arming the hover bounce) when its lift finishes.
function setupLift() {
    var grid = document.querySelector('.cards');
    if (!grid) return;
    var section = grid.closest('section');

    if (prefersReducedMotion) { section.classList.add('in'); return; }

    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            section.classList.toggle('in', e.isIntersecting);
            if (!e.isIntersecting) {
                grid.querySelectorAll('.card').forEach(function (c) { c.classList.remove('up'); });
            }
        });
    }, { rootMargin: '0px 0px -22% 0px', threshold: 0.3 });
    io.observe(grid);

    grid.querySelectorAll('.card').forEach(function (c) {
        c.addEventListener('transitionend', function (e) {
            if (e.propertyName === 'transform' && section.classList.contains('in')) {
                c.classList.add('up');
            }
        });
    });
}


function toggleMobileMenu() {
    var menu = document.querySelector('#mobile-menu');
    if (!menu) return;
    var open = menu.classList.toggle('block');
    menu.classList.toggle('hidden', !open);
}

function setupKeyboard() {
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            var menu = document.querySelector('#mobile-menu');
            if (menu && menu.classList.contains('block')) toggleMobileMenu();
        }
    });
}

// Anchor clicks close the mobile menu (CSS scroll-behavior handles the smoothness).
document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (a) {
        var menu = document.querySelector('#mobile-menu');
        if (menu && menu.classList.contains('block')) toggleMobileMenu();
    }
});

(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  /* ============ shared audio ============ */
  var actx = null;
  function audio() {
    if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)();
    if (actx.state === 'suspended') actx.resume();
    return actx;
  }

  /* ============ guitar ============ */
  var strings = ['gs1','gs2','gs3','gs4','gs5','gs6'].map(function (c) { return document.querySelector('.' + c); });
  var pops = ['pop-low','pop-low','pop-mid','pop-mid','pop-high','pop-high'];
  var durs = [0.95, 0.90, 0.80, 0.74, 0.64, 0.58];
  var freqs = [82.41, 110.00, 146.83, 196.00, 246.94, 329.63];
  var buffers = {};

  function pluckBuffer(freq) {
    if (buffers[freq]) return buffers[freq];
    var ctx = audio(), sr = ctx.sampleRate;
    var buf = ctx.createBuffer(1, sr * 1.6, sr);
    var data = buf.getChannelData(0);
    var period = Math.round(sr / freq);
    var ring = new Float32Array(period);
    for (var i = 0; i < period; i++) ring[i] = Math.random() * 2 - 1;
    var idx = 0;
    for (var n = 0; n < data.length; n++) {
      var cur = ring[idx], nxt = ring[(idx + 1) % period];
      data[n] = cur;
      ring[idx] = 0.996 * 0.5 * (cur + nxt);
      idx = (idx + 1) % period;
    }
    buffers[freq] = buf;
    return buf;
  }
  function playNote(i, vol) {
    if (!vol) return;
    try {
      var ctx = audio();
      var src = ctx.createBufferSource(); src.buffer = pluckBuffer(freqs[i]);
      var g = ctx.createGain(); g.gain.value = vol;
      src.connect(g); g.connect(ctx.destination); src.start();
    } catch (e) {}
  }
  var lastPluck = [0,0,0,0,0,0];
  function pluck(i, vol) {
    var now = Date.now();
    if (now - lastPluck[i] < 90) return;
    lastPluck[i] = now;
    var el = strings[i];
    el.style.animation = 'none';
    void el.offsetWidth;
    el.style.animation = pops[i] + ' ' + durs[i] + 's ease-out 1';
    playNote(i, vol);
  }
  function strum(dir, vol) {
    for (var i = 0; i < 6; i++) (function (i) {
      var order = dir === 'down' ? i : 5 - i;
      setTimeout(function () { pluck(i, vol); }, order * 70);
    })(i);
  }

  document.querySelectorAll('.hit').forEach(function (h) {
    h.addEventListener('pointerenter', function () { pluck(+h.dataset.s, 0.22); });
    h.addEventListener('pointerdown', function () { pluck(+h.dataset.s, 0.3); });
  });

  var gwrap = document.getElementById('gwrap'), gVisible = false;
  new IntersectionObserver(function (es) { es.forEach(function (e) { gVisible = e.isIntersecting; }); },
    { threshold: 0.35 }).observe(gwrap);
  var lastY = window.scrollY, lastStrum = 0, lastDir = null;
  window.addEventListener('scroll', function () {
    var y = window.scrollY, dir = y > lastY ? 'down' : 'up', moved = Math.abs(y - lastY);
    lastY = y;
    if (!gVisible || moved < 4) return;
    var now = Date.now();
    if (dir !== lastDir || now - lastStrum > 900) { strum(dir, 0); lastStrum = now; lastDir = dir; }
  }, { passive: true });

  /* ============ dumbbell ============ */
  (function () {
    var svg = document.getElementById('dbsvg');
    var body = document.getElementById('dbody');
    var shadow = document.getElementById('dbshadow');
    if (!svg || !body) return;
    var REST = { x: 230, y: 111 }, GROUND = 111, H = 110, G = 2600, REST_E = 0.32;
    var st = { x: 230, y: 111, a: 0, vx: 0, vy: 0, w: 0, sleeping: true };
    var drag = null, lastMove = null, lastT = null;

    function toSvg(e) {
      var pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
      var m = svg.getScreenCTM();
      return m ? pt.matrixTransform(m.inverse()) : { x: e.clientX, y: e.clientY };
    }
    function paint() {
      var dx = st.x - REST.x, dy = st.y - REST.y;
      body.setAttribute('transform', 'translate(' + dx.toFixed(2) + ',' + dy.toFixed(2) + ') rotate(' +
        (st.a * 180 / Math.PI).toFixed(2) + ' ' + st.x.toFixed(2) + ' ' + st.y.toFixed(2) + ')');
      var lift = Math.max(0, GROUND - st.y);
      var k = Math.max(0.45, 1 - lift / 260);
      shadow.setAttribute('rx', (185 * k).toFixed(1));
      shadow.setAttribute('opacity', (0.10 * k).toFixed(3));
      shadow.setAttribute('cx', st.x.toFixed(1));
    }
    function thud(speed) {
      try {
        var ctx = audio(), dur = 0.09, sr = ctx.sampleRate;
        var buf = ctx.createBuffer(1, sr * dur, sr);
        var d = buf.getChannelData(0);
        for (var i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 3);
        var src = ctx.createBufferSource(); src.buffer = buf;
        var f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 140;
        var g = ctx.createGain(); g.gain.value = Math.min(0.5, speed / 2600);
        src.connect(f); f.connect(g); g.connect(ctx.destination); src.start();
      } catch (e) {}
    }
    function step(t) {
      if (lastT === null) lastT = t;
      var dt = Math.min(1 / 30, (t - lastT) / 1000);
      lastT = t;
      if (drag) {
        var d = drag.d, I = H * H / 3 + d * d;
        st.w += (-d * G * Math.cos(st.a) / I) * dt;
        st.w *= 0.985;
        st.a += st.w * dt;
        st.x = drag.px - d * Math.cos(st.a);
        st.y = drag.py - d * Math.sin(st.a);
      } else if (!st.sleeping) {
        st.vy += G * dt; st.vx *= 0.995;
        st.x += st.vx * dt; st.y += st.vy * dt; st.a += st.w * dt;
        var hit = false, maxPen = 0;
        [-H, H].forEach(function (lx) {
          var py = st.y + Math.sin(st.a) * lx;
          var pen = py - GROUND;
          if (pen > 0) { hit = true; maxPen = Math.max(maxPen, pen); st.w += (lx > 0 ? -1 : 1) * pen * 0.9 * dt * 60; }
        });
        if (hit) {
          st.y -= maxPen;
          if (st.vy > 40) { thud(st.vy); st.vy = -st.vy * REST_E; } else st.vy = 0;
          st.w *= 0.82; st.a *= 0.94;
        }
        if (st.x < 120) { st.x = 120; st.vx = Math.abs(st.vx) * 0.4; }
        if (st.x > 340) { st.x = 340; st.vx = -Math.abs(st.vx) * 0.4; }
        if (Math.abs(st.y - GROUND) < 1.5 && Math.abs(st.vy) < 15 && Math.abs(st.w) < 0.06 && Math.abs(st.a) < 0.02) {
          st.y = GROUND; st.a = 0; st.vy = 0; st.w = 0; st.sleeping = true;
        }
      }
      paint();
      if (drag || !st.sleeping) requestAnimationFrame(step);
      else lastT = null;
    }
    body.addEventListener('pointerdown', function (e) {
      var m = toSvg(e);
      var ux = Math.cos(st.a), uy = Math.sin(st.a);
      var d = (m.x - st.x) * ux + (m.y - st.y) * uy;
      drag = { d: Math.max(-H, Math.min(H, d)), px: m.x, py: m.y };
      lastMove = { x: m.x, y: m.y, t: performance.now() };
      st.sleeping = false; body.style.cursor = 'grabbing';
      e.preventDefault(); lastT = null;
      requestAnimationFrame(step);
    });
    window.addEventListener('pointermove', function (e) {
      if (!drag) return;
      var m = toSvg(e);
      drag.px = Math.max(40, Math.min(420, m.x));
      drag.py = Math.min(GROUND, m.y);
      var now = performance.now();
      if (lastMove && now - lastMove.t > 16) {
        drag.vx = (m.x - lastMove.x) / ((now - lastMove.t) / 1000);
        drag.vy = (m.y - lastMove.y) / ((now - lastMove.t) / 1000);
        lastMove = { x: m.x, y: m.y, t: now };
      }
    });
    window.addEventListener('pointerup', function () {
      if (!drag) return;
      st.vx = Math.max(-900, Math.min(900, (drag.vx || 0) * 0.7));
      st.vy = Math.max(-900, Math.min(900, (drag.vy || 0) * 0.7));
      drag = null; body.style.cursor = 'grab';
      if (st.sleeping) { st.sleeping = false; requestAnimationFrame(step); }
    });
  })();
})();
