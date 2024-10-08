import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignIn from './pages/user/SignIn'
import SignUp from './pages/user/SignUp'
import SignUpOtp from './pages/user/SignUpOtp'
import ForgetPassEmail from './pages/user/ForgetPassEmail'
import ForgetPassOtp from './pages/user/ForgetPassOtp'
import NewPassword from './pages/user/NewPassword'
import ApplyMentor1 from './pages/mentorApplication/ApplyMentor1'
import Home from './pages/home&course/Home'
import ApplyMentor2 from './pages/mentorApplication/ApplyMentor2'
import ThanksMentor from './pages/mentorApplication/ThanksMentor'
import AllMentors from './pages/mentorApplication/AllMentors'
import Login from './pages/admin/Login'

import Admin from './pages/admin/Admin'
import Dashboard from './features/admin/Dashboard'
import Users from './features/admin/Users'
import MentorDashboard from './pages/mentorApplication/MentorDashboard'

import { getAccessToken } from './utils/authHelper'


const App = () => {


  return (
    // <></>
    <Router>
      <div className="App">
        <Routes>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/otp-signup' element={<SignUpOtp />} />
          <Route path='/forget-password' element={<ForgetPassEmail />} />
          <Route path='/forget-otp' element={<ForgetPassOtp />} />
          <Route path='/new-password' element={<NewPassword />} />

          <Route path='/apply-mentor-1' element={<ApplyMentor1 />} />
          <Route path='/apply-mentor-2' element={<ApplyMentor2 />} />
          <Route path='/thanks-mentor' element={<ThanksMentor />} />
          <Route path='/mentors' element={<AllMentors />} />

          <Route path='/' element={<Home />} />


          <Route path='/admin' element={<Admin/>}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<Users />} />
          </Route>
          <Route path='/admin/login' element={<Login />} />
         

          <Route path='/mentor/dashboard' element={<MentorDashboard />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
