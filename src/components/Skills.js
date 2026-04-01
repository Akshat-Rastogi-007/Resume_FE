import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { getSkills } from '../services/api';
import '../styles/Skills.css';

const Skills = () => {
  const [skills, setSkills] = useState({});
  const [loading, setLoading] = useState(true);
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const data = await getSkills();
      // Ensure data is an object with skill categories and contains actual skills
      let skillsData = {};
      
      if (data && typeof data === 'object') {
        // Check if data contains skill arrays (valid structure)
        const hasValidStructure = Object.values(data).some(val => Array.isArray(val));
        if (hasValidStructure) {
          skillsData = data;
        }
      }
      
      // If no valid data, use fallback
      if (Object.keys(skillsData).length === 0) {
        throw new Error('Invalid skills data structure');
      }
      
      setSkills(skillsData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching skills:', error);
      // Fallback data from resume
      setSkills({
        'Programming Languages': ['Java', 'SQL', 'Python'],
        'Frameworks & Technologies': [
          'Spring Framework',
          'Hibernate',
          'MySQL',
          'Kafka',
        ],
        'Cloud & DevOps': [
          'AWS',
          'Docker',
          'CI/CD',
          'Terraform',
        ],
        'Developer Tools': [
          'Git',
          'IntelliJ IDEA',
          'Maven',
        ],
        'Core Competencies': [
          'REST APIs',
          'Microservices',
          'Event Driven Architecture',
        ],
      });
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  if (loading) {
    return (
      <section className="skills" id="skills">
        <div className="container">
          <div className="loading">Loading skills...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="skills" id="skills" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Technical Skills</h2>
          <p className="section-subtitle">
            Technologies and tools I work with
          </p>
        </motion.div>

        <motion.div
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {Object.entries(skills).map(([category, skillList], categoryIndex) => {
            // Ensure skillList is an array
            const skillArray = Array.isArray(skillList) ? skillList : [];
            return (
              <motion.div
                key={category}
                className="skill-category"
                variants={itemVariants}
              >
                <h3 className="category-title">{category}</h3>
                <div className="skill-list">
                  {skillArray.map((skill, index) => (
                    <motion.div
                      key={index}
                      className="skill-item"
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <span className="skill-name">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
