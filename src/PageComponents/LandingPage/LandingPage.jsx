import React from 'react'
import { Link } from 'react-router-dom'


const LandingPage = () => {
  return (
    <div>
      <h1>Welcome to Vitality Hub</h1>
      <Link to="signup">Sign Up</Link> | <Link to="login">Login</Link>
    </div>
  )
}

export default LandingPage
