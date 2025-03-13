// import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import './Sidebar.css'
import { FaUserCircle } from 'react-icons/fa'
import { FaRunning } from 'react-icons/fa'
import { FaDumbbell } from 'react-icons/fa'
import { FaCalendarAlt } from 'react-icons/fa'
// import { useState } from 'react'
import { useNavigate } from 'react-router-dom'



const Sidebar = () => {

  // const [currentusername, setCurrentUsername] = useState(localStorage.getItem("currentUsername"))
  // console.log(currentusername)

//   useEffect(()=>{
    
//     const updateUsername = () => {
//         setCurrentUsername(localStorage.getItem("currentUsername"));
//     };

//     window.addEventListener("localStorage", updateUsername); // Listen for changes in storage
//     return () => window.removeEventListener("localStorage", updateUsername); // Cleanup event listener
// }, []); // Empty array to only set up once
//✅ This ensures Sidebar updates immediately when a user logs in or logs out.


   const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("currentUsername");
        localStorage.removeItem("currentUserId")
        // setCurrentUsername(null);   // Ensure UI updates properly after logout,  Prevents frozen page when switching users
        
        
        navigate("/"); // Redirect to landing page
    }; //✅ Now, when a user logs out, the workouts reset, preventing incorrect data display.

  return (
    <div className="sidebar">
      <div className="profile">
        <FaUserCircle className="profile-icon" /> 
        <h3>{localStorage.getItem("currentUsername")}</h3>  
        
      </div>
      
      <ul>
        <li>
            <NavLink to="/dashboard" className={({isActive}) => isActive ? "active-link" : ""}>
              Dashboard
            </NavLink>
        </li>

        <li>
            <NavLink to="/activity" className={({isActive}) => isActive ? "active-link" : ""}>
            <FaRunning className="sidebar-icon" /> Activity</NavLink>
        </li>

        <li>
          <NavLink to="/workout" className={({isActive}) => isActive ? "active-link" : ""}>
            <FaDumbbell className="sidebar-icon" /> Workout</NavLink>
        </li>
        <li>
          <NavLink to="/schedule" className={({isActive}) => isActive ? "active-link" : ""}>
            <FaCalendarAlt className="sidebar-icon" /> Schedule</NavLink>
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
      
    </div>
  )
}

export default Sidebar

// ✅ The Sidebar now has a Dashboard title and an Activity link. The Activity link is a NavLink component that links to the /activity route.



