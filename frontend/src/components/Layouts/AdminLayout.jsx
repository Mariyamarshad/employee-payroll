import React from 'react'
import AdminNavbar from '../../components/admin/AdminNavbar'
import Dashboard from '../../pages/admin/Dashboard'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div className='bg-gradient-to-r from-gray-100 to-yellow-50 min-h-screen'>
      <AdminNavbar />

      <Outlet />
      
    </div>
  )
}

export default AdminLayout
