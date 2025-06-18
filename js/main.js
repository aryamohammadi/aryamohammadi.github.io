// Main JavaScript functionality for the portfolio site
// Started this project in March 2025, took me about 10 weeks to finish!
// Learned a lot about web development and JavaScript

// Wait for the page to load before doing anything
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loading...'); // Debug message
    
    // Load all the HTML components first
    loadComponents();
    
    // Wait a bit then start the typing effect (learned about setTimeout in class)
    setTimeout(initTypingEffect, 500);
    
    // Set up smooth scrolling for the navigation
    initSmoothScrolling();
});

// Function to load all the HTML components
// This was tricky to figure out - took me a few tries to get it right
async function loadComponents() {
    // List of all the components I need to load
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
    
    // Show loading animation while components load
    // Learned about forEach in my data structures class
    components.forEach(component => {
        const element = document.getElementById(component.id);
        if (element) {
            // Simple loading animation with gray boxes
            element.innerHTML = `
                <div class="animate-pulse bg-gray-800 rounded-lg p-6 m-4">
                    <div class="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
                    <div class="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
                    <div class="h-4 bg-gray-700 rounded w-2/3"></div>
                </div>
            `;
        }
    });
    
    // Load each component using fetch (learned about promises recently)
    const loadPromises = components.map(async (component) => {
        try {
            console.log('Loading component:', component.file); // Debug message
            const response = await fetch(`components/${component.file}`);
            
            // Check if the request worked
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            const html = await response.text();
            document.getElementById(component.id).innerHTML = html;
            console.log('Successfully loaded:', component.file); // Debug message
        } catch (error) {
            // Show error message if something goes wrong
            console.error(`Failed to load component: ${component.file}`, error);
            document.getElementById(component.id).innerHTML = `
                <div class="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded m-4">
                    <strong>Error:</strong> Failed to load ${component.file}
                </div>
            `;
        }
    });
    
    // Wait for all components to finish loading
    await Promise.all(loadPromises);
    console.log('All components loaded!'); // Debug message
    
    // Initialize terminal after everything is loaded
    // Had to figure out this timing issue - terminal wasn't working at first
    if (typeof Terminal !== 'undefined') {
        console.log('Initializing terminal...'); // Debug message
        new Terminal();
    } else {
        console.error('Terminal class not found!'); // Debug message
    }
}

// Function to set up the typing animation
// Used the Typed.js library for this - found it online
function initTypingEffect() {
    const typingElement = document.querySelector('#typing-text');
    
    if (typingElement) {
        console.log('Starting typing effect...'); // Debug message
        
        // Create new typing animation
        new Typed(typingElement, {
            strings: [
                "Hi, I'm Arya",
                "Mathematics and Computer Science Student @ UCSD",
                "Building creative, fun AI projects"
            ],
            typeSpeed: 50,        // How fast to type
            backSpeed: 30,        // How fast to delete
            backDelay: 1500,      // How long to wait before deleting
            startDelay: 500,      // Wait before starting
            loop: true            // Keep repeating
        });
    } else {
        console.log('Typing element not found'); // Debug message
    }
}

// Function to make navigation links scroll smoothly
// Learned about event listeners in my web dev class
function initSmoothScrolling() {
    // Find all links that start with #
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    // Add click handler to each link
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault(); // Stop normal link behavior
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Smooth scroll to the target
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Offset for fixed header
                    behavior: 'smooth'
                });
                
                // Close mobile menu if it's open
                const mobileMenu = document.querySelector('#mobile-menu');
                if (mobileMenu && mobileMenu.classList.contains('block')) {
                    mobileMenu.classList.remove('block');
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
}

// Function to toggle mobile menu
// Had to look up how to do this - mobile design is tricky
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('#mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

// Add fade-in animation when elements come into view
// This was extra credit - learned about Intersection Observer
window.addEventListener('load', () => {
    const fadeElements = document.querySelectorAll('.fade-in-element');
    
    // Create observer to watch for elements entering the viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target); // Stop watching this element
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% visible
    
    // Start watching all fade elements
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}); 

// TODO: Add more animations later
// TODO: Maybe add a dark mode toggle?
// TODO: Optimize images (they're pretty big right now) 
