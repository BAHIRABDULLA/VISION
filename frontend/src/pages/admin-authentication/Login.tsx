import { useState } from 'react'

import vision_logo2 from '@/assets/auth/vison_logo_black.svg'
import Input from '@/components/Input'
import { useNavigate } from 'react-router-dom'
import Password from '@/components/Password'
import { loginApi } from '@/services/adminApi'
import { z } from 'zod'
import { zodResolver, } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { login } from '@/redux/slices/adminAuthSlice'
import {  Card, CardContent } from '@mui/material'


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
            console.error('Error founded in admin login', error);
        }

    }
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
            <Card className="w-full max-w-2xl">
                <CardContent className="p-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="flex justify-center">
                            <img
                                src={vision_logo2}
                                alt="Vision Logo"
                                className="h-32 object-contain"
                            />
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-4xl font-bold text-purple-600">Welcome Back</h2>
                            <p className="text-gray-600">Please sign in to continue</p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <Input label='Email' {...register('email')} customClasses='w-full mb-6' />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                                )}
                            </div>

                            <div>
                                <Password {...register('password')} customClasses='w-full mb-6' />
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                                )}
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
                                <p className="text-sm">{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                        >
                            Sign In
                        </button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default AdminLogin