import axios from 'axios'


console.log(import.meta.env.VITE_ADMIN_API_BASE_URL, 'IMPORT mete ENV viteapivaseurl');

const api = axios.create({
    baseURL: import.meta.env.VITE_ADMIN_API_BASE_URL
})

export const login = async(email:string,password:string)=>{
    const response = await api.post('/login',{email,password})
    return response
}

export const getAllUsers = async()=>{
    const response = await api.get('/users')
    return response
}