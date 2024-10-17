import axios from 'axios'


console.log(import.meta.env.VITE_ADMIN_API_BASE_URL, 'IMPORT mete ENV viteapivaseurl');

const api = axios.create({
    baseURL: import.meta.env.VITE_ADMIN_API_BASE_URL
})

export const loginApi = async(data:object)=>{
    const response = await api.post('/login',data)
    return response
}

export const getAllUsers = async()=>{
    const response = await api.get('/users')
    return response
}

export const userData = async(id:string)=>{
    console.log('its here ',id);
    console.log(api);
    
    const response = await api.get(`/users/${id}`)
    console.log(response,'response in response ');
    
    return response
}

