import React, { useState } from 'react'
import vision_logo from '@/assets/auth/vision_logo.svg'
import Input from '@/components/Input'
import { useNavigate } from 'react-router-dom'
import Password from '@/components/Password'
import { login } from '@/services/adminApi'



const Login = () => {
    const navigate= useNavigate()
    const [email,setEmail] = useState('')
    const [password,setPassword]= useState('')
    const [error,setError] = useState('')

    
    const handleSubmit = async(e: { preventDefault: () => void })=>{
        e.preventDefault()
        const response = await login(email,password)
        if(response.data.success){
            console.log(response,'response');
            
            navigate('/admin/dashboard')
        }else{
            setError(response.data.message)
        }
    }
    return (
        <div className='bg-sky-900 min-h-screen flex flex-col justify-center items-center'>
            <img src={vision_logo} className='h-32 ' alt="vision_logo" />
            <div className='flex bg-white  rounded-lg shadow-lg p-10 w-full max-w-2xl '>
                <div className='hidden md:flex md:w-1/2 items-center justify-center'>
                    <img src="" alt="image " 
                    className='rounded-lg object-cover' />
                </div>
                <div className='md:w-1/2 w-full'>
                    <h2 className='text-4xl text-bold text-sky-700 mb-6'>Welcome Back</h2>
                    <Input label='Email'value={email} onChange={(e)=>setEmail(e.target.value)} customClasses='w-full mb-6' />
                    <Password value={password} onChange={(e)=>setPassword(e.target.value)} customClasses='w-full mb-6' />

                        <p className='text-sm text-red-700'>{error}</p>
                    <button onClick={handleSubmit} type='button' className='w-full text-white
                    hover:text-white bg-sky-300 hover:bg-sky-400 outline mb-5 mt-5
                    py-3 px-6  rounded-lg  font-semibold'>Login</button>
                </div>
                
            </div>
        </div>
    )
}

export default Login