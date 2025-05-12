// Main JavaScript functionality for the portfolio site

document.addEventListener('DOMContentLoaded', () => {
    // Load all components
    loadComponents();
    
    // Initialize typing effect after components are loaded
    setTimeout(initTypingEffect, 500);
    
    // Initialize smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Initialize scroll animations after components are loaded
    setTimeout(initScrollAnimations, 800);
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
        { id: 'footer', file: 'footer.html' }
    ];
    
    for (const component of components) {
        try {
            const response = await fetch(`components/${component.file}`);
            const html = await response.text();
            document.getElementById(component.id).innerHTML = html;
        } catch (error) {
            console.error(`Failed to load component: ${component.file}`, error);
        }
    }
}

// Function to initialize the Typed.js effect
function initTypingEffect() {
    const typingElement = document.querySelector('#typing-text');
    
    if (typingElement) {
        new Typed(typingElement, {
            strings: [
                "Hi, I'm Arya",
                "Math-CS Student @ UCSD",
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

// Function to initialize scroll animations
function initScrollAnimations() {
    // Add animation classes to section headings
    document.querySelectorAll('section h2').forEach(heading => {
        heading.classList.add('animate-on-scroll');
        heading.dataset.animation = 'animate-fade-up';
    });
    
    // Add animation classes to section descriptions
    document.querySelectorAll('section p:first-of-type').forEach(paragraph => {
        paragraph.classList.add('animate-on-scroll');
        paragraph.dataset.animation = 'animate-fade-up';
        paragraph.dataset.delay = 'delay-100';
    });
    
    // Add animations to about section content
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
        const aboutImage = aboutSection.querySelector('.rounded-full');
        const aboutContent = aboutSection.querySelector('.md\\:pl-8');
        
        if (aboutImage) {
            aboutImage.classList.add('animate-on-scroll');
            aboutImage.dataset.animation = 'animate-fade-left';
        }
        
        if (aboutContent) {
            aboutContent.classList.add('animate-on-scroll');
            aboutContent.dataset.animation = 'animate-fade-right';
            aboutContent.dataset.delay = 'delay-100';
        }
    }
    
    // Add animations to project cards
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.dataset.animation = 'animate-fade-up';
        card.dataset.delay = `delay-${(index % 3) * 100}`;
    });
    
    // Add animations to skill icons
    document.querySelectorAll('.skill-icon').forEach((icon, index) => {
        icon.classList.add('animate-on-scroll');
        icon.dataset.animation = 'animate-fade-up';
        icon.dataset.delay = `delay-${(index % 6) * 100}`;
    });
    
    // Add animations to gallery images
    document.querySelectorAll('#gallery .grid > div').forEach((image, index) => {
        image.classList.add('animate-on-scroll');
        image.dataset.animation = 'animate-fade-up';
        image.dataset.delay = `delay-${(index % 3) * 100}`;
    });
    
    // Set up the Intersection Observer to trigger animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animation = element.dataset.animation;
                const delay = element.dataset.delay || '';
                
                if (animation) {
                    element.classList.add(animation);
                    if (delay) {
                        element.classList.add(delay);
                    }
                }
                
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    // Observe all elements with animation classes
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
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