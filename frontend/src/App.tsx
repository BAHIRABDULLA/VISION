import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignIn from './pages/user/SignIn'
function App() {


  return (
    // <></>
    <Router>
      <div className="App">
        <Routes>
          <Route  path='/signin' element={<SignIn/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
