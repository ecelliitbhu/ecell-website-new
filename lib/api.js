// Helper functions for API calls

// Generic fetch function with error handling

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// async function fetch(url, options = {}) {
//   try {
//     const response = await fetch(url, {
//       ...options,
//       headers: {
//         "Content-Type": "application/json",
//         ...options.headers,
//       },
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data.message || "Something went wrong");
//     }

//     return data;
//   } catch (error) {
//     console.error("API Error:", error);
//     throw error;
//   }
// }

// Auth API
export const authAPI = {
  login: async (email, password) => {
    return fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },
};

// Posts API
export const postsAPI = {
  getAll: async () => {
    const response = await fetch(`${BACKEND_URL}/posts`);

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || "Failed to fetch posts");
    }

    return await response.json();
  },

  getById: async (id) => {
    return fetch(`${BACKEND_URL}/posts/${id}`);
  },

  create: async (postData) => {
    return fetch(`${BACKEND_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
  },

  update: async (id, postData) => {
    return fetch(`${BACKEND_URL}/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
  },

  delete: async (id) => {
    return fetch(`${BACKEND_URL}/posts/${id}`, {
      method: "DELETE",
    });
  },
};

// Applications API
export const applicationsAPI = {
  getAll: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await fetch(
      `${BACKEND_URL}/applications${queryParams ? `?${queryParams}` : ""}`
    );

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || "Failed to fetch applications");
    }

    return await response.json();
  },

  getById: async (id) => {
    return fetch(`${BACKEND_URL}/applications/${id}`);
  },

  create: async (applicationData) => {
    return fetch(`${BACKEND_URL}/applications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(applicationData),
    });
  },

  updateStatus: async (id, status) => {
    return fetch(`${BACKEND_URL}/applications/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });
  },

  withdraw: async (id) => {
    return fetch(`${BACKEND_URL}/applications/${id}`, {
      method: "DELETE",
    });
  },
};

// Students API
export const studentsAPI = {
  getProfile: async (id) => {
    return fetch(`${BACKEND_URL}/students/${id}`);
  },

  updateProfile: async (id, profileData) => {
    return fetch(`${BACKEND_URL}/students/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    });
  },
};


// Recruiters API
export const recruitersAPI = {
  getProfile: async (id) => {
    const response = await fetch(`${BACKEND_URL}/recruiters/${id}`);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch profile with status: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  },

  updateProfile: async (id, profileData) => {
    return fetch(`${BACKEND_URL}/recruiters/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    });
  },
};
