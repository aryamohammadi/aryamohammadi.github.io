// Portfolio JavaScript - animations and interactions
// All content is pre-rendered in index.html; this file only handles UX.

// Initialize everything once the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeUXFeatures();
    initializeTypingEffect();
    setupScrollAnimations();
    setupNavigationHighlighting();
});

// Optimized typing animation with proper text visibility
function initializeTypingEffect() {
    console.log('🎯 Setting up optimized typing animation...');

    // Find the element where the typing effect should happen
    const typingElement = document.querySelector('#typing-text');

    // Check if the element exists on the page
    if (typingElement) {
        console.log('✅ Found typing element, creating optimized Typed.js instance...');

        // Ensure element is visible first
        typingElement.style.opacity = '1';
        typingElement.style.visibility = 'visible';

        // Clear any existing content and classes
        typingElement.textContent = '';
        typingElement.className = 'gradient-text';

        try {
            // Test if gradient text is supported
            const testElement = document.createElement('span');
            testElement.style.background = 'linear-gradient(135deg, #8B5CF6, #EC4899)';
            testElement.style.webkitBackgroundClip = 'text';
            testElement.style.webkitTextFillColor = 'transparent';

            // Professional typing animation - optimized for fast start
            const typedInstance = new Typed(typingElement, {
                strings: [
                    "Hi, I'm Arya",
                    "Math & CS at UCSD",
                    "Full-stack developer"
                ],
                typeSpeed: 80,        // Slightly slower for elegance
                backSpeed: 60,        // Smooth deletion
                backDelay: 2000,      // Pause to let people read
                startDelay: 0,        // Start immediately - no delay
                loop: true,
                showCursor: true,
                cursorChar: '|',
                autoInsertCss: false, // Handle cursor CSS ourselves
                smartBackspace: true,
                shuffle: false,
                contentType: 'text',
                bindInputFocusEvents: false,
                attr: null
            });

            // Ensure cursor is properly styled once it exists
            setTimeout(() => {
                const cursor = document.querySelector('.typed-cursor');
                if (cursor) {
                    cursor.style.color = '#8B5CF6';
                    cursor.style.fontWeight = '300';
                }
            }, 100);

            console.log('✨ Typing animation initialized successfully!');

        } catch (error) {
            console.error('❌ Error setting up typing animation:', error);
            // Robust fallback with visible text
            typingElement.innerHTML = '<span class="gradient-text">Hi, I\'m Arya</span>';
            typingElement.style.opacity = '1';
            typingElement.style.color = '#8B5CF6'; // Ensure fallback color
        }

    } else {
        console.log('⚠️ Typing element not found - will retry...');
        // Retry with timeout
        setTimeout(initializeTypingEffect, 300);
    }
}

// Function to set up smooth scrolling for navigation links
// This makes clicking nav links smoothly scroll to sections instead of jumping
function setupSmoothScrolling() {
    console.log('Setting up smooth scrolling for navigation...'); // Debug message

    // Find all links that start with # (internal page links)
    const navigationLinks = document.querySelectorAll('a[href^="#"]');
    console.log('Found', navigationLinks.length, 'navigation links'); // Debug

    // Add a click event listener to each navigation link
    navigationLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            console.log('Navigation link clicked:', this.getAttribute('href')); // Debug

            // Stop the default link behavior (jumping to section)
            event.preventDefault();

            // Get the target section ID from the href attribute
            const targetSectionId = this.getAttribute('href');
            const targetSection = document.querySelector(targetSectionId);

            // Check if the target section exists
            if (targetSection) {
                console.log('Scrolling to section:', targetSectionId); // Debug

                // Smoothly scroll to the target section
                // The -70 offset accounts for the fixed navigation header
                window.scrollTo({
                    top: targetSection.offsetTop - 70,  // Position to scroll to
                    behavior: 'smooth'                   // Make it smooth instead of instant
                });

                // Close mobile menu if it's currently open
                // This is for mobile devices where the menu might be expanded
                const mobileMenu = document.querySelector('#mobile-menu');
                if (mobileMenu && mobileMenu.classList.contains('block')) {
                    console.log('Closing mobile menu...'); // Debug
                    mobileMenu.classList.remove('block');
                    mobileMenu.classList.add('hidden');
                }

            } else {
                console.error('Target section not found:', targetSectionId); // Debug
            }
        });
    });

    console.log('Smooth scrolling setup complete!'); // Debug message
}

