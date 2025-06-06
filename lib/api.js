// Helper functions for API calls

// Generic fetch function with error handling
async function fetchAPI(url, options = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

// Auth API
export const authAPI = {
  login: async (email, password) => {
    return fetchAPI("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },
};

// Posts API
export const postsAPI = {
  getAll: async () => {
    return fetchAPI("/api/posts");
  },

  getById: async (id) => {
    return fetchAPI(`/api/posts/${id}`);
  },

  create: async (postData) => {
    return fetchAPI("/api/posts", {
      method: "POST",
      body: JSON.stringify(postData),
    });
  },

  update: async (id, postData) => {
    return fetchAPI(`/api/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify(postData),
    });
  },

  delete: async (id) => {
    return fetchAPI(`/api/posts/${id}`, {
      method: "DELETE",
    });
  },
};

// Applications API
export const applicationsAPI = {
  getAll: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    return fetchAPI(`/api/applications?${queryParams}`);
  },

  getById: async (id) => {
    return fetchAPI(`/api/applications/${id}`);
  },

  create: async (applicationData) => {
    return fetchAPI("/api/applications", {
      method: "POST",
      body: JSON.stringify(applicationData),
    });
  },

  updateStatus: async (id, status) => {
    return fetchAPI(`/api/applications/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });
  },

  withdraw: async (id) => {
    return fetchAPI(`/api/applications/${id}`, {
      method: "DELETE",
    });
  },
};

// Students API
export const studentsAPI = {
  getProfile: async (id) => {
    return fetchAPI(`/api/students/${id}`);
  },

  updateProfile: async (id, profileData) => {
    return fetchAPI(`/api/students/${id}`, {
      method: "PUT",
      body: JSON.stringify(profileData),
    });
  },
};

// Recruiters API
export const recruitersAPI = {
  getProfile: async (id) => {
    return fetchAPI(`/api/recruiters/${id}`);
  },

  updateProfile: async (id, profileData) => {
    return fetchAPI(`/api/recruiters/${id}`, {
      method: "PUT",
      body: JSON.stringify(profileData),
    });
  },
};
