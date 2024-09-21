import React, { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import Button from '../../components/Button'
import vision_logo from '../../assets/auth/Screenshot_2024-09-05_145930-removebg-preview 1.svg'
import { TextField } from '@mui/material';


const ForgetPassEmail: React.FC = () => {
    const navigate = useNavigate()
    const [email,setEmail] = useState('')
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
        <h2 className="text-3xl font-semibold ">Forget Password</h2>


        <div className="mt-4 text-gray-500 text-sm">
          <p>Enter your email here to receive one-time passcode </p>
        </div>
        <div className="flex flex-col items-center justify-center mt-0 w-full ">
        <TextField className='w-1/2	'
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            margin="normal"
          />
        </div>

        <Button text="SUBMIT" onClick={handleSubmit}  customClasses="bg-gradient-to-r from-pink-500 to-purple-600 w-1/2 mt-3" />

        {/* Error Message */}
        {error && <p className="text-red-500 mt-4">{error}</p>}

      
      </div>
    </div>
  );
};

export default ForgetPassEmail;
