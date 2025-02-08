import { Route, Routes } from 'react-router-dom'
import React, { Suspense } from 'react'
import PublicRoute from '@/components/auth/PublicRoute'
import PrivateRoute from '@/components/auth/PrivateRoute'



import Home from '@/pages/home&course/Home'
import SignIn from '@/pages/authentication/SignIn'
import SignUp from '@/pages/authentication/SignUp'
import ApplyMentor from '@/pages/mentorApplication/ApplyMentor'
import ThanksMentor from '@/pages/mentorApplication/ThanksMentor'
import ForgetPassEmail from '@/pages/authentication/ForgetPassEmail'
import ForgetPassOtp from '@/pages/authentication/ForgetPassOtp'
import NewPassword from '@/pages/authentication/NewPassword'
import SignUpOtp from '@/pages/authentication/SignUpOtp'
// import NotFoundPage from '@/components/NotFound'
import Loading from '@/components/Loading'


import AllMentors from '@/pages/mentorApplication/AllMentors'
import CourseDetails from '@/pages/home&course/CourseDetails'
import Success from '@/pages/home&course/Success'
import Cancel from '@/pages/home&course/Cancel'
import MentorDetails from '@/pages/mentorApplication/MentorDetails'
import Courses from '@/pages/home&course/Courses'
import Resources from '@/pages/home&course/Resources'


const DashboardLayout = React.lazy(() => import('@/components/DashbaordLayout'))
const Chat = React.lazy(() => import('@/pages/user-dashboard/Chat'))
const Profile = React.lazy(() => import('@/pages/user-dashboard/Profile'))
const VideoCall = React.lazy(() => import('@/pages/user-dashboard/VideoCall'))
const Dashboard = React.lazy(() => import('@/pages/user-dashboard/Dashboard'))
const VideoCallList = React.lazy(() => import('@/pages/user-dashboard/VideoCallList'))
const MyCourses = React.lazy(() => import('@/pages/user-dashboard/MyCourses'))
const BillingHistory = React.lazy(() => import('@/pages/user-dashboard/BillingHistory'))
const SlotManagement = React.lazy(() => import('@/pages/mentorApplication/SlotManagement'))


const UserRoute = () => {
    return (
        <Suspense fallback={<Loading />}>
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

                <Route path="/dashboard/*" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
                    <Route path='' element={<Dashboard />} />
                    <Route path='profile' element={<Profile />} />
                    <Route path='chat' element={<Chat />} />
                    <Route path='video-call-users' element={<VideoCallList />} />
                    <Route path='video-call/:id' element={<VideoCall />} />
                    <Route path='billing' element={<BillingHistory />} />
                    <Route path='user-courses' element={<MyCourses />} />
                    <Route path='slot-manage' element={<SlotManagement />} />
                </Route>



                {/* <Route path="/mentor/dashboard"
                element={<MentorPrivateRoute><MentorDashboard /></MentorPrivateRoute>
                }
            /> */}

                <Route path='/courses' element={<Courses />} />
                <Route path="/course/:id" element={< CourseDetails />} />

                <Route path='/resource/:id' element={<Resources />} />

                <Route path='/success' element={<Success />} />
                <Route path='/cancel' element={<Cancel />} />

                <Route path='/mentor/:id' element={<MentorDetails />} />

                <Route path='/apply-mentor' element={<PublicRoute><ApplyMentor /></PublicRoute>} />
                <Route path='/thanks-mentor' element={<PublicRoute><ThanksMentor /></PublicRoute>} />
                <Route path='/mentors' element={<AllMentors />} />


                {/* <Route path='*' element={<NotFoundPage/>} /> */}
            </Routes>
        </Suspense>
    )
}

export default UserRoute