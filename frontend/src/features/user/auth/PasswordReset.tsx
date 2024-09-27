import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import vision_logo from '@/assets/auth/vision_logo.svg'
import Password from '@/components/Password';


const PasswordReset: React.FC = () => {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [newPassword,setNewPassword] = useState('')

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
        <h2 className="text-3xl font-semibold ">Reset Password</h2>

        <div className="flex flex-col items-center justify-center mt-0 w-full ">
          
          <Password customClasses='w-1/2' value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <Password customClasses='w-1/2' label='Confirm Password' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
        </div>

        <Button text="SUBMIT" onClick={handleSubmit} customClasses="bg-gradient-to-r from-pink-500 to-purple-600 w-1/2 mt-3" />

        {/* Error Message */}
        {error && <p className="text-red-500 mt-4">{error}</p>}

       
      </div>
    </div>
  );
};

export default PasswordReset;
