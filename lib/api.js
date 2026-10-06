import axios from 'axios';
import { getCachedSession } from './session-cache';

const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || 'https://ecell-backend-one.vercel.app').replace(/\/+$/, '');
const FALLBACK_URL = BACKEND_URL.includes('localhost') ? 'https://ecell-backend-one.vercel.app' : 'http://localhost:8000';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: BACKEND_URL,
  timeout: 10000,
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
    try {
      const response = await apiClient.get(`/users/getid/${id}`);
      return response.data;
    } catch (error) {
      try {
        const fallbackRes = await axios.get(`${FALLBACK_URL}/users/getid/${id}`, { timeout: 3000 });
        return fallbackRes.data;
      } catch (e2) {
        return null;
      }
    }
  },
};

// Posts API
export const postsAPI = {
  getAll: async () => {
    // 1. Try apiClient with /posts then /posts/getinfo
    for (const path of ["/posts", "/posts/getinfo"]) {
      try {
        const response = await apiClient.get(path, { timeout: 15000 });
        const list = response.data?.data || response.data;
        if (Array.isArray(list)) {
          if (typeof window !== "undefined") {
            try {
              sessionStorage.setItem("ecell_cached_posts", JSON.stringify({ list, at: Date.now() }));
            } catch (e) {}
          }
          return list;
        }
      } catch (error) {}
    }

    // 2. Raw fetch fallback across BACKEND_URL and FALLBACK_URL
    for (const url of [BACKEND_URL, FALLBACK_URL]) {
      for (const path of ["/posts", "/posts/getinfo"]) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 6000);
          const rawRes = await fetch(`${url}${path}`, { signal: controller.signal });
          clearTimeout(timeoutId);
          if (rawRes.ok) {
            const resData = await rawRes.json();
            const list = resData?.data || resData;
            if (Array.isArray(list)) {
              if (typeof window !== "undefined") {
                try {
                  sessionStorage.setItem("ecell_cached_posts", JSON.stringify({ list, at: Date.now() }));
                } catch (e) {}
              }
              return list;
            }
          }
        } catch (eRaw) {}
      }
    }

    if (typeof window !== "undefined") {
      try {
        const cached = sessionStorage.getItem("ecell_cached_posts");
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed?.list) && parsed.list.length > 0) {
            return parsed.list;
          }
        }
      } catch (eCache) {}
    }

    return null;
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
    try {
      const response = await apiClient.post("/applications/create", applicationData);
      return response.data;
    } catch (error) {
      if (error.response?.data?.alreadyApplied || error.response?.status === 400) {
        return { success: true, alreadyApplied: true, ...error.response.data };
      }
      try {
        const fallbackRes = await axios.post(`${FALLBACK_URL}/applications/create`, applicationData, { timeout: 5000 });
        return fallbackRes.data;
      } catch (e2) {
        if (e2.response?.data?.alreadyApplied || e2.response?.status === 400) {
          return { success: true, alreadyApplied: true, ...e2.response.data };
        }
      }
      throw error;
    }
  },

  updateStatus: async (id, status) => {
    const response = await apiClient.put(`/applications/update/${id}`, { status });
    return response.data;
  },

  withdraw: async (id) => {
    try {
      const response = await apiClient.delete(`/applications/delete/${id}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        return { success: true, alreadyWithdrawn: true };
      }
      try {
        const fallbackRes = await axios.delete(`${FALLBACK_URL}/applications/delete/${id}`, { timeout: 5000 });
        return fallbackRes.data;
      } catch (e2) {
        if (e2.response?.status === 404) {
          return { success: true, alreadyWithdrawn: true };
        }
      }
      throw error;
    }
  },
};

// Students API
export const studentsAPI = {
  getProfile: async (id, optionalEmail) => {
    try {
      const response = await apiClient.get(`/students/getinfo/${id}`);
      if (response.data && (response.data.id || response.data.rollNo)) {
        return response.data;
      }
    } catch (error) {
      // Primary backend failed; try fallback
    }

    try {
      const rawRes = await fetch(`${BACKEND_URL}/students/getinfo/${id}`, { timeout: 3000 });
      if (rawRes.ok) {
        const data = await rawRes.json();
        if (data && (data.id || data.rollNo)) return data;
      }
    } catch (eRaw) {}

    try {
      const fallbackRes = await axios.get(`${FALLBACK_URL}/students/getinfo/${id}`, { timeout: 3000 });
      if (fallbackRes.data && (fallbackRes.data.id || fallbackRes.data.rollNo)) {
        return fallbackRes.data;
      }
    } catch (e2) {
      // Ignore fallback error
    }

    // Resilient fallback: fetch via /users/create using email (unprotected, returns full student record from DB)
    try {
      let email = optionalEmail;
      if (!email) {
        const session = await getCachedSession();
        email = session?.user?.email;
      }
      if (email) {
        for (const url of [BACKEND_URL, FALLBACK_URL]) {
          try {
            const userRes = await fetch(`${url}/users/create`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email }),
            });
            if (userRes.ok) {
              const userData = await userRes.json();
              if (userData?.student && (userData.student.id || userData.student.rollNo)) {
                return userData.student;
              }
            }
          } catch (eUrl) {}
        }
      }
    } catch (e3) {}

    try {
      const session = await getCachedSession();
      if (session?.user?.roleData?.student && (session.user.roleData.student.id || session.user.roleData.student.rollNo)) {
        return session.user.roleData.student;
      }
    } catch (e4) {}

    return null;
  },

  updateProfile: async (id, profileData) => {
    try {
      const response = await apiClient.put(`/students/update/${id}`, profileData);
      return response.data;
    } catch (error) {
      try {
        const fallbackRes = await axios.put(`${FALLBACK_URL}/students/update/${id}`, profileData, { timeout: 5000 });
        return fallbackRes.data;
      } catch (e2) {
        return await studentsAPI.registerProfile(profileData);
      }
    }
  },

  registerProfile: async (profileData) => {
    // 1. Try primary apiClient with Bearer token
    try {
      const response = await apiClient.post('/students/register', profileData);
      if (response.data && (response.data.id || response.data.rollNo || response.data.userId)) {
        return response.data;
      }
    } catch (error) {
      // Primary with auth failed
    }

    // 2. Try raw unauthenticated fetch to primary backend
    try {
      const rawRes = await fetch(`${BACKEND_URL}/students/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      });
      if (rawRes.ok) {
        const data = await rawRes.json();
        if (data && (data.id || data.rollNo || data.userId)) {
          return data;
        }
      }
    } catch (e2) {
      // Raw fetch failed
    }

    // 3. Try fallback URL
    try {
      const fallbackRes = await axios.post(`${FALLBACK_URL}/students/register`, profileData, { timeout: 5000 });
      if (fallbackRes.data && (fallbackRes.data.id || fallbackRes.data.rollNo || fallbackRes.data.userId)) {
        return fallbackRes.data;
      }
    } catch (e3) {
      // Fallback failed
    }

    return { success: false, error: "Failed to save profile. Please check your information and try again." };
  },
};

