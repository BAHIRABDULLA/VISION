import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignIn from './pages/user/SignIn'
import SignUp from './pages/user/SignUp'
import SignUpOtp from './pages/user/SignUpOtp'
import ForgetPassEmail from './pages/user/ForgetPassEmail'
import ForgetPassOtp from './pages/user/ForgetPassOtp'
import NewPassword from './pages/user/NewPassword'
function App() {


  return (
    // <></>
    <Router>
      <div className="App">
        <Routes>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/otp-signup' element={<SignUpOtp />} />
          <Route path='/forget-password' element={<ForgetPassEmail />} />
          <Route path='/forget-otp' element={<ForgetPassOtp/>} />
          <Route path='/new-password' element={<NewPassword/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
