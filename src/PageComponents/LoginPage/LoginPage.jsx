import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'




const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSumbit = async (e) => {
     e.preventDefault();
    try {

      const response = await axios.post('http://localhost:8086/users/login', formData);
      localStorage.setItem("currentUserId", response.data.id); // Save token
      localStorage.setItem("currentUsername", response.data.username);
      // localStorage.setItem("currentUserWorkouts", JSON.stringify(response.data.workouts));
      console.log(response.data)
      alert('Login successful!');
      
      navigate('/workout');
    } catch (error) {
      console.error(`Error logging in: ${error.response ? error.response.status : 'Network Error'}`);
      alert('Login failed. Please try again.');
    }
   }
   

  return (
    <div className="pageDiv">
      <form onSubmit={handleSumbit}>
      <h2>Login</h2>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
    
  )
}

export default LoginPage
