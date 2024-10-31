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
import PublicRoute from '@/components/auth/PublicRoute'
import MenteeDashboard from '@/pages/user/MenteeDashboard'
import PrivateRoute from '@/components/auth/PrivateRoute'
import MentorPrivateRoute from '@/components/auth/MentorPrivateRoute'
import CourseDetails from '@/pages/home&course/CourseDetails'


const UserRoute = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />

            <Route path='/signin'
                element={
                    <PublicRoute> <SignIn /> </PublicRoute>
                }
            />
            <Route path='/signup'
                element={
                    <PublicRoute> <SignUp /> </PublicRoute>
                }
            />
            <Route path='/otp-signup'
                element={
                    <PublicRoute> <SignUpOtp /> </PublicRoute>
                }
            />
            <Route path='/forget-password'
                element={
                    <PublicRoute> <ForgetPassEmail /> </PublicRoute>
                }
            />
            <Route path='/forget-otp'
                element={
                    <PublicRoute> <ForgetPassOtp /> </PublicRoute>
                }
            />
            <Route path='/new-password'
                element={
                    <PublicRoute> <NewPassword /> </PublicRoute>
                }
            />

            <Route path="/profile"
                element={<PrivateRoute><MenteeDashboard /></PrivateRoute>
                }
            />
            <Route path="/mentor/dashboard"
                element={<MentorPrivateRoute><MentorDashboard /></MentorPrivateRoute>
                }
            />


            <Route path="/course/:id"
                element={<PublicRoute>< CourseDetails /></PublicRoute>
                }
            />



            <Route path='/apply-mentor' element={<PublicRoute><ApplyMentor /></PublicRoute>} />
            <Route path='/thanks-mentor' element={<PublicRoute><ThanksMentor /></PublicRoute>} />
            <Route path='/mentors' element={<PublicRoute><AllMentors /></PublicRoute>} />

        </Routes>
    )
}

export default UserRoute