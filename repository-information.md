# Repository Information

## DormDuos

A production-ready full-stack housing marketplace platform serving UC Riverside students. Built with Node.js, Express, and MongoDB, the application handles authentication, listing management, and search functionality with a focus on reliability and security.

### Overview

DormDuos is a full-stack web application that connects UCR students with off-campus housing options. The platform processes dozens of listing requests weekly, serving hundreds of active users searching for housing near campus. The system implements a RESTful API architecture with JWT-based authentication, MongoDB for data persistence, and comprehensive input validation to ensure data integrity and security.

The application demonstrates production-level engineering practices including automated testing, environment-based configuration, and cloud deployment strategies. The backend API handles complex filtering queries, pagination, and real-time listing updates while maintaining sub-second response times.

### Features

**Authentication and Authorization**
- JWT-based authentication system with secure token generation and validation
- Password hashing using bcrypt with 12 salt rounds
- Protected API routes with middleware-based authorization
- Session management with token expiration handling

**Listing Management**
- CRUD operations for housing listings with ownership validation
- Advanced search and filtering by price range, bedrooms, bathrooms, and amenities
- Pagination support for large result sets
- Listing status management (active, inactive, rented)
- View tracking and analytics for landlords

**API and Data Layer**
- RESTful API design with consistent error handling
- MongoDB schema design with proper indexing for query optimization
- Input sanitization middleware preventing NoSQL injection attacks
- Comprehensive validation at both model and route levels

**Production Features**
- Health check endpoints for monitoring and diagnostics
- Environment-based configuration for development, staging, and production
- CORS configuration supporting multiple frontend origins
- Error handling with appropriate HTTP status codes
- Request logging and debugging utilities

### Tech Stack

**Backend**
- Node.js 16+ with Express 5.1.0
- MongoDB with Mongoose ODM for schema management
- JSON Web Tokens (JWT) for authentication
- bcryptjs for password hashing
- dotenv for environment configuration

**Frontend**
- React 19.1.0 with Vite build tool
- React Router for client-side routing
- Tailwind CSS for styling
- Context API for state management

**Testing**
- Jest for backend unit and integration testing
- Vitest for frontend component testing
- MongoDB Memory Server for isolated test database
- Supertest for API endpoint testing

**Deployment**
- Railway for backend hosting with automatic deployments
- Vercel for frontend hosting with CDN distribution
- MongoDB Atlas for managed database hosting
- Environment variable management across environments

### Architecture

The application follows a three-tier architecture pattern with clear separation between presentation, business logic, and data layers.

**API Layer (Express Routes)**
The Express server exposes RESTful endpoints organized by resource type. Route handlers delegate business logic to model methods and use middleware for cross-cutting concerns like authentication and input validation. The API layer handles HTTP request parsing, response formatting, and error translation.

**Business Logic Layer (Models and Middleware)**
Mongoose models encapsulate data validation rules and business logic. Pre-save hooks handle password hashing and data transformation. Static and instance methods provide reusable query patterns. Middleware functions handle authentication token verification, input sanitization, and security header injection.

**Data Layer (MongoDB)**
MongoDB stores application data with schema enforcement through Mongoose. Indexes on frequently queried fields (status, price, bedrooms) optimize query performance. The database connection is managed through a centralized configuration module that handles connection pooling and error recovery.

### API Endpoints

**Authentication**
- POST `/api/auth/register` - Register new landlord account
- POST `/api/auth/login` - Authenticate and receive JWT token
- GET `/api/auth/me` - Get current authenticated user (protected)

**Listings**
- GET `/api/listings` - Get all active listings with optional filters
- GET `/api/listings/my` - Get authenticated landlord's listings (protected)
- GET `/api/listings/:id` - Get single listing by ID
- POST `/api/listings` - Create new listing (protected)
- PUT `/api/listings/:id` - Update listing (protected, ownership required)
- DELETE `/api/listings/:id` - Delete listing (protected, ownership required)
- PUT `/api/listings/:id/toggle-status` - Toggle listing status (protected)

**Health and Monitoring**
- GET `/api/health` - Basic health check
- GET `/api/health/env` - Environment variable status
- GET `/api/health/detailed` - Detailed system health information

