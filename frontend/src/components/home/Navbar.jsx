import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow bg-white">
      <div className="text-2xl font-extrabold text-blue-950">
        Payroll
      </div>

      <div className="flex gap-4">
        
        <Link 
        to='/sign-up'
        className="rounded-lg text-white bg-blue-950 hover:bg-blue-800 px-4 py-2 transition">
          Sign Up
        </Link>
        <Link
        to=""
        className="rounded-lg text-blue-950 border border-blue-600 hover:bg-blue-100 px-4 py-2 transition">
          Login
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
