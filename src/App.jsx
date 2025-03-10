import React from 'react';
import Sidebar from './UIComponents/Sidebar';
import { Routes, Route } from 'react-router-dom';
import ActivityPage from './PageComponents/Activity/ActivityPage';
import LandingPage from './PageComponents/LandingPage/LandingPage';
import SignupPage from './PageComponents/SignupPage/SignupPage';
import LoginPage from './PageComponents/LoginPage/LoginPage';
import WorkoutPage from './PageComponents/Workout/WorkoutPage';
import Dashboard from './PageComponents/Dashboard/Dashboard';



const App = () => {

  const hideSidebar = location.pathname === "/" || location.pathname == '/signup';
  return (
    <div className="app-container">
      {!hideSidebar && <Sidebar />}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
           <Route path="/signup" element={<SignupPage />} />
           <Route path="/login" element={<LoginPage />} />   
           <Route path="/workout" element={<WorkoutPage />} />
          <Route path="/activity" element={<ActivityPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App
