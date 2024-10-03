import axios from "axios";

console.log(import.meta.env.VITE_MENTOR_API_BASE_URL,'import meta env vite mentor api');


const api = axios.create({
    baseURL:import.meta.env.VITE_MENTOR_API_BASE_URL
})

export const applyMentor1 = async(data: object,email:string)=>{
    console.log(data,'data in api &&&&&&&');
    
    const response = await api.post('/apply_mentor-1',{data,email}) 
    return response
}
export const applyMentor2 = async(data: object,email:string)=>{
    const response = await api.post('/apply_mentor-2',{data,email}) 
    return response
}