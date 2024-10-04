import axios from "axios";
import { refreshToken } from "./userApi";

const axiosInstance = axios.create({
    baseURL:import.meta.env.VITE_USER_API_BASE_URL,
    headers:{
        'Content-Type':'application/json'
    }
})

axios.interceptors.response.use(
    (response)=>response,
    async(error)=>{
        const originalRequest = error.config
        if(error.response && error.response.status ===401 && !originalRequest._retry){
            originalRequest._retry  =true

            try {
                const newAccessToken = await refreshToken();    
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);  
            } catch (error) {
                console.error("Refreshtoken failed",error);
                
            }
        }
        return Promise.reject(error)
    }
)