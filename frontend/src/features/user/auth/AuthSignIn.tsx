import React, { useState, } from 'react';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Password from '@/components/Password';

import vision_logo from '@/assets/auth/vision_logo.svg'
import { Link, useNavigate } from 'react-router-dom';
import { signInRequest } from '@/services/userApi';

import { useDispatch } from 'react-redux';
import { login } from '@/redux/store/authSlice';

import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Google from '@/components/Google';



//zod validtation
const signInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Password must contain at least one letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
});
type SignInSchemaType = z.infer<typeof signInSchema>;


const AuthSignIn: React.FC = () => {
  const navigate = useNavigate()
  const [isMentee, setIsMentee] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const dispatch = useDispatch()

  const { register, handleSubmit, formState: { errors } } = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit: SubmitHandler<SignInSchemaType> = async (data) => {

    const role = isMentee ? 'mentee' : 'mentor';
    try {
      console.log('data:', data);
      const { email, password } = data
      const response = await signInRequest(email, password, role);
      if (response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
      }

      if (response.data.success) {
        dispatch(login(response.data.user));
        if (role == 'mentee') {
          console.log('mentee');

          navigate('/');
        } else {
          console.log('mentor kjkjkjkjkjk');
          navigate('/mentor/dashboard')
        }
      } else {
        setError(response.data.message)
      }
    } catch (error) {
      console.error('Error during sign in:', error);
    }
  };

  return (
    <div className="flex h-screen">

      <div className="hidden md:flex md:flex-1 bg-gray-900 items-center justify-center">
        <img src={vision_logo} alt="vision_logo" className="w-3/4 md:w-2/4 lg:w-1/3" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 w-full md:w-3/4">
        <h2 className="text-3xl font-semibold mb-4">Sign In</h2>

        <div className="flex justify-center w-full mb-6">
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

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-full space-y-4">

          <Input
            customClasses="w-full md:w-1/2"
            type="text"
            label="Email"
            {...register('email')}
          />
          {errors.email && <p className="text-red-700">{errors.email.message}</p>}

          <Password
            customClasses="w-full md:w-1/2"
            {...register('password')}
          />
          {errors.password && <p className="text-red-700">{errors.password.message}</p>}

          <Button
            text="SIGN IN"
            type='submit'
            customClasses="bg-gradient-to-r from-pink-500 to-purple-600 w-full md:w-1/2"
          />
        </form>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        <div className="flex items-center justify-between my-6 w-full md:w-1/2">
          <hr className="flex-1 border-t" />
          <span className="px-2 text-gray-500">or</span>
          <hr className="flex-1 border-t" />
        </div>

        {/* Google Sign In Button */}
        <Google type={isMentee ? 'mentee' : 'mentor'} />


        <div className="mt-4 text-gray-500 text-sm text-center">
          <Link to="/forget-password" className="text-blue-500">Forgot Password?</Link>
          <p className="mt-2">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-blue-500">Sign up as mentee</Link> or{' '}
            <Link to="/signup" className="text-blue-500">apply to be a mentor</Link>
          </p>
        </div>
      </div>
    </div>

  );
};

export default AuthSignIn;
