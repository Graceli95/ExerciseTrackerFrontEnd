// import React from 'react'
// import axios from 'axios'
// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import "./LoginPage.css"

// const LoginPage = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSumbit = async (e) => {
//      e.preventDefault();
//     try {

//       const response = await axios.post('http://localhost:8086/users/login', formData);
//       localStorage.setItem("currentUserId", response.data.id); // Save token
//       localStorage.setItem("currentUsername", response.data.username);
//       // localStorage.setItem("currentUserWorkouts", JSON.stringify(response.data.workouts));
//       console.log(response.data)
//       // alert('Login successful!');
      
//       navigate('/workout');
//     } catch (error) {
//       console.error(`Error logging in: ${error.response ? error.response.status : 'Network Error'}`);
//       // alert('Login failed. Please try again.');
//     }
//    }
   

//   return (
//     <div className="pageDiv">
//       <form onSubmit={handleSumbit}>
//       <h2>Login</h2>
//         <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
//         <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
//         <button type="submit">Login</button>
//       </form>
//     </div>
    
//   )
// }

// export default LoginPage


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Import CSS for styling

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

     // Prevent empty email or password submission
    // if (!formData.email || !formData.password) {
    //     setError("Please enter both email and password.");
    //     return;
    // }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8086/users/login', formData);
      localStorage.setItem("currentUserId", response.data.id);
      localStorage.setItem("currentUsername", response.data.username);
      
      setLoading(false);  // ✅ Reset loading before navigating

      console.log("Login successful, navigating to /workout"); // ✅ Debugging log

      navigate('/workout');
    } catch (error) {
      setLoading(false);
      setError('Invalid email or password. Please try again.');
      console.error(`Error logging in: ${error.response ? error.response.status : 'Network Error'}`);
    }   //✅ Now, the button will properly reset even if login fails.
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="btnlogin" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
