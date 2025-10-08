import React from 'react'
import AdminNavbar from '../../components/admin/AdminNavbar'
import Dashboard from '../../components/admin/Dashboard'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div>
      <AdminNavbar />

      <Outlet />
      
    </div>
  )
}

export default AdminLayout
