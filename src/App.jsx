import React from 'react';
import Sidebar from './UIComponents/Sidebar';
import { Routes, Route } from 'react-router-dom';
import ActivityPage from './PageComponents/Activity/ActivityPage';

const App = () => {
  return (
    <div className="app-container">
      <Sidebar/>
      <div className="main-content">
        <Routes>
          <Route path="/activity" element={<ActivityPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App
