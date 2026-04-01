import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiAward, FiBook, FiTrendingUp } from 'react-icons/fi';
import { getProfile, getEducation } from '../services/api';
import '../styles/About.css';

const About = () => {
  const [profile, setProfile] = useState(null);
  const [education, setEducation] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [profileData, educationData] = await Promise.all([
        getProfile(),
        getEducation(),
      ]);
      
      // Validate profile data
      const validProfile = (profileData && typeof profileData === 'object' && profileData.name) ? profileData : null;
      
      // Validate education data
      const validEducation = (educationData && typeof educationData === 'object' && educationData.institution) ? educationData : null;
      
      // If any data is invalid, throw error to use fallback
      if (!validProfile || !validEducation) {
        throw new Error('Invalid API response structure');
      }
      
      setProfile(validProfile);
      setEducation(validEducation);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Fallback data from resume
      setProfile({
        name: 'Akshat Rastogi',
        about: 'Full-stack engineer with expertise in designing and deploying scalable backend systems and cloud infrastructure. I specialize in Spring Boot microservices, AWS cloud solutions, and DevOps automation. Currently a B.Tech student at Bennett University, I focus on building production-grade applications with emphasis on code quality, system design, and modern development practices.',
      });
      setEducation({
        institution: 'Bennett University',
        degree: 'Bachelor of Technology',
        field: 'Computer Science Engineering',
        startDate: 'Aug 2024',
        endDate: 'Apr 2028',
        gpa: '8.53/10.0',
        location: 'Greater Noida, Uttar Pradesh',
        achievements: [
          'Merit-based 50% scholarship recipient',
          'Relevant Coursework: Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Software Engineering, Microservices Architecture',
        ],
      });
      setLoading(false);
    }
  };

  const highlights = [
    {
      icon: <FiAward />,
      title: '8.53 CGPA',
      description: '50% Merit Scholarship',
    },
    {
      icon: <FiBook />,
      title: 'Innovation',
      description: 'AI-Driven DevOps Automation',
    },
    {
      icon: <FiTrendingUp />,
      title: 'Production',
      description: 'Enterprise Systems',
    },
  ];

  if (loading) {
    return (
      <section className="about" id="about">
        <div className="container">
          <div className="loading">Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="about" id="about" ref={ref}>
      <div className="container">
        <div className="about-main-grid">
          {/* About Me Section */}
          <motion.div
            className="about-main-section"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="section-header"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="section-title">About Me</h2>
              <p className="section-subtitle">
                Get to know more about my background and expertise
              </p>
            </motion.div>

            <div className="about-content">
              <motion.div
                className="about-text"
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {profile && (
                  <>
                    <h3>{profile.name}</h3>
                    <p>{profile.about}</p>
                  </>
                )}
              </motion.div>

              <motion.div
                className="about-highlights"
                initial={{ opacity: 0, x: 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    className="highlight-card"
                    whileHover={{ y: -5 }}
                  >
                    <div className="highlight-icon">{highlight.icon}</div>
                    <h4>{highlight.title}</h4>
                    <p>{highlight.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Education Section - Side by Side */}
          {education && (
            <motion.div
              className="about-education-section"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <h2 className="section-title">Education</h2>
                <p className="section-subtitle">
                  My academic background and qualifications
                </p>
              </motion.div>

              <div className="education-card">
                <div className="education-header">
                  <div className="education-info">
                    <h3 className="education-institution">{education.institution}</h3>
                    <p className="education-degree">
                      {education.degree} in {education.field}
                    </p>
                  </div>
                  <div className="education-period-box">
                    <span className="education-period">
                      {education.startDate} – {education.endDate}
                    </span>
                  </div>
                </div>

                <div className="education-details">
                  <div className="detail-row">
                    <span className="detail-label">Location:</span>
                    <span className="detail-value">{education.location}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">CGPA:</span>
                    <span className="detail-value">{education.gpa}</span>
                  </div>
                </div>

                {education.achievements && (
                  <div className="education-achievements-section">
                    <h4 className="achievements-title">Highlights</h4>
                    <ul className="education-achievements">
                      {(Array.isArray(education.achievements) ? education.achievements : []).map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;
