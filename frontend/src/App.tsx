import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignIn from './pages/user/SignIn'
import SignUp from './pages/user/SignUp'
import SignUpOtp from './pages/user/SignUpOtp'
function App() {


  return (
    // <></>
    <Router>
      <div className="App">
        <Routes>
          <Route  path='/signin' element={<SignIn/>}/>
          <Route  path='/signup' element={<SignUp/>}/>
          <Route path='/otp-signup' element={<SignUpOtp/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
