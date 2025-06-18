// Terminal emulator for my portfolio website
// This is probably the most complex thing I've ever coded!
// Started this in week 4 of the project, took me until week 8 to get it working properly
// Had to watch like 20 YouTube tutorials and ask my TA for help multiple times

// I learned about JavaScript classes in CSE 100 but this is my first time really using one
class Terminal {
    // Constructor function - this runs when we create a new Terminal object
    constructor() {
        // I always add console.log statements to debug my code (learned this the hard way)
        console.log('Starting to create terminal object...'); 
        
        // Step 1: Get references to the HTML elements I need
        // Had to look up getElementById - forgot it from CSE 101
        this.inputField = document.getElementById('terminal-input-field');
        this.outputDiv = document.getElementById('terminal-output');
        
        // Step 2: Initialize variables for command history
        // Arrays were covered in CSE 100 but I still have to think about them carefully
        this.commandHistory = []; // This will store all the commands the user types
        this.historyIndex = -1;   // This keeps track of where we are in the history
        
        // Step 3: Set up easter eggs (the fun part!)
        // I learned about object literals from a YouTube tutorial
        this.easterEggs = {
            'konami': () => this.konamiCode(),     // The famous cheat code
            'matrix': () => this.matrixEffect(),   // Cool matrix animation
            'snake': () => this.startSnakeGame(),  // Snake game I built
            'tetris': () => this.startTetrisGame() // Tetris was SO hard to code
        };
        
        // Step 4: Define all the commands the terminal can handle
        // This took me forever to organize properly
        // I kept adding more commands as I thought of them
        this.commands = {
            'help': () => this.showHelp(),                    // Show available commands
            'clear': () => this.clearTerminal(),              // Clear the screen
            'about': () => this.showAbout(),                  // About me info
            'skills': () => this.showSkills(),                // My programming skills
            'projects': () => this.showProjects(),            // My projects
            'contact': () => this.showContact(),              // How to contact me
            'echo': (args) => this.echo(args),                // Echo back what user types
            'date': () => this.showDate(),                    // Show current date
            'weather': () => this.showWeather(),              // Fake weather command
            'joke': () => this.tellJoke(),                    // Programming jokes
            'ls': () => this.listFiles(),                     // List files (like Unix)
            'cd': (args) => this.changeDirectory(args),       // Change directory
            'pwd': () => this.showCurrentDirectory(),         // Show current directory
            'whoami': () => this.showUserInfo(),              // Show user info
            'exit': () => this.exitTerminal(),                // Exit terminal
            'resume': () => this.openResume(),                // Open my resume
            'github': () => this.openGitHub(),                // Open my GitHub
            'linkedin': () => this.openLinkedIn(),            // Open my LinkedIn
            'theme': (args) => this.changeTheme(args),        // Change terminal theme
            'cat': (args) => this.catFile(args),              // Show file contents
            'eastereggs': () => this.showEasterEggs(),        // Show easter eggs
            'fun': () => this.showFunCommands(),              // Show fun commands
            'cowsay': (args) => this.cowsay(args)             // ASCII cow that talks
        };

        // Step 5: Set up fake file system
        // This is just for show but makes the terminal feel more real
        this.currentDirectory = '~'; // Start in home directory
        
        // I learned about nested objects in CSE 100 but this still confuses me sometimes
        this.fileSystem = {
            '~': {  // Home directory
                'about.txt': 'Information about Arya - still figuring out who I am!',
                'skills.txt': 'My programming skills - getting better every day',
                'projects.txt': 'Cool projects I built during college',
                'contact.txt': 'How to reach me for internships or just to chat',
                'secret/': {  // Hidden directory with easter eggs
                    'easter-eggs.txt': 'Hidden features and games I built',
                    'konami.txt': 'The legendary cheat code from old video games',
                    'games.txt': 'Games you can play right in the terminal!'
                },
                'readme.txt': 'Welcome to my interactive terminal portfolio!'
            }
        };

        // Step 6: Set up all the event listeners
        // This was really confusing at first - had to learn about event handling
        this.setupEventListeners();
        
        // Debug message to confirm everything worked
        console.log('Terminal object created successfully!'); 
    }

