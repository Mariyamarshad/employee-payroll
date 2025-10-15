import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/slices/authSlice';
import {
  FiHome,
  FiUser,
  FiClock,
  FiDollarSign,
  FiMail,
  FiBell,
  FiSettings,
  FiLogOut,
} from 'react-icons/fi';

const AdminNavbar = () => {

  const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const { user } = useSelector((state) => state.auth);
  
    const navItems = [
      { path: '/admin/dashboard', name: 'Dashboard', icon: <FiHome /> },
      { path: '/admin/people', name: 'Attendance', icon: <FiClock /> },
      { path: '/admin/hiring', name: 'Payroll', icon: <FiDollarSign /> },
      { path: '/admin/payroll', name: 'Requests', icon: <FiMail /> },
    ];
  
    const logout = async () => {
      try {
        await dispatch(logoutUser());
        toast.success("You've been logged out!");
        navigate('/login');
      } catch (err) {
        toast.error('Logout failed. Please try again.');
      }
    };
  return (
   <nav className='flex justify-between items-center bg-gradient-to-r from-gray-100 to-yellow-50 px-8 py-4 border-b border-gray-200'>
   
         <h1 className='text-2xl font-extrabold text-teal-700 tracking-wide border border-teal-700 rounded-full p-2'>
           TalentTrack
         </h1>
   
         <div className='flex items-center text-gray-700 font-medium gap-4'>
           <div className='flex items-center overflow-hidden rounded-full border border-teal-700 p-2 bg-white shadow-sm'>
             {navItems.map((item) => (
               <NavLink
                 key={item.name}
                 to={item.path}
                 className={({ isActive }) =>
                   `flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-300 ease-in-out ${
                     isActive
                       ? 'bg-teal-600 text-white shadow-md'
                       : 'text-teal-700 hover:bg-teal-600 hover:text-white'
                   }`
                 }
               >
                 {item.icon}
                 <span>{item.name}</span>
               </NavLink>
             ))}
           </div>
   
           <button
             onClick={logout}
             className='flex items-center gap-2 px-5 py-2 rounded-full bg-teal-600 text-white font-semibold hover:bg-teal-700 transition-all duration-300 shadow-sm'
           >
             <FiLogOut className='text-lg' />
             <span>Logout</span>
           </button>
         </div>
       </nav>
  );
};

export default AdminNavbar;
