import React from 'react'

import google_logo from '@/assets/auth/google_logo.webp';
import { auth, googleProvider } from '@/firebase';
import { googleSignIn } from '@/services/userApi';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login as menteeLogin } from '@/redux/slices/menteeAuthSlice';
import { login as mentorLogin } from '@/redux/slices/mentorAuthSlice';

interface GoogleProps {
    type: 'mentee' | 'mentor';
}

const Google: React.FC<GoogleProps> = ({ type }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleGoogleSignIn = async () => {
        try {
            const role = type

            const result = await signInWithPopup(auth, googleProvider)
            const user = result.user
            if (user.email && user.displayName) {
                const response = await googleSignIn(user.email, user.displayName, role);
                if (response.data.success) {

                    if (response.data.role === 'mentee') {
                        localStorage.setItem('accessToken', response.data.accessToken)
                        dispatch(menteeLogin({ token: response.data.accessToken, user: response.data.user }))

                        navigate('/')
                    } else {
                        localStorage.setItem('accessToken', response.data.accessToken)
                        dispatch(mentorLogin({ token: response.data.accessToken, user: response.data.user }))
                        if (response.data.exist === true) {
                            navigate('/mentor/dashboard')
                        } else {
                            navigate('/apply-mentor-1', { state: { email: user.email } })
                        }
                    }
                } else {

                    console.error(response.data.message);
                }
            } else {
                console.error('User email is null');
            }
        } catch (error) {
            console.error('Error during Google sign-in:', error);
        }
    }
    return (

        <>
            <button className="border border-gray-300 p-1 rounded-md 
        w-1/2 flex items-center justify-center space-x-2" onClick={handleGoogleSignIn}>
                <img src={google_logo} alt="Google" className="w-6 h-6" />
                <span className='text-black'>Continue with Google</span>
            </button>
        </>

    )
}

export default Google