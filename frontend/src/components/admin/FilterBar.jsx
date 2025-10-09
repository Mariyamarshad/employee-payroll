import React from 'react'

const FilterBar = () => {
  return (
    <div className='flex flex-wrap items-center justify-between p-4 bg-gray-50 '>
      <input
      type='text'
      placeholder='Search'
      className='border border-gray-300 rounded-lg px-3 py-2 w-64 '
       />

       <div className='flex flex-wrap gap-3'>
        <select className='border border-gray-300 rounded-lg px-3 py-2'>
            <option disabled selected>  Sort By: </option>
            <option> New Employees</option>
            <option> Old Employees</option>
        </select>

        <select className='border border-gray-300 rounded-lg px-3 py-2'>
            <option disabled selected> Department</option>
            <option> UI/UX Design </option>
            <option> MERN </option>
            <option> MEAN </option>
            <option> Frontend</option>
            <option> Backend</option>
            <option> Rubby on rails</option>
        </select>

        <select className='border border-gray-300 rounded-lg px-3 py-2'>
            <option disabled selected>Designation</option>
            <option>Developer</option>
            <option>Product Manager</option>
            <option>Intern</option>
            <option>HR</option>
            <option>Software Engineer</option>
        </select>
       </div>


    </div>
  )
}

export default FilterBar
