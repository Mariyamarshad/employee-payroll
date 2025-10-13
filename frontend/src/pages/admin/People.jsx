import React, { useState } from 'react'
import { FaPlus, FaUsers } from "react-icons/fa"
import { LuFileText } from "react-icons/lu"
import FilterBar from '../../components/admin/FilterBar'
import AddEmployeeModal from '../../modals/AddEmployeeModal'
import EmployeeManagement from '../../components/admin/EmployeeManagement'
import LeaveRequests from '../../components/admin/LeaveRequests'

const People = () => {
  const [showModal, setShowModal] = useState(false)
  const [activeTab, setActiveTab] = useState("manage")

  return (
    <div>
      <div className='flex flex-row justify-between items-center p-4'>
       <div>
          <h2 className='font-bold text-lg text-gray-900'>Employees</h2>
          <p className='text-gray-700 text-sm'>Manage Your Employees</p>
        </div>

        {activeTab === "manage" && (
          <div className='flex items-center gap-2'>
            <button 
              className='bg-teal-700 text-white rounded-xl py-2 px-4 flex items-center gap-2 hover:bg-teal-800 transition'
              onClick={() => setShowModal(true)}
            >
              <FaPlus /> Add Employee
            </button>
          </div>
        )}

        {showModal && <AddEmployeeModal onClose={() => setShowModal(false)} />}
      </div>

      <nav className='flex items-center gap-8 px-8 py-3'>
        <div
          className={`flex items-center gap-2 font-semibold cursor-pointer transition ${
            activeTab === "manage"
              ? "text-teal-700 border-b-2 border-teal-700"
              : "text-gray-700 hover:text-teal-700"
          }`}
          onClick={() => setActiveTab("manage")}
        >
          <FaUsers />
          Manage Employees
        </div>

        <div
          className={`flex items-center gap-2 font-semibold cursor-pointer transition ${
            activeTab === "leave"
              ? "text-teal-700 border-b-2 border-teal-700"
              : "text-gray-700 hover:text-teal-700"
          }`}
          onClick={() => setActiveTab("leave")}
        >
          <LuFileText />
          Leave Requests
        </div>
      </nav>

      <div className='p-4'>
        {activeTab === "manage" ? (
          <>
            <FilterBar />
            <EmployeeManagement />
          </>
        ) : (
          <LeaveRequests />
        )}
      </div>
    </div>
  )
}

export default People
