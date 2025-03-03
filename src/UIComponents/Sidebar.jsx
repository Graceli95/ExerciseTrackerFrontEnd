import React from 'react'
import { NavLink } from 'react-router-dom'
import './Sidebar.css'
import { FaUserCircle } from 'react-icons/fa'
import { FaRunning } from 'react-icons/fa'
import { FaDumbbell } from 'react-icons/fa'
import { FaCalendarAlt } from 'react-icons/fa'



const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="profile">
        <FaUserCircle className="profile-icon" /> 
        <h3>Grace</h3> 
      </div>
      
      <h2>Dashboard</h2>
      <ul>
        <li>
            <NavLink to="/activity" activeclassname="active-link">
            <FaRunning className="sidebar-icon" /> Activity</NavLink>
        </li>

        <li>
          <NavLink to="/workout" activeclassname="active-link">
            <FaDumbbell className="sidebar-icon" /> Workout</NavLink>
        </li>
        <li>
          <NavLink to="/schedule" activeclassname="active-link">
            <FaCalendarAlt className="sidebar-icon" /> Schedule</NavLink>
        </li>
      </ul>
      
    </div>
  )
}

export default Sidebar

// ✅ The Sidebar now has a Dashboard title and an Activity link. The Activity link is a NavLink component that links to the /activity route.
