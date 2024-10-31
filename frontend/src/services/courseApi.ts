import axios from 'axios'
import { privateApi } from './axiosConfig';


console.log(import.meta.env.VITE_COURSE_API_BASE_URL, 'IMPORT mete ENV viteapivaseurl');

const api = axios.create({
    baseURL: import.meta.env.VITE_COURSE_API_BASE_URL,
    withCredentials: true
})


export const addCourse = async (data: object) => {
    try {
        console.log(data, 'data in add course');
        
        const response = await api.post('/', data)
        return response
    } catch (error) {
        console.error('Error founed in add course', error);
    }
}

export const getAllCourses = async () => {
    try {
        const response = await api.get('/')
        return response
    } catch (error) {
        console.error('Error founed in get all courses', error);
    }
}


export const getCourseDetails = async(id:string) => {
    try {
        const response = await api.get(`/${id}`)
        return response
    } catch (error) {
        console.error('Error founded in get course details ',error);
        
    }
}