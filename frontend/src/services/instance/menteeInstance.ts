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
    const token = localStorage.getItem('accessToken-me');
    console.log(token, 'token in api interceptor ');

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
                const response = await privateApi.get('/user/refresh-token/mentee');
                console.log(response, 'response in axios config file');

                if (response.status === 200) {
                    const newAccessToken = response.data.accessToken;
                    localStorage.setItem('accessToken-me', newAccessToken);
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return privateApi(originalRequest);
                }
            } catch (refreshError: any) {
                if (refreshError.response?.status === 403) {
                    localStorage.removeItem('accessToken-me')
                    store.dispatch(menteeLogout())
                }

                console.error('Refresh token failed:', refreshError);
            }
        }
        return Promise.reject(error);
    }
);