import React from 'react'
import { Routes, Route } from 'react-router-dom'

import LandingPage from '../pages/landingpage'
import Login from '../pages/Auth/Login'
import Signup from '../pages/Auth/Signup'

const AppRoutes = () => {
  return (
    
        <Routes>
            <Route path='/' element={<LandingPage/>} />
             <Route path='/sign-up' element={<Signup/>} />
              <Route path='/login' element={<Login/>} />
        </Routes>
    
  )
}

export default AppRoutes
