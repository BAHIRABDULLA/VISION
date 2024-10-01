import React, { useState } from 'react';
import { Link, useNavigate ,useLocation} from 'react-router-dom';
import Button from '@/components/Button';
import vision_logo from '@/assets/auth/vision_logo.svg'
import Password from '@/components/Password';



import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPassword } from '@/services/api';


//zod validtation
const resetPassSchema = z.object({
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Password must contain at least one letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  confirmPassword: z.string()
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"]
  })
type resetPassSchemaType = z.infer<typeof resetPassSchema>;


const PasswordReset: React.FC = () => {
  const location = useLocation()
  const {email} = location.state
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null);


  const { register, handleSubmit, formState: { errors } } = useForm<resetPassSchemaType>({
    resolver: zodResolver(resetPassSchema),
  });

  const onSubmit: SubmitHandler<resetPassSchemaType> = async (data) => {
    console.log(data, 'data in onSubmit ');
    const { password, confirmPassword } = data
    const response = await resetPassword(email,password, confirmPassword)
    if (response?.data.success) {
      navigate('/signin')
    } else {
      setError(response?.data.message)
    }

  }

  return (
    <div className="flex h-screen flex-col lg:flex-row">
      {/* Left Side with Logo */}
      <div className="flex-1 bg-gray-900 flex items-center justify-center">
        <img src={vision_logo} alt="Vision Logo" className='w-1/2 max-w-xs lg:w-3/4' />
      </div>

      {/* Right Side with Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col items-center justify-center mb-8 p-8">
        <h2 className="text-3xl font-semibold ">Reset Password</h2>

        <div className="flex flex-col items-center mt-4 w-full ">

          <Password customClasses='w-full sm:w-3/4 md:w-1/2' {...register('password')} />
          {errors.password && <p className="text-red-700">{errors.password.message}</p>}

          <Password customClasses='w-full sm:w-3/4 md:w-1/2' label='Confirm Password'  {...register('confirmPassword')} />
          {errors.confirmPassword && <p className="text-red-700">{errors.confirmPassword.message}</p>}

        </div>

        <Button text="SUBMIT" type='submit' customClasses="bg-gradient-to-r from-pink-500 to-purple-600 w-full sm:w-3/4 md:w-1/2 mt-3" />

        {/* Error Message */}
        {error && <p className="text-red-500 mt-4">{error}</p>}


      </form>
    </div>
  );
};

export default PasswordReset;
