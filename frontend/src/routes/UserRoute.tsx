import AllMentors from '@/pages/mentorApplication/AllMentors'
import ApplyMentor from '@/pages/mentorApplication/ApplyMentor'
import MentorDashboard from '@/pages/mentorApplication/MentorDashboard'
import ThanksMentor from '@/pages/mentorApplication/ThanksMentor'
import ForgetPassEmail from '@/pages/user/ForgetPassEmail'
import ForgetPassOtp from '@/pages/user/ForgetPassOtp'
import NewPassword from '@/pages/user/NewPassword'
import SignIn from '@/pages/user/SignIn'
import SignUp from '@/pages/user/SignUp'
import SignUpOtp from '@/pages/user/SignUpOtp'
import Home from '@/pages/home&course/Home'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PublicRoute from '@/components/PublicRoute'

const UserRoute = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            
            <Route path='/signin'
                element={
                    <PublicRoute>
                        <SignIn />
                    </PublicRoute>
                }
            />
            <Route path='/signup'
                element={
                    <PublicRoute>
                        <SignUp />
                    </PublicRoute>
                }
            />
            <Route path='/otp-signup'
                element={
                    <PublicRoute>
                        <SignUpOtp />
                    </PublicRoute>
                }
            />
            <Route path='/forget-password'
                element={
                    <PublicRoute>
                        <ForgetPassEmail />
                    </PublicRoute>
                }
            />
            <Route path='/forget-otp'
                element={
                    <PublicRoute>
                        <ForgetPassOtp />
                    </PublicRoute>
                }
            />
            <Route path='/new-password'
                element={
                    <PublicRoute>
                        <NewPassword />
                    </PublicRoute>
                }
            />




            <Route path='/apply-mentor' element={<ApplyMentor />} />
            <Route path='/thanks-mentor' element={<ThanksMentor />} />
            <Route path='/mentors' element={<AllMentors />} />
            <Route path='/mentor/dashboard' element={<MentorDashboard />} />
        </Routes>
    )
}

export default UserRoute