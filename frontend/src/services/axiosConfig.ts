import axios from "axios";
import { refreshToken } from "./userApi";

const api = axios.create({
    baseURL: import.meta.env.VITE_USER_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    console.log(token, 'token in api interceptor ');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})


api.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        try {
            const response = await api.get('/refresh-token', { withCredentials: true })
            if (response.status == 200) {
                const newAccessToken = response.data.accessToken
                localStorage.setItem('accessToken', newAccessToken)
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
                return api(originalRequest)
            }
        } catch (error) {
            console.error('Refresh token failed:', error);
        }
    }
    return Promise.reject(error)
})