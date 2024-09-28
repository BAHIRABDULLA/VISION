import React from 'react'
import vision_logo from '@/assets/auth/vision_logo.svg'
import Input from '@/components/Input'
import Password from '@/components/Password'
import Button from '@/components/Button'


const Login = () => {
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
                    <Input label='Email' customClasses='w-full mb-6' />
                    <Password customClasses='w-full mb-6' />
                    <Button text='Login' type='submit'  customClasses='w-full text-sky-500 
                    hover:text-white hover:bg-sky-400 outline mb-5 mt-5'/>
                </div>
                
            </div>
        </div>
    )
}

export default Login