    // Function to set up all the keyboard event listeners
    // Event listeners were the hardest concept for me to understand at first
    setupEventListeners() {
        console.log('Setting up event listeners...'); // Debug message
        
        // Listen for key presses in the terminal input field
        // I had to look up all these different key event types
        this.inputField.addEventListener('keydown', (e) => {
            // Check which key was pressed
            if (e.key === 'Enter') {
                // User pressed Enter key - time to process their command
                console.log('User pressed Enter, processing command...'); // Debug
                this.processCommand();
            } else if (e.key === 'ArrowUp') {
                // Up arrow key - go back in command history
                e.preventDefault(); // Stop the default behavior
                console.log('User pressed up arrow'); // Debug
                this.navigateHistory('up');
            } else if (e.key === 'ArrowDown') {
                // Down arrow key - go forward in command history
                e.preventDefault(); // Stop the default behavior
                console.log('User pressed down arrow'); // Debug
                this.navigateHistory('down');
            }
        });

        // Konami Code Easter Egg Implementation
        // This was SO COOL to implement! The famous cheat code: ↑↑↓↓←→←→BA
        // Took me like 2 days to figure out how to detect key sequences
        let konamiSequence = [
            'ArrowUp', 'ArrowUp',           // Up, Up
            'ArrowDown', 'ArrowDown',       // Down, Down  
            'ArrowLeft', 'ArrowRight',      // Left, Right
            'ArrowLeft', 'ArrowRight',      // Left, Right
            'KeyB', 'KeyA'                  // B, A
        ];
        let konamiIndex = 0; // Keep track of where we are in the sequence
        
        // Listen for key presses anywhere on the page (not just terminal)
        document.addEventListener('keydown', (e) => {
            console.log('Key pressed:', e.code); // Debug - see what keys are pressed
            
            // Check if this key matches the next key in the Konami sequence
            if (e.code === konamiSequence[konamiIndex]) {
                konamiIndex++; // Move to next key in sequence
                console.log('Konami progress:', konamiIndex, '/', konamiSequence.length); // Debug
                
                // Check if they completed the whole sequence
                if (konamiIndex === konamiSequence.length) {
                    console.log('KONAMI CODE ACTIVATED!'); // Debug
                    this.konamiCode(); // Trigger the easter egg
                    konamiIndex = 0;   // Reset for next time
                }
            } else {
                // Wrong key pressed - reset the sequence
                if (konamiIndex > 0) {
                    console.log('Konami sequence reset'); // Debug
                }
                konamiIndex = 0;
            }
        });
        
        console.log('Event listeners set up successfully!'); // Debug message
    }

    // Function to process whatever command the user typed
    // This is like the "brain" of the terminal - it decides what to do
    processCommand() {
        // Step 1: Get the text from the input field and clean it up
        const userInput = this.inputField.value.trim(); // trim() removes extra spaces
        console.log('Processing command:', userInput); // Debug message
        
        // Step 2: Don't do anything if the user didn't type anything
        if (userInput === '') {
            console.log('Empty command, ignoring...'); // Debug
            return; // Exit the function early
        }

        // Step 3: Show what the user typed in the terminal output
        // This makes it look like a real terminal
        this.addToOutput(userInput, true); // true means it's a command
        
        // Step 4: Add the command to history so user can use arrow keys
        this.commandHistory.push(userInput);
        this.historyIndex = this.commandHistory.length; // Point to end of history
        console.log('Command added to history. History length:', this.commandHistory.length); // Debug

        // Step 5: Parse the command into parts
        // Split by spaces to separate command from arguments
        const commandParts = userInput.split(' ');
        const command = commandParts[0];           // First part is the command
        const arguments = commandParts.slice(1);   // Rest are arguments
        console.log('Command:', command, 'Arguments:', arguments); // Debug
        
        // Step 6: Try to execute the command
        // Check easter eggs first (they're more fun!)
        if (this.easterEggs[command]) {
            console.log('Executing easter egg:', command); // Debug
            this.easterEggs[command]();
        } else if (this.commands[command]) {
            // It's a regular command
            console.log('Executing regular command:', command); // Debug
            this.commands[command](arguments);
        } else {
            // Command not found - show error message
            console.log('Unknown command:', command); // Debug
            this.addToOutput(`bash: ${command}: command not found`);
            this.addToOutput(`Type 'help' to see available commands.`);
        }

        // Step 7: Clear the input field so user can type next command
        this.inputField.value = '';
        console.log('Command processing complete!'); // Debug
    }

    // Function to add text to the terminal output
    // This is how we "print" things to the terminal screen
    addToOutput(text, isCommand = false) {
        console.log('Adding to output:', text, 'isCommand:', isCommand); // Debug
        
        // Step 1: Create a new div element for this line
        const lineElement = document.createElement('div');
        lineElement.className = 'terminal-line'; // CSS class for styling
        
        // Step 2: Create the prompt part (like "user@computer:~$")
        const promptElement = document.createElement('span');
        // This HTML makes it look like a real Unix terminal prompt
        promptElement.innerHTML = `<span class="text-green-400">portfolio@aryam.dev</span>
                                  <span class="text-gray-500">:</span>
                                  <span class="text-blue-400">${this.currentDirectory}</span>
                                  <span class="text-gray-500">$</span>`;
        
        // Step 3: Create the content part (the actual text)
        const contentElement = document.createElement('span');
        // Different colors for commands vs output
        contentElement.className = isCommand ? 'text-white' : 'text-gray-300';
        contentElement.textContent = isCommand ? ` ${text}` : text;
        
        // Step 4: Put the prompt and content together
        lineElement.appendChild(promptElement);
        lineElement.appendChild(contentElement);
        
        // Step 5: Add the new line to the terminal output
        this.outputDiv.appendChild(lineElement);
        
        // Step 6: Scroll to the bottom so user can see the new output
        // I learned this trick from Stack Overflow
        this.outputDiv.scrollTop = this.outputDiv.scrollHeight;
    }

