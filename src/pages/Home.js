import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { getProfile, getSocialLinks } from '../services/api';

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [social, setSocial] = useState(null);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [profileData, socialData] = await Promise.all([
        getProfile(),
        getSocialLinks(),
      ]);
      setProfile(profileData);
      setSocial(socialData);
    } catch (error) {
      console.error('Error fetching initial data:', error);
      // Set fallback data
      setProfile({
        name: 'Akshat Rastogi',
        title: 'Backend Developer & DevOps Enthusiast',
        bio: 'Building scalable microservices and cloud-native applications with Spring Boot, AWS, and modern DevOps practices.',
      });
      setSocial({
        github: 'https://github.com/Akshat-Rastogi-007',
        linkedin: 'https://www.linkedin.com/in/akshtrastogi/',
        leetcode: 'https://leetcode.com/u/akshat__rastogi/',
        email: 'itsakshat1001@gmail.com',
      });
    }
  };

  return (
    <div className="home">
      <Navbar />
      <Hero profile={profile} social={social} />
      <Experience />
      <Projects />
      <About />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;