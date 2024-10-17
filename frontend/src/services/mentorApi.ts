import axios from "axios";

console.log(import.meta.env.VITE_MENTOR_API_BASE_URL,'import meta env vite mentor api');


const api = axios.create({
    baseURL:import.meta.env.VITE_MENTOR_API_BASE_URL
})
export const applyMentor = async(data:object)=>{
    const response = await api.post('/apply-mentor',data)
    return response
}
