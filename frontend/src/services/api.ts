import axios from 'axios'


console.log(import.meta.env.VITE_API_BASE_URL, 'IMPORT mete ENV viteapivaseurl');

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
})
export const signInRequest = async (email: string, password: string,role:string) => {
    const response = await api.post('/signin', { email, password ,role})
    console.log(response, 'response');
    return response
}

export const signUpRequest = async (fullName: string, email: string, password: string, role: string) => {
    const response = await api.post('/signup', { fullName, email, password, role })
    console.log(response.data, 'response');
    console.log(response.config.data, 'response.data.config');

    return response.data

}

export const otpVerify = async (email: string, otp: string) => {
    const response = await api.post('/otp-signup', { email, otp })
    console.log(response, 'response in otpVerify');

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