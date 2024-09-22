import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import { Box, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import vision_logo from '../../../assets/auth/vision_logo.svg'


const PasswordReset: React.FC = () => {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
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
          {/* otp */}
          <FormControl className='w-1/2	' variant="outlined" margin="normal">
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
          <FormControl  className='w-1/2	' variant="outlined" margin="normal">
            <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
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

        <Button text="SUBMIT" onClick={handleSubmit} customClasses="bg-gradient-to-r from-pink-500 to-purple-600 w-1/2 mt-3" />

        {/* Error Message */}
        {error && <p className="text-red-500 mt-4">{error}</p>}

       
      </div>
    </div>
  );
};

export default PasswordReset;
