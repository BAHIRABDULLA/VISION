import axios from 'axios'
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
        console.log(response, 'resonse ');

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
    console.log('its here ', id);
    console.log(api);

    const response = await adminPrivateApi.get(`/admin/users/${id}`)
    console.log(response, 'response in response ');

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
        console.log(response, 'resposne');

        return response
    } catch (error) {
        console.error('Error founded in update mentor approve status ', error);
    }

}


export const updateUserActiveStatus = async (id: string, isActive: boolean) => {
    try {
        console.log(isActive,'isactive ')
        const response = await adminPrivateApi.patch(`admin/${id}/status`, {isActive})
        return response
    } catch (error) {
        console.error('Error founded in update user active status', error);
    }
}
