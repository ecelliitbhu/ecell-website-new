import axios from 'axios';
import { getCachedSession } from './session-cache';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Create an Axios instance
const apiClient = axios.create({
  baseURL: BACKEND_URL,
});

// Add a request interceptor to attach the NextAuth token
apiClient.interceptors.request.use(
  async (config) => {
    // Get the active session from NextAuth (deduped + briefly cached — see
    // lib/session-cache.js; getSession() otherwise refetches on every request)
    const session = await getCachedSession();

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

// Users API
export const usersAPI = {
  getProfile: async (id) => {
    const response = await apiClient.get(`/users/getid/${id}`);
    return response.data;
  },
};

// Posts API
export const postsAPI = {
  getAll: async () => {
    try {
      // Try the new local backend route first
      const response = await apiClient.get("/posts/getinfo");
      return response.data || [];
    } catch (error) {
      if (error.response?.status === 404) {
        // If 404, fallback to the older deployed Vercel route
        try {
          const fallback = await apiClient.get("/posts");
          return fallback.data || [];
        } catch (err2) {
          console.warn("Failed to fetch posts from fallback:", err2.message);
          return [];
        }
      }
      console.warn("Failed to fetch posts:", error.message);
      return [];
    }
  },

  getForRecruiter: async () => {
    try {
      const { getRecruiterId } = require('./auth');
      const recruiterId = await getRecruiterId();
      if (!recruiterId) return [];
      const response = await apiClient.get(`/recruiters/getinfo/${recruiterId}`);
      return response.data?.posts || [];
    } catch (error) {
      return [];
    }
  },

  getById: async (id) => {
    try {
      const response = await apiClient.get(`/posts/getpost/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching post ${id}:`, error);
      return null;
    }
  },

  create: async (postData) => {
    try {
      const response = await apiClient.post("/posts", postData);
      return response.data;
    } catch (error) {
      console.error("Error creating post:", error.response?.data || error.message);
      throw error;
    }
  },

  update: async (id, postData) => {
    const response = await apiClient.put(`/posts/${id}`, postData);
    return response.data;
  },

  delete: async (id) => {
    const response = await apiClient.delete(`/posts/${id}`);
    return response.data;
  },
};

// Applications API
export const applicationsAPI = {
  getAll: async (filters = {}) => {
    try {
      const response = await apiClient.get("/applications/getinfo/", { params: filters });
      return response.data || [];
    } catch (error) {
      console.warn("Failed to fetch applications:", error.message);
      return [];
    }
  },

  getForRecruiter: async () => {
    try {
      const { getRecruiterId } = require('./auth');
      const recruiterId = await getRecruiterId();
      if (!recruiterId) return [];
      const profileRes = await apiClient.get(`/recruiters/getinfo/${recruiterId}`);
      const posts = profileRes.data?.posts || [];
      
      const allApps = [];
      for (const post of posts) {
          try {
              const appsRes = await apiClient.get(`/applications/getinfo/?postId=${post.id}`);
              if (appsRes.data && Array.isArray(appsRes.data)) {
                  allApps.push(...appsRes.data);
              }
          } catch (e) {
              console.error("Failed to fetch applications for post", post.id);
          }
      }
      return allApps;
    } catch (error) {
      return [];
    }
  },

  getForPost: async (postId) => {
    const response = await apiClient.get(`/applications/getinfo/?postId=${postId}`);
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
    try {
      const response = await apiClient.get(`/students/getinfo/${id}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        try {
          const fallback = await apiClient.get(`/students/${id}`);
          return fallback.data;
        } catch (e) {
          return null;
        }
      }
      console.warn("Student profile not found or server error:", error.message);
      return null;
    }
  },

  updateProfile: async (id, profileData) => {
    try {
      const response = await apiClient.put(`/students/update/${id}`, profileData);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        const fallback = await apiClient.put(`/students/${id}`, profileData);
        return fallback.data;
      }
      throw error;
    }
  },

  registerProfile: async (profileData) => {
    try {
      const response = await apiClient.post('/students/register', profileData);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        try {
          const fallback = await apiClient.post('/students', profileData);
          return fallback.data;
        } catch (e) {
          throw e;
        }
      }
      console.error("Failed to register student:", error.response?.data || error.message);
      return { success: false, error: error.response?.data?.message || "Registration failed" };
    }
  },
};

// Recruiters API
export const recruitersAPI = {
  getProfile: async (id) => {
    try {
      const response = await apiClient.get(`/recruiters/getinfo/${id}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        try {
          const fallback = await apiClient.get(`/recruiters/${id}`);
          return fallback.data;
        } catch (e) {
          return null;
        }
      }
      console.warn("Recruiter profile not found or server error:", error.message);
      return null;
    }
  },

  updateProfile: async (id, profileData) => {
    try {
      const response = await apiClient.put(`/recruiters/update/${id}`, profileData);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        const fallback = await apiClient.put(`/recruiters/${id}`, profileData);
        return fallback.data;
      }
      console.warn("Update profile failed, falling back:", error.message);
      throw error;
    }
  },

  registerProfile: async (profileData) => {
    try {
      const response = await apiClient.post('/recruiters/register', profileData);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        try {
          const fallback = await apiClient.post('/recruiters', profileData);
          return fallback.data;
        } catch (e) {
          throw e;
        }
      }
      console.error("Failed to register recruiter:", error.response?.data || error.message);
      return { success: false, error: error.response?.data?.message || "Registration failed" };
    }
  },

  getPending: async () => {
    const response = await apiClient.get("/recruiters/pending", {
      headers: {
        "X-Admin-Username": process.env.NEXT_PUBLIC_ADMIN_USERNAME,
        "X-Admin-Password": process.env.NEXT_PUBLIC_ADMIN_PASSWORD,
      },
    });
    return response.data;
  },

  verify: async (id) => {
    const response = await apiClient.put(`/recruiters/verify/${id}`, null, {
      headers: {
        "X-Admin-Username": process.env.NEXT_PUBLIC_ADMIN_USERNAME,
        "X-Admin-Password": process.env.NEXT_PUBLIC_ADMIN_PASSWORD,
      },
    });
    return response.data;
  },
};
