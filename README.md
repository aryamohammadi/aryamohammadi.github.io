# Arya's Portfolio Website

A simple, clean, and responsive portfolio website showcasing projects, skills, and contact information.

## Features

- **Responsive Design**: Looks great on all devices from mobile to desktop
- **Dark Mode**: Modern dark-themed UI with purple accents
- **Interactive Elements**:
  - Typing effect using Typed.js
  - Mini-game (Snake) for desktop visitors
  - Project cards with hover effects
  - Smooth scrolling navigation

## Technology Stack

- HTML5
- Tailwind CSS (via CDN)
- Vanilla JavaScript
- Typed.js (for typing animation)
- SVG icons

## Project Structure

```
portfolio/
├─ index.html           # Main HTML document
├─ README.md            # Project documentation
│
├─ css/
│   └─ styles.css       # Custom styles beyond Tailwind
│
├─ js/
│   ├─ main.js          # Main JavaScript functionality
│   └─ snake.js         # Snake game implementation
│
├─ components/          # HTML components loaded via JavaScript
│   ├─ header.html
│   ├─ hero.html
│   ├─ fun.html
│   ├─ about.html
│   ├─ projects.html
│   ├─ skills.html
│   ├─ contact.html
│   └─ footer.html
│
└─ images/
    └─ avatar.jpg       # Profile image
```

## Local Development

1. Clone this repository
2. Open `index.html` in your browser

That's it! No build process or server needed for local development.

## Deployment

This website can be deployed to GitHub Pages, Netlify, or any static site hosting platform without any build process.

## License

MIT
