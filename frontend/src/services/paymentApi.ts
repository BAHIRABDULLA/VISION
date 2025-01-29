import { privateApi } from "./instance/axiosConfig";
import axios, { AxiosError } from "axios"
import { adminPrivateApi } from "./instance/adminInstance";
const api = axios.create({
    baseURL: import.meta.env.VITE_PAYMENT_API_BASE_URL,
    withCredentials: true
})


export const createCheckoutSession = async (data: { price: number, courseId: string }) => {
    try {
        const response = await privateApi.post('/payment/create-checkout-session', data)
        return response
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response
        }
    }
}

export const mentorOneTimePayment = async (bookingData: object) => {
    try {
        const response = await privateApi.post('/payment/single', bookingData)
        return response
    } catch (error) {
        return error
    }
}

export const mentorSubscription = async (bookingData: object) => {
    try {
        const response = await privateApi.post('/payment/subscription', bookingData)
        return response
    } catch (error) {
        return error
    }
}

export const mentorshipPayment = async (data: object) => {
    try {
        const response = await privateApi.post('/payment/mentorship-plan', data)
        return response
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response
        }
    }
}

export const getCoursePaymentDetails = async (courseId: string) => {
    try {
        const response = await privateApi.get(`/payment/course/${courseId}`)
        return response
    } catch (error) {
        if (error instanceof AxiosError) {            
            return error.response
        }
        return null
    }
}

export const createReview = async (data: { courseIdOrMentorId: string, rating: number, review: string, reviewType: 'course' | 'mentorship' }) => {
    try {
        const response = await privateApi.post('/payment/review/create', data)
        return response
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response
        }
    }
}

export const getAllReviews = async (courseIdOrMentorId: string, reviewType: 'course'|'mentorship') => {
    try {
        const response = await api.get(`/review/${courseIdOrMentorId}`, { params: { reviewType } })
        return response
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response
        }
    }
}

export const getAllTransaction = async () => {
    try {
        const response = await adminPrivateApi.get('/payment/transactions')
        return response
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response
        }
    }
}

export const getUserBillingHistory = async () => {
    try {
        const response = await privateApi.get('/payment/billing/history')
        return response
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response
        }
    }
}