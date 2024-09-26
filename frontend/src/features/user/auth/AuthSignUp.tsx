import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '@/components/Input';
import Button from '@/components/Button';
import google_logo from '../../../assets/auth/google_logo.webp'
import vision_logo from '../../../assets/auth/vision_logo.svg'


import { signUpRequest } from '@/services/api';
import Password from '@/components/Password';

const AuthSignUp: React.FC = () => {
  const navigate = useNavigate()
  const [isMentee, setIsMentee] = useState(true);
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async () => {
    try {

      console.log(isMentee, 'isMentee');
      const role = isMentee ? 'mentee' : 'mentor'

      const response = await signUpRequest(fullName, email, password, role)
      console.log(response, 'response in client side');

      if (response.success) {
        console.log(response.success, 'response success');

        console.log('$$$$$$$$$$$');

        navigate('/otp-signup')
      } else {
        setError('Sign in failed. Please try again ')
      }
    } catch (err) {
      setError('Sign in failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-gray-900 flex items-center justify-center">
        <img src={vision_logo} alt="vision_logo" className='' />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 ">
        <h2 className="text-3xl font-semibold mb-8">Sign Up</h2>

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

        <div className="flex flex-col items-center mt-0 w-full h-screen">
          <Input customClasses='w-1/2	' label="Full Name" type="text"
            value={fullName} onChange={(e) => setFullName(e.target.value)} />

          <Input customClasses='w-1/2	' label="Email" type="email"
            value={email} onChange={(e) => setEmail(e.target.value)} />

          <Password value={password} onChange={(e) => setPassword(e.target.value)} customClasses='w-1/2' />
        </div>


        <Button text="SIGN UP" onClick={handleSignUp} customClasses="bg-gradient-to-r from-pink-500 to-purple-600 w-1/2 mt-3" />


        {error && <p className="text-red-500 mt-4">{error}</p>}


        <div className="flex items-center justify-between my-4 w-1/2	">
          <hr className="flex-1 border-t" />
          <span className="px-2 text-gray-500">or</span>
          <hr className="flex-1 border-t" />
        </div>


        <button className="border border-gray-300 p-1 rounded-md w-1/2	 flex items-center justify-center space-x-2">
          <img src={google_logo} alt="Google" className="w-6 h-6" />
          <span>Sign up with Google</span>
        </button>


        <div className="mt-4 text-gray-500 text-sm">

          <p className="mt-2">
            Already have an account ?{' '}
            <Link to='/signin' className='text-blue-500'>Sign In</Link>
          </p>
        </div>
      </div>

    </div>
  );
};

export default AuthSignUp;
