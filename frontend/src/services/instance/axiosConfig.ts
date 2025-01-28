
import axios from "axios";
import { logout as menteeLogout } from "@/redux/slices/menteeAuthSlice";
import { logout as mentorLogout } from "@/redux/slices/mentorAuthSlice";
import { store } from "@/redux/store/store";


// import { refreshToken } from "./userApi";


export const privateApi = axios.create({
    baseURL: import.meta.env.VITE_COMMON_API_BASE_URL,
    withCredentials: true
})

privateApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

privateApi.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const response = await privateApi.get('/user/refresh-token');
                if (response.status === 200) {
                    const newAccessToken = response.data.accessToken;
                    localStorage.setItem('accessToken', newAccessToken);
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return privateApi(originalRequest);
                }
            } catch (refreshError: any) {
                if (refreshError.response?.status === 403) {
                    localStorage.removeItem('accessToken')
                    const state = store.getState()
                    const userRole = state.menteeAuth.user?.role || state.mentorAuth.user?.role
                    if (userRole === 'mentee') {
                        store.dispatch(menteeLogout())
                    } else if (userRole === 'mentor') {
                        store.dispatch(mentorLogout())
                    }
                }
                console.error('Refresh token failed:', refreshError);
                throw error
            }
        }
        return Promise.reject(error);
    }
);
