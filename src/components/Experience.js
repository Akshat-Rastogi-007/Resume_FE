import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiBriefcase, FiCalendar, FiMapPin } from 'react-icons/fi';
import { getExperience } from '../services/api';
import '../styles/Experience.css';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    fetchExperience();
  }, []);

  const fetchExperience = async () => {
    try {
      const data = await getExperience();
      setExperiences(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching experience:', error);
      // Fallback data from resume
      setExperiences([
        {
          id: 1,
          company: 'The GMAT Co (GREPREP)',
          position: 'Research Intern & Backend Developer',
          startDate: 'Apr 2025',
          endDate: 'Jun 2025',
          location: 'Remote',
          current: false,
          description: [
            'Developed and maintained production-grade backend features using Spring Boot and Java for educational technology platform serving students preparing for standardized tests',
            'Integrated JWT-based authentication and Spring Security modules for secure user access control, ensuring role-based authorization across multiple services',
            'Designed and integrated robust RESTful APIs in collaboration with frontend teams, ensuring seamless data flow and efficient communication between distributed services',
          ],
        },
      ]);
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  if (loading) {
    return (
      <section className="experience" id="experience">
        <div className="container">
          <div className="loading">Loading experience...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="experience" id="experience" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Work Experience</h2>
          <p className="section-subtitle">
            My professional journey and contributions
          </p>
        </motion.div>

        <motion.div
          className="experience-timeline"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              className="experience-item"
              variants={itemVariants}
            >
              <div className="experience-marker">
                <div className="marker-dot"></div>
                <div className="marker-line"></div>
              </div>

              <motion.div
                className="experience-content"
                whileHover={{ x: 10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="experience-header">
                  <div>
                    <h3 className="experience-position">{exp.position}</h3>
                    <h4 className="experience-company">
                      <FiBriefcase className="icon" />
                      {exp.company}
                    </h4>
                  </div>
                  {exp.current && <span className="current-badge">Current</span>}
                </div>

                <div className="experience-meta">
                  <span className="experience-date">
                    <FiCalendar className="icon" />
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </span>
                  <span className="experience-location">
                    <FiMapPin className="icon" />
                    {exp.location}
                  </span>
                </div>

                <ul className="experience-description">
                  {exp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
