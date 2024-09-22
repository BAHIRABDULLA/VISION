import Otp from '@/components/Otp'
import React, { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import Button from '@/components/Button';
import vision_logo from '../../../assets/auth/vision_logo.svg'


const OtpVerification: React.FC = () => {
    const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null); 


  const handleSubmit = async () => {
    try {
      
        navigate('/otp-signup')
    } catch (err) {
      setError('Sign in failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side with Logo */}
      <div className="flex-1 bg-gray-900 flex items-center justify-center">
        <img src={vision_logo} alt="" className='' />
      </div>

      {/* Right Side with Form */}
      <div className="flex-1 flex flex-col items-center mb-8 p-8 ">
        <h2 className="text-3xl font-semibold ">OTP</h2>

        <div className="flex flex-col items-center justify-center mt-0 w-full ">
          {/* otp */}
          <Otp/>
        </div>

        <Button text="SUBMIT" onClick={handleSubmit}  customClasses="bg-gradient-to-r from-pink-500 to-purple-600 w-1/2 mt-3" />

        {/* Error Message */}
        {error && <p className="text-red-500 mt-4">{error}</p>}

        <div className="mt-4 text-gray-500 text-sm">
          <p>
            Didn't get a code ?{' '}
            {/* <a href="/signin" className="text-blue-500">Sign In</a> */}
            <Link to='/' className='text-blue-500'>Resend</Link>  
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;