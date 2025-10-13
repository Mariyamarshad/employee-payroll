import React from 'react'
import { Routes, Route } from 'react-router-dom'

import LandingPage from '../pages/landingpage'
import Login from '../pages/Auth/Login'
import Signup from '../pages/Auth/Signup'

import AdminLayout from '../components/Layouts/AdminLayout'
import Dashboard from '../pages/admin/Dashboard'
import Hiring from '../pages/admin/Hiring'
import People from '../pages/admin/People'
import Payroll from '../pages/admin/Payroll'

import EmployeePage from '../pages/employee/EmployeePage'
import EmployeeLayout from '../components/Layouts/EmployeeLayout'
import EmpDashboard from '../pages/employee/EmpDashboard'
import EmpProfile from '../pages/employee/EmpProfile'
import Attendance from '../pages/employee/Attendance'
import Requests from '../pages/employee/Requests'
import Notifications from '../pages/employee/Notifications'
import Settings from '../pages/employee/Settings'

const AppRoutes = () => {
  return (
    
        <Routes>
            <Route path='/' element={<LandingPage/>} />
            <Route path='/sign-up' element={<Signup/>} />
            <Route path='/login' element={<Login/>} />
           
           <Route element={<AdminLayout/>}>
            <Route path='/admin/dashboard' element={<Dashboard />} />
            <Route path='/admin/hiring' element={<Hiring/>} />
            <Route path='/admin/people' element={<People/>} />
            <Route path='/admin/payroll' element={<Payroll/>} />
           </Route>

           <Route element={<EmployeeLayout/>}>
           <Route path='/employee' element={<EmployeePage/>} />
           <Route path='/employee/dashboard' element={<EmpDashboard />} />
           <Route path='/employee/profile' element={<EmpProfile/>} />
           <Route path='/employee/attendance' element={<Attendance/>} />
           <Route path='/employee/payroll' element={<Payroll/>} />
           <Route path='/employee/requests' element={<Requests/>} />
           <Route path='/employee/notifications' element={<Notifications/>} />

           <Route path='/employee/settings' element={<Settings/>} />

           </Route>



        </Routes>
    
  )
}

export default AppRoutes
