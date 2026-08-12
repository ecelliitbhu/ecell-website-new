import axios from 'axios';
import { getSession } from 'next-auth/react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Create an Axios instance
const apiClient = axios.create({
  baseURL: BACKEND_URL,
});

// Add a request interceptor to attach the NextAuth token
apiClient.interceptors.request.use(
  async (config) => {
    // Get the active session from NextAuth
    const session = await getSession();
    
    // If we have a session and a token, attach it to the Authorization header
    if (session && session.jwtToken) {
      config.headers.Authorization = `Bearer ${session.jwtToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (email, password) => {
    // This goes to the Next.js API route, not the Express backend
    const response = await axios.post("/api/auth/login", { email, password });
    return response.data;
  },
};

// Posts API
export const postsAPI = {
  getAll: async () => {
    const response = await apiClient.get("/posts/getinfo");
    return response.data;
  },

  getById: async (id) => {
    const response = await apiClient.get(`/posts/getpost/${id}`);
    return response.data;
  },

  create: async (postData) => {
    const response = await apiClient.post("/posts/create", postData);
    return response.data;
  },

  update: async (id, postData) => {
    const response = await apiClient.put(`/posts/update/${id}`, postData);
    return response.data;
  },

  delete: async (id) => {
    const response = await apiClient.delete(`/posts/delete/${id}`);
    return response.data;
  },
};

// Applications API
export const applicationsAPI = {
  getAll: async (filters = {}) => {
    const response = await apiClient.get("/applications/getinfo", { params: filters });
    return response.data;
  },

  getById: async (id) => {
    const response = await apiClient.get(`/applications/getone/${id}`);
    return response.data;
  },

  create: async (applicationData) => {
    const response = await apiClient.post("/applications/create", applicationData);
    return response.data;
  },

  updateStatus: async (id, status) => {
    const response = await apiClient.put(`/applications/update/${id}`, { status });
    return response.data;
  },

  withdraw: async (id) => {
    const response = await apiClient.delete(`/applications/delete/${id}`);
    return response.data;
  },
};

// Students API
export const studentsAPI = {
  getProfile: async (id) => {
    const response = await apiClient.get(`/students/getinfo/${id}`);
    return response.data;
  },

  updateProfile: async (id, profileData) => {
    const response = await apiClient.put(`/students/update/${id}`, profileData);
    return response.data;
  },
};

// Recruiters API
export const recruitersAPI = {
  getProfile: async (id) => {
    const response = await apiClient.get(`/recruiters/getinfo/${id}`);
    return response.data;
  },

  updateProfile: async (id, profileData) => {
    const response = await apiClient.put(`/recruiters/update/${id}`, profileData);
    return response.data;
  },

  getPending: async () => {
    const response = await apiClient.get("/recruiters/pending");
    return response.data;
  },

  verify: async (id) => {
    const response = await apiClient.put(`/recruiters/verify/${id}`);
    return response.data;
  },
};
