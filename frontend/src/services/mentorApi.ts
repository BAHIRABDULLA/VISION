import axios, { AxiosError } from "axios";
import { privateApi } from "./axiosConfig";
import { Try } from "@mui/icons-material";

console.log(import.meta.env.VITE_MENTOR_API_BASE_URL, 'import meta env vite mentor api');


const api = axios.create({
    baseURL: import.meta.env.VITE_MENTOR_API_BASE_URL
})


export const applyMentor = async (data: object) => {
    const response = await api.post('/apply-mentor', data)
    return response
}


export const updateMentorData = async (id: string, data: object) => {
    try {
        const response = await api.patch(`/${id}`, data)
        console.log(response, 'respons in mentor api ');

        return response
    } catch (error) {
        console.error('Error founded in update mentor data ', error);
    }
}

export const updateMentorSessionPrice = async (data: object) => {
    try {
        const response = await privateApi.patch(`mentor/session-price`, data)
        console.log(response, 'response update mentor session price in metorapi');

        return response
    } catch (error) {
        console.error('Error founded in update mentor price', error);
        if (error instanceof AxiosError) {
            return error.response
        }
    }
}



export const getMentorData = async () => {
    try {
        const response = await privateApi.get('/mentor/eg')
        return response
    } catch (error) {
        console.error('Error founded in fetch session price', error);
    }
}

export const createSlot = async (data: object) => {
    try {
        console.log(data, 'data');
        const response = await privateApi.post('/mentor/slots', data)

        return response
    } catch (error) {
        console.error('Error founded in create slot ', error);
    }
}


export const getSlots = async () => {
    try {
        const response = await api.get('/slots')
        return response
    } catch (error) {
        console.error('Error founded in get slots', error);
    }
}

export const deleteSlot = async (slotId: string) => {
    try {
        const response = await privateApi.delete(`/mentor/slots/${slotId}`)
        return response
    } catch (error) {
        console.error('Error founded in deleteSlot', error);
    }
}


export const getAllMentors = async (paramsData: object) => {
    try {
        const response = await api.get('/', {
            params: paramsData
        })
        return response
    } catch (error) {
        console.error('Error foiunded in get all mentors', error);
    }
}


export const mentorSpecificData = async (id: string) => {
    try {
        const response = await api.get(`/${id}`)
        console.log(response, 'response ');

        return response
    } catch (error) {
        console.error('Errror founded in mentor specific data', error);
    }
}


export const slotBooking = async (mentorId:string,time:string,date:object) => {
    try {
        const resposne = await privateApi.post('/mentor/slots/booking',{mentorId,time,date})
        return resposne
    } catch (error) {
        console.error('Error founded in slot booking ',error);
        if (error instanceof AxiosError) {
            return error.response
        }
    }
}