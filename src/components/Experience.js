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
      
      // Ensure data is an array with valid experience objects
      let experiences = [];
      if (Array.isArray(data)) {
        experiences = data.filter(exp => exp && exp.position && exp.company);
      } else if (data && Array.isArray(data.experiences)) {
        experiences = data.experiences.filter(exp => exp && exp.position && exp.company);
      }
      
      // If no valid experiences, throw error to use fallback
      if (experiences.length === 0) {
        throw new Error('No valid experience data');
      }
      
      setExperiences(experiences);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching experience:', error);
      // Fallback data from resume
      setExperiences([
        {
          id: 1,
          company: 'Dean Career Cloud, School of CSET, Bennett University',
          position: 'Senior Core Executive – Corporate & Alumni Relations',
          startDate: 'Mar 2026',
          endDate: 'Present',
          location: 'Greater Noida, UP',
          current: true,
          description: [
            'Appointed as Senior Core representing the School of Computer Science Engineering & Technology at Dean Career Cloud, the university\'s placement and industry interface body',
            'Coordinate placement drives, manage student communications, and facilitate connections between students and alumni across industry verticals',
            'Organize industry-insight sessions and alumni interaction events to bridge the gap between academia and professional environments',
          ],
        },
        {
          id: 2,
          company: 'Bennett Springer Club, School of CSET, Bennett University',
          position: 'Tech Head',
          startDate: 'Mar 2026',
          endDate: 'Present',
          location: 'Greater Noida, UP',
          current: true,
          description: [
            'Leading technical initiatives and managing the technology stack and developer community within the Bennett Springer Club under the School of Computer Science',
          ],
        },
        {
          id: 3,
          company: 'The GMAT Co (GREPREP)',
          position: 'Research Intern & Backend Developer',
          startDate: 'Apr 2025',
          endDate: 'Jun 2025',
          location: 'Remote',
          current: false,
          description: [
            'Developed and maintained production-grade backend features using Spring Boot and Java for an EdTech platform serving students preparing for standardized tests',
            'Integrated JWT-based authentication and Spring Security modules for secure role-based access control and designed RESTful APIs ensuring seamless data flow across distributed services',
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
                  {(Array.isArray(exp.description) ? exp.description : []).map((item, i) => (
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
