// Main JavaScript file for my portfolio website
// This file handles loading all the components and setting up the page
// Started this in week 1 of the project, kept adding stuff as I learned more
// Had to rewrite this like 3 times when I figured out better ways to do things

// I learned about DOMContentLoaded in CSE 101 - it waits for the page to load
document.addEventListener('DOMContentLoaded', function() {
    // Always add debug messages so I can see what's happening in the console
    console.log('Portfolio website is starting to load...'); 
    
    // Step 1: Load all the HTML components first
    // This was the hardest part to figure out - took me 2 weeks
    loadAllComponents();
    
    // Step 2: Wait a little bit then start the typing animation
    // I use setTimeout because I learned the components need time to load
    setTimeout(function() {
        console.log('Starting typing effect...'); // Debug message
        initializeTypingEffect();
    }, 500); // Wait 500 milliseconds
    
    // Step 3: Set up smooth scrolling for navigation links
    // This makes the page feel more professional
    setupSmoothScrolling();
    
    console.log('Main initialization complete!'); // Debug message
});

// Function to load all the HTML components into the page
// This was SO confusing at first - I had to learn about fetch() and promises
async function loadAllComponents() {
    console.log('Starting to load all components...'); // Debug message
    
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
    
    // Show loading animations while components are loading
    // I learned about forEach in my data structures class
    componentsList.forEach(function(component) {
        const targetElement = document.getElementById(component.elementId);
        if (targetElement) {
            console.log('Adding loading animation for:', component.elementId); // Debug
            
            // Create a simple loading animation with gray boxes
            // This is just basic HTML but it looks professional
            targetElement.innerHTML = `
                <div class="animate-pulse bg-gray-800 rounded-lg p-6 m-4">
                    <div class="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
                    <div class="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
                    <div class="h-4 bg-gray-700 rounded w-2/3"></div>
                </div>
            `;
        } else {
            console.error('Could not find element with ID:', component.elementId); // Debug
        }
    });
    
    // Now load each component using fetch
    // I had to learn about Promise.all to load them all at the same time
    const loadingPromises = componentsList.map(async function(component) {
        try {
            console.log('Fetching component file:', component.fileName); // Debug message
            
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
                console.log('Successfully inserted:', component.fileName, 'into', component.elementId); // Debug
            } else {
                console.error('Target element not found:', component.elementId); // Debug
            }
            
        } catch (error) {
            // If something goes wrong, show an error message
            console.error(`Error loading component ${component.fileName}:`, error); // Debug
            
            const targetElement = document.getElementById(component.elementId);
            if (targetElement) {
                // Show a user-friendly error message
                targetElement.innerHTML = `
                    <div class="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded m-4">
                        <strong>Oops!</strong> Failed to load ${component.fileName}
                        <br><small>Error: ${error.message}</small>
                    </div>
                `;
            }
        }
    });
    
    // Wait for all components to finish loading
    // Promise.all was confusing but my TA explained it to me
    await Promise.all(loadingPromises);
    console.log('All components have finished loading!'); // Debug message
}

// Function to set up the typing animation effect
// I'm using the Typed.js library I found online - it's pretty cool!
function initializeTypingEffect() {
    console.log('Setting up typing animation...'); // Debug message
    
    // Find the element where the typing effect should happen
    const typingElement = document.querySelector('#typing-text');
    
    // Check if the element exists on the page
    if (typingElement) {
        console.log('Found typing element, creating Typed.js instance...'); // Debug
        
        try {
            // Create the typing animation using Typed.js library
            // These are the strings that will be typed out
            const typedInstance = new Typed(typingElement, {
                strings: [
                    "Hi, I'm Arya. Nice to meet you!",                                          // First thing to type
                    "Mathematics and Computer Science Student @ UCSD",       // Second thing
                    "Building innovative software solutions"                 // Third thing
                ],
                typeSpeed: 50,        // How fast to type (milliseconds per character)
                backSpeed: 30,        // How fast to delete characters
                backDelay: 1500,      // How long to wait before starting to delete
                startDelay: 500,      // How long to wait before starting to type
                loop: true,           // Keep repeating the animation
                showCursor: true,     // Show the blinking cursor
                cursorChar: '|'       // What character to use for the cursor
            });
            
            console.log('Typing animation started successfully!'); // Debug
            
        } catch (error) {
            console.error('Error setting up typing animation:', error); // Debug
            // If the animation fails, just show static text
            typingElement.textContent = "Hi, I'm Arya - Mathematics and Computer Science Student @ UCSD";
        }
        
    } else {
        console.log('Typing element not found - maybe it hasn\'t loaded yet?'); // Debug
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

// TODO: Add more interactive features later
// TODO: Maybe add a dark mode toggle button?
// TODO: Optimize the images - they're pretty big and slow to load
// TODO: Add more animations to make the site feel more dynamic
// TODO: Test on different browsers (I've only tested on Chrome so far)
// TODO: Add error handling for when components fail to load
// TODO: Make the mobile menu look better - it's pretty basic right now

// Note to self: This file has grown a lot over the 10 weeks!
// Started with just basic HTML loading, now it has animations and everything
// Still learning about web development but this project taught me so much 
