import React from 'react';

const Projects = ({ onProjectClick }) => {
  const projects = [
    {
      id: 'pokestop',
      title: 'PokéStop',
      description: 'Microservices-based Pokémon trainer platform demonstrating service decomposition, API gateway patterns, containerized deployment, and multi-database persistence.',
      tech: 'Node.js, Python/Flask, MySQL, MongoDB, Docker, NGINX',
      highlights: 'Microservices architecture, Multi-database system, Container orchestration',
      image: 'https://via.placeholder.com/400x200/4a90e2/ffffff?text=PokeStop',
      fullDescription: 'PokéStop is a microservices-based Pokémon trainer platform where users can register, explore the Pokédex, encounter and catch Pokémon via a mini-game, manage a personal collection, and build battle teams. The project is designed as an educational cloud-native system to demonstrate service decomposition, API gateway patterns, containerized deployment, and the use of multiple databases in a realistic web stack.',
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
          title: 'Architecture and Service Design',
          content: `At a high level, the system is composed of a client layer (HTML/CSS/vanilla JS), an NGINX API gateway, six microservices, and two databases (MySQL 8.0 and MongoDB 7.0), all running in Docker containers on a shared bridge network. The gateway exposes clean public routes, forwards requests to the correct internal service based on path, and also serves the static frontend assets.

The microservices layer is split into:

• Authentication Service (Node.js/Express, MySQL): Handles registration and login, hashes passwords using bcrypt, and issues short-lived JWTs used across the platform.

• User Service (Node.js/Express + GraphQL, MySQL): Manages trainer metadata and exposes both REST and a GraphQL endpoint (/users/graphql) for flexible querying and updates.

• Team Service (Node.js/Express, MySQL): Manages team definitions per user, enforcing ownership and a maximum of six Pokémon per team.

• Pokédex Service (Node.js/Express, MySQL): Provides Pokémon reference data and search endpoints backing the Pokédex views and internal game logic.

• Collection Service (Python/Flask, MongoDB): Stores each caught Pokémon as a MongoDB document, including species, level, stats, and optional nickname.

• Encounter Service (Node.js/Express, MySQL): Implements spawn logic, mini-game scoring, and catch resolution before delegating to the Collection service to persist new Pokémon.

The data layer uses MySQL schemas for users, teams, encounters, and Pokédex data, while MongoDB is dedicated to flexible Pokémon instance documents linked back to relational user and species records.`
        },
        {
          title: 'Request Flow and Service Communication',
          content: `All client traffic goes through the API gateway, which terminates HTTP requests and routes them to the appropriate backend service under /auth, /users, /teams, /pokedex, /collections, and /encounters paths. JWTs issued by the Auth service are attached by the frontend in the Authorization: Bearer <token> header and validated by downstream services to protect user-specific routes.

A typical end-to-end flow:

• Login: The browser sends credentials to /auth/login; NGINX forwards to the Auth service, which verifies the user against MySQL and returns a signed JWT.

• Start Encounter: The client calls /encounters/wild with the JWT; the Encounter service fetches a random species from the Pokédex service, records an encounter in MySQL, and returns encounter details to the user.

• Catch Pokémon: After the mini-game runs client-side, the score is posted to /encounters/:id/catch; the Encounter service computes catch probability and, on success, calls the Collection service to store a new Pokémon document in MongoDB after validating the species with the Pokédex service.

This pattern shows both client-to-service traffic through the gateway and internal service-to-service HTTP calls, while keeping databases private and only accessible from the respective containers.`
        },
        {
          title: 'Frontend and API Surface',
          content: `The frontend is implemented in static HTML/CSS with vanilla JavaScript, focusing on clean UI flows and simple state handling in the browser. Pages include registration and login, a "Catch Pokémon" mini-game view, collection (PC Box), team builder, and Pokédex browser, all wired to the gateway endpoints via the Fetch API.

Key public endpoints exposed through the gateway:

• POST /auth/register, POST /auth/login for authentication and JWT issuance.

• POST /users/graphql for user queries and mutations using GraphQL.

• GET/POST /teams/user/:userId to retrieve and update team compositions.

• POST /encounters and POST /encounters/catch for spawning and resolving encounters.

• GET /collection/user/:userId, POST /collection to fetch and add Pokémon instances.

• GET /pokedex, GET /pokedex/:id for species data used across the UI and services.

I documented these APIs using Swagger/OpenAPI and Postman collections, which made manual testing and debugging across services significantly easier.`
        },
        {
          title: 'Data Model and Persistence',
          content: `The relational schema models users, teams, encounters, and Pokémon species, while MongoDB handles the life-cycle of individual Pokémon instances owned by users. Core relationships include users owning teams and Pokémon instances, species appearing in encounters, and Pokémon instances being assigned to teams through a join table.

This hybrid design was deliberate:

• MySQL is used where strong relationships and constraints matter (e.g., ensuring teams and encounters refer to valid users and species).

• MongoDB stores evolving Pokémon instances as documents, which simplifies extending the model with additional attributes like nicknames or evolution history without costly schema migrations.`
        },
        {
          title: 'Deployment, Operations, and Security',
          content: `All services, databases, and the gateway run as containers orchestrated by Docker Compose, with support for running as a Docker Swarm stack for simple horizontal scaling. The containers share a dedicated bridge network (pokestop-network) and use named volumes for MySQL and MongoDB so that data persists across restarts.

Operational decisions:

• Configuration and secrets are managed via .env files passed into containers, keeping credentials and JWT secrets out of the codebase.

• Health checks are implemented as lightweight /health endpoints per service and driven by shell/PowerShell scripts to quickly verify the status of the whole stack.

• Security includes JWT-based authentication between the client and services, bcrypt password hashing, strict path-based routing at the gateway, and network isolation between internal services and the outside world.`
        },
        {
          title: 'Engineering Focus, Trade-offs, and Future Work',
          content: `The project intentionally targets a realistic but local-friendly architecture: a single Docker host, one instance per service, and simple HTTP communication without additional infrastructure like message queues or Kubernetes. This constraint let me focus on getting the service boundaries, routing, persistence, and security model correct rather than fighting complex cluster tooling.

I'd next like to evolve the system with:

• Horizontal scaling of services and databases, HA setups (MySQL replication, MongoDB replica sets), and multiple NGINX instances for redundancy.

• Introducing asynchronous messaging for non-critical operations (e.g., emitting events when a Pokémon is caught) to decouple the Encounter and Collection services.

• Hardening production concerns such as rate limiting, service-to-service authentication, CI/CD pipelines, automated tests, and eventually a Kubernetes deployment.

Overall, the project demonstrates practical experience with microservices architecture, HTTP and GraphQL APIs, polyglot services (Node.js + Python), multi-database persistence, and container-based deployment using Docker and NGINX as an API gateway.`
        }
      ]
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
          <img 
            src={project.image} 
            alt={project.title}
            style={{ 
              width: '100%', 
              height: '120px', 
              objectFit: 'cover',
              marginBottom: '8px',
              border: '1px solid #ccc'
            }}
          />
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
