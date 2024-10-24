import axios from 'axios'
import { privateApi } from './axiosConfig';


console.log(import.meta.env.VITE_USER_API_BASE_URL, 'IMPORT mete ENV viteapivaseurl');

const api = axios.create({
    baseURL: import.meta.env.VITE_USER_API_BASE_URL,
    withCredentials:true
})
export const signInRequest = async (email: string, password: string,role:string) => {
    const response = await api.post('/signin', { email, password ,role})
    console.log(response, 'response');
    return response
}

export const signUpRequest = async ( email: string) => {
    const response = await api.post('/signup', {email})
    console.log(response.data, 'response');
    console.log(response.config.data, 'response.data.config');

    return response.data

}

export const otpVerify = async (fullName:string,email: string,password:string,role:string, otp: string) => {
    const response = await api.post('/otp-signup', { fullName,email,password,role, otp })
    return response

}

export const resendOtp = async (email: string) => {
    const response = await api.post('/otp-resend', { email })
    console.log(response, 'response in resendOtp ');
    return response
}

export const googleSignIn = async (email:string,name:string,role:string) => {
    try {
        const response = await api.post('/google-signin', { email,name,role })
        // console.log(response, 'response in google sign in ');
        return response
    } catch (error) {
        throw error
    }
}

export const sendMail = async(email:string)=>{
    try {
        const response = await api.post('/forget-password',{email})
        console.log(response,'response');
        return response
        
    } catch (error) {
        console.error('Error founding on send email',error);
    }
}
export const resetPassword  = async(email:string,password:string,confirmPassword:string)=>{
    try {
        const response = await api.post('/reset-password',{email,password,confirmPassword})
        console.log(response,'response in reset password ');
        return response
        
    } catch (error) {
        console.error('Error founding in reset password',error); 
    }
}

// export const refreshToken = async()=>{
//     const response = await api.post('/refresh-token')
//     const newAccessToken = response.data.accessToken

//     localStorage.setItem('acessToken',newAccessToken)
//     return newAccessToken
// }

export const updateUserStatus = async(id: string, updateData: { isActive?: boolean, isApproved?: string })=>{
    const response = await api.patch(`/users/${id}`, updateData)
    return response
}

export const getUserDetails = async()=>{
    try {
        const response = await privateApi.get('/user')
        return response
    } catch (error) {
        console.log(error,'error ()()()()()()()()()()()()');
        return error.response
    }
}


export const logout = async()=>{
    try {
        console.log('its herer');
        
        const response = await api.post('/logout')
        return response
    } catch (error) {
          console.error('Error in logout',error);
    }
}