**Query Parameters for Listings**
- `page`: Page number for pagination (default: 1)
- `limit`: Results per page (default: 20, max: 50)
- `minPrice`: Minimum monthly rent
- `maxPrice`: Maximum monthly rent
- `bedrooms`: Exact number of bedrooms
- `bathrooms`: Exact number of bathrooms
- `amenities`: Array of amenity values
- `search`: Text search across title, description, and address

### Testing

The application includes comprehensive test coverage for both backend and frontend components.

**Backend Testing**
- Unit tests for Mongoose models validating schema constraints and business logic
- Middleware tests for authentication and input sanitization
- Integration tests for API endpoints using Supertest
- Test database isolation using MongoDB Memory Server
- Coverage thresholds enforced at 100% for critical paths

### Deployment

The application is deployed across multiple cloud services with environment-specific configurations.

**Backend Deployment (Railway)**
- Automatic deployments from GitHub main branch
- Environment variables managed through Railway dashboard
- MongoDB Atlas connection string configured for production
- Health check endpoints monitored for uptime

**Frontend Deployment (Vercel)**
- Automatic deployments on git push
- CDN distribution for global performance
- Environment variables for API endpoint configuration
- Custom domain configuration

**Database (MongoDB Atlas)**
- Managed MongoDB cluster with automated backups
- Connection string authentication
- Network access restrictions
- Monitoring and performance metrics

### Project Structure

```
ucrhousing/
├── backend/
│   ├── config/
│   │   ├── database.js          # MongoDB connection configuration
│   │   ├── cors.js              # CORS policy configuration
│   │   └── environments.js      # Environment-specific settings
│   ├── middleware/
│   │   ├── auth.js              # JWT authentication middleware
│   │   ├── sanitize.js          # Input sanitization middleware
│   │   └── security.js          # Security headers middleware
│   ├── models/
│   │   ├── Landlord.js          # Landlord schema and methods
│   │   └── Listing.js           # Listing schema and methods
│   ├── routes/
│   │   ├── auth.js              # Authentication endpoints
│   │   ├── listings.js           # Listing CRUD endpoints
│   │   └── health.js             # Health check endpoints
│   ├── tests/
│   │   ├── integration/         # API integration tests
│   │   ├── unit/                # Unit tests for models and middleware
│   │   ├── helpers/             # Test utility functions
│   │   └── setup.js             # Test environment configuration
│   ├── index.js                 # Express server entry point
│   └── package.json             # Backend dependencies and scripts
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable React components
│   │   ├── contexts/           # React context providers
│   │   ├── pages/               # Page-level components
│   │   ├── services/            # API service layer
│   │   ├── App.jsx              # Main application component
│   │   └── main.jsx             # Application entry point
│   ├── public/                  # Static assets
│   └── package.json            # Frontend dependencies and scripts
└── README.md                   # Project documentation
```

---

## Battlestar RPG

A terminal-based, turn-based combat game implemented in C++ with a focus on clean architecture and object-oriented design principles. The project demonstrates modular class design, separation of concerns, and systematic application of SOLID principles across a complete game engine.

### Project Overview

Battlestar RPG is a terminal-based, turn-based combat game implemented in C++ with a focus on clean architecture and object-oriented design principles. The project demonstrates modular class design, separation of concerns, and systematic application of SOLID principles across a complete game engine. The architecture centers on a state-driven game loop that manages combat encounters, inventory systems, map navigation, and persistent game state through serialization. The implementation leverages custom data structures including a MaxHeap for turn order determination and multiple sorting algorithms for inventory management, all built on C++17 standards with modern memory management practices using smart pointers.

### Features

- Turn-based combat system with speed-based turn ordering using MaxHeap data structure
- Difficulty scaling system with configurable stat multipliers affecting attack and health modifiers
- Inventory management with dynamic capacity, item stacking, and multiple sorting strategies
- Stat-based progression system tracking health, defense, damage, speed, and experience
- Map and room navigation system with enemy and item distribution
- State machine architecture for game flow management (MainMenu, InGame, GameOver)
- Serialization and deserialization for save/load game functionality
- Polymorphic item system with inheritance hierarchy (Weapon, Armour, Potion)
- Merge sort and insertion sort implementations for inventory organization
- Template-based save/load system with file I/O abstraction

### Tech Stack

- **Language**: C++17
- **Build System**: CMake 3.13+, Make
- **Testing Framework**: GoogleTest
- **Standard Library**: STL containers (vector, unique_ptr, map, string), algorithms, filesystem
- **Development Tools**: Git, VS Code, Terminal

