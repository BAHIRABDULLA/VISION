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

        <div className="flex flex-col items-center w-full space-y-4">
          
          <Input
            customClasses="w-full md:w-1/2"
            type="email"
            value={email}
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <Password
            value={password}
            customClasses="w-full md:w-1/2"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            text="SIGN IN"
            onClick={handleSignIn}
            customClasses="bg-gradient-to-r from-pink-500 to-purple-600 w-full md:w-1/2"
          />
        </div>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        <div className="flex items-center justify-between my-6 w-full md:w-1/2">
          <hr className="flex-1 border-t" />
          <span className="px-2 text-gray-500">or</span>
          <hr className="flex-1 border-t" />
        </div>

        {/* Google Sign In Button */}
        <button className="border border-gray-300 p-2 rounded-md w-full md:w-1/2 flex items-center justify-center space-x-2">
          <img src={google_logo} alt="Google" className="w-6 h-6" />
          <span>Sign in with Google</span>
        </button>

        <div className="mt-4 text-gray-500 text-sm text-center">
          <a href="/forgot-password" className="text-blue-500">Forgot Password?</a>
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
