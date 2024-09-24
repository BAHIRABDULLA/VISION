import axios from 'axios'

console.log(import.meta.env.VITE_API_BASE_URL,'IMPORT mete ENV viteapivaseurl');

const api = axios.create({
    baseURL:import.meta.env.VITE_API_BASE_URL
})
export const signInRequest = async(email:string,password:string)=>{
    const response = await api.post('/signin',{email,password})
    console.log(response,'response');
    return response.data
}

export const signUpRequest = async(fullname:string,email:string,password:string,role:boolean)=>{
    const response = await api.post('/signup',{fullname,email,password,role})
    console.log(response,'response');
    return response.data
    
}