    // Function to navigate through command history with arrow keys
    // This was tricky to implement but makes the terminal feel professional
    navigateHistory(direction) {
        console.log('Navigating history:', direction); // Debug
        
        // Don't do anything if there's no history
        if (this.commandHistory.length === 0) {
            console.log('No command history available'); // Debug
            return;
        }
        
        // Move up or down in the history
        if (direction === 'up') {
            // Go back in history (older commands)
            if (this.historyIndex > 0) {
                this.historyIndex--;
                console.log('Moving up in history to index:', this.historyIndex); // Debug
            }
        } else if (direction === 'down') {
            // Go forward in history (newer commands)
            if (this.historyIndex < this.commandHistory.length - 1) {
                this.historyIndex++;
                console.log('Moving down in history to index:', this.historyIndex); // Debug
            }
        }
        
        // Update the input field with the command from history
        const historicalCommand = this.commandHistory[this.historyIndex] || '';
        this.inputField.value = historicalCommand;
        console.log('Set input to:', historicalCommand); // Debug
    }

    // All the command implementation functions start here
    // These are all the things the terminal can actually do

    // Show help message with all available commands
    showHelp() {
        console.log('Showing help message'); // Debug
        
        // I could have made this shorter but I wanted it to be really clear
        const helpMessage = `
Available Commands:
==================
Basic Commands:
  help      - Show this help message
  clear     - Clear the terminal screen
  echo      - Echo back whatever you type
  date      - Show the current date and time
  exit      - Close the terminal

Portfolio Commands:
  about     - Learn about me and my background
  skills    - See my programming skills and experience
  projects  - Check out my coding projects
  contact   - Get my contact information
  resume    - Open my resume (PDF)
  github    - Visit my GitHub profile
  linkedin  - Visit my LinkedIn profile

File System Commands (fake but fun!):
  ls        - List files in current directory
  cd        - Change directory
  pwd       - Show current directory path
  cat       - Display file contents
  whoami    - Show current user info

Fun Commands:
  joke      - Hear a programming joke
  weather   - Check the weather (simulated)
  cowsay    - Make an ASCII cow say something
  theme     - Change terminal theme (matrix, retro, ocean, default)
  
Easter Eggs:
  eastereggs - Show hidden features
  fun        - Show all the fun commands
  konami     - Try the famous cheat code: ↑↑↓↓←→←→BA
  matrix     - Enter the Matrix
  snake      - Play Snake game
  tetris     - Play Tetris game

Type any command followed by Enter to execute it!
        `;
        
        this.addToOutput(helpMessage);
    }

    // Clear the terminal screen
    clearTerminal() {
        console.log('Clearing terminal'); // Debug
        // This just removes all the output - simple but effective
        this.outputDiv.innerHTML = '';
    }

    // Show information about me
    showAbout() {
        console.log('Showing about information'); // Debug
        
        // I rewrote this like 5 times to get the tone right
        const aboutText = `
About Arya Mohammadi
===================

Hey there! I'm a junior at UC San Diego studying Mathematics and Computer Science.
This portfolio project has been my main focus for the past 10 weeks!

I started coding seriously in my freshman year, and I'm still learning new things
every day. My favorite classes so far have been CSE 100 (Advanced Data Structures)
and CSE 101 (Design and Analysis of Algorithms).

What I'm working on:
• Building this interactive terminal portfolio (you're using it right now!)
• Learning more about web development and JavaScript
• Practicing algorithms and data structures for technical interviews
• Working on personal projects to build my GitHub profile

I love the problem-solving aspect of programming, and I'm always excited to learn
new technologies. Currently getting better at React, Python, and system design.

Fun fact: This terminal emulator was the hardest part of this project to build!
It took me about 4 weeks just to get the basic functionality working.

Type 'skills' to see my technical abilities, or 'projects' to see what I've built!
        `;
        
        this.addToOutput(aboutText);
    }