// Function to toggle the mobile menu on small screens
// I had to learn about responsive design for this
function toggleMobileMenu() {
    console.log('Mobile menu toggle clicked'); // Debug message

    // Find the mobile menu element
    const mobileMenu = document.querySelector('#mobile-menu');

    if (mobileMenu) {
        // Toggle between hidden and visible
        if (mobileMenu.classList.contains('hidden')) {
            console.log('Opening mobile menu'); // Debug
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('block');
        } else {
            console.log('Closing mobile menu'); // Debug
            mobileMenu.classList.remove('block');
            mobileMenu.classList.add('hidden');
        }
    } else {
        console.error('Mobile menu element not found!'); // Debug
    }
}

// Set up fade-in animations for elements when they come into view
// This is extra credit stuff - learned about Intersection Observer from YouTube
window.addEventListener('load', function() {
    console.log('Setting up scroll animations...'); // Debug message

    // Find all elements that should fade in when scrolled to
    const elementsToFade = document.querySelectorAll('.fade-in-element');
    console.log('Found', elementsToFade.length, 'elements to animate'); // Debug

    // Create an Intersection Observer to watch for elements entering the viewport
    // This was really confusing at first but it's pretty cool once you understand it
    const scrollObserver = new IntersectionObserver(function(entries) {
        // This function runs whenever an element enters or leaves the viewport
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                // Element is now visible - add the fade-in class
                console.log('Element came into view, adding fade-in animation'); // Debug
                entry.target.classList.add('fade-in');

                // Stop watching this element since it's already animated
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1  // Trigger when 10% of the element is visible
    });

    // Start watching all the fade elements
    elementsToFade.forEach(function(element) {
        scrollObserver.observe(element);
    });

    console.log('Scroll animations setup complete!'); // Debug message
});

// ===== ENHANCED UX FEATURES =====

// Initialize advanced UX features
function initializeUXFeatures() {
    console.log('🎨 Initializing UX enhancements...');

    // Setup smooth scrolling with enhanced behavior
    setupSmoothScrolling();

    // Add keyboard navigation support
    setupKeyboardNavigation();

    // Initialize scroll progress indicator
    setupScrollProgress();

    // Add hover effects and micro-interactions
    setupMicroInteractions();

    console.log('✨ UX enhancements initialized!');
}

// Scroll animations disabled - elements remain visible for professional appearance
function setupScrollAnimations() {
    // All elements remain visible - no fade-in animations
    document.querySelectorAll('.fade-in-element').forEach(el => {
            el.style.opacity = '1';
        el.style.transform = 'none';
    });
}

// Active navigation section highlighting
function setupNavigationHighlighting() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentSection = entry.target.getAttribute('id');

                // Update navigation active states
                navLinks.forEach(link => {
                    link.classList.remove('text-primary', 'border-b-2', 'border-primary');
                    link.classList.add('text-gray-300');

                    if (link.getAttribute('href') === `#${currentSection}`) {
                        link.classList.remove('text-gray-300');
                        link.classList.add('text-primary', 'border-b-2', 'border-primary');
                    }
                });
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(section => observer.observe(section));
}

// Scroll progress indicator - optimized with throttling
function setupScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 z-50 transform scale-x-0 origin-left transition-transform duration-150';
    progressBar.id = 'scroll-progress';
    document.body.appendChild(progressBar);

    let ticking = false;
    function updateProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight);

        progressBar.style.transform = `scaleX(${scrollPercent})`;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateProgress);
            ticking = true;
        }
    }, { passive: true });
}

// Keyboard navigation support
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Add keyboard shortcuts
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'k':
                    e.preventDefault();
                    // Focus search or navigation
                    document.querySelector('nav a')?.focus();
                    break;
            }
        }

        // Escape key closes mobile menu
        if (e.key === 'Escape') {
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                toggleMobileMenu();
            }
        }
    });
}

// Micro-interactions and hover effects
function setupMicroInteractions() {
    // Enhanced button hover effects
    const buttons = document.querySelectorAll('a, button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'transform 0.2s ease';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add ripple effect to clickable elements
    document.addEventListener('click', function(e) {
        if (e.target.matches('button, .btn, .interactive')) {
            createRippleEffect(e);
        }
    });
}

// Ripple effect for buttons
function createRippleEffect(e) {
    const button = e.target;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(139, 92, 246, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;

    // Add ripple animation keyframes if not exists
    if (!document.getElementById('ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
}
