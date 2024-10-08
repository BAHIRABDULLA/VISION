import React, { useState } from 'react'

import google_logo from '@/assets/auth/google_logo.webp';
import { auth, googleProvider } from '@/firebase';
import { googleSignIn } from '@/services/userApi';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


interface GoogleProps {
    type: 'mentee' | 'mentor';
}

const Google: React.FC<GoogleProps> = ({ type }) => {
    const navigate = useNavigate()

    const handleGoogleSignIn = async () => {
        try {
            const role = type
            console.log(role, 'role in google sign in ');

            console.log('reached handle google sign in google page ');

            const result = await signInWithPopup(auth, googleProvider)
            const user = result.user
            console.log('Google user:', user);
            if (user.email && user.displayName) {
                const response = await googleSignIn(user.email, user.displayName, role);
                console.log(response, 'Response in auth sign up .tsx');
                if (response.data.success) {
                    console.log(response.data.success, 'response.data.success')
                    localStorage.setItem('accessToken', response.data.accessToken)

                    if (response.data.role === 'mentee') {
                        console.log(response.data.role, 'response.data.role');

                        navigate('/')
                    } else {
                        console.log(response.data.exist, 'response.data.exist');

                        if (response.data.exist === true) {
                            console.log('its entered in if condition *****');

                            navigate('/mentor/dashboard')
                        } else {
                            console.log('its entered in else condition ********');

                            navigate('/apply-mentor-1')
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
                <span>Continue with Google</span>
            </button>
        </>

    )
}

export default Google