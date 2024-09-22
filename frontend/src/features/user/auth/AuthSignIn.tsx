import React, { useState } from 'react';
import Input from '../../../components/Input'
import Button from '../../../components/Button';
import google_logo from '../../../assets/auth/google_logo.webp'

import vision_logo from '../../../assets/auth/vision_logo.svg'


import { Box, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link,NavLink } from 'react-router-dom';
// import { signIn } from '../../services/authService'; // Import the sign-in service function

const AuthSignIn: React.FC = () => {
  const [isMentee, setIsMentee] = useState(true); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null); // Error state
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

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
      {/* Left Side with Logo */}
      <div className="flex-1 bg-gray-900 flex items-center justify-center">
        {/* <h1 className="text-white text-4xl font-bold">VISION</h1> */}
        <img src={vision_logo} alt="" className='' />
      </div>

      {/* Right Side with Form */}
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
          <TextField className='w-1/2	'
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            margin="normal"
          />

          {/* Password Input with Icon */}
          <FormControl className='w-1/2	' variant="outlined"  margin="normal">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </div>

     
        <Button text="SIGN IN" onClick={handleSignIn}  customClasses="bg-gradient-to-r from-pink-500 to-purple-600 w-1/2 mt-0" />

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
            {/* <a href="/signup" className="text-blue-500">Sign up as mentee</a> or{' '}
            <a href="/apply-mentor" className="text-blue-500">apply to be a mentor</a> */}
            <Link to='/signup' className='text-blue-500'>Sign up as mentee</Link> or{' '}
            <Link to='/signup' className='text-blue-500'>apply to be a mentor</Link>
          </p>
        </div>
      </div>
      
    </div>
  );
};

export default AuthSignIn;
