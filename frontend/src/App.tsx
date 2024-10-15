import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import UserRoute from './routes/UserRoute'
import AdminRoute from './routes/AdminRoute'


const App = () => {


  return (
    <Router>
      <div className="App">
          <UserRoute />
          <AdminRoute />
      </div>
    </Router>
  )
}

export default App
