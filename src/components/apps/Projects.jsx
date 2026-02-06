import React, { memo, useMemo } from 'react';
import pokestopImage from '../../img/pokestop.jpeg';
import styles from './Projects.module.css';
// PokéStop images
import landingPageImg from '../../img/pokestop/landingpage.jpeg';
import microservicesArchImg from '../../img/pokestop/microservices-architecture.jpeg';
import dockerArchImg from '../../img/pokestop/docker-architecture.jpeg';
import serviceDepsImg from '../../img/pokestop/service-dependencies.jpeg';
import catchFluxSeqImg from '../../img/pokestop/catch-flux-sequence.png';
import catchFlux1Img from '../../img/pokestop/catchflux1.jpeg';
import catchFlux2Img from '../../img/pokestop/catchflux2.jpeg';
import catchFlux3Img from '../../img/pokestop/catchflux3.jpeg';
// Voltzy images
import voltzyImage from '../../img/voltzy/voltzy cover.jfif';
import voltzyLoginImg from '../../img/voltzy/LoginScreen.jpeg';
import voltzySigninImg from '../../img/voltzy/signinscreen.jpeg';
import voltzyDashboardImg from '../../img/voltzy/dashboardscreen.jpeg';
import voltzyConsumption1Img from '../../img/voltzy/consumptionscreen1.jpeg';
import voltzyConsumption2Img from '../../img/voltzy/consumptionscreen2.jpeg';
import voltzyNavImg from '../../img/voltzy/smart_home_app_nav.png';
import voltzyArchImg from '../../img/voltzy/smart_home_architecture.png';

