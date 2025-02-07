import  { AxiosError } from "axios";
import { privateApi } from "./instance/axiosConfig";


// const api = axios.create({
//     baseURL:import.meta.env.VITE_MESSAGING_API_BASE_URL,
//     withCredentials:true
// })



export const getAllUsers = async (userId:string) => {
    try {
        const response = await privateApi.get(`/messages/users/${userId}`)
        return response
    } catch (error) {
        if(error instanceof AxiosError){
            return error.response
        }
    }
   
}