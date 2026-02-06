import React from 'react';
import pokestopImage from '../../img/pokestop.jpeg';

const Projects = ({ onProjectClick }) => {
  const projects = [
    {
      id: 'pokestop',
      title: 'PokéStop',
      description: 'Microservices-based Pokémon trainer platform demonstrating service decomposition, API gateway patterns, containerized deployment, and multi-database persistence.',
      tech: 'Node.js, Python/Flask, MySQL, MongoDB, Docker, NGINX',
      highlights: 'Microservices architecture, Multi-database system, Container orchestration',
      image: pokestopImage,
      fullDescription: 'PokéStop is a microservices‑based online Pokémon trainer platform where users register as trainers, explore the Pokédex, encounter and catch Pokémon through a mini‑game, manage a personal collection, and build teams of up to six Pokémon. The goal of the project was to practice modern cloud‑native architecture end‑to‑end: API gateway patterns, independently deployable services, REST and GraphQL APIs, containerized infrastructure, and multi‑database persistence.',
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
            { placeholder: true, caption: 'Landing page / main dashboard' }
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
            { placeholder: true, caption: 'High‑level microservices architecture diagram' }
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
            { placeholder: true, caption: 'Auth pages (register/login)' },
            { placeholder: true, caption: 'Encounter mini‑game flow' },
            { placeholder: true, caption: 'Collection page (PC Box)' },
            { placeholder: true, caption: 'Pokédex grid + details modal' },
            { placeholder: true, caption: 'Team builder' }
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
            { placeholder: true, caption: 'Swagger UI for one or two services' },
            { placeholder: true, caption: 'Sequence diagram – encounter and capture flow' }
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
            { placeholder: true, caption: 'Deployment view (Docker / networks / databases)' },
            { placeholder: true, caption: 'Example health check or Docker Compose stack running' }
          ]
        }
      ],
      duration: '3 months',
      status: 'Completed',
      links: {
        github: '#'
      }
    },
    {
      id: 'voltzy',
      title: 'Voltzy',
      description: 'Energy management platform with real-time monitoring, analytics dashboard, and data visualization for tracking energy consumption patterns.',
      tech: 'React, Node.js, Express, MongoDB, API Integration',
      highlights: 'Real-time monitoring, Data analytics, Dashboard UI',
      image: 'https://via.placeholder.com/400x200/34c759/ffffff?text=Voltzy',
      fullDescription: 'Voltzy is a modern energy management platform designed to help users monitor and optimize their energy consumption. The application features real-time data monitoring, comprehensive analytics, and interactive visualizations to provide insights into energy usage patterns.',
      features: [
        'Real-time energy consumption monitoring',
        'Interactive dashboard with customizable widgets',
        'Historical data analysis and trend visualization',
        'Energy usage alerts and notifications',
        'Multi-device support and data synchronization',
        'Export reports in multiple formats (PDF, CSV)'
      ],
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Chart.js', 'Socket.io', 'REST API'],
      responsibilities: [
        'Developed full-stack application using MERN stack',
        'Designed and implemented RESTful API endpoints',
        'Created real-time data visualization dashboard',
        'Implemented WebSocket connections for live updates',
        'Designed MongoDB database schema for efficient data storage',
        'Integrated third-party APIs for energy data collection'
      ],
      challenges: [
        {
          problem: 'Displaying large amounts of real-time data without performance degradation',
          solution: 'Implemented data aggregation on the backend and optimized chart rendering with virtualization'
        },
        {
          problem: 'Ensuring data consistency across multiple connected clients',
          solution: 'Used Socket.io for real-time updates and implemented optimistic UI updates with rollback mechanisms'
        }
      ],
      duration: '4 months',
      status: 'Completed',
      links: {
        github: '#',
        live: '#'
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
        github: '#'
      }
    }
  ];

  return (
    <div style={{ fontFamily: 'Tahoma, sans-serif', fontSize: '12px' }}>
      <h2 style={{ color: '#0053ee', marginTop: 0 }}>My Projects</h2>
      <p>Click on any project to view detailed information:</p>
      
      {projects.map((project, index) => (
        <div 
          key={index} 
          onClick={() => onProjectClick && onProjectClick(project)}
          style={{ 
            marginBottom: '16px', 
            padding: '10px', 
            border: '1px solid #ccc',
            background: '#f9f9f9',
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#e8eef7'}
          onMouseLeave={(e) => e.currentTarget.style.background = '#f9f9f9'}
        >
          <div style={{ background: '#fff', padding: '10px', marginBottom: '8px', textAlign: 'center' }}>
            <img 
              src={project.image} 
              alt={project.title}
              style={{ 
                width: '70%', 
                height: 'auto', 
                maxHeight: '150px',
                objectFit: 'contain',
                border: '1px solid #ccc'
              }}
            />
          </div>
          <h3 style={{ color: '#0053ee', margin: '0 0 8px 0' }}>{project.title}</h3>
          <p style={{ margin: '0 0 8px 0' }}>{project.description}</p>
          <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#666' }}>
            <strong>Technologies:</strong> {project.tech}
          </p>
          <p style={{ margin: 0, fontSize: '11px', color: '#0053ee' }}>
            <strong>Key Features:</strong> {project.highlights}
          </p>
          <p style={{ margin: '8px 0 0 0', fontSize: '11px', fontStyle: 'italic', color: '#0053ee' }}>
            Click to view details →
          </p>
        </div>
      ))}
    </div>
  );
};

export default Projects;
