import AllMentors from '@/pages/mentorApplication/AllMentors'
import ApplyMentor from '@/pages/mentorApplication/ApplyMentor'
import ThanksMentor from '@/pages/mentorApplication/ThanksMentor'
import ForgetPassEmail from '@/pages/user/ForgetPassEmail'
import ForgetPassOtp from '@/pages/user/ForgetPassOtp'
import NewPassword from '@/pages/user/NewPassword'
import SignIn from '@/pages/user/SignIn'
import SignUp from '@/pages/user/SignUp'
import SignUpOtp from '@/pages/user/SignUpOtp'
import Home from '@/pages/home&course/Home'
import { Route, Routes } from 'react-router-dom'
import PublicRoute from '@/components/auth/PublicRoute'
import PrivateRoute from '@/components/auth/PrivateRoute'
import CourseDetails from '@/pages/home&course/CourseDetails'
import Success from '@/pages/home&course/Success'
import Cancel from '@/pages/home&course/Cancel'
import MentorDetails from '@/pages/mentorApplication/MentorDetails'
import Courses from '@/pages/home&course/Courses'
import Resources from '@/pages/home&course/Resources'
import Profile from '@/features/user/dashboard/Profile'
import Chat from '@/components/Chat'
import SlotManagement from '@/pages/mentorApplication/SlotManagement'
import DashboardLayout from '@/components/DashbaordLayout'
import Dashboard from '@/components/Dashboard'
import VideoCall from '@/components/VideoCall'


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

            <Route path="/dashboard/*" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
                <Route path='' element={<Dashboard />} />
                <Route path='profile' element={<Profile />} />
                <Route path='chat' element={<Chat />} />
                <Route path='video-call' element={<VideoCall/>} />
                <Route path='billing' element={<div>billing history content</div>} />
                <Route path='notification' element={<div>notification content</div>} />
                <Route path='slot-manage' element={<SlotManagement />} />
            </Route>



            {/* <Route path="/mentor/dashboard"
                element={<MentorPrivateRoute><MentorDashboard /></MentorPrivateRoute>
                }
            /> */}

            <Route path='/courses' element={<Courses />} />
            <Route path="/course/:id" element={< CourseDetails />} />

            <Route path='/resource' element={<Resources />} />

            <Route path='/success' element={<Success />} />
            <Route path='/cancel' element={<Cancel />} />

            <Route path='/mentor/:id' element={<MentorDetails />} />

            <Route path='/apply-mentor' element={<PublicRoute><ApplyMentor /></PublicRoute>} />
            <Route path='/thanks-mentor' element={<PublicRoute><ThanksMentor /></PublicRoute>} />
            <Route path='/mentors' element={<AllMentors />} />

        </Routes>
    )
}

export default UserRoute