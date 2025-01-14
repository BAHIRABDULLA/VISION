import { privateApi } from "./axiosConfig";
import  axios, { AxiosError } from "axios"
import { adminPrivateApi } from "./instance/adminInstance";
const api = axios.create({
    baseURL: import.meta.env.VITE_PAYMENT_API_BASE_URL,
    withCredentials: true
})


export const createCheckoutSession = async (data: { price: number, courseId: string }) => {
    console.log(data.courseId, 'data.course id ');

    try {
        const response = await privateApi.post('/payment/create-checkout-session', data)
        return response
    } catch (error) {
        console.error('Error founded in create payment session ', error);
        if (error instanceof AxiosError) {
            return error.response
        }
    }
}


export const mentorOneTimePayment = async (bookingData: object) => {
    try {
        console.log('its here ');
        console.log(bookingData, 'booking data one time payment')
        const response = await privateApi.post('/payment/single', bookingData)
        return response
    } catch (error) {
        console.error('Error founded in mentor onetime payment', error);
    }
}

export const mentorSubscription = async (bookingData: object) => {
    try {
        console.log(bookingData, 'booking data subscription')
        const response = await privateApi.post('/payment/subscription', bookingData)
        return response
    } catch (error) {
        console.error('Error founded in mentor subscription', error);
    }
}

export const mentorshipPayment = async (data: object) => {
    try {
        const response = await privateApi.post('/payment/mentorship-plan', data)
        return response
    } catch (error) {
        console.error('Error founded in common price creation', error);
        if (error instanceof AxiosError) {
            return error.response
        }
    }
}


export const getCoursePaymentDetails = async (courseId: string) => {
    try {
        const response = await privateApi.get(`/payment/course/${courseId}` )
        return response
    } catch (error) {
        if(error instanceof AxiosError){
            return error.response
        }
        console.error('Error founded in get payment detaisl', error);
    }
}


export const getAllCourseReviews = async (courseId: string) => {
    try {
        const response = await api.get(`/review/course/${courseId}`)
        return response
    } catch (error) {
        console.error('Error founded in get all course reviews', error);
        if (error instanceof AxiosError) {
            return error.response
        }
    }
}

export const createCourseReview = async (data: { courseId: string, rating: number, review: string }) => {
    try {
        const response = await privateApi.post('/payment/review/course/create', data)
        return response
    } catch (error) {
        console.error('Error founded in create course review', error);
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
        console.error('Error founded in get all transactions', error);
        if (error instanceof AxiosError) {
            return error.response
        }
    }
}