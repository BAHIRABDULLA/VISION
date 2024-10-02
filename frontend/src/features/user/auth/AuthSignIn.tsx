import React, { useState, } from 'react';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Password from '@/components/Password';
import google_logo from '@/assets/auth/google_logo.webp'
import vision_logo from '@/assets/auth/vision_logo.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { googleSignIn, signInRequest } from '@/services/userApi';

import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/firebase';



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


  const { register, handleSubmit, formState: { errors } } = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit: SubmitHandler<SignInSchemaType> = async (data) => {
    const role = isMentee ? 'mentee' : 'mentor';
    try {
      console.log('data:', data);
      const { email, password } = data
      const response = await signInRequest(email, password, role);

      if (response.data.success) {
        if (role == 'mentee') {
          navigate('/');
        }else{
          
        }
      } else {
        setError(response.data.message)
      }
    } catch (error) {
      console.error('Error during sign in:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const role = isMentee ? 'mentee' : 'mentor';
      console.log('reached handle google sign in ');

      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user
      console.log('Google user:', user);
      if (user.email && user.displayName) {
        const response = await googleSignIn(user.email, user.displayName, role);
        console.log(response, 'Response in auth sign in .tsx');
        if (response.data.success) {
          console.log(response.data.success, 'response.data.success')
          if (response.data.role === 'mentee') {    
            console.log(response.data.role, 'response.data.role');

            navigate('/')
          } else {
            console.log(response.data.exist, 'response.data.exist');

            if (response.data.exist === true) {
              console.log('its entered in if condition *****');
              navigate('/mentor/dashboard')
            } else {
              console.log('its entered in else condition ********');
              navigate('/apply-mentor-1')
            }
          }
        } else {
          console.error(response.data.message);
        }
      } else {
        console.error('User email is null');
      }
    } catch (error) {
      console.error('Error during Google sign-in:', error);
    }
  }

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
            type="email"
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
        <button className="border border-gray-300 p-2 rounded-md
         w-full md:w-1/2 flex items-center justify-center space-x-2" onClick={handleGoogleSignIn}>
          <img src={google_logo} alt="Google" className="w-6 h-6" />
          <span>Continue with Google</span>
        </button>

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
