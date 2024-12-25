import axios from 'axios'
import { privateApi } from './axiosConfig';


console.log(import.meta.env.VITE_USER_API_BASE_URL, 'IMPORT mete ENV viteapivaseurl');

const api = axios.create({
    baseURL: import.meta.env.VITE_USER_API_BASE_URL,
    withCredentials: true
})


export const signInRequest = async (email: string, password: string, role: string) => {
    const response = await api.post('/signin', { email, password, role })
    return response
}

export const signUpRequest = async (email: string) => {
    const response = await api.post('/signup', { email })
    return response.data
}


export const otpVerify = async (fullName: string, email: string, password: string, role: string, otp: string,type:string) => {
    const response = await api.post('/otp-signup', { fullName, email, password, role, otp ,type})
    return response

}

export const resendOtp = async (email: string) => {
    const response = await api.post('/otp-resend', { email })
    return response
}


export const googleSignIn = async (email: string, name: string, role: string) => {
    try {
        const response = await api.post('/google-signin', { email, name, role })
        return response
    } catch (error) {
        throw error
    }
}

export const sendMail = async (email: string) => {
    try {
        const response = await api.post('/forget-password', { email })
        console.log(response, 'response');
        return response

    } catch (error) {
        console.error('Error founding on send email', error);
    }
}


export const resetPassword = async (email: string, password: string, confirmPassword: string) => {
    try {
        const response = await api.post('/reset-password', { email, password, confirmPassword })
        console.log(response, 'response in reset password ');
        return response

    } catch (error) {
        console.error('Error founding in reset password', error);
    }
}




export const getUserDetails = async () => {
    try {
        const response = await privateApi.get('/user')
        return response
    } catch (error) {
        return error
    }
}


export const logout = async () => {
    try {
        const response = await api.post('/logout')
        return response
    } catch (error) {
        console.error('Error in logout', error);
    }
}

export const updateCommonData = async ( data: object) => {
    try {
        const response = await privateApi.post(`/user`, data)
        return response
    } catch (error) {
        console.error('Error in update common data', error);
    }
}

export const passwordUpdate = async(data:object)=>{
    try {
        const response = await privateApi.patch('/user/change-password',data)
        return response
    } catch (error) {
        console.error('Error founded in password update ',error);
    }
}