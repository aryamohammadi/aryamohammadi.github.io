// Simple Snake game implementation
// Adapted from various open-source implementations for portfolio use

// Main variables accessible at module level
let gameContainer, canvas, ctx;
let snake = [];
let foodX, foodY;
let velocityX = 0;
let velocityY = 0;
let gameStarted = false;
let gameOver = false;
let score = 0;
let gameLoop;
let keyDownHandler;

document.addEventListener('DOMContentLoaded', () => {
    // Wait for components to load
    setTimeout(initSnakeGame, 1000);
});

function initSnakeGame() {
    // Find game container
    gameContainer = document.querySelector('.game-container');
    if (!gameContainer) return;
    
    // Clear any existing canvas
    gameContainer.innerHTML = '';
    
    // Create new canvas element
    canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 300;
    gameContainer.appendChild(canvas);
    
    // Get drawing context
    ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('Could not get canvas context');
        return;
    }
    
    // Game constants
    const tileCount = 20;
    const tileSize = canvas.width / tileCount;
    
    // Initialize game state
    resetGame();
    
    // Show start instructions
    drawStartScreen();
    
    // Define keyboard handler
    keyDownHandler = function(e) {
        handleKeyDown(e, tileCount);
    };
    
    // Set up container hover events
    setupHoverEvents();
}

function resetGame() {
    // Reset snake
    snake = [{ x: 10, y: 10 }];
    
    // Reset game state
    velocityX = 0;
    velocityY = 0;
    gameStarted = false;
    gameOver = false;
    score = 0;
    
    // Place initial food
    placeFood();
    
    // Clear any existing game loop
    if (gameLoop) {
        clearInterval(gameLoop);
        gameLoop = null;
    }
}

function placeFood() {
    // Get game constants
    const tileCount = 20;
    
    // Generate random position
    foodX = Math.floor(Math.random() * tileCount);
    foodY = Math.floor(Math.random() * tileCount);
    
    // Make sure food doesn't appear on snake
    for (let i = 0; i < snake.length; i++) {
        if (foodX === snake[i].x && foodY === snake[i].y) {
            placeFood(); // Try again
            return;
        }
    }
}

function drawStartScreen() {
    if (!ctx) return;
    
    // Clear canvas
    ctx.fillStyle = '#111827'; // Dark background
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw instructions
    ctx.fillStyle = '#ffffff';
    ctx.font = '18px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Press arrow keys to start', canvas.width / 2, canvas.height / 2);
    ctx.font = '14px Arial';
    ctx.fillText('Game continues until you lose', canvas.width / 2, canvas.height / 2 + 30);
}

function draw() {
    if (!ctx || !canvas) return;
    
    const tileCount = 20;
    const tileSize = canvas.width / tileCount;
    
    // Clear canvas
    ctx.fillStyle = '#111827'; // Dark background
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    if (gameOver) {
        drawGameOver();
        return;
    }
    
    // Move snake
    if (gameStarted) {
        moveSnake(tileCount);
    }
    
    // Draw food
    ctx.fillStyle = '#8B5CF6'; // Purple color
    ctx.fillRect(foodX * tileSize, foodY * tileSize, tileSize - 2, tileSize - 2);
    
    // Draw snake
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x * tileSize, snake[i].y * tileSize, tileSize - 2, tileSize - 2);
    }
    
    // Check if snake eats food
    if (snake[0].x === foodX && snake[0].y === foodY) {
        eatFood();
    }
    
    // Draw score
    drawScore();
}

function moveSnake(tileCount) {
    // Move body segments
    for (let i = snake.length - 1; i > 0; i--) {
        snake[i].x = snake[i - 1].x;
        snake[i].y = snake[i - 1].y;
    }
    
    // Move head
    snake[0].x += velocityX;
    snake[0].y += velocityY;
    
    // Check for wall collision
    if (snake[0].x < 0 || snake[0].x >= tileCount || 
        snake[0].y < 0 || snake[0].y >= tileCount) {
        gameOver = true;
    }
    
    // Check for self collision
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            gameOver = true;
        }
    }
}

function eatFood() {
    // Grow snake
    snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y });
    
    // Place new food
    placeFood();
    
    // Increase score
    score++;
}

function drawScore() {
    if (!ctx) return;
    
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Score: ${score}`, 10, 20);
}

function drawGameOver() {
    if (!ctx || !canvas) return;
    
    ctx.fillStyle = '#ffffff';
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 20);
    ctx.font = '18px Arial';
    ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 20);
    
    // Add restart instructions
    ctx.font = '14px Arial';
    ctx.fillText('Move mouse away and back to restart', canvas.width / 2, canvas.height / 2 + 50);
}

function handleKeyDown(e, tileCount) {
    // Prevent default browser scrolling behavior for arrow keys
    if (e.keyCode >= 37 && e.keyCode <= 40) {
        e.preventDefault();
    }
    
    // Start game on any arrow key
    if (!gameStarted && (e.keyCode >= 37 && e.keyCode <= 40)) {
        gameStarted = true;
        startGameLoop();
    }
    
    // Prevent snake from reversing directly into itself
    // Left arrow
    if (e.keyCode === 37 && velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
    }
    // Up arrow
    else if (e.keyCode === 38 && velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
    }
    // Right arrow
    else if (e.keyCode === 39 && velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
    }
    // Down arrow
    else if (e.keyCode === 40 && velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
    }
}

function startGameLoop() {
    // Clear any existing game loop
    if (gameLoop) {
        clearInterval(gameLoop);
    }
    
    // Start new game loop
    gameLoop = setInterval(draw, 1000 / 10); // 10 FPS
}

function setupHoverEvents() {
    if (!gameContainer) return;
    
    // Start game on mouseenter if on desktop
    gameContainer.addEventListener('mouseenter', () => {
        if (window.innerWidth > 768) { // Desktop only
            // Clean up
            cleanupGame();
            
            // Reset and start
            resetGame();
            drawStartScreen();
            
            // Add keyboard controls
            document.addEventListener('keydown', keyDownHandler);
        }
    });
    
    // Clean up when mouse leaves
    gameContainer.addEventListener('mouseleave', () => {
        cleanupGame();
    });
}

function cleanupGame() {
    // Clear game loop
    if (gameLoop) {
        clearInterval(gameLoop);
        gameLoop = null;
    }
    
    // Clear canvas if it exists
    if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    
    // Remove keyboard listener
    if (keyDownHandler) {
        document.removeEventListener('keydown', keyDownHandler);
    }
}

// Cleanup on page unload to prevent memory leaks
window.addEventListener('beforeunload', cleanupGame); 