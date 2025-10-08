import React from 'react'
import { Routes, Route } from 'react-router-dom'

import LandingPage from '../pages/landingpage'
import Login from '../pages/Auth/Login'
import Signup from '../pages/Auth/Signup'

import AdminLayout from '../components/Layouts/AdminLayout'
import Dashboard from '../components/admin/Dashboard'
import Hiring from '../pages/admin/Hiring'
import People from '../pages/admin/People'
import Payroll from '../pages/admin/Payroll'

const AppRoutes = () => {
  return (
    
        <Routes>
            <Route path='/' element={<LandingPage/>} />
            <Route path='/sign-up' element={<Signup/>} />
            <Route path='/login' element={<Login/>} />
           
           <Route element={<AdminLayout/>}>
            <Route path='/admin/dashboard' element={<Dashboard/>} />
            <Route path='/admin/hiring' element={<Hiring/>} />
            <Route path='/admin/people' element={<People/>} />
            <Route path='/admin/payroll' element={<Payroll/>} />

           </Route>

        </Routes>
    
  )
}

export default AppRoutes
