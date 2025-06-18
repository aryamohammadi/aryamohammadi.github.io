class Terminal {
    constructor() {
        this.inputField = document.getElementById('terminal-input-field');
        this.outputDiv = document.getElementById('terminal-output');
        this.commandHistory = [];
        this.historyIndex = -1;
        this.easterEggs = {
            'konami': () => this.konamiCode(),
            'matrix': () => this.matrixEffect(),
            'snake': () => this.startSnakeGame(),
            'tetris': () => this.startTetrisGame()
        };
        
        this.commands = {
            'help': () => this.showHelp(),
            'clear': () => this.clearTerminal(),
            'about': () => this.showAbout(),
            'skills': () => this.showSkills(),
            'projects': () => this.showProjects(),
            'contact': () => this.showContact(),
            'echo': (args) => this.echo(args),
            'date': () => this.showDate(),
            'weather': () => this.showWeather(),
            'joke': () => this.tellJoke(),
            'ls': () => this.listFiles(),
            'cd': (args) => this.changeDirectory(args),
            'pwd': () => this.showCurrentDirectory(),
            'whoami': () => this.showUserInfo(),
            'exit': () => this.exitTerminal(),
            'resume': () => this.openResume(),
            'github': () => this.openGitHub(),
            'linkedin': () => this.openLinkedIn(),
            'theme': (args) => this.changeTheme(args),
            'cat': (args) => this.catFile(args),
            'eastereggs': () => this.showEasterEggs(),
            'fun': () => this.showFunCommands(),
            'cowsay': (args) => this.cowsay(args)
        };

        this.currentDirectory = '~';
        this.fileSystem = {
            '~': {
                'about.txt': 'Information about Arya',
                'skills.txt': 'Technical skills and expertise',
                'projects.txt': 'Portfolio projects',
                'contact.txt': 'Contact information',
                'secret/': {
                    'easter-eggs.txt': 'Hidden features and games',
                    'konami.txt': 'The legendary cheat code',
                    'games.txt': 'Available games in the terminal'
                },
                'readme.txt': 'Welcome to my terminal portfolio!'
            }
        };

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.inputField.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.processCommand();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.navigateHistory('up');
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.navigateHistory('down');
            }
        });

        // Konami Code Easter Egg
        let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        let konamiIndex = 0;
        document.addEventListener('keydown', (e) => {
            if (e.key === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    this.konamiCode();
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        });
    }

    processCommand() {
        const input = this.inputField.value.trim();
        if (input === '') return;

        this.addToOutput(input, true);
        this.commandHistory.push(input);
        this.historyIndex = this.commandHistory.length;

        const [command, ...args] = input.split(' ');
        
        if (this.easterEggs[command]) {
            this.easterEggs[command]();
        } else if (this.commands[command]) {
            this.commands[command](args);
        } else {
            this.addToOutput(`Command not found: ${command}. Type 'help' for available commands.`);
        }

        this.inputField.value = '';
    }

    addToOutput(text, isCommand = false) {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        
        const prompt = document.createElement('span');
        prompt.innerHTML = `<span class="text-green-400">portfolio@aryam.dev</span>
                           <span class="text-gray-500">:</span>
                           <span class="text-blue-400">${this.currentDirectory}</span>
                           <span class="text-gray-500">$</span>`;
        
        const content = document.createElement('span');
        content.className = isCommand ? 'text-white' : 'text-gray-300';
        content.textContent = isCommand ? ` ${text}` : text;
        
        line.appendChild(prompt);
        line.appendChild(content);
        this.outputDiv.appendChild(line);
        
        this.outputDiv.scrollTop = this.outputDiv.scrollHeight;
    }

    navigateHistory(direction) {
        if (this.commandHistory.length === 0) return;
        
        if (direction === 'up') {
            if (this.historyIndex > 0) {
                this.historyIndex--;
            }
        } else {
            if (this.historyIndex < this.commandHistory.length - 1) {
                this.historyIndex++;
            }
        }
        
        this.inputField.value = this.commandHistory[this.historyIndex] || '';
    }

    // Command Implementations
    showHelp() {
        const helpText = `
Available commands:
  help     - Show this help message
  clear    - Clear the terminal
  about    - Show information about me
  skills   - Display my technical skills
  projects - List my projects
  contact  - Show contact information
  echo     - Echo the input text
  date     - Show current date and time
  weather  - Show current weather (simulated)
  joke     - Tell a random programming joke
  ls       - List files in current directory
  cd       - Change directory
  pwd      - Show current directory
  whoami   - Show user information
  exit     - Exit the terminal
  resume   - Open my resume
  github   - Open my GitHub profile
  linkedin - Open my LinkedIn profile
  theme    - Change terminal theme
  cat      - Display file content
  eastereggs - Show easter eggs
  fun      - Show fun commands
  cowsay   - Display a cowsay message

Easter eggs (try these!):
  konami   - Activate Konami code
  matrix   - Start matrix effect
  snake    - Play Snake game
  tetris   - Play Tetris game
        `;
        this.addToOutput(helpText);
    }

    clearTerminal() {
        this.outputDiv.innerHTML = '';
    }

    showAbout() {
        this.addToOutput(`
Name: Arya
Education: B.S. in Mathematics-Computer Science at UCSD
Experience: STEM Tutor at UCR
Interests: Software Development, Problem Solving, Teaching
        `);
    }

    showSkills() {
        this.addToOutput(`
Languages: C++, Python, Bash
Tools: Git, VS Code, PostgreSQL
Core Concepts: Memory Management, OOP & SOLID, Software Architecture
Development Practices: Unit Testing, Agile Development, Feature Branching
        `);
    }

    showProjects() {
        this.addToOutput(`
1. UCR HousingConnect
   - Full-stack housing platform
   - Python, JavaScript, Google Maps API
   - April 2025 - Present

2. Battlestar RPG
   - Terminal-based C++ game
   - OOP, SOLID principles
   - September 2024
        `);
    }

    showContact() {
        this.addToOutput(`
📧 Email: your.email@example.com
🐙 GitHub: github.com/yourusername
💼 LinkedIn: linkedin.com/in/yourusername
🌐 Portfolio: aryam.dev

Feel free to reach out for collaboration opportunities,
technical discussions, or just to say hello!

Response time: Usually within 24 hours
Best contact method: Email
        `);
    }

    echo(args) {
        this.addToOutput(args.join(' '));
    }

    showDate() {
        const now = new Date();
        this.addToOutput(now.toLocaleString());
    }

    showWeather() {
        const weathers = [
            "☀️ Sunny and 75°F",
            "🌧️ Light rain, 65°F",
            "⛅ Partly cloudy, 70°F",
            "❄️ Snowing, 32°F",
            "🌪️ Tornado warning! Take cover!"
        ];
        this.addToOutput(weathers[Math.floor(Math.random() * weathers.length)]);
    }

    tellJoke() {
        const jokes = [
            "Why do programmers prefer dark mode? Because light attracts bugs!",
            "How many programmers does it take to change a light bulb? None, that's a hardware problem!",
            "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings!",
            "Why did the developer go broke? Because he used up all his cache!",
            "What do you call a computer that sings? A Dell!"
        ];
        this.addToOutput(jokes[Math.floor(Math.random() * jokes.length)]);
    }

    listFiles() {
        const currentDir = this.getCurrentDirectoryContents();
        let output = '';
        for (const item in currentDir) {
            output += `${item}${typeof currentDir[item] === 'object' ? '/' : ''}\n`;
        }
        this.addToOutput(output || 'Directory is empty');
    }

    changeDirectory(args) {
        const target = args[0];
        if (!target || target === '~') {
            this.currentDirectory = '~';
            return;
        }
        
        if (target === '..') {
            this.currentDirectory = '~';
            return;
        }
        
        const currentDir = this.getCurrentDirectoryContents();
        if (currentDir[target] && typeof currentDir[target] === 'object') {
            this.currentDirectory = `${this.currentDirectory}/${target}`;
        } else {
            this.addToOutput(`cd: no such directory: ${target}`);
        }
    }

    showCurrentDirectory() {
        this.addToOutput(this.currentDirectory);
    }

    showUserInfo() {
        this.addToOutput(`
Username: portfolio
Hostname: aryam.dev
Shell: /bin/zsh
        `);
    }

    exitTerminal() {
        this.addToOutput('Goodbye! Refresh the page to restart the terminal.');
        this.inputField.disabled = true;
    }

    openResume() {
        this.addToOutput('📄 Opening resume...');
        // You can replace this with your actual resume link
        window.open('#', '_blank');
    }

    openGitHub() {
        this.addToOutput('🐙 Opening GitHub profile...');
        // Replace with your GitHub URL
        window.open('https://github.com/yourusername', '_blank');
    }

    openLinkedIn() {
        this.addToOutput('💼 Opening LinkedIn profile...');
        // Replace with your LinkedIn URL
        window.open('https://linkedin.com/in/yourusername', '_blank');
    }

    changeTheme(args) {
        const theme = args[0];
        const themes = ['default', 'matrix', 'retro', 'ocean'];
        
        if (!theme) {
            this.addToOutput(`Available themes: ${themes.join(', ')}`);
            return;
        }
        
        if (themes.includes(theme)) {
            this.addToOutput(`🎨 Switching to ${theme} theme...`);
            // Theme switching logic would go here
            document.body.setAttribute('data-terminal-theme', theme);
        } else {
            this.addToOutput(`Unknown theme: ${theme}. Available: ${themes.join(', ')}`);
        }
    }

    catFile(args) {
        const filename = args[0];
        if (!filename) {
            this.addToOutput('cat: missing file operand');
            return;
        }

        const fileContents = {
            'about.txt': `Name: Arya M
Education: Mathematics-Computer Science @ UCSD
Location: California
Interests: AI, Software Development, Problem Solving

I'm passionate about creating innovative solutions and 
building projects that make a difference. Currently 
exploring the intersection of mathematics and computer 
science through various AI projects.`,
            
            'skills.txt': `PROGRAMMING LANGUAGES:
• C++ - Advanced (OOP, SOLID principles, memory management)
• Python - Advanced (Flask, data structures, algorithms)
• JavaScript - Intermediate (ES6+, DOM manipulation)
• Bash - Intermediate (shell scripting, automation)

TOOLS & TECHNOLOGIES:
• Git/GitHub - Version control and collaboration
• VS Code - Primary development environment
• PostgreSQL - Database design and management
• Google Maps API - Location-based services

CORE CONCEPTS:
• Object-Oriented Programming & SOLID principles
• Software Architecture and Design Patterns
• Unit Testing and Test-Driven Development
• Agile Development Methodologies`,
            
            'projects.txt': `1. UCR HOUSINGCONNECT (April 2025 - Present)
   Full-stack housing platform for UC Riverside students
   
   Features:
   • Map-based housing search with geolocation
   • Secure user authentication system
   • Backend listing management
   • Google Maps API integration
   
   Tech Stack: Python, JavaScript, Flask, PostgreSQL
   
2. BATTLESTAR RPG (September 2024)
   Terminal-based C++ combat game
   
   Features:
   • Custom combat engine with turn-based mechanics
   • Modular UI handling system
   • Custom MaxHeap data structures
   • 90%+ unit test coverage
   
   Tech Stack: C++, GoogleTest, Git`,
            
            'contact.txt': `📧 Email: your.email@example.com
🐙 GitHub: github.com/yourusername
💼 LinkedIn: linkedin.com/in/yourusername
🌐 Portfolio: aryam.dev

Feel free to reach out for collaboration opportunities,
technical discussions, or just to say hello!

Response time: Usually within 24 hours
Best contact method: Email`,

            'readme.txt': `🚀 WELCOME TO ARYA'S TERMINAL PORTFOLIO 🚀

This is an interactive terminal emulator built with JavaScript.
You can explore my portfolio using Unix-like commands!

GETTING STARTED:
• Type 'help' to see all available commands
• Use 'ls' to list files and directories
• Use 'cd' to navigate directories
• Use 'cat <filename>' to read file contents

SPECIAL FEATURES:
• Type 'eastereggs' to see hidden games
• Type 'fun' to see entertaining commands
• Try the Konami code: ↑↑↓↓←→←→BA

NAVIGATION:
• Use arrow keys to navigate command history
• Type 'clear' to clear the terminal
• Type 'theme <name>' to change terminal themes

Enjoy exploring! 🌟`,

            'easter-eggs.txt': `🥚 EASTER EGGS GUIDE 🥚

This terminal contains several hidden features:

1. KONAMI CODE
   - Enter the famous sequence: ↑↑↓↓←→←→BA
   - Or simply type 'konami'
   - Unlocks special terminal effects

2. MATRIX EFFECT
   - Type 'matrix' to enter the digital rain
   - Press ESC to exit the Matrix
   - Full-screen green code animation

3. SNAKE GAME
   - Type 'snake' to play the classic game
   - Use WASD or arrow keys to move
   - Try to beat your high score!

4. TETRIS GAME
   - Type 'tetris' for the falling blocks game
   - A/D to move, S to drop, W to rotate
   - Clear lines to score points

5. TERMINAL THEMES
   - Type 'theme matrix' for Matrix theme
   - Type 'theme retro' for retro amber
   - Type 'theme ocean' for ocean blue

6. COWSAY
   - Type 'cowsay Hello World' for ASCII art
   - The cow will say whatever you want!

Happy exploring! 🎮`,

            'konami.txt': `🎮 THE KONAMI CODE 🎮

The Konami Code is one of the most famous cheat codes in gaming history.

SEQUENCE: ↑ ↑ ↓ ↓ ← → ← → B A

HISTORY:
Originally created by Kazuhisa Hashimoto for the 1986 game Gradius.
It was intended as a developer tool to make testing easier.

IN THIS TERMINAL:
• Enter the sequence using arrow keys + 'b' + 'a'
• Or simply type 'konami' as a command
• Activates special terminal animations
• Reveals hidden easter egg commands

The code has appeared in hundreds of games and websites since then.
It's a tribute to gaming culture and developer creativity!

Try it now! 🕹️`,

            'games.txt': `🎮 TERMINAL GAMES 🎮

This terminal includes fully playable games:

1. SNAKE 🐍
   Command: snake
   Controls: WASD or Arrow Keys
   Goal: Eat food, grow longer, avoid walls and yourself
   Features: Score tracking, smooth gameplay

2. TETRIS 🎯
   Command: tetris
   Controls: A/D (move), S (drop), W (rotate)
   Goal: Clear horizontal lines by filling them
   Features: Line clearing, score system, increasing difficulty

3. MATRIX EFFECT 🌐
   Command: matrix
   Controls: ESC to exit
   Experience: Digital rain animation
   Features: Full-screen effect, Japanese characters

TIPS:
• All games can be exited with ESC key
• Scores are displayed during gameplay
• Games work best in full-screen browser mode
• Try different terminal themes while playing!

Have fun! 🚀`
        };

        if (fileContents[filename]) {
            this.addToOutput(fileContents[filename]);
        } else {
            this.addToOutput(`cat: ${filename}: No such file or directory`);
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