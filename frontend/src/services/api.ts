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

export const signUpRequest = async(fullName:string,email:string,password:string,role:string)=>{
    const response = await api.post('/signup',{fullName,email,password,role})
    console.log(response.data,'response');
    console.log(response.config.data,'response.data.config');
    
    return response.data
    
}

export const otpVerify = async(email:string,otp:string)=>{
    const response = await api.post('/otp',{email,otp})
    console.log(response);
    
}