### Architecture

The codebase is organized into distinct class groups that handle specific responsibilities:

**Core Game Engine:**
- `Game`: Central state machine managing game loop, state transitions, and component coordination
- `GameState`: Enum-based state management for MainMenu, InGame, and GameOver states

**Combat System:**
- `Combat`: Manages battle encounters, turn order calculation, and combat resolution
- `Character`: Encapsulates player and enemy entities with stats, equipment, and inventory references
- `MaxHeap`: Custom heap implementation for O(n log n) turn order sorting based on character speed

**Item System:**
- `Item`: Abstract base class defining polymorphic interface for all game items
- `Weapon`, `Armour`, `Potion`: Derived classes implementing specific item behaviors
- `ItemStack`: Wrapper class managing item quantities and ownership via unique_ptr
- `Inventory`: Container class managing item storage with dynamic capacity and sorting capabilities

**Map and Navigation:**
- `Map`: Manages room collection, player position tracking, and spatial state
- `Room`: Encapsulates room-specific data including enemy vectors and item vectors

**Game Configuration:**
- `Difficulty`: Enum-based difficulty system with multiplier calculations for attack and health
- `MainMenu`: Handles user input normalization, menu navigation, and option selection

**Persistence:**
- `SaveGame`: Template-based serialization system writing game state to files
- `LoadGame`: Template-based deserialization system reading game state from files

**Sorting System:**
- `AbstractItemSort`: Base class defining sorting interface following Strategy pattern
- `MergeSort`: O(n log n) merge sort implementation for inventory organization
- `CompareItem`: Comparator utility supporting multiple comparison modes (name, time, type)

### Core Systems

**Combat System**
The combat system implements turn-based battle resolution using a speed-based priority queue. `Combat::startBattle()` initializes a MaxHeap and uses `heapsort()` to order fighters by speed stat. The heap maintains max-heap property where parent nodes have higher speed than children, enabling O(log n) insertion and O(n log n) sorting. Each combat round iterates through the sorted turn order, with enemies automatically targeting the player and the player selecting targets interactively. Attack calculations incorporate equipped weapon damage, character base damage, and difficulty multipliers. Defense reduces incoming damage before health deduction.

**Inventory & Items**
The inventory system uses a vector of `unique_ptr<ItemStack>` to manage item storage with automatic memory management. ItemStack wraps `unique_ptr<Item>` and tracks quantity, enabling stackable items. The Inventory class provides O(n) linear search for item lookup by name, type, or index. Capacity management includes dynamic resizing and percentage-based capacity increases. Sorting operations support multiple strategies: MergeSort provides O(n log n) performance for large inventories, while InsertionSort offers O(n^2) but simpler implementation for smaller collections.

**Movement / Map / Room System**
The map system represents game space as a collection of Room objects stored in a vector within the Map class. Each Room contains vectors of Character* (enemies) and Item* (items), with the map maintaining a playerIndex tracking current room position. Navigation uses directional string input normalized to lowercase, with validation ensuring valid room transitions.

**Difficulty System**
The difficulty system implements a strategy pattern through enum-based configuration. Three difficulty levels (Rookie, Elite, Battlestar) each provide distinct multiplier values via `getAttackMultiplier()` and `getHealthModifier()`. Rookie mode applies 1.5x attack and 1.2x health multipliers favoring the player, while Battlestar mode applies 0.8x multipliers increasing challenge.

### Data Structures

**MaxHeap**
Custom heap implementation using a vector of Character* pointers. The heap maintains max-heap property through `heapifyUp()` and `heapifyDown()` methods, both operating in O(log n) time. `heapsort()` implements the standard heap sort algorithm: first building a max-heap in O(n) time by heapifying from the last parent node, then extracting maximum elements in O(n log n) time.

**STL Usage**
The codebase extensively uses std::vector for dynamic arrays, std::unique_ptr for automatic memory management following RAII principles, std::string for text processing, std::map for key-value lookups in menu systems, and std::filesystem for save file management.

### SOLID Principle Implementation

- **Single Responsibility Principle (SRP)**: Each class encapsulates one well-defined responsibility
- **Open/Closed Principle (OCP)**: The sorting system demonstrates OCP through the AbstractItemSort base class
- **Liskov Substitution Principle (LSP)**: All derived item classes properly implement the Item interface
- **Interface Segregation Principle (ISP)**: The codebase separates concerns into focused interfaces
- **Dependency Inversion Principle (DIP)**: High-level modules depend on abstractions rather than concrete implementations

