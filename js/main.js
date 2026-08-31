// Portfolio interactions. All content is pre-rendered in index.html.

var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', function () {
    setupLift();
    setupGuitar();
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

// Guitar draws itself once when it enters the viewport.
function setupGuitar() {
    var wrap = document.querySelector('.guitar-wrap');
    if (!wrap) return;
    if (prefersReducedMotion) { wrap.classList.add('in'); return; }

    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting) { wrap.classList.add('in'); io.unobserve(wrap); }
        });
    }, { threshold: 0.25 });
    io.observe(wrap);
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