    // Show my programming skills and experience
    showSkills() {
        console.log('Showing skills information'); // Debug
        
        // I tried to be honest about my skill levels here
        const skillsText = `
Technical Skills
===============

Programming Languages:
• Python        ★★★☆☆  (Most comfortable - learned in CSE 8A/8B)
• JavaScript    ★★☆☆☆  (Still learning - this project taught me a lot!)
• Java          ★★★☆☆  (Used in CSE 100 for data structures)
• C++           ★★☆☆☆  (Basic knowledge from CSE 100)
• HTML/CSS      ★★☆☆☆  (Getting better - learned for this project)

Technologies & Tools:
• Git/GitHub    ★★☆☆☆  (Still figuring out merge conflicts...)
• VS Code       ★★★☆☆  (My favorite editor!)
• Terminal/Bash ★★☆☆☆  (Learning Unix commands slowly)
• Tailwind CSS  ★☆☆☆☆  (New to this - used it for styling this site)

Concepts I'm Learning:
• Data Structures & Algorithms (CSE 100/101)
• Object-Oriented Programming
• Web Development Fundamentals  
• Responsive Design
• API Integration (want to learn more about this)

What I Want to Learn Next:
• React.js (heard it's really useful for web dev)
• Node.js (for backend development)
• Databases (SQL and maybe MongoDB)
• Machine Learning (taking CSE 151A next quarter!)

I know I'm still early in my programming journey, but I'm really passionate
about learning and improving. Every project teaches me something new!

This terminal portfolio is actually the most complex thing I've ever built.
        `;
        
        this.addToOutput(skillsText);
    }

    // Show my coding projects
    showProjects() {
        console.log('Showing projects information'); // Debug
        
        // These are real projects I've worked on during college
        const projectsText = `
My Coding Projects
=================

1. Interactive Terminal Portfolio (Current Project - 10 weeks)
   • This website you're currently exploring!
   • Built with vanilla HTML, CSS, and JavaScript
   • Features: Terminal emulator, games, themes, easter eggs
   • Biggest challenge: Making the terminal feel authentic
   • Status: Almost done! Just polishing up the details

2. Snake Game (Week 6-7 of this project)
   • Playable right in this terminal! (Type 'snake' to try it)
   • Learned about game loops, collision detection, and canvas drawing
   • First time building a game - was harder than I expected
   • Used HTML5 Canvas and JavaScript

3. Tetris Game (Week 8-9 of this project)  
   • Also playable in this terminal! (Type 'tetris')
   • Way more complex than Snake - took me 2 weeks
   • Learned about 2D arrays, rotation algorithms, line clearing
   • Probably the most challenging code I've written so far

4. Basic Calculator (CSE 100 Assignment)
   • Command-line calculator in Java
   • Handles basic arithmetic with proper order of operations
   • Used stack data structure for expression evaluation
   • First time really understanding how stacks work

5. Todo List App (Personal Project - 2 weeks)
   • Simple web app to track assignments and deadlines
   • HTML, CSS, JavaScript with localStorage
   • Helped me stay organized during midterms!
   • Planning to add more features over winter break

Future Project Ideas:
• Weather app using a real API
• Chat application (maybe with Socket.io?)
• Personal finance tracker
• Something with machine learning (after I take CSE 151A)

Most of these are pretty simple, but I'm proud of the progress I'm making!
Each project teaches me something new about programming.
        `;
        
        this.addToOutput(projectsText);
    }

    // Show contact information
    showContact() {
        console.log('Showing contact information'); // Debug
        
        const contactText = `
Contact Information
==================

I'd love to connect! Here's how you can reach me:

📧 Email: amohammadi@ucsd.edu
   (Best way to reach me - I check this daily)

💼 LinkedIn: linkedin.com/in/aryamohammadi
   (Type 'linkedin' to open in new tab)

🐙 GitHub: github.com/aryamohammadi  
   (Type 'github' to see my code)

📄 Resume: Available as PDF
   (Type 'resume' to download)

🏫 Currently: Junior at UC San Diego
   Major: Mathematics-Computer Science
   Expected Graduation: June 2026

I'm actively looking for:
• Summer 2025 internship opportunities
• Open source projects to contribute to
• Study groups and coding buddies
• Mentorship opportunities

Feel free to reach out if you:
• Have internship opportunities
• Want to collaborate on a project  
• Have advice for a CS student
• Just want to chat about programming!

I try to respond to all messages within 24 hours.
Looking forward to hearing from you! 😊
        `;
        
        this.addToOutput(contactText);
    }

    // Echo command - just repeat what the user typed
    echo(args) {
        console.log('Echo command with args:', args); // Debug
        
        // Join all the arguments back into a single string
        const message = args.join(' ');
        
        if (message === '') {
            // If they didn't type anything after 'echo'
            this.addToOutput('Usage: echo <message>');
        } else {
            // Repeat their message back to them
            this.addToOutput(message);
        }
    }

