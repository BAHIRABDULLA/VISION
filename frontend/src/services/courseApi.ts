import axios, { AxiosError } from 'axios'
import { adminPrivateApi } from './instance/adminInstance';
import { privateApi } from './instance/axiosConfig';
import { ROUTES } from '@/constants/routeConstants';


console.log(import.meta.env.VITE_COURSE_API_BASE_URL, 'IMPORT mete course ENV viteapivaseurl');

const api = axios.create({
    baseURL: import.meta.env.VITE_COURSE_API_BASE_URL,
    withCredentials: true
})


export const addCourse = async (data: object) => {
    try {
        const response = await adminPrivateApi.post(`${ROUTES.COURSE}`, data)
        return response
    } catch (error) {
        return error
    }
}

export const editCourse = async (data: object, id: string) => {
    try {
        const response = adminPrivateApi.patch(`${ROUTES.COURSE}/${id}`, data)
        return response
    } catch (error) {
        return error
    }
}

export const getAllCourses = async () => {
    try {
        const response = await api.get('/')
        return response
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response
        }
    }
}

export const getCourseDetails = async (id: string) => {
    try {
        const response = await api.get(`/${id}`)
        return response
    } catch (error) {
        return error
    }
}

export const updateCourseStatus = async (id: string, status: string) => {
    try {
        const response = await adminPrivateApi.patch(`${ROUTES.COURSE}/status/${id}`, { status: status })
        return response
    } catch (error) {
        return error
    }
}

export const getResources = async () => {
    try {
        const response = await api.get('/resource')
        return response
    } catch (error) {
        if (error instanceof AxiosError) return error.response
    }
}

export const addResource = async (data: object) => {
    try {
        const response = await adminPrivateApi.post(`${ROUTES.COURSE}/resource`, data)
        return response
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response
        }
    }
}

export const editResource = async (data: object, id: string) => {
    try {
        const response = await adminPrivateApi.patch(`${ROUTES.COURSE}/resource/${id}`, data)
        return response
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response
        }
    }
}

export const updateResourceStatus = async (resourceId: string, status: string) => {
    try {
        const response = await adminPrivateApi.patch(`${ROUTES.COURSE}/resource/status/${resourceId}`, { status })
        return response
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response
        }
    }
}

export const getResourceDetails = async (id: string) => {
    try {
        const response = await api.get(`/resource/${id}`)
        return response
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response
        }
    }
}

export const getAllResourceWithCourseId = async (courseId: string) => {
    try {
        const response = await api.get(`/resource/course/${courseId}`)
        return response
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response
        }
    }
}

export const getPurchasedCourses = async () => {
    try {
        const response = await privateApi.get(`${ROUTES.COURSE}/user`)
        return response
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response
        }
    }
}

export const getSignedUrl = async (fileName: string, fileType: any) => {
    try {
        const response = await adminPrivateApi.post(`${ROUTES.COURSE}/resource/generate-signed-url`, { fileName, fileType })
        return response
    } catch (error) {
        return error
    }
}