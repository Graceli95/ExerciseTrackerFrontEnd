import React from 'react'
import { useState } from 'react'

const ActivityForm = ({onAddActivity}) => {
    const [formData, setFormData] = useState({
        caolories: "",
        distance: "",
        steps: "",
        date: "",
    })

    // Handle input changes, and send the new value to the state
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

     // Handle form submission
    const handleSumbit = (e) => {
        e.preventDefault()
        
        // Create new activity object
        const newActivity = {
            calories: formData.calories,
            distance: formData.distance,
            steps: formData.steps,
            date: formData.date,
        }

        // Add activity to the list, Pass new activity to parent component
        onAddActivity(newActivity)

        //clear form
        setFormData({
            calories: "",
            distance: "",
            steps: "",
            date: "",
        })
    }

    

    
  return (
    <form onSubmit={handleSumbit} className="activity-form">
         <h3>Post New Activity</h3>
         <input type="number" name="calories" placeholder="Enter calories burned" value={formData.calories} onChange={handleChange} required/>
         <input type="number" name="distance" placeholder="Enter distance (KM)" value={formData.distance} onChange={handleChange} required/>
         <input type="number" name="steps" placeholder="Enter steps" value={formData.steps} onChange={handleChange} required/>
         <input type="date" name="date" value={formData.date} onChange={handleChange} required/>
         <button type="submit">Post Activity</button>
       

      
    </form>
  )
}

export default ActivityForm

//✅ Now when the form is submitted, the new activity is added to the list!
// ActivityForm.jsx to Add New Activities