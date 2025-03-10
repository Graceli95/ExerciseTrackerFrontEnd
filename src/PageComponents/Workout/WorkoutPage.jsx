import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "../../App.css"
import './WorkoutPage.css' // Import the CSS file


const WorkoutPage = () => {
  const userId = 2;

  const [workouts, setWorkouts] = useState([])
  const [newWorkout, setNewWorkout] = useState({
    type: "",
    duration: "",
    caloriesBurned: "",
    date: ""
  })

  // const [editingWorkout, setEditingWorkout] = useState(null);

  const workoutTypes = ["Yoga", "Running", "Pilates", "Strength Training", "Hiking", "Aerobics", "Cardio", "Swimming", "HIIT"];
 
  useEffect(()=>{

    if(!userId) return; // Ensure userId is defined before making the request

    const fetchWorkouts = async () => {
      try{
        const response = await axios.get(`http://localhost:8086/users/${userId}/workouts`)
        setWorkouts(response.data)
      } catch(error){
        console.error("Error fetching workouts:", error);
      }
    }

    fetchWorkouts();
  }, [userId]);

  const handleInputChange = (e) => {
    setNewWorkout({...newWorkout, [e.target.name]: e.target.value})
  }

  const handleDateChange = (e) => {
    setNewWorkout({...newWorkout, date: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await axios.post(`http://localhost:8086/workouts/user/${userId}/new`, newWorkout)
      setWorkouts([...workouts, response.data]);
      setNewWorkout({ type: "", duration: "", caloriesBurned: "", date: "" })
    } catch(error){
       console.error("Error posting workout:", error);
    }

  }

  // const handleEditWorkout = (workout) => {
  //   // setEditingWorkout(workout);
  // };

  // const updateWorkout = async (id) => {
  //   try{
  //      const updatedWorkout = workouts.find(w => w.id === id);
  //     if (!updatedWorkout) return;
  //     await axios.put(`http://localhost:8086/workouts/update/${id}`, updatedWorkout)
  //     setWorkouts(workouts.map(w=> w.id === id ? {...w, ...updatedWorkout} : w))
  //   }catch(error){
  //      console.error("Error updating workout:", error);
  //   }
  // }

  const deleteWorkout = async (id) => {
    try{
     
      await axios.delete(`http://localhost:8086/workouts/delete/${id}`)
      setWorkouts(workouts.filter(w=>w.id !== id))
    }catch(error){
       console.error("Error updating workout:", error);
    }
  }

  
  return (
     <div className="workout-container pageDiv">
      <div className="workout-form">
        <h2>Post a Workout</h2>
        <form onSubmit={handleSubmit}>
           <select name="type" value={newWorkout.type} onChange={handleInputChange}>
            <option value="" disabled>Select workout type</option>
            {workoutTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <input name="duration" placeholder="Duration (min)" value={newWorkout.duration} onChange={handleInputChange} required />
          <input name="caloriesBurned" placeholder="Calories Burned" value={newWorkout.caloriesBurned} onChange={handleInputChange} required />
          <input type="date" name="date" value={newWorkout.date} onChange={handleDateChange} required />
          <button type="submit" disabled={!newWorkout.date || !newWorkout.duration || !newWorkout.caloriesBurned || !newWorkout.type}>Post Workout</button>
        </form>
      </div>

      <div className="workout-list-container">
        <h2>Upcoming Workouts</h2>
        <div className="workout-list">
          {workouts.map(workout => (
            <div key={workout.id} className="workout-card">
              <p><strong>Date:</strong> {workout.date}</p>
              <p><strong>Type:</strong> {workout.type}</p>
              <p><strong>Duration:</strong> {workout.duration} min</p>
              <p><strong>Calories Burned:</strong> {workout.caloriesBurned} kcal</p>
              <div className="workout-actions">
                <button onClick={() => handleEditWorkout(workout)}>Edit</button>
                <button onClick={() => deleteWorkout(workout.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    
     
      
    
  )
}

export default WorkoutPage
