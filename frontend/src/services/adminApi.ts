import axios, { AxiosError } from 'axios'
// import { privateApi } from './axiosConfig';
import { adminPrivateApi } from './instance/adminInstance';

console.log(import.meta.env.VITE_ADMIN_API_BASE_URL, 'IMPORT mete ENV viteapivaseurl');

const api = axios.create({
    baseURL: import.meta.env.VITE_ADMIN_API_BASE_URL,
    withCredentials: true
})

export const loginApi = async (data: object) => {
    try {
        const response = await api.post('/login', data)
        return response
    } catch (error) {
        console.error('ERror founded in login api', error);
    }
}

export const getAllUsers = async () => {
    const response = await api.get('/users')
    return response
}

export const userData = async (id: string) => {

    const response = await adminPrivateApi.get(`/admin/users/${id}`)
    return response
}


export const logout = async () => {
    try {
        const response = await api.post('/logout')
        return response
    } catch (error) {
        console.error('Error founded in admin logout', error);
    }
}


export const updateMentorApproveStatus = async (id: string, isApproved: string) => {
    try {
        const response = await adminPrivateApi.patch(`/admin/${id}/approval`, { isApproved })
        return response
    } catch (error) {
        console.error('Error founded in update mentor approve status ', error);
    }

}


export const updateUserActiveStatus = async (id: string, isActive: boolean) => {
    try {
        const response = await adminPrivateApi.patch(`admin/${id}/status`, {isActive})
        return response
    } catch (error) {
        console.error('Error founded in update user active status', error);
    }
}


export const getAllCategories = async()=>{
    try {
        const response = await api.get('/category')
        return response
    } catch (error) {
        console.error('Error founded in get all categories',error);
    }
}


export const saveNewCategory = async (data:object)=>{
    try {
        const response = await adminPrivateApi.post('/admin/category',data)
        return response
    } catch (error) {
        console.error('Error founded in save new category ',error);
        if(error instanceof AxiosError){
            return error.response
        }
    }
}

export const updateCategory = async (id:string,data:object)=>{
    try {
        const response = await adminPrivateApi.patch(`/admin/category/${id}`,data)
        return response
    } catch (error) {
        console.error('Error founddedin in update category',error);
        if(error instanceof AxiosError){
            return error.response
        }
    }
}