    // Show current date and time
    showDate() {
        console.log('Showing current date'); // Debug
        
        // Create a new Date object and format it nicely
        const now = new Date();
        const dateString = now.toLocaleString(); // This formats it automatically
        this.addToOutput(`Current date and time: ${dateString}`);
    }

    // Show fake weather information (just for fun)
    showWeather() {
        console.log('Showing weather information'); // Debug
        
        // Array of fake weather conditions - I'll pick one randomly
        const weatherConditions = [
            'Sunny and 75°F ☀️',
            'Partly cloudy, 68°F ⛅',
            'Rainy, 62°F 🌧️',
            'Overcast, 70°F ☁️',
            'Perfect coding weather! 72°F 💻'
        ];
        
        // Pick a random weather condition
        const randomIndex = Math.floor(Math.random() * weatherConditions.length);
        const weather = weatherConditions[randomIndex];
        
        this.addToOutput(`Weather in San Diego: ${weather}`);
        this.addToOutput('(Note: This is simulated weather data!)');
    }

    // Tell a random programming joke
    tellJoke() {
        console.log('Telling a programming joke'); // Debug
        
        // Array of programming jokes I found online
        const jokes = [
            "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
            "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡",
            "Why do Java developers wear glasses? Because they can't C# 👓",
            "What's a programmer's favorite hangout place? Foo Bar! 🍻",
            "Why did the programmer quit his job? He didn't get arrays! 📊",
            "How do you comfort a JavaScript bug? You console it! 🐞",
            "Why do programmers hate nature? It has too many bugs! 🦟",
            "What do you call a programmer from Finland? Nerdic! 🇫🇮"
        ];
        
        // Pick a random joke
        const randomIndex = Math.floor(Math.random() * jokes.length);
        const joke = jokes[randomIndex];
        
        this.addToOutput(joke);
    }

    // List files in current directory (fake file system)
    listFiles() {
        console.log('Listing files in directory:', this.currentDirectory); // Debug
        
        // Get the contents of the current directory
        const contents = this.getCurrentDirectoryContents();
        
        if (contents === null) {
            this.addToOutput(`ls: cannot access '${this.currentDirectory}': No such directory`);
            return;
        }
        
        // Show the files and directories
        this.addToOutput(`Contents of ${this.currentDirectory}:`);
        
        // Loop through each item in the directory
        for (const [name, content] of Object.entries(contents)) {
            if (typeof content === 'object') {
                // It's a directory - show it with a different color
                this.addToOutput(`📁 ${name}`);
            } else {
                // It's a file - show it normally  
                this.addToOutput(`📄 ${name}`);
            }
        }
    }

    // Change directory command (fake file system)
    changeDirectory(args) {
        console.log('Changing directory with args:', args); // Debug
        
        if (args.length === 0) {
            // No argument provided - go to home directory
            this.currentDirectory = '~';
            this.addToOutput('Changed to home directory');
            return;
        }
        
        const targetDir = args[0];
        console.log('Target directory:', targetDir); // Debug
        
        // Handle special cases
        if (targetDir === '..') {
            // Go up one directory
            if (this.currentDirectory !== '~') {
                this.currentDirectory = '~'; // For simplicity, just go back to home
                this.addToOutput('Changed to parent directory');
            } else {
                this.addToOutput('Already at root directory');
            }
            return;
        }
        
        if (targetDir === '~' || targetDir === '/') {
            // Go to home directory
            this.currentDirectory = '~';
            this.addToOutput('Changed to home directory');
            return;
        }
        
        // Check if the target directory exists
        const currentContents = this.getCurrentDirectoryContents();
        if (currentContents && currentContents[targetDir + '/']) {
            // Directory exists - change to it
            this.currentDirectory = `~/${targetDir}`;
            this.addToOutput(`Changed directory to ${this.currentDirectory}`);
        } else {
            // Directory doesn't exist
            this.addToOutput(`cd: ${targetDir}: No such file or directory`);
        }
    }

    // Show current directory
    showCurrentDirectory() {
        console.log('Showing current directory'); // Debug
        this.addToOutput(this.currentDirectory);
    }

    // Show user information
    showUserInfo() {
        console.log('Showing user info'); // Debug
        
        const userInfo = `
Current User Information:
========================
Username: portfolio-visitor
Host: aryam.dev
Terminal: Interactive Portfolio Terminal v1.0
Session: Guest session
Location: Arya's Portfolio Website

You are currently exploring my interactive terminal portfolio!
This is a simulated Unix-like environment built with JavaScript.
        `;
        
        this.addToOutput(userInfo);
    }

    // Exit terminal (just show a message)
    exitTerminal() {
        console.log('Exit command triggered'); // Debug
        this.addToOutput('Thanks for exploring my terminal portfolio!');
        this.addToOutput('To restart, refresh the page.');
        this.addToOutput('Connection closed.');
        
        // Disable the input field
        this.inputField.disabled = true;
    }

