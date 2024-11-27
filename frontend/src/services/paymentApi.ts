import { privateApi } from "./axiosConfig";
import axios from "axios"
const api = axios.create({
    baseURL: import.meta.env.VITE_PAYMENT_API_BASE_URL,
    withCredentials: true
})


export const createCheckoutSession = async (data:{price:number , courseId:string}) => {
    console.log(data.courseId,'data.course id ');
    
    try {
        const response = await privateApi.post('/payment/create-checkout-session',data)
        return response
    } catch (error) {
        console.error('Error founded in create payment session ',error);
    }
}


export const mentorOneTimePayment = async(bookingData:object)=>{
    try {
        console.log('its here ');
        console.log(bookingData,'booking data one time payment')
        const response = await privateApi.post('/payment/single',bookingData)
        return response
    } catch (error) {
        console.error('Error founded in mentor onetime payment',error);
    }
}

export const mentorSubscription = async(bookingData:object)=>{
    try {
        console.log(bookingData,'booking data subscription')
        const response = await privateApi.post('/payment/subscription',bookingData)
        return response
    } catch (error) {
        console.error('Error founded in mentor subscription',error);
    }
}

export const mentorshipPayment = async(data:object)=>{
    try {
        const response = await privateApi.post('/payment/mentorship-plan',data)
        return response
    } catch (error) {
        console.error('Error founded in common price creation',error);
        return error
    }
}