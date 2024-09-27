import React, { useState } from 'react';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Password from '@/components/Password';
import google_logo from '@/assets/auth/google_logo.webp'
import vision_logo from '@/assets/auth/vision_logo.svg'
import { Link, NavLink } from 'react-router-dom';


const AuthSignIn: React.FC = () => {
  const [isMentee, setIsMentee] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); 

  const handleSignIn = async () => {
    try {
      // await signIn(email, password, isMentee); // Call the sign-in service function
      // Redirect or show success message
    } catch (err) {
      setError('Sign in failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="flex h-screen">
      
      <div className="flex-1 bg-gray-900 flex items-center justify-center">
        <img src={vision_logo} alt="vision_logo" className='' />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <h2 className="text-3xl font-semibold mb-8">Sign In</h2>

        {/* Tabs for mentee and mentor */}
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

        <div className="flex flex-col items-center mt-6 w-full h-screen">
          {/* Email Input */}
          <Input customClasses='w-1/2' type='email' value={email}
            label='Email' onChange={(e) => setEmail(e.target.value)} />

          {/* Password Input with Icon */}
          <Password value={password} customClasses='w-1/2' onChange={(e) => setPassword(e.target.value)} />
        </div>


        <Button text="SIGN IN" onClick={handleSignIn} customClasses="bg-gradient-to-r from-pink-500 to-purple-600 w-1/2 mt-0" />

        {/* Error Message */}
        {error && <p className="text-red-500 mt-4">{error}</p>}

        {/* Divider */}
        <div className="flex items-center justify-between my-4 w-1/2	">
          <hr className="flex-1 border-t" />
          <span className="px-2 text-gray-500">or</span>
          <hr className="flex-1 border-t" />
        </div>

        {/* Google Sign In Button */}
        <button className="border border-gray-300 p-1 rounded-md w-1/2	 flex items-center justify-center space-x-2">
          <img src={google_logo} alt="Google" className="w-6 h-6" />
          <span>Sign in with Google</span>
        </button>

        {/* Forgot Password and Links */}
        <div className="mt-4 text-gray-500 text-sm">
          <a href="/forgot-password" className="text-blue-500">Forget Password?</a>
          <p className="mt-2">
            Don’t have an account?{' '}
            <Link to='/signup' className='text-blue-500'>Sign up as mentee</Link> or{' '}
            <Link to='/signup' className='text-blue-500'>apply to be a mentor</Link>
          </p>
        </div>
      </div>

    </div>
  );
};

export default AuthSignIn;
