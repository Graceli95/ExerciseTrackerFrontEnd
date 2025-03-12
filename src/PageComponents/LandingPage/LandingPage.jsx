import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="overlay">
        <h1>Welcome to Vitality Hub</h1>
        <p className="subtitle">
          Transform your fitness journey with Vitality Hub! Track your workouts, 
          monitor your progress, and take charge of your nutrition—all in one place. 
          Stay motivated by sharing your achievements with friends and family, 
          and build a stronger, healthier community together. 
        </p>
        <strong> Every step counts. Every rep matters. Let’s thrive together!</strong>
        <div className="landing-links">
          <Link to="signup" className="btnleft">Get Started</Link>
          <Link to="login" className="btnright">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