    // Open resume in new tab
    openResume() {
        console.log('Opening resume'); // Debug
        this.addToOutput('Opening resume in new tab...');
        // TODO: Add actual resume PDF link when I finish it
        this.addToOutput('(Resume PDF coming soon - still working on it!)');
    }

    // Open GitHub profile
    openGitHub() {
        console.log('Opening GitHub profile'); // Debug
        this.addToOutput('Opening GitHub profile in new tab...');
        window.open('https://github.com/aryamohammadi', '_blank');
    }

    // Open LinkedIn profile  
    openLinkedIn() {
        console.log('Opening LinkedIn profile'); // Debug
        this.addToOutput('Opening LinkedIn profile in new tab...');
        window.open('https://linkedin.com/in/aryamohammadi', '_blank');
    }

    // Change terminal theme
    changeTheme(args) {
        console.log('Changing theme with args:', args); // Debug
        
        if (args.length === 0) {
            // No theme specified - show available themes
            this.addToOutput('Available themes: default, matrix, retro, ocean');
            this.addToOutput('Usage: theme <theme-name>');
            return;
        }
        
        const themeName = args[0].toLowerCase();
        const validThemes = ['default', 'matrix', 'retro', 'ocean'];
        
        if (!validThemes.includes(themeName)) {
            this.addToOutput(`Invalid theme: ${themeName}`);
            this.addToOutput('Available themes: ' + validThemes.join(', '));
            return;
        }
        
        // Apply the theme by setting a data attribute on the body
        document.body.setAttribute('data-terminal-theme', themeName);
        this.addToOutput(`Theme changed to: ${themeName}`);
        
        // Add some flavor text for each theme
        switch (themeName) {
            case 'matrix':
                this.addToOutput('Welcome to the Matrix... 🕶️');
                break;
            case 'retro':
                this.addToOutput('Groovy! Like it\'s 1985 🕹️');
                break;
            case 'ocean':
                this.addToOutput('Diving deep into the digital ocean 🌊');
                break;
            case 'default':
                this.addToOutput('Back to the classic look 💻');
                break;
        }
    }

    // Helper Methods
    getCurrentDirectoryContents() {
        let current = this.fileSystem;
        const path = this.currentDirectory.split('/');
        
        for (const dir of path) {
            if (dir === '~') continue;
            current = current[dir];
        }
        
        return current;
    }

