import React from 'react'
import Navbar from '../user/Navbar'
import { Outlet } from 'react-router-dom'

const EmployeeLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet/>
    </div>
  )
}

export default EmployeeLayout
