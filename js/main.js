// Portfolio interactions. All page content is pre-rendered in index.html;
// this file only handles navigation and the hero type-on effect.

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', function () {
    setupSmoothScrolling();
    setupKeyboardNavigation();
    setupNavigationHighlighting();
    initializeTypingEffect();
});

// Types the three intro lines once, then leaves the last one in place.
// With reduced motion requested, the final line is written immediately.
function initializeTypingEffect() {
    const typingElement = document.querySelector('#typing-text');
    if (!typingElement) return;

    const strings = ["Hi, I'm Arya", 'Math & CS at UCSD', 'Full-stack developer'];

    if (prefersReducedMotion || typeof Typed === 'undefined') {
        typingElement.textContent = strings[strings.length - 1];
        return;
    }

    new Typed(typingElement, {
        strings: strings,
        typeSpeed: 80,
        backSpeed: 60,
        backDelay: 2000,
        startDelay: 0,
        loop: false,
        showCursor: true,
        cursorChar: '|',
        autoInsertCss: false,
        smartBackspace: true,
        contentType: 'text'
    });
}

// Anchor links scroll to their section, offset by the fixed header.
function setupSmoothScrolling() {
    const headerOffset = 70;

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (event) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            event.preventDefault();
            window.scrollTo({
                top: target.offsetTop - headerOffset,
                behavior: prefersReducedMotion ? 'auto' : 'smooth'
            });

            closeMobileMenu();
        });
    });
}

function toggleMobileMenu() {
    const menu = document.querySelector('#mobile-menu');
    if (!menu) return;

    const isOpen = menu.classList.toggle('block');
    menu.classList.toggle('hidden', !isOpen);
}

function closeMobileMenu() {
    const menu = document.querySelector('#mobile-menu');
    if (menu && menu.classList.contains('block')) {
        menu.classList.remove('block');
        menu.classList.add('hidden');
    }
}

// Marks the nav link for whichever section is currently in view.
function setupNavigationHighlighting() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;

            const currentId = '#' + entry.target.getAttribute('id');
            navLinks.forEach(function (link) {
                link.classList.toggle('nav-active', link.getAttribute('href') === currentId);
            });
        });
    }, { threshold: 0.3 });

    sections.forEach(function (section) {
        observer.observe(section);
    });
}

function setupKeyboardNavigation() {
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
}