const Projects = memo(({ onProjectClick }) => {
  const projects = useMemo(() => [
    {
      id: 'pokestop',
      title: 'PokéStop',
      description: 'Microservices-based Pokémon trainer platform demonstrating service decomposition, API gateway patterns, containerized deployment, and multi-database persistence.',
      tech: 'Node.js, Python/Flask, MySQL, MongoDB, Docker, NGINX',
      highlights: 'Microservices architecture, Multi-database system, Container orchestration',
      image: pokestopImage,
      technologies: [
        'Node.js',
        'Express.js',
        'Python',
        'Flask',
        'GraphQL',
        'MySQL 8.0',
        'MongoDB 7.0',
        'Docker',
        'Docker Compose',
        'Docker Swarm',
        'NGINX',
        'JWT',
        'bcrypt',
        'Swagger/OpenAPI',
        'Postman'
      ],
      sections: [
        {
          title: 'Project Overview',
          content: `PokéStop is a microservices‑based online Pokémon trainer platform where users register as trainers, explore the Pokédex, encounter and catch Pokémon through a mini‑game, manage a personal collection, and build teams of up to six Pokémon. The goal of the project was to practice modern cloud‑native architecture end‑to‑end: API gateway patterns, independently deployable services, REST and GraphQL APIs, containerized infrastructure, and multi‑database persistence.`,
          images: [
            { src: landingPageImg, caption: 'Landing page / main dashboard' }
          ]
        },
        {
          title: 'Architecture and Technologies',
          content: `The system is built as a set of seven services behind an NGINX API gateway, all orchestrated with Docker Compose and designed to run locally or on Docker Swarm replicas. The stack combines Node.js/Express and Python/Flask microservices with MySQL 8.0 for relational data and MongoDB 7.0 for document‑oriented Pokémon collections.

API Gateway (NGINX): Central entry point on port 80, handling static file hosting for the frontend and path‑based routing to downstream services under /api/*.

Authentication Service: Node.js/Express with MySQL, responsible for registration, login, bcrypt password hashing, and issuing short‑lived JWTs signed via environment‑configured secrets.

User Service (GraphQL): Node.js/Express with a GraphQL endpoint at /api/users/graphql to query and mutate trainer metadata, enforcing JWT‑based authorization on protected resolvers.

Team Service: Node.js/Express REST API that manages teams per user, enforcing ownership and a hard limit of six Pokémon per team.

Pokédex Service: Node.js/Express REST API backing the Pokédex UI with species identifiers, names, and other metadata stored in MySQL.

Collection Service: Python/Flask service backed by MongoDB, storing each caught Pokémon as a document with species references and optional nicknames.

Encounter Service: Node.js/Express service that models location‑based spawns, mini‑game scoring, and catch resolution before creating new collection entries.`,
          images: [
            { src: microservicesArchImg, caption: 'High‑level microservices architecture diagram' },
            { src: serviceDepsImg, caption: 'Service dependencies and data flow' }
          ]
        },
        {
          title: 'Frontend Experience',
          content: `The frontend is a static HTML5/CSS3/JavaScript application served directly by the API gateway on http://localhost, with dedicated pages for registration, login, encounters, collections, teams, and the Pokédex. The client communicates with backend services exclusively through the gateway using the Fetch API, attaching a Bearer JWT in the Authorization header for authenticated routes.

Key flows I implemented and wired to the APIs:

Registration and Login: Forms post to /api/auth/register and /api/auth/login, handling validation errors and storing the returned JWT client‑side.

Pokémon Encounters: The "Find Wild Pokémon" action triggers POST /api/encounters, then opens the mini‑game; once the capture bar resolves, the client posts the score to /api/encounters/catch to determine success.

Collection Management: The collection page calls GET /api/collection/user/:userId to display the user's PC Box and POST /api/collection to add new captures.

Team Builder: Uses GET /api/teams/user/:userId and POST /api/teams/user/:userId to persist team compositions, validating that all members exist in the user's collection.

Pokédex Browser: Fetches paginated or filtered lists from GET /api/pokedex and detailed information from GET /api/pokedex/:id.`,
          images: [
            { src: catchFlux1Img, caption: 'CatchFlux encounter flow - Step 1' },
            { src: catchFlux2Img, caption: 'CatchFlux encounter flow - Step 2' },
            { src: catchFlux3Img, caption: 'CatchFlux encounter flow - Step 3' }
          ]
        },
        {
          title: 'Backend Design and APIs',
          content: `Each microservice exposes a focused API surface, documented via Swagger/OpenAPI and Postman collections for manual and automated testing. The gateway exposes a clean public API while keeping service‑to‑service traffic isolated on a private Docker network for security.

Representative endpoints:

Auth: POST /api/auth/register, POST /api/auth/login returning JWTs on success.

Users (GraphQL): POST /api/users/graphql for queries such as getUserById and mutations like updateUser.

Teams: GET /api/teams/user/:userId, POST /api/teams/user/:userId with JSON team definitions and server‑side validation of ownership and team size.

Encounters: POST /api/encounters to spawn encounters based on client‑provided latitude/longitude, and POST /api/encounters/catch to resolve the mini‑game outcome into a catch probability.

Collection: GET /api/collection/user/:userId, POST /api/collection to persist new Pokémon instances in MongoDB.

Pokédex: GET /api/pokedex, GET /api/pokedex/:id for species data used across the UI and backend logic.`,
          images: [
            { src: catchFluxSeqImg, caption: 'Sequence diagram – encounter and capture flow' }
          ]
        },
        {
          title: 'Data, Deployment, and Operations',
          content: `Relational data for users, teams, encounters, and Pokédex entries is stored in MySQL 8.0, while each trainer's collection lives in MongoDB 7.0 for flexible document‑oriented queries. Initialization scripts in the database-schemas directory define schemas and seed data, ensuring the system can be brought up reproducibly on any environment.

Operational aspects:

Containerization: All services, databases, and the NGINX gateway are defined in a single docker-compose.yml, with support for scaling via Docker Swarm replicas.

Configuration & Secrets: Environment variables (.env) provide database credentials and JWT secrets, keeping sensitive values out of the source code.

Health & Monitoring: Dedicated /health endpoints and shell/PowerShell health‑check scripts verify service availability and are used for quick diagnostics during development.

Security: The platform uses JWT authentication end‑to‑end, bcrypt password hashing, input validation on API boundaries, and network isolation for internal services on a private Docker network.`,
          images: [
            { src: dockerArchImg, caption: 'Deployment view (Docker / networks / databases)' }
          ]
        }
      ],
      duration: '3 months',
      status: 'Completed',
      links: {
        github: 'https://github.com/DuartePortfolio/PokeStop'
      }
    },
    {
      id: 'voltzy',
      title: 'Voltzy',
      description: 'Cross-platform mobile energy management system with real-time smart home control, solar panel monitoring, and comprehensive analytics for sustainable energy consumption.',
      tech: 'React Native, TypeScript, Expo, Node.js, MySQL',
      highlights: 'Smart home automation, Solar integration, Mobile-first design',
      image: voltzyImage,
      technologies: [
        'React Native',
        'TypeScript',
        'Expo SDK',
        'Node.js',
        'Express.js',
        'MySQL 8.0',
        'JWT',
        'bcryptjs',
        'React Navigation',
        'react-native-svg',
        'AsyncStorage',
        'REST API'
      ],
      sections: [
        {
          title: 'Project Overview',
          content: `Voltzy is a comprehensive smart energy management mobile application that helps homeowners monitor and control their energy consumption in real-time. Built with React Native and Expo, Voltzy provides an intuitive interface for managing smart home lighting, tracking energy usage patterns, monitoring solar panel production, and automating routines to optimize energy efficiency.

The application supports multi-house management, allowing users to manage multiple properties from a single account, switch seamlessly between different houses, and track energy consumption per property. With features ranging from individual light control to sophisticated energy analytics and automation routines, Voltzy provides a complete solution for modern energy management.`,
          images: [
            { src: voltzySigninImg, caption: 'Sign in screen', type: 'screenshot' },
            { src: voltzyLoginImg, caption: 'Welcome screen and authentication flow', type: 'screenshot' },
            { src: voltzyDashboardImg, caption: 'Dashboard overview with energy statistics', type: 'screenshot' }
          ]
        },
        {
          title: 'Key Features & User Experience',
          content: `Smart Lighting Control: Room-based organization allows users to organize lights by rooms (Living Room, Kitchen, Bedroom, etc.) with individual light control to toggle on/off, adjust brightness (0-100%), and change colors. The system provides real-time updates with instant synchronization across devices, energy monitoring to track power consumption per light and room, and detailed light statistics including wattage, status, and consumption.

Comprehensive Energy Analytics: The dashboard provides current consumption (kWh), today's total consumption, energy saved tracking, number of active lights, and hourly consumption sparkline charts. The detailed analytics screen includes a 24-hour hourly consumption graph with total kWh, room consumption insights with progress bars showing consumption by room and active light counts, and real-time solar energy production vs consumption graphs.

Advanced Visualization: Load and production curves display three-line graphs showing consumption curve (blue), production curve (yellow), and net energy flow (purple). A consumption heatmap provides a 7-day × 11-hour matrix showing usage patterns from 6 AM to 4 PM. Solar panel metrics include self-sufficiency percentage, panel efficiency percentage, and visual circular progress indicators.

Smart Routines & Automation: Users can create custom routines to automate light control based on time of day, day of week schedules, and energy consumption triggers. The system provides routine management to view, edit, enable/disable, and delete routines, along with active routine tracking to see which routines are currently running.`,
          images: [
            { src: voltzyConsumption1Img, caption: 'Analytics dashboard with consumption graphs and solar production', type: 'screenshot' },
            { src: voltzyConsumption2Img, caption: 'Energy consumption analytics with detailed breakdowns', type: 'screenshot' }
          ]
        },
        {
          title: 'Architecture and Technologies',
          content: `The application follows a modern mobile-first architecture with a React Native frontend and Node.js backend, communicating through a RESTful API with JWT authentication.

Frontend Architecture: Built on React Native (v0.71.14) with TypeScript (v4.9.4) for type-safe development and Expo SDK (v48.0.0) for development and build tooling. React Navigation (v6) provides navigation with Stack Navigator for authentication flow and Bottom Tab Navigator for main app navigation. The UI leverages react-native-svg (v13.4.0) for dynamic charts and visualizations, expo-linear-gradient (v12.1.2) for gradient backgrounds, and AsyncStorage for local data persistence.

Backend Architecture: Node.js with Express.js powers the RESTful API server, using MySQL (v8.0+) as the relational database with mysql2 client for promise support. Security is handled through JWT (jsonwebtoken) for authentication, bcryptjs for password hashing, and CORS for cross-origin resource sharing. Environment configuration is managed via dotenv.

Component Organization: The frontend is organized into reusable components (AddRoomModal, AddRoutineModal), React Context providers for global state management (user, houses, auth), navigation configuration with BottomTabNavigator, comprehensive screens for all features (Welcome, Login, Dashboard, Consumption Analytics, Room Management, Light Control, Routines), and a service layer for API communication (energyService, housesService, lightsService, routinesService).`,
          images: [
            { src: voltzyNavImg, caption: 'Navigation flow and screen structure', type: 'diagram' },
            { src: voltzyArchImg, caption: 'Mobile app architecture diagram', type: 'diagram' }
          ]
        },
        {
          title: 'Database Design',
          content: `The application uses MySQL with a well-structured relational schema designed for scalability and data integrity.

Core Tables: The users table stores user accounts with id, name, email, password_hash, and profile_picture_url. The houses table manages user properties including id, user_id, name, address, has_upac (solar panel integration), and upac_power_kw. The lights table contains smart light devices with id, house_id, room_name, name, brightness, color, is_on, and power_consumption_watts.

Automation & Analytics: The routines table handles automation schedules with id, house_id, name, start_time, end_time, days_of_week, and is_active fields. The routine_lights table creates associations between routines and lights. Energy tracking tables include current_energy_stats for real-time metrics per house, hourly_consumption for 24-hour chart data, energy_measurements for detailed import/export tracking, and rooms for room definitions per house.

API Endpoints: Authentication endpoints include POST /auth/signup for account creation and POST /auth/signin for login. House management provides GET/POST /api/houses for house operations and room management endpoints. Light control offers comprehensive CRUD operations for lights filtered by house and room. Energy endpoints deliver current stats, hourly consumption, room breakdowns, solar production data, load curves, consumption heatmaps, and solar metrics. Routine management provides full CRUD operations for automation schedules.`
        },
        {
          title: 'Development & Deployment',
          content: `The project supports multiple testing and deployment scenarios with comprehensive configuration options for web, Android emulator, physical devices, and iOS platforms.

Development Setup: Backend server runs on Node.js with Express, configured via environment variables for database connection (DB_HOST, DB_PORT, DB_USER, DB_PASS), server configuration (PORT), and JWT secrets. The database includes migration scripts (migrations.sql) and test data (test-data.sql, energy-data.sql) for quick setup with sample users, houses, lights, routines, and 24 hours of energy consumption data.

Platform Support: Web testing uses Expo Web with hot-reloading at localhost:19006. Android testing supports both emulator (using http://10.0.2.2:3000) and physical devices (using local network IP). iOS testing works on macOS with Xcode and iOS Simulator. The application can be built as standalone APK using EAS CLI for distribution.

API Configuration: The frontend API configuration (src/backend/config.ts) adapts BASE_URL for different platforms - localhost:3000 for web and iOS simulator, 10.0.2.2:3000 for Android emulator, and local network IP for physical devices. All API endpoints except authentication require JWT authentication via Bearer token in the Authorization header.

Security Features: The system implements secure user registration with JWT-based authentication, password hashing with bcrypt, persistent login sessions, and profile management. The JWT tokens have a 7-day expiration and use environment-configured secrets for signing.`
        }
      ],
      duration: '4 months',
      status: 'Completed',
      links: {
        github: 'https://github.com/DuartePortfolio/NewVoltzy'
      }
    },
    {
      id: 'busapi',
      title: 'bus-api',
      description: 'RESTful API service providing real-time bus tracking, route information, and schedule management for public transportation systems.',
      tech: 'Node.js, Express, REST API, MySQL',
      highlights: 'Real-time tracking, Route optimization, API design',
      image: 'https://via.placeholder.com/400x200/ff9500/ffffff?text=Bus+API',
      fullDescription: 'bus-api is a comprehensive RESTful API service built to provide real-time public transportation data. It offers endpoints for bus tracking, route information, schedule management, and arrival predictions, making it easy for developers to integrate transit data into their applications.',
      features: [
        'Real-time bus location tracking',
        'Route and schedule information endpoints',
        'Arrival time predictions based on traffic data',
        'Stop and station information management',
        'API rate limiting and authentication',
        'Comprehensive API documentation with Swagger'
      ],
      technologies: ['Node.js', 'Express.js', 'MySQL', 'REST API', 'JWT', 'Swagger', 'Docker'],
      responsibilities: [
        'Designed and developed RESTful API architecture',
        'Implemented database schema and relationships in MySQL',
        'Created authentication and authorization middleware',
        'Developed real-time data processing algorithms',
        'Wrote comprehensive API documentation',
        'Implemented rate limiting and security measures',
        'Set up CI/CD pipeline for automated testing and deployment'
      ],
      challenges: [
        {
          problem: 'Processing and serving real-time location data efficiently',
          solution: 'Implemented caching strategies with Redis and optimized database queries with proper indexing'
        },
        {
          problem: 'Calculating accurate arrival time predictions',
          solution: 'Developed algorithm combining historical data, current traffic conditions, and real-time bus positions'
        }
      ],
      duration: '3 months',
      status: 'Completed',
      links: {
        github: 'https://github.com/DuartePortfolio/PokeStop'
      }
    }
  ], []);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>My Projects</h2>
      <p>Click on any project to view detailed information:</p>
      
      {projects.map((project, index) => (
        <div 
          key={index} 
          onClick={() => onProjectClick && onProjectClick(project)}
          className={styles.projectCard}
        >
          <div className={styles.imageContainer}>
            <img 
              src={project.image} 
              alt={project.title}
              className={project.id === 'voltzy' ? styles.voltzyImage : styles.projectImage}
            />
          </div>
          <h3 className={styles.projectTitle}>{project.title}</h3>
          <p className={styles.description}>{project.description}</p>
          <p className={styles.techInfo}>
            <strong>Technologies:</strong> {project.tech}
          </p>
          <p className={styles.highlights}>
            <strong>Key Features:</strong> {project.highlights}
          </p>
          <p className={styles.viewDetails}>
            Click to view details →
          </p>
        </div>
      ))}
    </div>
  );
});

Projects.displayName = 'Projects';

export default Projects;
