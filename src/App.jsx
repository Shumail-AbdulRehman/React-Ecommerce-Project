import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navbar } from './component/index'
import authService from './appwrite/auth'
import { useDispatch } from 'react-redux'
import { login,logout } from './store/authSlice'
import { Outlet } from 'react-router-dom'
import CartDrawer from './component/CartDrawer'
import LoadingSpinner from './component/LoadingSpinner'
function App() {
  const [loading,setLoading]=useState(true)
  const dispatch=useDispatch()

  useEffect(()=>
  {
    authService.getCurrentUser()
    .then((userData)=>
    {
      if(userData)
      {
        dispatch(login(userData))
      }
      else
      {
        dispatch(logout())
      }
    })
    .finally(()=>
    {
      setLoading(false)
    })  
  },[])
  return loading? <LoadingSpinner text='Loading...'/>: <div>
    <Navbar/>
    <Outlet/>

  </div>
}

export default App
