import axios from 'axios';

const $api = axios.create({
    baseURL: 'http://localhost:8020/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

$api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

$api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true;
            try {
                if (!originalRequest.url?.includes('/users/me')) {
                    localStorage.removeItem('token');
                    if (!window.location.pathname.includes('/auth')) {
                        window.location.href = '/auth';
                    }
                }
            } catch (e) {
                console.log('Auth error');
            }
        }
        throw error;
    }
);

export default $api;