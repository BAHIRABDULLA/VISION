import axios from "axios";
import { privateApi } from "./axiosConfig";

console.log(import.meta.env.VITE_MENTOR_API_BASE_URL, 'import meta env vite mentor api');


const api = axios.create({
    baseURL: import.meta.env.VITE_MENTOR_API_BASE_URL
})
export const applyMentor = async (data: object) => {
    const response = await api.post('/apply-mentor', data)
    return response
}


export const updateMentorData = async (id: string, data: object) => {
    try {
        const response = await api.patch(`/${id}`, data)
        console.log(response,'respons in mentor api ');
        
        return response
    } catch (error) {
        console.error('Error founded in update mentor data ',error);
    }

}