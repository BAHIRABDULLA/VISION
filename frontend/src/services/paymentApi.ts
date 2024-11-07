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