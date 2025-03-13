import React from 'react'
import { FaRunning } from 'react-icons/fa'
import axios from 'axios'
import "./ActivityList.css"  // ✅ Import the styles


const ActivityList = ({activities, setActivities}) => {
    // const userId = JSON.parse(localStorage.getItem("currentUserId"));

    const toggleCompletion = async (id) => {
        try{
            await axios.patch(`http://localhost:8086/activities/${id}/complete`)

            // ✅ Update UI without reloading
            setActivities(activities.map(activity =>
                activity.id === id ? {...activity, completed: !activity.completed} : activity
            ))
        } catch (error) {
           console.error("Error updating activity completion:", error);
          }
        
    }

  return (
    <div className="activity-list">
        <h3>My Activities</h3>
        {activities.length ===0  ? (<p>No activities recorded yet.</p>) : (
            activities.map((activity, index)=>(
                <div key={index} className="activity-item" >
                    <FaRunning className="activity-icon" />
                    <p>
                        <strong>Calories Burned </strong>{activity.caloriesBurned} -
                        <strong> Distance: </strong>{activity.distance} KM
                        <br/>
                        <strong> Steps: </strong>{activity.steps} -
                        <strong> Date: </strong>{
                            new Date(activity.date)
                                .toLocaleDateString()
                        }
                    </p>

                      {/* ✅ Only show button if the activity is NOT completed */}
                      {!activity.completed && (
                        <button onClick={()=> toggleCompletion(activity.id)}
                         className={`toggle-button ${activity.completed ? "completed" : "incomplete"}`}
                        
                        >
                            {activity.completed ? "✔ Completed" : "Mark as Done"}
                        </button>
                      )}

                       {/* ✅ Show checkmark if already completed */}
                       {activity.completed && <span className='completed-text'>✔ Completed</span>}
                    
                </div>
            )) //React loops through the activities array and renders each activity in a list.
        )}
       
    </div>
  )
}

export default ActivityList
//✅ Now the Past Activities list updates in real-time when a new activity is added.

/**
 * 🔹 Here’s what’s happening:

{ activities } is destructured from props (equivalent to props.activities).
The component loops through the array (map()) and displays each activity in a list.
The key attribute is used to uniquely identify each activity element.


 *  Summary: Understanding Props in This Case
✅ activities is a state variable in ActivityPage.jsx.
✅ It is passed as a prop to ActivityList.jsx.
✅ ActivityList.jsx receives the prop and displays the activities dynamically.
✅ When the state (activities) changes, React automatically re-renders the UI.

How Does This Work in React?
Step-by-Step Breakdown
Step	Action	What Happens?
1️⃣	ActivityPage initializes activities with useState([])	The list starts as empty.
2️⃣	ActivityList is rendered	It receives activities as a prop.
3️⃣	User submits a new activity	  handleSubmit() updates activities in the parent (setActivities([...activities, newActivity])).
4️⃣	State changes	React re-renders ActivityList, and the new activity appears.


 */

// new Date(activity.date)
                                //.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })