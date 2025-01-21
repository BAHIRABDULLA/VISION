import  { useState } from 'react'

import vision_logo2 from '@/assets/auth/vison_logo_black.svg'
import Input from '@/components/Input'
import { useNavigate } from 'react-router-dom'
import Password from '@/components/Password'
import { loginApi } from '@/services/adminApi'
import { z } from 'zod'
import { zodResolver, } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import loginPhoto from '@/assets/auth/3d-isometric-flat-of-mentoring-vector-50068473.jpg'
import { useDispatch } from 'react-redux'
import { login } from '@/redux/slices/adminAuthSlice'


const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be 8 character" })
})
type loginSchemaType = z.infer<typeof loginSchema>
const AdminLogin = () => {
    const dispatch = useDispatch()

    const { register, handleSubmit, formState: { errors } } = useForm<loginSchemaType>({
        resolver:
            zodResolver(loginSchema)
    })
    const navigate = useNavigate()

    const [error, setError] = useState('')


    const onSubmit = async (data: object) => {
        try {
            const response = await loginApi(data)
            if (response?.data.token) {
                localStorage.setItem('accessToken-a', response.data.token)
                dispatch(login({ token: response.data.token, admin: response.data }))
                navigate('/admin/dashboard')
            } else {
                setError(response?.data.message)
            }
        } catch (error) {
            console.error('Error founded in admin login',error);
        }

    }
    return (
        <div className='bg-gray-200 min-h-screen flex flex-col justify-center items-center'>
            <img src={vision_logo2} className='h-32 ' alt="vision_logo" />
            <form onSubmit={handleSubmit(onSubmit)} className='flex bg-white gap-3 rounded-lg shadow-lg p-10 w-full max-w-2xl '>
                <div className='hidden md:flex md:w-1/2 items-center justify-center'>
                    <img src={loginPhoto} alt="image "
                        className='rounded-lg object-cover' />
                </div>
                <div className='md:w-1/2 w-full'>
                    <h2 className='text-4xl text-bold text-sky-700 mb-6'>Welcome Back</h2>
                    <Input label='Email' {...register('email')} customClasses='w-full mb-6' />
                    {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
                    <Password {...register('password')} customClasses='w-full mb-6' />
                    {errors.password && <p className='text-red-600'>{errors.password.message}</p>}

                    <p className='text-sm text-red-700'>{error}</p>
                    <button type='submit' className='w-full text-white
                    hover:text-white bg-sky-300 hover:bg-sky-400 outline mb-5 mt-5
                    py-3 px-6  rounded-lg  font-semibold'>Login</button>
                </div>

            </form>
        </div>
    )
}

export default AdminLogin