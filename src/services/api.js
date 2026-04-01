import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API Endpoints Documentation
// You need to implement these endpoints in your Spring Boot backend

/**
 * PROFILE ENDPOINTS
 */

// GET /api/profile - Get user profile information
export const getProfile = async () => {
  const response = await api.get('/profile');
  return response.data;
};

// PUT /api/profile - Update profile information
// Body: { name, title, bio, email, phone, location, avatar }
export const updateProfile = async (profileData) => {
  const response = await api.put('/profile', profileData);
  return response.data;
};

/**
 * RESUME ENDPOINTS
 */

// GET /api/resume/download - Download resume PDF
export const downloadResume = async () => {
  const response = await api.get('/resume/download', {
    responseType: 'blob',
  });
  return response.data;
};

/**
 * EXPERIENCE ENDPOINTS
 */

// GET /api/experience - Get all work experience
export const getExperience = async () => {
  const response = await api.get('/experience');
  return response.data;
};

// POST /api/experience - Add new experience
// Body: { company, position, startDate, endDate, description, location, current }
export const createExperience = async (experienceData) => {
  const response = await api.post('/experience', experienceData);
  return response.data;
};

// PUT /api/experience/:id - Update experience
export const updateExperience = async (id, experienceData) => {
  const response = await api.put(`/experience/${id}`, experienceData);
  return response.data;
};

// DELETE /api/experience/:id - Delete experience
export const deleteExperience = async (id) => {
  const response = await api.delete(`/experience/${id}`);
  return response.data;
};

/**
 * SKILLS ENDPOINTS
 */

// GET /api/skills - Get all skills grouped by category
export const getSkills = async () => {
  try {
    const response = await api.get('/skills');
    return response.data;
  } catch (error) {
    // Return fallback skills data
    throw error;
  }
};

// POST /api/skills - Add new skill
// Body: { name, category, proficiency }
export const createSkill = async (skillData) => {
  const response = await api.post('/skills', skillData);
  return response.data;
};

// PUT /api/skills/:id - Update skill
export const updateSkill = async (id, skillData) => {
  const response = await api.put(`/skills/${id}`, skillData);
  return response.data;
};

// DELETE /api/skills/:id - Delete skill
export const deleteSkill = async (id) => {
  const response = await api.delete(`/skills/${id}`);
  return response.data;
};

/**
 * EDUCATION ENDPOINTS
 */

// GET /api/education - Get education details
export const getEducation = async () => {
  const response = await api.get('/education');
  return response.data;
};

// POST /api/education - Add education
// Body: { institution, degree, field, startDate, endDate, gpa, achievements }
export const createEducation = async (educationData) => {
  const response = await api.post('/education', educationData);
  return response.data;
};

// PUT /api/education/:id - Update education
export const updateEducation = async (id, educationData) => {
  const response = await api.put(`/education/${id}`, educationData);
  return response.data;
};

/**
 * SOCIAL LINKS ENDPOINTS
 */

// GET /api/social - Get all social links
export const getSocialLinks = async () => {
  const response = await api.get('/social');
  return response.data;
};

// PUT /api/social - Update social links
// Body: { github, linkedin, leetcode, twitter, email }
export const updateSocialLinks = async (socialData) => {
  const response = await api.put('/social', socialData);
  return response.data;
};

/**
 * CONTACT ENDPOINTS
 */

// POST /api/contact - Send contact message
// Body: { name, email, subject, message }
export const sendContactMessage = async (contactData) => {
  const response = await api.post('/contact', contactData);
  return response.data;
};

export default api;
