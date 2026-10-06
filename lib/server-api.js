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

    getStudentProfile: async (studentId, jwtToken, email) => {
        const headers = jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {};
        const backend = (process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000').replace(/\/+$/, '');
        const fallback = backend.includes('localhost') ? 'https://ecell-backend-one.vercel.app' : 'http://localhost:8000';

        if (studentId) {
            for (const url of [backend, fallback]) {
                const res = await fetchWithTimeout(`${url}/students/getinfo/${studentId}`, { headers }, 3000);
                if (res && (res.id || res.rollNo)) return res;
            }
        }

        if (email) {
            for (const url of [backend, fallback]) {
                const userRes = await fetchWithTimeout(`${url}/users/create`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email }),
                }, 3000);
                if (userRes?.student && (userRes.student.id || userRes.student.rollNo)) {
                    return userRes.student;
                }
            }
        }

        return null;
    },

    getAllPosts: async (jwtToken) => {
        const headers = jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {};
        const backend = (process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000').replace(/\/+$/, '');
        const fallback = backend.includes('localhost') ? 'https://ecell-backend-one.vercel.app' : 'http://localhost:8000';

        for (const url of [backend, fallback]) {
            for (const path of ['/posts', '/posts/getinfo']) {
                const data = await fetchWithTimeout(`${url}${path}`, { headers }, 3000);
                if (data) {
                    const list = data?.data ? data.data : (Array.isArray(data) ? data : []);
                    if (list.length > 0) return list;
                }
            }
        }
        return [];
    },

    getStudentApplications: async (studentId, jwtToken) => {
        const headers = jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {};
        const backend = (process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000').replace(/\/+$/, '');
        const fallback = backend.includes('localhost') ? 'https://ecell-backend-one.vercel.app' : 'http://localhost:8000';

        for (const url of [backend, fallback]) {
            for (const path of [`/applications/getinfo/?studentId=${studentId}`, `/applications/getinfo?studentId=${studentId}`, `/applications?studentId=${studentId}`]) {
                const data = await fetchWithTimeout(`${url}${path}`, { headers }, 3000);
                if (data) {
                    const list = Array.isArray(data) ? data : (data.data || []);
                    if (list.length > 0) return list;
                }
            }
        }
        return [];
    },
};
