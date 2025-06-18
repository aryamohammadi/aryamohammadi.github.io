// Main JavaScript functionality for the portfolio site

document.addEventListener('DOMContentLoaded', () => {
    // Load all components
    loadComponents();
    
    // Initialize typing effect after components are loaded
    setTimeout(initTypingEffect, 500);
    
    // Initialize smooth scrolling for navigation links
    initSmoothScrolling();
});

// Function to load all HTML components
async function loadComponents() {
    const components = [
        { id: 'header', file: 'header.html' },
        { id: 'hero', file: 'hero.html' },
        { id: 'about', file: 'about.html' },
        { id: 'projects', file: 'projects.html' },
        { id: 'skills', file: 'skills.html' },
        { id: 'contact', file: 'contact.html' },
        { id: 'gallery', file: 'gallery.html' },
        { id: 'footer', file: 'footer.html' },
        { id: 'terminal-container', file: 'terminal.html' }
    ];
    
    // Add loading skeleton to each component
    components.forEach(component => {
        const element = document.getElementById(component.id);
        if (element) {
            element.innerHTML = `
                <div class="animate-pulse bg-gray-800 rounded-lg p-6 m-4">
                    <div class="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
                    <div class="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
                    <div class="h-4 bg-gray-700 rounded w-2/3"></div>
                </div>
            `;
        }
    });
    
    // Load components with error handling
    const loadPromises = components.map(async (component) => {
        try {
            const response = await fetch(`components/${component.file}`);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            const html = await response.text();
            document.getElementById(component.id).innerHTML = html;
        } catch (error) {
            console.error(`Failed to load component: ${component.file}`, error);
            document.getElementById(component.id).innerHTML = `
                <div class="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded m-4">
                    <strong>Error:</strong> Failed to load ${component.file}
                </div>
            `;
        }
    });
    
    // Wait for all components to load
    await Promise.all(loadPromises);
    
    // Initialize terminal after all components are loaded
    if (typeof Terminal !== 'undefined') {
        new Terminal();
    }
}

// Function to initialize the Typed.js effect
function initTypingEffect() {
    const typingElement = document.querySelector('#typing-text');
    
    if (typingElement) {
        new Typed(typingElement, {
            strings: [
                "Hi, I'm Arya",
                "Mathematics and Computer Science Student @ UCSD",
                "Building creative, fun AI projects"
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 1500,
            startDelay: 500,
            loop: true
        });
    }
}

// Function to initialize smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Offset for header
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.querySelector('#mobile-menu');
                if (mobileMenu && mobileMenu.classList.contains('block')) {
                    mobileMenu.classList.remove('block');
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
}

// Toggle mobile menu
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('#mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

// Add fade-in animation to elements when they enter the viewport
window.addEventListener('load', () => {
    const fadeElements = document.querySelectorAll('.fade-in-element');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}); 
