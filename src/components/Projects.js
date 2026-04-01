import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import '../styles/Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      // Using hardcoded project data from resume
      setProjects([
        {
          id: 1,
          title: 'Draw2Deploy',
          description: 'AI-driven DevOps automation tool that converts architecture diagrams into fully deployable cloud infrastructure for AWS, Azure, and GCP. Features computer vision pipeline and LLM-driven IaC generation.',
          technologies: ['Python', 'AI/ML', 'Terraform', 'AWS', 'Azure', 'GCP'],
          githubUrl: '#',
          liveUrl: '#',
          featured: true,
          category: 'ai-ml',
        },
        {
          id: 2,
          title: 'Event Booking System',
          description: 'Scalable microservices-based event platform with JWT authentication, Redis caching, and Kafka messaging. Features atomic seat reservation and inter-service communication.',
          technologies: ['Spring Boot', 'MySQL', 'Redis', 'Kafka', 'Microservices'],
          githubUrl: '#',
          featured: true,
          category: 'backend',
        },
        {
          id: 3,
          title: 'Coinnect',
          description: 'Gamified in-app coin wallet with JWT authentication, OTP verification, and comprehensive transaction management. Features rate limiting and rollback mechanisms.',
          technologies: ['Spring Boot', 'MySQL', 'JWT', 'React'],
          githubUrl: '#',
          liveUrl: '#',
          featured: false,
          category: 'fullstack',
        },
        {
          id: 4,
          title: 'MailForge',
          description: 'Secure email system with end-to-end encryption using AES-256 and RSA. Features JWT authentication with OTP verification and comprehensive mail management.',
          technologies: ['Spring Boot', 'MySQL', 'AES/RSA', 'JWT'],
          githubUrl: '#',
          featured: false,
          category: 'backend',
        },
      ]);
      setLoading(false);
    } catch (error) {
      console.error('Error loading projects:', error);
      setLoading(false);
    }
  };

  const categories = ['all', 'backend', 'fullstack', 'ai-ml'];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  if (loading) {
    return (
      <section className="projects" id="projects">
        <div className="container">
          <div className="loading">Loading projects...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="projects" id="projects" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            Building scalable solutions with modern technologies
          </p>
        </motion.div>

        <motion.div
          className="project-filters"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${filter === category ? 'active' : ''}`}
              onClick={() => setFilter(category)}
            >
              {category.replace('-', ' ').toUpperCase()}
            </button>
          ))}
        </motion.div>

        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`project-card ${project.featured ? 'featured' : ''}`}
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              <div className="project-header">
                <div className="project-number">0{index + 1}</div>
                {project.featured && <span className="featured-badge">Featured</span>}
              </div>

              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>

              <div className="project-tech">
                {(Array.isArray(project.technologies) ? project.technologies : []).map((tech, i) => (
                  <span key={i} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="project-links">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <FiGithub /> Code
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <FiExternalLink /> Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