    // Easter Eggs
    konamiCode() {
        this.addToOutput('🎮 Konami Code activated! 🎮');
        this.addToOutput('✨ You found the secret! Here are some bonus commands:');
        this.addToOutput('• Try "matrix" for a Matrix effect');
        this.addToOutput('• Try "snake" for Snake game');
        this.addToOutput('• Try "tetris" for Tetris game');
        document.body.style.animation = 'konami 1s';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 1000);
    }

    matrixEffect() {
        this.addToOutput('🌐 Entering the Matrix...');
        this.addToOutput('Press ESC to exit the Matrix');
        
        // Create matrix canvas
        const canvas = document.createElement('canvas');
        canvas.id = 'matrix-canvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '9999';
        canvas.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const charArray = chars.split('');
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = [];
        
        // Initialize drops
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }
        
        const matrixInterval = setInterval(() => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00ff00';
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }, 50);
        
        // Exit on ESC key
        const exitMatrix = (e) => {
            if (e.key === 'Escape') {
                clearInterval(matrixInterval);
                document.body.removeChild(canvas);
                document.removeEventListener('keydown', exitMatrix);
                this.addToOutput('👋 Exited the Matrix');
            }
        };
        
        document.addEventListener('keydown', exitMatrix);
    }

    startSnakeGame() {
        this.addToOutput('🐍 Starting Snake game...');
        this.addToOutput('Use WASD or Arrow keys to move. Press ESC to exit.');
        
        // Create game canvas
        const canvas = document.createElement('canvas');
        canvas.id = 'snake-canvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '50%';
        canvas.style.left = '50%';
        canvas.style.transform = 'translate(-50%, -50%)';
        canvas.style.zIndex = '9999';
        canvas.style.border = '2px solid #fff';
        canvas.style.backgroundColor = '#000';
        canvas.width = 400;
        canvas.height = 400;
        
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        const gridSize = 20;
        const tileCount = canvas.width / gridSize;
        
        let snake = [{ x: 10, y: 10 }];
        let food = { x: 15, y: 15 };
        let dx = 0;
        let dy = 0;
        let score = 0;
        
        const gameLoop = () => {
            // Move snake
            const head = { x: snake[0].x + dx, y: snake[0].y + dy };
            
            // Check wall collision
            if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
                return gameOver();
            }
            
            // Check self collision
            if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
                return gameOver();
            }
            
            snake.unshift(head);
            
            // Check food collision
            if (head.x === food.x && head.y === food.y) {
                score++;
                food = {
                    x: Math.floor(Math.random() * tileCount),
                    y: Math.floor(Math.random() * tileCount)
                };
            } else {
                snake.pop();
            }
            
            // Clear canvas
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw snake
            ctx.fillStyle = '#0f0';
            snake.forEach(segment => {
                ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
            });
            
            // Draw food
            ctx.fillStyle = '#f00';
            ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
            
            // Draw score
            ctx.fillStyle = '#fff';
            ctx.font = '20px Arial';
            ctx.fillText('Score: ' + score, 10, 30);
        };
        
        const gameOver = () => {
            clearInterval(snakeInterval);
            document.body.removeChild(canvas);
            document.removeEventListener('keydown', snakeControls);
            this.addToOutput(`🎮 Game Over! Final Score: ${score}`);
        };
        
        const snakeControls = (e) => {
            if (e.key === 'Escape') {
                clearInterval(snakeInterval);
                document.body.removeChild(canvas);
                document.removeEventListener('keydown', snakeControls);
                this.addToOutput('🐍 Snake game exited');
                return;
            }
            
            switch (e.key) {
                case 'ArrowUp':
                case 'w':
                case 'W':
                    if (dy !== 1) { dx = 0; dy = -1; }
                    break;
                case 'ArrowDown':
                case 's':
                case 'S':
                    if (dy !== -1) { dx = 0; dy = 1; }
                    break;
                case 'ArrowLeft':
                case 'a':
                case 'A':
                    if (dx !== 1) { dx = -1; dy = 0; }
                    break;
                case 'ArrowRight':
                case 'd':
                case 'D':
                    if (dx !== -1) { dx = 1; dy = 0; }
                    break;
            }
        };
        
        document.addEventListener('keydown', snakeControls);
        const snakeInterval = setInterval(gameLoop, 100);
    }

    startTetrisGame() {
        this.addToOutput('🎮 Starting Tetris game...');
        this.addToOutput('Use A/D to move, S to drop, W to rotate. Press ESC to exit.');
        
        // Create game canvas
        const canvas = document.createElement('canvas');
        canvas.id = 'tetris-canvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '50%';
        canvas.style.left = '50%';
        canvas.style.transform = 'translate(-50%, -50%)';
        canvas.style.zIndex = '9999';
        canvas.style.border = '2px solid #fff';
        canvas.style.backgroundColor = '#000';
        canvas.width = 300;
        canvas.height = 600;
        
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        const BLOCK_SIZE = 30;
        const BOARD_WIDTH = 10;
        const BOARD_HEIGHT = 20;
        
        // Initialize board
        const board = Array(BOARD_HEIGHT).fill().map(() => Array(BOARD_WIDTH).fill(0));
        
        // Tetris pieces
        const pieces = [
            [[1, 1, 1, 1]], // I
            [[1, 1], [1, 1]], // O
            [[0, 1, 0], [1, 1, 1]], // T
            [[0, 1, 1], [1, 1, 0]], // S
            [[1, 1, 0], [0, 1, 1]], // Z
            [[1, 0, 0], [1, 1, 1]], // J
            [[0, 0, 1], [1, 1, 1]]  // L
        ];
        
        const colors = ['#000', '#0ff', '#ff0', '#f0f', '#0f0', '#f00', '#00f', '#ffa500'];
        
        let currentPiece = {
            shape: pieces[Math.floor(Math.random() * pieces.length)],
            x: 3,
            y: 0,
            color: Math.floor(Math.random() * 7) + 1
        };
        
        let score = 0;
        let lines = 0;
        
        const drawBlock = (x, y, color) => {
            ctx.fillStyle = colors[color];
            ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE - 1, BLOCK_SIZE - 1);
        };
        
        const drawPiece = (piece) => {
            piece.shape.forEach((row, y) => {
                row.forEach((cell, x) => {
                    if (cell) {
                        drawBlock(piece.x + x, piece.y + y, piece.color);
                    }
                });
            });
        };
        
        const drawBoard = () => {
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            board.forEach((row, y) => {
                row.forEach((cell, x) => {
                    if (cell) {
                        drawBlock(x, y, cell);
                    }
                });
            });
        };
        
        const isValidMove = (piece, dx = 0, dy = 0, newShape = piece.shape) => {
            return newShape.every((row, y) => {
                return row.every((cell, x) => {
                    if (!cell) return true;
                    const newX = piece.x + x + dx;
                    const newY = piece.y + y + dy;
                    return newX >= 0 && newX < BOARD_WIDTH && 
                           newY < BOARD_HEIGHT && 
                           (newY < 0 || !board[newY][newX]);
                });
            });
        };
        
        const placePiece = () => {
            currentPiece.shape.forEach((row, y) => {
                row.forEach((cell, x) => {
                    if (cell) {
                        const boardY = currentPiece.y + y;
                        if (boardY >= 0) {
                            board[boardY][currentPiece.x + x] = currentPiece.color;
                        }
                    }
                });
            });
            
            // Clear lines
            for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
                if (board[y].every(cell => cell)) {
                    board.splice(y, 1);
                    board.unshift(Array(BOARD_WIDTH).fill(0));
                    lines++;
                    score += 100;
                    y++; // Check same line again
                }
            }
            
            // New piece
            currentPiece = {
                shape: pieces[Math.floor(Math.random() * pieces.length)],
                x: 3,
                y: 0,
                color: Math.floor(Math.random() * 7) + 1
            };
            
            // Game over check
            if (!isValidMove(currentPiece)) {
                return gameOver();
            }
        };
        
        const gameLoop = () => {
            if (isValidMove(currentPiece, 0, 1)) {
                currentPiece.y++;
            } else {
                placePiece();
            }
            
            drawBoard();
            drawPiece(currentPiece);
            
            // Draw score
            ctx.fillStyle = '#fff';
            ctx.font = '16px Arial';
            ctx.fillText('Score: ' + score, 10, 20);
            ctx.fillText('Lines: ' + lines, 10, 40);
        };
        
        const gameOver = () => {
            clearInterval(tetrisInterval);
            document.body.removeChild(canvas);
            document.removeEventListener('keydown', tetrisControls);
            this.addToOutput(`🎮 Game Over! Final Score: ${score}, Lines: ${lines}`);
        };
        
        const rotatePiece = (piece) => {
            const rotated = piece.shape[0].map((_, i) => 
                piece.shape.map(row => row[i]).reverse()
            );
            return rotated;
        };
        
        const tetrisControls = (e) => {
            if (e.key === 'Escape') {
                clearInterval(tetrisInterval);
                document.body.removeChild(canvas);
                document.removeEventListener('keydown', tetrisControls);
                this.addToOutput('🎮 Tetris game exited');
                return;
            }
            
            switch (e.key) {
                case 'a':
                case 'A':
                case 'ArrowLeft':
                    if (isValidMove(currentPiece, -1, 0)) {
                        currentPiece.x--;
                    }
                    break;
                case 'd':
                case 'D':
                case 'ArrowRight':
                    if (isValidMove(currentPiece, 1, 0)) {
                        currentPiece.x++;
                    }
                    break;
                case 's':
                case 'S':
                case 'ArrowDown':
                    if (isValidMove(currentPiece, 0, 1)) {
                        currentPiece.y++;
                        score++;
                    }
                    break;
                case 'w':
                case 'W':
                case 'ArrowUp':
                    const rotated = rotatePiece(currentPiece);
                    if (isValidMove(currentPiece, 0, 0, rotated)) {
                        currentPiece.shape = rotated;
                    }
                    break;
            }
            
            drawBoard();
            drawPiece(currentPiece);
        };
        
        document.addEventListener('keydown', tetrisControls);
        const tetrisInterval = setInterval(gameLoop, 500);
        
        // Initial draw
        drawBoard();
        drawPiece(currentPiece);
    }

    showEasterEggs() {
        this.addToOutput('🥚 Available Easter Eggs:');
        this.addToOutput('');
        this.addToOutput('🎮 konami     - Activate the legendary Konami code');
        this.addToOutput('🌐 matrix     - Enter the digital rain');
        this.addToOutput('🐍 snake      - Play the classic Snake game');
        this.addToOutput('🎮 tetris     - Play Tetris!');
        this.addToOutput('');
        this.addToOutput('💡 Hint: Try the Konami code sequence: ↑↑↓↓←→←→BA');
    }

    showFunCommands() {
        this.addToOutput('🎉 Fun Terminal Commands:');
        this.addToOutput('');
        this.addToOutput('🎨 theme <name>  - Switch terminal themes (matrix, retro, ocean)');
        this.addToOutput('🐄 cowsay <msg>  - Make a cow say something');
        this.addToOutput('😂 joke         - Tell a random programming joke');
        this.addToOutput('🌤️  weather      - Check the weather (simulated)');
        this.addToOutput('📅 date         - Show current date and time');
        this.addToOutput('🔄 echo <text>  - Echo back your text');
        this.addToOutput('');
        this.addToOutput('Try them out! 🚀');
    }

    cowsay(args) {
        const message = args.length > 0 ? args.join(' ') : 'Hello from the terminal cow!';
        const msgLength = message.length;
        const border = '-'.repeat(msgLength + 2);
        
        this.addToOutput(`
 ${border}
< ${message} >
 ${border}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`);
    }
}

// Terminal will be initialized from main.js after components are loaded 