### Project Structure

```
Battlestar-RPG/
├── CMakeLists.txt          # CMake build configuration
├── LICENSE                  # MIT License
├── README.md               # Project documentation
├── CPP_Files/              # Implementation files
│   ├── armour.cpp
│   ├── character.cpp
│   ├── combat.cpp
│   ├── compare.cpp
│   ├── Difficulty.cpp
│   ├── Game.cpp
│   ├── Heap.cpp
│   ├── inventory.cpp
│   ├── item.cpp
│   ├── itemStack.cpp
│   ├── LoadGame.cpp
│   ├── main.cpp
│   ├── MainMenu.cpp
│   ├── Map.cpp
│   ├── mergeSortItem.cpp
│   ├── potion.cpp
│   ├── Room.cpp
│   ├── SaveGame.cpp
│   └── weapon.cpp
├── header/                 # Header files
│   ├── AttackType.h
│   ├── character.h
│   ├── combat.h
│   ├── compare.h
│   ├── compareBy.h
│   ├── Difficulty.h
│   ├── Game.h
│   ├── GameState.h
│   ├── Heap.h
│   ├── insertionSort.h
│   ├── inventory.h
│   ├── item.h
│   ├── itemStack.h
│   ├── itemType.h
│   ├── LoadGame.h
│   ├── MainMenu.h
│   ├── Map.h
│   ├── mergeSort.h
│   ├── MockGameState.h
│   ├── Room.h
│   ├── SaveGame.h
│   ├── sort.h
│   └── sortorder.h
├── Tests/                  # GoogleTest unit tests
│   ├── CharacterTest.cpp
│   ├── combat_test.cpp
│   ├── DifficultyTests.cpp
│   ├── GameTests.cpp
│   ├── HungryCharacterTest.cpp
│   ├── HungryInventory&ItemTest.cpp
│   ├── HungrySortTest.cpp
│   ├── LoadGameTests.cpp
│   ├── MainMenuTests.cpp
│   ├── SaveGameTests.cpp
│   └── Test-Map.cpp
├── googletest/             # GoogleTest framework
└── bin/                    # Compiled executables (generated)
```

### Testing

The project uses GoogleTest for unit testing with comprehensive test coverage across core systems. Test files cover:
- Combat System: combat_test.cpp validates turn order, attack calculations, and battle state management
- Character System: CharacterTest.cpp and HungryCharacterTest.cpp test stat management, equipment, and item usage
- Inventory & Items: HungryInventory&ItemTest.cpp verifies item storage, retrieval, and stacking behavior
- Sorting Algorithms: HungrySortTest.cpp validates merge sort and insertion sort correctness
- Difficulty System: DifficultyTests.cpp tests multiplier calculations and input normalization
- Map System: Test-Map.cpp verifies room navigation and state management
- Game State: GameTests.cpp tests game loop, state transitions, and initialization
- Persistence: SaveGameTests.cpp and LoadGameTests.cpp validate serialization and deserialization
- Menu System: MainMenuTests.cpp tests input normalization and option selection

---

## Full-Stack Business Platform (Arya Electric)

A production-ready full-stack web application built with Next.js, featuring RESTful API endpoints, third-party service integrations, and automated workflow systems. This platform handles customer inquiries, processes form submissions, and manages communication workflows through email and SMS channels.

### Overview

This application serves as a complete business platform with a focus on backend engineering and API development. The system processes customer quote requests, implements automated follow-up workflows, and integrates with multiple third-party services to streamline business operations. The platform handles dozens of requests per week with high reliability and includes comprehensive error handling and validation.

The architecture separates concerns between client-side React components and server-side API routes, enabling scalable development and maintainable code organization. All server-side logic is implemented through Next.js API routes, providing a unified codebase for both frontend and backend functionality.

### Features

**API Endpoints**
- Quote Submission Handler: Processes customer quote requests with server-side validation, sends email notifications to the business, and triggers SMS confirmations to customers
- SMS Webhook Handler: Receives incoming SMS replies from customers via Twilio, sends email notifications to the business, and provides automated responses
- Automated Follow-up System: Sends scheduled SMS and email follow-ups based on different triggers (24-hour, 48-hour, satisfaction surveys)
- Lead Scoring Algorithm: Analyzes incoming leads and assigns priority scores based on project type, contact methods, urgency indicators, and location data
- Google Reviews Integration: Fetches and caches Google Places API data for displaying customer reviews
- Dynamic OG Image Generation: Generates Open Graph images on-demand for social media sharing

