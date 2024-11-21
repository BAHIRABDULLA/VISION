import axios from "axios";
import { logout } from "@/redux/slices/adminAuthSlice";
import { store } from "@/redux/store/store";


export const adminPrivateApi = axios.create({
    baseURL: import.meta.env.VITE_COMMON_API_BASE_URL,
    withCredentials: true
})

adminPrivateApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken-a');
    console.log(token, 'token in api interceptor ');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

adminPrivateApi.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const response = await adminPrivateApi.get('admin/refresh-token');
                console.log(response, 'response in axios config file');

                if (response.status === 200) {
                    const newAccessToken = response.data.accessToken;
                    localStorage.setItem('accessToken-a', newAccessToken);
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return adminPrivateApi(originalRequest);
                }
            } catch (refreshError: any) {
                if (refreshError.response?.status === 403) {
                    localStorage.removeItem('accessToken-a')
                    store.dispatch(logout())
                }

                console.error('Refresh token failed:', refreshError);
            }
        }
        return Promise.reject(error);
    }
);