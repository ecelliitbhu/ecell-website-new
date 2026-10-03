const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

async function fetchWithTimeout(url, options = {}, timeoutMs = 2500) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);
    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
        });
        clearTimeout(id);
        if (!response.ok) {
            return null;
        }
        return await response.json();
    } catch (err) {
        clearTimeout(id);
        console.error(`Server fetch error for ${url}:`, err.message || err);
        return null;
    }
}

export const serverAPI = {
    getRecruiterProfile: async (userId, jwtToken) => {
        const headers = jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {};
        return await fetchWithTimeout(`${BACKEND_URL}/recruiters/getinfo/${userId}`, { headers });
    },

    getRecruiterPostings: async (jwtToken) => {
        const headers = jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {};
        const data = await fetchWithTimeout(`${BACKEND_URL}/posts/recruiter`, { headers });
        if (!data) return [];
        return data?.data ? data.data : (Array.isArray(data) ? data : []);
    },

    getRecruiterApplications: async (jwtToken) => {
        const headers = jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {};
        const data = await fetchWithTimeout(`${BACKEND_URL}/applications/recruiter`, { headers });
        if (!data) return [];
        return Array.isArray(data) ? data : (data.data || []);
    },

    getStudentProfile: async (studentId, jwtToken) => {
        const headers = jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {};
        return await fetchWithTimeout(`${BACKEND_URL}/students/getinfo/${studentId}`, { headers });
    },

    getAllPosts: async (jwtToken) => {
        const headers = jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {};
        const data = await fetchWithTimeout(`${BACKEND_URL}/posts`, { headers });
        if (!data) return [];
        return data?.data ? data.data : (Array.isArray(data) ? data : []);
    },

    getStudentApplications: async (studentId, jwtToken) => {
        const headers = jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {};
        const data = await fetchWithTimeout(`${BACKEND_URL}/applications/student?studentId=${studentId}`, { headers });
        if (!data) return [];
        return Array.isArray(data) ? data : (data.data || []);
    },
};
