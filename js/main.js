// Enhanced Portfolio JavaScript - Modern UX Implementation
// Professional-grade user experience with smooth animations and interactions

// Premium loading screen variables and functions
const loadingTexts = [
    'Initializing Portfolio...',
    'Loading Components...',
    'Preparing Animations...',
    'Optimizing Performance...',
    'Almost Ready...',
    'Welcome!'
];

const loadingSteps = [
    'Loading core files...',
    'Initializing components...',
    'Setting up animations...',
    'Optimizing layout...',
    'Finalizing setup...',
    'Ready to explore!'
];

// Loading screen functions
function showLoadingScreen() {
    console.log('📱 Premium loading screen displayed');
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '1';
        loadingScreen.style.pointerEvents = 'auto';
    }
}

function updateLoadingProgress(percentage) {
    const progressBar = document.getElementById('loading-progress');
    const percentageDisplay = document.getElementById('loading-percentage');
    const loadingText = document.getElementById('loading-text');
    const loadingStep = document.getElementById('loading-step');
    
    if (progressBar) {
        progressBar.style.width = percentage + '%';
    }
    
    if (percentageDisplay) {
        percentageDisplay.textContent = Math.round(percentage) + '%';
    }
    
    // Update loading text based on progress
    const textIndex = Math.floor((percentage / 100) * loadingTexts.length);
    if (loadingText && textIndex < loadingTexts.length) {
        loadingText.textContent = loadingTexts[textIndex];
    }
    
    // Update loading step
    const stepIndex = Math.floor((percentage / 100) * loadingSteps.length);
    if (loadingStep && stepIndex < loadingSteps.length) {
        loadingStep.textContent = loadingSteps[stepIndex];
    }
    
    console.log(`📊 Loading progress: ${percentage}%`);
}

// Initialize loading screen when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    // Show loading screen immediately
    document.documentElement.style.overflow = 'hidden';
    
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.display = 'flex';
        loadingScreen.style.opacity = '1';
        console.log('✅ Loading screen activated');
        
        // Start loading progress immediately
        startPortfolioLoading();
    } else {
        console.log('❌ Loading screen not found');
    }
});

// Main loading function - optimized for speed
async function startPortfolioLoading() {
    try {
        console.log('Portfolio loading started');
        
        // Load components quickly
        updateLoadingProgress(20);
        await loadAllComponents();
        
        // Initialize UX features
        updateLoadingProgress(80);
        initializeUXFeatures();
        
        // Complete loading
        updateLoadingProgress(100);
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // Hide loading screen
        await hideLoadingScreen();
        
        // Initialize animations after page is visible
        requestAnimationFrame(() => {
            initializeTypingEffect();
            setupScrollAnimations();
            setupNavigationHighlighting();
        });
        
        console.log('✅ Portfolio fully loaded');
        
    } catch (error) {
        console.error('❌ Loading failed:', error);
        // Force hide loading screen
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
        document.documentElement.style.overflow = '';
    }
}

// Main initialization function
async function initializePortfolio() {
    try {
        console.log('🚀 Starting portfolio initialization...');
        
        // Step 1: Load all components with progress tracking
        await loadAllComponents();
        console.log('✅ All components loaded');
        
        // Step 2: Initialize UX enhancements
        await initializeUXFeatures();
        console.log('✅ UX features initialized');
        
        // Step 3: Small delay to show 100% completion
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Step 4: Hide loading screen with smooth transition
        await hideLoadingScreen();
        console.log('✅ Loading screen hidden');
        
        // Step 5: Initialize animations and interactions with optimized timing
        setTimeout(() => {
            // Ensure hero section is visible first
            const heroSection = document.querySelector('#hero, #home');
            if (heroSection) {
                heroSection.style.opacity = '1';
                heroSection.style.visibility = 'visible';
            }
            
            // Initialize typing animation first for smooth experience
            initializeTypingEffect();
            
            // Then setup other features with slight delays to prevent conflicts
            setTimeout(() => {
                setupScrollAnimations();
                setupNavigationHighlighting();
            }, 200);
            
            setTimeout(() => {
                setupParallaxEffects();
            }, 400);
            
            console.log('✨ Portfolio fully loaded and enhanced!');
        }, 100); // Reduced delay for faster hero appearance
        
    } catch (error) {
        console.error('❌ Portfolio initialization failed:', error);
        // Force hide loading screen even if there's an error
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.style.display = 'none';
                console.log('💥 Loading screen force hidden due to error');
            }
        }, 1000);
    }
}

