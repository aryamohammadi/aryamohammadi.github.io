# Arya Mohammadi's Portfolio

Welcome to my personal portfolio website. I built this site from the ground up while pursuing my double major in Mathematics and Computer Science at UC San Diego. It serves as a central hub to showcase my technical projects, professional experience, and the skills I've developed throughout my academic and professional journey.

## About This Project

Creating a professional online presence has become essential in today's tech industry. I wanted something that not only demonstrated my technical abilities but also reflected my personality and approach to software development. This portfolio highlights my most significant projects, the technologies I work with daily, and my experience as a Technical Lead at Arya Electric LLC.

The site features a modern, dark-themed design with smooth animations and interactive elements. I built everything with performance and user experience in mind, ensuring it looks great and loads quickly on any device.

## Key Features

- **Fully Responsive Design** - The site adapts seamlessly to any screen size, from mobile phones to large desktop monitors
- **Interactive Typing Animation** - The homepage features a dynamic typing effect that introduces my roles and interests
- **Detailed Project Showcases** - Each project includes comprehensive descriptions, technologies used, and links to live demos or repositories
- **Professional Timeline** - A clear presentation of my work experience and technical competencies
- **Direct Contact Options** - Multiple ways for recruiters and potential collaborators to get in touch
- **Personal Gallery** - A collection of photos that adds a human touch to the professional content

## Technical Implementation

- **HTML5** - Clean, semantic markup following modern web standards
- **Tailwind CSS** - A utility-first CSS framework that enabled rapid development while maintaining design consistency
- **Vanilla JavaScript** - Custom scripts for dynamic component loading and interactive features
- **Typed.js** - A lightweight library powering the smooth typing animations
- **GitHub Pages** - Static site hosting that deploys automatically on every push to main

## Project Structure

```
portfolio/
├─ index.html              # Main HTML document
├─ components/             # Modular HTML components
│   ├─ header.html         # Navigation and site header
│   ├─ hero.html           # Homepage with typing animation
│   ├─ about.html          # About me and experience section
│   ├─ projects.html       # Featured projects showcase
│   ├─ skills.html         # Technical skills and competencies
│   ├─ gallery.html        # Photo gallery section
│   ├─ contact.html        # Contact information and form
│   └─ footer.html         # Site footer
├─ css/
│   └─ styles.css          # Custom styles beyond Tailwind
├─ js/
│   └─ main.js             # Main JavaScript functionality
└─ images/                 # Photos and assets
```

## Featured Projects

### CodeLens

An AI-powered code review tool that detects bugs, suggests optimizations, and analyzes time and space complexity across 8 programming languages using GPT-4. I designed a REST API with a structured JSON schema for consistent model output, validation for empty or malformed responses, and async state management with Zustand. Built with Next.js and TypeScript.

**GitHub Repository:** [github.com/aryamohammadi/code-analyzer](https://github.com/aryamohammadi/code-analyzer)

### DormDuos

This full-stack web application serves a 500+ member UC Riverside housing community I co-founded. The platform allows students to browse available listings, post their own housing options, and connect with potential roommates. I built it using React for the frontend, Node.js and Express for the backend API, and MongoDB for data persistence. The application includes JWT authentication, complete CRUD operations, input sanitization against NoSQL injection, and 100% branch test coverage with Jest, Supertest, and MongoDB Memory Server.

**Live Demo:** [ucr-housing-frontend.vercel.app](https://ucr-housing-frontend.vercel.app/)
**GitHub Repository:** [github.com/aryamohammadi/Dormduos](https://github.com/aryamohammadi/Dormduos)

### Arya Electric LLC Website

As the Web & Technical Lead at Arya Electric, I developed and maintain the company's primary web presence from scratch. This production Next.js platform serves a licensed electrical contractor with 400+ customers across Southern California. It features async API routes for quote submission with Twilio SMS confirmation, automated email follow-ups, and server-side caching for the Google Reviews API that cut cached response latency by 90%. The codebase is covered by 90+ tests with Playwright end-to-end validation.

**Live Site:** [aryaelectric.com](https://www.aryaelectric.com)

### Battlestar RPG Game

This terminal-based RPG game was my capstone project for my C++ programming course. Working with a team of four other students, we built a 3.4k-line game engine with 23 classes featuring turn-based combat with a MaxHeap-based scheduler, an inventory system, and adaptive difficulty. We wrote 2.3k lines of GoogleTest unit tests and learned valuable lessons about collaborative software development, version control, and managing a larger codebase.

**GitHub Repository:** [github.com/aryamohammadi/Battlestar-RPG](https://github.com/aryamohammadi/Battlestar-RPG)

## Running Locally

If you want to run this portfolio on your own machine, the process is straightforward:

1. Clone this repository to your computer
2. Open the `index.html` file in any modern web browser
3. That's all there is to it

Since this is a static site built with vanilla HTML, CSS, and JavaScript, there's no build process, no dependencies to install, and no server configuration needed. It just works.

## Deployment and Updates

The site is hosted on GitHub Pages and deploys automatically whenever I push changes to the main branch. This means updates go live within minutes, and I don't have to worry about server maintenance or hosting costs. GitHub Pages has been a reliable and efficient solution for this portfolio.

## About Me and My Goals

I'm currently pursuing my degree in Computer Science and Mathematics at UC San Diego (expected 2027) while working as the Web & Technical Lead at Arya Electric LLC. This summer I'm a Software Engineer Intern at IBM on the watsonx Orchestrate team, building agentic AI tooling. I'm passionate about building software that solves real problems and creates value for users.

This portfolio represents not just my technical skills, but also my approach to development: clean code, thoughtful design, and a focus on user experience. I believe in continuous learning and improvement, and I'm always working on new projects to expand my capabilities.

## Get in Touch

I'm always interested in connecting with fellow developers, potential employers, and anyone working on interesting projects. Feel free to reach out through any of these channels:

- **Email:** aryamohammadi.dev@gmail.com
- **LinkedIn:** [linkedin.com/in/aryamshahi](https://linkedin.com/in/aryamshahi)
- **GitHub:** [github.com/aryamohammadi](https://github.com/aryamohammadi)
- **Portfolio Website:** There's also a contact form on the site if you prefer that route

Whether you have questions about my projects, want to discuss potential opportunities, or just want to chat about technology and software development, I'd love to hear from you.

---

Built with care during my time at UC San Diego. This portfolio reflects my commitment to clean code, thoughtful design, and creating meaningful user experiences.
