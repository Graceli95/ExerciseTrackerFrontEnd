// import React from 'react'
// import axios from 'axios'
// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import "./SignupPage.css"

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
//        console.error(`Error logging in: ${error.response ? error.response.status : 'Network Error'}`)
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
import './SignupPage.css';

const SignupPage = () => {
    const [formData, setFormData] = useState({ 
        username: '', 
        email: '', 
        password: '', 
        // confirmPassword: '' 
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Password Match Validation
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }

        try {
            await axios.post('http://localhost:8086/users/register', {
                username: formData.username,
                email: formData.email,
                password: formData.password
            });

            navigate('/login');
        } catch (error) {
            setLoading(false);
            if (error.response) {
                setError(error.response.data.message || 'Sign up failed. Please try again.');
            } else {
                setError('Network error. Please check your connection.');
            }
        }
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit} className="signup-form">
                <h2>Sign Up</h2>
                
                <input name="username" placeholder="Name" onChange={handleChange} required />
                <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
                {/* <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} required /> */}
                
                {error && <p className="error-message">{error}</p>}

                <button type="submit" className="btnsignup" disabled={loading}>
                    {loading ? 'Signing Up...' : 'Sign Up'}
                </button>
            </form>
        </div>
    );
};

export default SignupPage;
