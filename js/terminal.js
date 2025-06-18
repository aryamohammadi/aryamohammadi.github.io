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
            'exit': () => this.exitTerminal()
        };

        this.currentDirectory = '~';
        this.fileSystem = {
            '~': {
                'about.txt': 'Information about Arya',
                'skills.txt': 'Technical skills and expertise',
                'projects.txt': 'Portfolio projects',
                'contact.txt': 'Contact information',
                'secret/': {
                    'easter-eggs.txt': 'Hidden features and games'
                }
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
Email: [Your Email]
GitHub: [Your GitHub]
LinkedIn: [Your LinkedIn]
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
        document.body.style.animation = 'konami 1s';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 1000);
    }

    matrixEffect() {
        this.addToOutput('🌐 Entering the Matrix...');
        // Matrix effect implementation would go here
    }

    startSnakeGame() {
        this.addToOutput('🐍 Starting Snake game...');
        // Snake game implementation would go here
    }

    startTetrisGame() {
        this.addToOutput('🎮 Starting Tetris game...');
        // Tetris game implementation would go here
    }
}

// Initialize terminal when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const terminal = new Terminal();
}); 