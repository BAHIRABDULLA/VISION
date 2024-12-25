import './index.css'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import UserRoute from './routes/UserRoute'
import AdminRoute from './routes/AdminRoute'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store/store'
import { useEffect } from 'react'


const App = () => {

const theme = useSelector((state:RootState)=>state.theme.mode)

useEffect(() => {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark'); 
  } else {
    document.documentElement.classList.remove('dark'); 
  }
}, [theme]);

return (
  <Router>
    <div className={`App ${
          theme === 'dark' ? 'bg-darkBg text-darkText' : 'bg-lightBg text-lightText'
        }`}>
      <UserRoute />
      <AdminRoute />
    </div>
  </Router>
);
};

export default App