**Third-Party Integrations**
- Nodemailer: SMTP email service for sending business notifications and customer confirmations
- Twilio: SMS messaging service for customer communications and automated follow-ups
- Google Places API: External API integration for fetching business reviews and ratings

**Server-Side Functionality**
- Input validation and sanitization on all API endpoints
- Error handling with appropriate HTTP status codes
- Email template generation with HTML formatting
- SMS message templating with dynamic content
- Response caching for external API calls to reduce costs
- Webhook processing for real-time SMS reply handling

**Automated Workflows**
- Automatic email notifications when quote requests are submitted
- SMS confirmations sent to customers within minutes of form submission
- Automated follow-up messages based on time-based triggers
- Lead scoring that prioritizes high-value inquiries
- Email notifications when customers reply via SMS

### Tech Stack

**Backend**
- Next.js 15.3.4: Framework with App Router for server-side rendering and API routes
- Node.js: Runtime environment for server-side JavaScript execution
- RESTful APIs: Standard HTTP methods (GET, POST) for API endpoint design

**Third-Party Services**
- Nodemailer: Email delivery service using Gmail SMTP
- Twilio: SMS messaging and webhook handling
- Google Places API: External API for business data and reviews
- Vercel Analytics: Website analytics and monitoring
- Vercel Speed Insights: Performance monitoring

**Frontend**
- React 19: Component-based UI library
- Tailwind CSS 4: Utility-first CSS framework for styling
- Radix UI: Accessible UI component primitives
- Lucide React: Icon library

**Development Tools**
- ESLint: Code quality and consistency checking
- Playwright: End-to-end testing framework
- Cheerio: Server-side HTML parsing for verification scripts
- TypeScript: Type checking and development tooling

### Architecture

The application follows a layered architecture pattern:

```
Client Layer (Browser)
    |
    v
Next.js App Router
    |
    +-- Pages (React Components)
    |   +-- Server-Side Rendering
    |   +-- Client-Side Interactivity
    |
    +-- API Routes (Server)
    |   +-- Quote Processing
    |   +-- SMS Webhook Handler
    |   +-- Automated Follow-ups
    |   +-- Lead Scoring
    |   +-- External API Integration
    |
    v
External Services
    +-- Email Service (SMTP)
    +-- SMS Service (Twilio API)
    +-- Google Places API
```

### API Endpoints

**POST /api/quote**
Processes customer quote request submissions.

Request Body:
```json
{
  "name": "string (required)",
  "phone": "string (optional)",
  "email": "string (optional)",
  "project": "string (required)"
}
```

Validation:
- Requires name and project description
- Requires at least one contact method (phone or email)
- Returns 400 status for invalid input

Functionality:
- Sends email notification to business with formatted HTML template
- Sends SMS confirmation to customer if phone provided
- Sends email confirmation to customer if email provided
- Returns success response with appropriate message

**POST /api/sms-webhook**
Handles incoming SMS replies from customers via Twilio webhook.

Functionality:
- Sends email notification to business about customer reply
- Sends automated response to customer
- Handles unsubscribe requests (STOP, UNSUBSCRIBE keywords)
- Returns TwiML XML response for Twilio

**POST /api/automated-followup**
Sends automated follow-up messages to customers.

Request Body:
```json
{
  "phone": "string (required)",
  "name": "string (required)",
  "project": "string (optional)",
  "type": "string (24hour|48hour|satisfaction)"
}
```

Functionality:
- Sends SMS follow-up based on type parameter
- Sends email notification to business about follow-up sent
- Supports multiple follow-up types with different message templates

**POST /api/lead-scoring**
Analyzes and scores incoming leads for prioritization.

Request Body:
```json
{
  "project": "string",
  "phone": "string (optional)",
  "email": "string (optional)",
  "location": "string (optional)"
}
```

Response:
```json
{
  "success": true,
  "leadScore": {
    "score": 65,
    "priority": "High",
    "reasons": ["High-value project type", "Both phone and email provided"],
    "estimatedValue": "$2,000 - $8,000"
  },
  "recommendations": {
    "responseTime": "Within 2 hours",
    "followUp": "Call immediately",
    "notes": "Estimated project value: $2,000 - $8,000"
  }
}
```

