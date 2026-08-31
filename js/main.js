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
})();
