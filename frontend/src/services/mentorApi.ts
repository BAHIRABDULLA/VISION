import axios, { AxiosError } from "axios";
import { privateApi } from "./instance/axiosConfig";

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
        return response
    } catch (error) {
        return error
    }
}

export const updateMentorSessionPrice = async (data: object) => {
    try {
        const response = await privateApi.patch(`mentor/session-price`, data)

        return response
    } catch (error) {
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
        return error
    }
}

export const createSlot = async (data: object) => {
    try {
        const response = await privateApi.post('/mentor/slots', data)

        return response
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response
        }
    }
}

export const getSlotByUserId = async () => {
    try {
        const response = await privateApi.get('/mentor/slots')
        return response
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response
        }
    }
}

export const getSlots = async () => {
    try {
        const response = await api.get('/slots')
        return response
    } catch (error) {
        return error;
    }
}

export const deleteSlot = async (slotId: string) => {
    try {
        const response = await privateApi.delete(`/mentor/slots/${slotId}`)
        return response
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response
        }
    }
}

export const getAllMentorsWithParamsData = async (paramsData: object) => {
    try {
        const response = await api.get('/', {
            params: paramsData
        })
        return response
    } catch (error) {
        return error
    }
}

export const getAllMentors = async () => {
    try {
        const response = await api.get('/mentors')
        return response
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response
        }
    }
}

export const mentorSpecificData = async (id: string) => {
    try {
        const response = await api.get(`/${id}`)

        return response
    } catch (error) {
        return error
    }
}

export const slotBooking = async (mentorId: string, time: string, date: object) => {
    try {
        const resposne = await privateApi.post('/mentor/slots/booking', { mentorId, time, date })
        return resposne
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response
        }
    }
}

export const getBookings = async () => {
    try {
        const response = await privateApi.get('/mentor/slots/booking')
        return response
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response
        }
    }
}

export const getBookingDetails = async (bookingId: string) => {
    try {
        const response = await privateApi.get(`/mentor/slots/booking/${bookingId}`)
        return response
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response
        }
    }
}

export const handleBookingSessionStatus  = async(bookingId:string,status:string)=>{
    try {
        const response = await privateApi.patch(`/mentor/slots/booking/${bookingId}`,{status})
        return response
    } catch (error) {
        if(error instanceof AxiosError){
            return error.response
        }
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


export const getSignedUrl = async (fileName: string, fileType: any) => {
    try {
        const response = await api.post('/generate-signed-url', { fileName, fileType })
        return response
    } catch (error) {
        return error
    }
}