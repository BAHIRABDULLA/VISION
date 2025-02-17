import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import vision_logo from '@/assets/auth/vision_logo.svg'
import Input from '@/components/Input';

import {sendMail} from '@/services/userApi'

import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';



//zod validtation
const forgetPassSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});
type forgetPassSchemaType = z.infer<typeof forgetPassSchema>;


const ForgetPassEmail: React.FC = () => {
  const navigate = useNavigate()

  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<forgetPassSchemaType>({
    resolver: zodResolver(forgetPassSchema),
  });


  const onSubmit: SubmitHandler<forgetPassSchemaType> = async (data) => {
    const {email} = data
    const response  = await sendMail(email)
    if(response?.data.success){
      navigate('/forget-otp',{state:{email,type:'forgetPassword'}})
    }else{
      setError('User not registered')
    }
  };

  return (
    <div className="flex h-screen flex-col lg:flex-row">
      {/* Left Side with Logo */}
      <div className="flex-1 bg-gray-900 flex items-center justify-center">
        <img src={vision_logo} alt="Vision Logo" className="w-1/2 max-w-xs lg:w-3/4" />
      </div>

      {/* Right Side with Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col items-center bg-white justify-center mb-8 p-8">
        <h2 className="text-3xl text-black font-semibold">Forget Password</h2>

        <div className="mt-4 text-gray-500 text-sm text-center">
          <p>Enter your email here to receive a one-time passcode</p>
        </div>

        <div className="flex flex-col items-center mt-4 w-full">
          <Input customClasses="w-full sm:w-3/4 md:w-1/2" label="Email" type="email" 
          {...register('email')} />
          {errors.email && <p className="text-red-700">{errors.email.message}</p>}

        </div>

        <Button text="SUBMIT" type='submit' customClasses="bg-gradient-to-r from-pink-500 to-purple-600 w-full sm:w-3/4 md:w-1/2 mt-3" />

        {/* Error Message */}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </div>


  );
};

export default ForgetPassEmail;
