import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '@/components/Input';
import Button from '@/components/Button';
import vision_logo from '@/assets/auth/vision_logo.svg';


import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {  signUpRequest } from '@/services/userApi';
import PasswordInput from '@/components/Password';
import Google from '@/components/Google';

// Zod schema validation
const signUpSchema = z.object({
  fullName: z.string().min(1, { message: "Name cannot be empty" }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Password must contain at least one letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
});

type SignUpSchemaType = z.infer<typeof signUpSchema>;


const AuthSignUp: React.FC = () => {
  const navigate = useNavigate();
  const [isMentee, setIsMentee] = useState(true);

  const [error,setError] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpSchemaType> = async (data) => {
    const role = isMentee ? 'mentee' : 'mentor';
    try {
      console.log('data:', data);
      const { fullName, email, password } = data
      const response = await signUpRequest(fullName, email, password, role);
      if (response.success) {
        navigate('/otp-signup', { state: { email, type: 'signup' } });
      } else {
        setError(response.message)
      }
    } catch (error) {
      console.error('Error during sign up:', error);
    }
  };


  return (
    <div className="flex h-screen">
      {/* Left side with logo */}
      <div className="flex-1 bg-gray-900 flex items-center justify-center">
        <img src={vision_logo} alt="vision_logo" />
      </div>

      {/* Right side with form */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <h2 className="text-3xl font-semibold mb-8">Sign Up</h2>

        {/* Role selection buttons */}
        <div className="flex justify-center w-full mb-4">
          <button
            className={`px-4 py-2 ${isMentee ? 'border-b-2 border-purple-500 text-purple-600' : 'text-gray-500'}`}
            onClick={() => setIsMentee(true)}
          >
            I'm a mentee
          </button>
          <button
            className={`px-4 py-2 ml-4 ${!isMentee ? 'border-b-2 border-purple-500 text-purple-600' : 'text-gray-500'}`}
            onClick={() => setIsMentee(false)}
          >
            I'm a mentor
          </button>
        </div>

        {/* Sign up form */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-center">
          <div className="w-1/2">
            <Input
              customClasses="w-full"
              label="Full Name"
              type="text"
              {...register('fullName')}
            />

            {errors.fullName && <p className="text-red-700">{errors.fullName.message}</p>}

            <Input
              customClasses="w-full"
              label="Email"
              type="email"
              {...register('email')}
            />
            {errors.email && <p className="text-red-700">{errors.email.message}</p>}

            <PasswordInput
              customClasses="w-full"
              {...register('password')}
            />
            {errors.password && <p className="text-red-700">{errors.password.message}</p>}
          </div>

          <Button
            type="submit" text="SIGN UP"
            customClasses="bg-gradient-to-r from-pink-500 to-purple-600 w-1/2 mt-3"
          />
        </form>

        {/* Error messages if needed */}
        <p className="text-red-500 mt-4">{error}</p>

        {/* Divider with "or" */}
        <div className="flex items-center justify-between my-4 w-1/2">
          <hr className="flex-1 border-t" />
          <span className="px-2 text-gray-500">or</span>
          <hr className="flex-1 border-t" />
        </div>

        {/* Google Sign up button */}     
        <Google type={isMentee?'mentee':'mentor'}/>

        {/* Redirect to Sign In */}
        <div className="mt-4 text-gray-500 text-sm">
          <p>
            Already have an account?{' '}
            <Link to='/signin' className="text-blue-500">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthSignUp;
