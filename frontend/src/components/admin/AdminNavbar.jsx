import React from "react";
import { NavLink } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <nav className="flex justify-between items-center bg-gradient-to-r from-gray-100 to-yellow-50 px-8 py-4 shadow-sm border-b border-gray-200">
      <h1 className="text-2xl font-extrabold text-teal-700 tracking-wide border border-teal-700 rounded-full p-2">
        TalentTrack
      </h1>

      <div className="flex items-center text-gray-700 font-medium overflow-hidden  rounded-full border border-teal-700 p-2">
        <NavLink 
        to="/admin/dashboard"
        className={({ isActive }) => 
        `px-6 py-2 rounded-full transition-all duration-300 ease-in-out ${isActive ? "bg-teal-600 text-white shadow-md" : "hover:bg-teal-600 hover:text-white"}`}
        >
          Dashboard
        </NavLink>

         <NavLink className={({ isActive }) => 
        `px-6 py-2 rounded-full transition-all duration-300 ease-in-out ${isActive ? "bg-teal-600 text-white shadow-md" : "hover:bg-teal-600 hover:text-white"}`}
         to="/admin/people" >
          People
        </NavLink>

         <NavLink className={({ isActive }) => 
        `px-6 py-2 rounded-full transition-all duration-300 ease-in-out ${isActive ? "bg-teal-600 text-white shadow-md" : "hover:bg-teal-600 hover:text-white"}`}
         to="/admin/hiring">
          Hiring
        </NavLink>

         <NavLink className={({ isActive }) => 
        `px-6 py-2 rounded-full transition-all duration-300 ease-in-out ${isActive ? "bg-teal-600 text-white shadow-md" : "hover:bg-teal-600 hover:text-white"}`}
         to="/admin/payroll">
          Payroll
        </NavLink>
        
      </div>

     
    </nav>
  );
};

export default AdminNavbar;