Scoring Algorithm:
- Project type analysis (high-value, medium-value, standard)
- Contact method scoring (both methods preferred)
- Urgency keyword detection
- Location-based scoring
- Commercial project detection

**GET /api/google-reviews**
Fetches Google Places reviews with caching.

Query Parameters:
- `placeId`: Google Place ID (required)
- `maxReviews`: Maximum number of reviews to return (default: 5)

Functionality:
- Fetches data from Google Places API
- Implements response caching (1 hour)
- Returns formatted review data

**GET /api/og**
Generates dynamic Open Graph images for social media sharing.

Query Parameters:
- `title`: Image title text
- `subtitle`: Image subtitle text
- `image`: Optional background image URL

Functionality:
- Generates 1200x630px images using Next.js ImageResponse
- Returns PNG image data
- Includes fallback error handling

### Testing

The project includes verification scripts for quality assurance:
- `verify.js`: Checks phone number consistency, CTA consistency, H1 tags, image optimization, and schema markup across all pages
- `verify-phase2.js`: Comprehensive testing including accessibility checks, performance validation, and UI component verification
- `check-tap-targets.js`: Validates mobile tap target sizes meet WCAG guidelines
- `test-gmail.js`: Tests Nodemailer email configuration and delivery
- `test-twilio.js`: Tests Twilio SMS functionality and API connectivity

### Deployment

The application is deployed on Vercel, which provides:
- Automatic deployments from Git repository
- Environment variable management
- Edge network for global performance
- Built-in analytics and monitoring
- Serverless function execution for API routes

### Environment Variables

Required environment variables for production:
- `GMAIL_USER`: Gmail account for email sending
- `GMAIL_APP_PASSWORD`: Gmail app-specific password
- `TWILIO_ACCOUNT_SID`: Twilio account identifier
- `TWILIO_AUTH_TOKEN`: Twilio authentication token
- `TWILIO_PHONE_NUMBER`: Twilio phone number for SMS
- `GOOGLE_PLACES_API_KEY`: Google Places API key

### Project Structure

```
aryaelectric/
├── app/
│   ├── api/                 # API route handlers
│   │   ├── quote/           # Quote submission endpoint
│   │   ├── sms-webhook/      # SMS webhook handler
│   │   ├── automated-followup/ # Follow-up automation
│   │   ├── lead-scoring/     # Lead scoring algorithm
│   │   ├── google-reviews/   # Google Places integration
│   │   └── og/               # OG image generation
│   ├── page.jsx              # Homepage
│   ├── layout.jsx            # Root layout
│   └── [other pages]/        # Additional pages
├── components/               # React components
├── lib/                      # Utility functions
│   ├── utils.js             # Helper functions
│   ├── constants.js         # Application constants
│   └── seo.js               # SEO utilities
├── scripts/                  # Verification and testing scripts
├── public/                   # Static assets
└── styles/                   # Global CSS
```

### Key Implementation Details

**Error Handling**
All API routes implement comprehensive error handling:
- Try-catch blocks around all async operations
- Appropriate HTTP status codes (400 for client errors, 500 for server errors)
- Error logging for debugging
- Graceful degradation when external services fail

**Input Validation**
Server-side validation ensures data integrity:
- Required field checking
- Contact method validation (at least one required)
- Input sanitization to prevent injection attacks
- Type checking for request body parameters

**External Service Integration**
The application integrates with multiple external services:
- Nodemailer configured with Gmail SMTP for reliable email delivery
- Twilio API for SMS messaging with webhook support
- Google Places API with response caching to reduce API costs
- Error handling ensures the application continues functioning if external services are unavailable

**Automated Workflows**
The system includes several automated workflows:
- Quote submissions trigger immediate email notifications
- SMS confirmations sent automatically when phone numbers provided
- Follow-up messages can be triggered programmatically based on business logic
- Lead scoring provides automated prioritization recommendations

### Metrics

The platform handles production traffic with the following characteristics:
- Processes dozens of quote requests per week
- Maintains high reliability with error handling and fallback mechanisms
- Automated workflows reduce manual processing time by approximately 50%
- API response times under 500ms for most endpoints
- External API calls cached to reduce costs and improve performance

