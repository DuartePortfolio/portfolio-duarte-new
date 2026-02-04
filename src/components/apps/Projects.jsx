import React from 'react';

const Projects = ({ onProjectClick }) => {
  const projects = [
    {
      id: 'pokestop',
      title: 'PokeStop',
      description: 'Interactive Pokémon-themed web application featuring real-time gameplay mechanics, user authentication, and dynamic content management.',
      tech: 'React, JavaScript, CSS, RESTful API',
      highlights: 'Real-time features, Interactive UI, Game mechanics',
      image: 'https://via.placeholder.com/400x200/4a90e2/ffffff?text=PokeStop',
      fullDescription: 'PokeStop is a comprehensive web application that brings the Pokémon experience to the browser. Built with React, it features real-time gameplay mechanics, user authentication, and a dynamic content management system. The application provides an engaging user experience with smooth animations and responsive design.',
      features: [
        'Real-time multiplayer gameplay',
        'User authentication and profile management',
        'Interactive Pokémon database with search and filter',
        'Dynamic content updates without page refresh',
        'Responsive design for mobile and desktop',
        'Achievement and progress tracking system'
      ],
      technologies: ['React', 'JavaScript', 'CSS3', 'RESTful API', 'Local Storage', 'Responsive Design'],
      responsibilities: [
        'Designed and implemented the frontend architecture using React',
        'Developed real-time game mechanics and user interactions',
        'Integrated external Pokémon API for data retrieval',
        'Implemented user authentication and session management',
        'Created responsive UI components and animations',
        'Optimized application performance and loading times'
      ],
      challenges: [
        {
          problem: 'Managing real-time state updates across multiple components',
          solution: 'Implemented React Context API and custom hooks for efficient state management and data flow'
        },
        {
          problem: 'Handling large datasets from the Pokémon API',
          solution: 'Implemented pagination, lazy loading, and caching strategies to improve performance'
        }
      ],
      duration: '3 months',
      status: 'Completed',
      links: {
        github: '#',
        live: '#'
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
