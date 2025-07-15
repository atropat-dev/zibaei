import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    
    if (error.response) {
      // Server responded with error status
      const message = (error.response.data as any)?.message || 'خطا در ارتباط با سرور';
      throw new Error(message);
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('سرور در دسترس نیست');
    } else {
      // Something else happened
      throw new Error('خطای غیرمنتظره رخ داد');
    }
  }
);

// API service functions
export const apiService = {
  // Health check
  healthCheck: async () => {
    const response = await api.get('/health');
    return response.data;
  },

  // Projects
  getProjects: async () => {
    const response = await api.get('/projects');
    return response.data;
  },

  getProjectCount: async () => {
    const response = await api.get('/projects/count');
    return response.data;
  },

  addProject: async (projectData: {
    title: string;
    description: string;
    technology?: string;
    status?: string;
  }) => {
    const response = await api.post('/projects', projectData);
    return response.data;
  },

  // Services
  getServices: async () => {
    const response = await api.get('/services');
    return response.data;
  },

  // Contact
  submitContact: async (contactData: {
    name: string;
    email: string;
    message: string;
  }) => {
    const response = await api.post('/contact', contactData);
    return response.data;
  },

  getContacts: async () => {
    const response = await api.get('/contacts');
    return response.data;
  },
};

export default apiService;
