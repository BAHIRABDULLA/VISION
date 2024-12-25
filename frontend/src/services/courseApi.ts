import axios, { AxiosError } from 'axios'
import { privateApi } from './axiosConfig';
import { adminPrivateApi } from './instance/adminInstance';


console.log(import.meta.env.VITE_COURSE_API_BASE_URL, 'IMPORT mete course ENV viteapivaseurl');

const api = axios.create({
    baseURL: import.meta.env.VITE_COURSE_API_BASE_URL,
    withCredentials: true
})


export const addCourse = async (data: object) => {
    try {
        const response = await adminPrivateApi.post('/course', data)
        return response
    } catch (error) {
        console.error('Error founed in add course', error);
    }
}

export const editCourse = async (data: object, id: string) => {
    try {
        const response = adminPrivateApi.patch(`/course/${id}`, data)
        return response
    } catch (error) {
        console.error('Error founded in edit course', error);
    }
}


export const getAllCourses = async () => {
    try {
        const response = await api.get('/')
        return response
    } catch (error) {
        console.error('Error founed in get all courses', error);
        if(error instanceof AxiosError){
            return error.response
        }
    }
}


export const getCourseDetails = async (id: string) => {
    try {
        const response = await api.get(`/${id}`)
        return response
    } catch (error) {
        console.error('Error founded in get course details ', error);
    }
}


export const updateCourseStatus = async (id: string, status: string) => {
    try {
        const response = await adminPrivateApi.patch(`/course/status/${id}`, { status: status })
        return response
    } catch (error) {
        console.error('Error founded in update course ', error);
    }
}

export const getResources = async ()=>{
    try {
        const response  = await api.get('/resource')
        return response
    } catch (error) {
        console.error('Error founded in get resource',error);
        if(error instanceof AxiosError)return error.response
    }
}



export const addResource = async (data: object) => {
    try {
        const response = await adminPrivateApi.post('/course/resource',data)
        return response
    } catch (error) {
        console.error('Error founded in add resource', error);
    }
}