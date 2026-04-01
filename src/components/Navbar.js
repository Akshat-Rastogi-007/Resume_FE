import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { downloadResume } from '../services/api';
import '../styles/Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [downloadingResume, setDownloadingResume] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadResume = async () => {
    try {
      setDownloadingResume(true);
      const blob = await downloadResume();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Resume.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading resume:', error);
      alert('Failed to download resume. Please try again.');
    } finally {
      setDownloadingResume(false);
    }
  };

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="navbar-container">
        <motion.div
          className="navbar-logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
            <span className="logo-text">AR</span>
          </a>
        </motion.div>

        <ul className="navbar-menu">
          {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
            <motion.li
              key={item}
              whileHover={{ y: -2 }}
              className={activeSection === item.toLowerCase() ? 'active' : ''}
            >
              <a
                href={`#${item.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.toLowerCase());
                }}
              >
                {item}
              </a>
            </motion.li>
          ))}
        </ul>

        <motion.button
          onClick={handleDownloadResume}
          className="btn btn-resume"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={downloadingResume}
        >
          {downloadingResume ? 'Downloading...' : 'Resume'}
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
