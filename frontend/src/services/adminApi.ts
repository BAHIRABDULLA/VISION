import axios, { AxiosError } from 'axios'
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
        return error
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
        return error
    }
}

export const updateMentorApproveStatus = async (id: string, isApproved: string) => {
    try {
        const response = await adminPrivateApi.patch(`/admin/${id}/approval`, { isApproved })
        return response
    } catch (error) {
        return error
    }

}

export const updateUserActiveStatus = async (id: string, isActive: boolean) => {
    try {
        const response = await adminPrivateApi.patch(`admin/${id}/status`, { isActive })
        return response
    } catch (error) {
        return error
    }
}

export const getAllCategories = async () => {
    try {
        const response = await api.get('/category')
        return response
    } catch (error) {
        return error
    }
}

export const saveNewCategory = async (data: object) => {
    try {
        const response = await adminPrivateApi.post('/admin/category', data)
        return response
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response
        }
    }
}

export const updateCategory = async (id: string, data: object) => {
    try {
        const response = await adminPrivateApi.patch(`/admin/category/${id}`, data)
        return response
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response
        }
    }
}

export const updateCategoryStatus = async (categoryId:string,status:'active'|'block') =>{
    try {        
        const response = await adminPrivateApi.patch(`/admin/category/status/${categoryId}`,{status})
        return response
    } catch (error) {
        if(error instanceof AxiosError){
            return error.response
        }
    }
}

export const getAdminDashbaordData = async () => {
    try {
        const resposne = await adminPrivateApi.get('/admin/dashboard')
        return resposne
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response
        }
    }
}