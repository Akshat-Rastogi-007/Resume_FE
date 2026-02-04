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
      setProfile(profileData);
      setEducation(educationData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Fallback data from resume
      setProfile({
        name: 'Akshat Rastogi',
        about: 'Passionate backend developer specializing in building scalable microservices and cloud-native applications. Currently pursuing B.Tech in Computer Science Engineering at Bennett University with a strong focus on Spring Boot, AWS, and modern DevOps practices.',
      });
      setEducation({
        institution: 'Bennett University',
        degree: 'Bachelor of Technology',
        field: 'Computer Science Engineering',
        startDate: 'Aug 2024',
        endDate: 'Apr 2028',
        gpa: '8.63/10.0',
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
      title: '8.63 CGPA',
      description: '50% Merit Scholarship',
    },
    {
      icon: <FiBook />,
      title: 'Innovation',
      description: 'AI-Driven Cloud Automation',
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
            <p className="about-description">{profile?.about}</p>

            <div className="highlights-grid">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  className="highlight-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="highlight-icon">{highlight.icon}</div>
                  <h4>{highlight.title}</h4>
                  <p>{highlight.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {education && (
            <motion.div
              className="education-card"
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="education-header">
                <h3>Education</h3>
              </div>
              <div className="education-content">
                <h4 className="institution">{education.institution}</h4>
                <p className="degree">
                  {education.degree} in {education.field}
                </p>
                <p className="date">
                  {education.startDate} - {education.endDate}
                </p>
                <p className="location">{education.location}</p>
                <div className="gpa-badge">
                  <span>CGPA: {education.gpa}</span>
                </div>
                <ul className="achievements">
                  {education.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;
