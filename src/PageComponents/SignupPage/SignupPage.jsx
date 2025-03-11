import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignupPage = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' })
    const navigate = useNavigate()

    const handleChange = (e) => {

        setFormData({...formData, [e.target.name]: e.target.value})

    }

    const handleSumbit = async (e) => {
        e.preventDefault()
        
        try{
            await axios.post('http://localhost:8086/users/register', formData)
            // alert('Sign up successful!')
            navigate('/login')
        } catch (error) {
            console.error(`Error signing up: ${error.response ? error.response.status : 'Network Error'}`);
            // alert('Sign up failed. Please try again.')
        }
    }


  return (
    <form onSubmit={handleSumbit}>
        <h2>Sign Up</h2>
         <input name="username" placeholder="Name" onChange={handleChange} required />
         <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
         <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
         <button type="submit">Sign Up</button>
    </form>
  )
}

export default SignupPage
