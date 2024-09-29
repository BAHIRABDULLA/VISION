import Otp from '@/components/Otp'
import React, { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import Button from '@/components/Button';
import vision_logo from '@/assets/auth/vision_logo.svg'
import { otpVerify } from '@/services/api';


const OtpVerification: React.FC = () => {
    const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null); 
  const [otp,setOtp] = useState<string[]>(new Array(6).fill(''))
  
  

  const handleSubmit = async () => {
    try {
        const otpString = otp.join('')
        console.log(otpString,'otpstrijng in otp verification ');
        // const responese = await otpVerify(otpString)
    } catch (err) {
      setError('Sign in failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="flex h-screen flex-col lg:flex-row">
      {/* Left Side with Logo */}
      <div className="flex-1 bg-gray-900 flex items-center justify-center">
        <img src={vision_logo} alt="vision_logo" className='w-1/2 max-w-xs lg:w-3/4' />
      </div>

      {/* Right Side with Form */}
      <div className="flex-1 flex flex-col items-center justify-center mb-8 p-8 ">
        <h2 className="text-3xl font-semibold mb-6">OTP Verification</h2>

        <div className="flex flex-col items-center justify-center mt-4 w-full ">
          {/* otp */}
          <Otp  otp={otp} setOtp={setOtp} />
        </div>

        <Button text="SUBMIT" onClick={handleSubmit}  customClasses="mt-8 bg-gradient-to-r from-pink-500 to-purple-600 w-full lg:w-1/2 mt-3" />

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