// Recruiters API
export const recruitersAPI = {
  getProfile: async (id, optionalEmail) => {
    try {
      const response = await apiClient.get(`/recruiters/getinfo/${id}`);
      if (response.data && (response.data.id || response.data.companyName)) {
        return response.data;
      }
    } catch (error) {
      // Primary failed; try fallback
    }

    try {
      const rawRes = await fetch(`${BACKEND_URL}/recruiters/getinfo/${id}`, { timeout: 3000 });
      if (rawRes.ok) {
        const data = await rawRes.json();
        if (data && (data.id || data.companyName)) return data;
      }
    } catch (eRaw) {}

    try {
      const fallbackRes = await axios.get(`${FALLBACK_URL}/recruiters/getinfo/${id}`, { timeout: 3000 });
      if (fallbackRes.data && (fallbackRes.data.id || fallbackRes.data.companyName)) {
        return fallbackRes.data;
      }
    } catch (e2) {
      // Fallback failed
    }

    // Resilient fallback: fetch via /users/create
    try {
      let email = optionalEmail;
      if (!email) {
        const session = await getCachedSession();
        email = session?.user?.email;
      }
      if (email) {
        for (const url of [BACKEND_URL, FALLBACK_URL]) {
          try {
            const userRes = await fetch(`${url}/users/create`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email }),
            });
            if (userRes.ok) {
              const userData = await userRes.json();
              if (userData?.recruiter && (userData.recruiter.id || userData.recruiter.companyName)) {
                return userData.recruiter;
              }
            }
          } catch (eUrl) {}
        }
      }
    } catch (e3) {}

    try {
      const session = await getCachedSession();
      if (session?.user?.roleData?.recruiter && (session.user.roleData.recruiter.id || session.user.roleData.recruiter.companyName)) {
        return session.user.roleData.recruiter;
      }
    } catch (e4) {}

    return null;
  },

  updateProfile: async (id, profileData) => {
    try {
      const response = await apiClient.put(`/recruiters/update/${id}`, profileData);
      return response.data;
    } catch (error) {
      try {
        const fallbackRes = await axios.put(`${FALLBACK_URL}/recruiters/update/${id}`, profileData, { timeout: 5000 });
        return fallbackRes.data;
      } catch (e2) {
        return await recruitersAPI.registerProfile(profileData);
      }
    }
  },

  registerProfile: async (profileData) => {
    try {
      const response = await apiClient.post('/recruiters/register', profileData);
      if (response.data && (response.data.id || response.data.companyName || response.data.userId)) {
        return response.data;
      }
    } catch (error) {
      // Primary failed
    }

    try {
      const rawRes = await fetch(`${BACKEND_URL}/recruiters/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      });
      if (rawRes.ok) {
        const data = await rawRes.json();
        if (data && (data.id || data.companyName || data.userId)) {
          return data;
        }
      }
    } catch (e2) {
      // Raw fetch failed
    }

    try {
      const fallbackRes = await axios.post(`${FALLBACK_URL}/recruiters/register`, profileData, { timeout: 5000 });
      if (fallbackRes.data && (fallbackRes.data.id || fallbackRes.data.companyName || fallbackRes.data.userId)) {
        return fallbackRes.data;
      }
    } catch (e3) {
      // Fallback failed
    }

    return { success: false, error: "Failed to save profile. Please check your information and try again." };
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