// Enhanced component loading with progress tracking
async function loadAllComponents() {
    console.log('📦 Loading components with progress tracking...');
    
    // Array of all the components I need to load
    // I keep adding to this list as I build more sections
    const componentsList = [
        { elementId: 'header', fileName: 'header.html' },           // Navigation bar
        { elementId: 'hero', fileName: 'hero.html' },               // Main hero section
        { elementId: 'about', fileName: 'about.html' },             // About me section
        { elementId: 'projects', fileName: 'projects.html' },       // My projects
        { elementId: 'skills', fileName: 'skills.html' },           // Technical skills
        { elementId: 'contact', fileName: 'contact.html' },         // Contact info
        { elementId: 'gallery', fileName: 'gallery.html' },         // Photo gallery
        { elementId: 'footer', fileName: 'footer.html' }            // Footer
    ];
    
    let loadedCount = 0;
    const totalComponents = componentsList.length;
    
    // Update progress as components load
    const updateProgress = (currentIndex) => {
        const progress = ((currentIndex + 1) / totalComponents) * 100;
        updateLoadingProgress(progress);
        console.log(`📊 Loading progress: ${Math.round(progress)}%`);
    };
    
    // Load components sequentially for proper progress tracking
    for (let i = 0; i < componentsList.length; i++) {
        const component = componentsList[i];
        try {
            console.log(`📦 Loading ${component.fileName} (${i + 1}/${totalComponents})`);
            
            // Use fetch to get the HTML file from the components folder
            const response = await fetch(`components/${component.fileName}`);
            
            // Check if the request was successful
            if (!response.ok) {
                // Something went wrong - throw an error
                throw new Error(`Failed to load ${component.fileName}: HTTP ${response.status}`);
            }
            
            // Get the HTML content as text
            const htmlContent = await response.text();
            console.log('Successfully loaded:', component.fileName); // Debug message
            
            // Put the HTML content into the right element on the page
            const targetElement = document.getElementById(component.elementId);
            if (targetElement) {
                targetElement.innerHTML = htmlContent;
                console.log(`✅ Loaded: ${component.fileName}`);
            } else {
                console.error(`❌ Target element not found: ${component.elementId}`);
            }
            
            // Update progress after each component
            updateProgress(i);
            
            // Minimal delay for faster loading
            await new Promise(resolve => setTimeout(resolve, 50));
            
        } catch (error) {
            console.error(`❌ Error loading ${component.fileName}:`, error);
            // Still update progress to prevent hanging
            updateProgress(i);
        }
    }
    
    console.log('📦 All components loaded successfully!');
}

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
            
            // Professional typing animation
            const typedInstance = new Typed(typingElement, {
                strings: [
                    "Hi, I'm Arya",
                    "Math & CS at UCSD",
                    "Full-stack developer"
                ],
                typeSpeed: 80,        // Slightly slower for elegance
                backSpeed: 60,        // Smooth deletion
                backDelay: 2500,      // Longer pause to let people read
                startDelay: 800,      // Give time for page to settle
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
            
            // Ensure text is visible when typing starts
            typedInstance.on('start', () => {
                console.log('🎬 Typing animation started');
                typingElement.style.opacity = '1';
                
                // Ensure cursor is properly styled
                setTimeout(() => {
                    const cursor = document.querySelector('.typed-cursor');
                    if (cursor) {
                        cursor.style.color = '#8B5CF6';
                        cursor.style.fontWeight = '300';
                    }
                }, 100);
            });
            
            // Handle each string completion
            typedInstance.on('complete', () => {
                console.log('✅ String typing completed');
            });
            
            // Handle when typing resets for next string
            typedInstance.on('reset', () => {
                console.log('🔄 Typing reset for next string');
            });
            
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

// Professional loading screen with progress bar
function showLoadingScreen() {
    const loadingHTML = `
        <div id="loading-screen" class="fixed inset-0 bg-gray-900 z-50 flex flex-col items-center justify-center">
            <div class="text-center">
                <!-- Animated logo/icon -->
                <div class="mb-8 relative">
                    <div class="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <div class="absolute inset-0 flex items-center justify-center">
                        <i class="fas fa-code text-primary text-2xl"></i>
                    </div>
                </div>
                
                <!-- Loading text -->
                <h2 class="text-2xl font-light text-white mb-2 gradient-text">Loading Portfolio</h2>
                <p class="text-gray-400 mb-8">Preparing an exceptional experience...</p>
                
                <!-- Progress bar -->
                <div class="w-80 bg-gray-700 rounded-full h-2 mb-4 mx-auto">
                    <div id="loading-progress" class="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300" style="width: 0%"></div>
                </div>
                
                <!-- Progress percentage -->
                <span id="loading-percentage" class="text-gray-300 text-sm font-mono">0%</span>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', loadingHTML);
}

// Duplicate function removed

// Hide loading screen with smooth animation
function hideLoadingScreen() {
    return new Promise((resolve) => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            // Animate out
            loadingScreen.style.opacity = '0';
            loadingScreen.style.transform = 'scale(0.95)';
            loadingScreen.style.transition = 'all 0.5s ease-out';
            
            setTimeout(() => {
                loadingScreen.remove();
                document.documentElement.style.overflow = '';
                resolve();
            }, 500);
        } else {
            resolve();
        }
    });
}

// Initialize advanced UX features
async function initializeUXFeatures() {
    console.log('🎨 Initializing UX enhancements...');
    
    // Setup smooth scrolling with enhanced behavior
    setupSmoothScrolling();
    
    // Add keyboard navigation support
    setupKeyboardNavigation();
    
    // Initialize scroll progress indicator
    setupScrollProgress();
    
    // Setup mobile menu enhancements
    setupMobileMenuEnhancements();
    
    // Add hover effects and micro-interactions
    setupMicroInteractions();
    
    // Setup optimized image lazy loading
    setupImageLazyLoading();
    
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

// Subtle parallax effects - disabled for performance
function setupParallaxEffects() {
    // Parallax disabled to improve scroll performance
    return;
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

// Enhanced mobile menu with animations
function setupMobileMenuEnhancements() {
    const mobileMenuButton = document.querySelector('[onclick="toggleMobileMenu()"]');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) {
                if (mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.remove('hidden');
                    mobileMenu.style.opacity = '0';
                    mobileMenu.style.transform = 'translateY(-10px)';
                    
                    setTimeout(() => {
                        mobileMenu.style.opacity = '1';
                        mobileMenu.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    mobileMenu.style.opacity = '0';
                    mobileMenu.style.transform = 'translateY(-10px)';
                    
                    setTimeout(() => {
                        mobileMenu.classList.add('hidden');
                    }, 200);
                }
            }
        });
    }
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

// Optimized image loading - removed complex lazy loading for faster display
function setupImageLazyLoading() {
    // Preload all visible images immediately
    const allImages = document.querySelectorAll('img[src]');
    allImages.forEach(img => {
        // Force browser to start loading immediately
        if (img.src && !img.complete) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = img.src;
            document.head.appendChild(link);
        }
    });
} 
