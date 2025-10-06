import React from 'react'
import { Routes, Route } from 'react-router-dom'

import LandingPage from '../pages/landingpage'
import Login from '../pages/Auth/Login'
import Signup from '../pages/Auth/Signup'
import Admin from '../pages/admin/Admin'

const AppRoutes = () => {
  return (
    
        <Routes>
            <Route path='/' element={<LandingPage/>} />
            <Route path='/sign-up' element={<Signup/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/admin' element={<Admin/>} />

        </Routes>
    
  )
}

export default AppRoutes
