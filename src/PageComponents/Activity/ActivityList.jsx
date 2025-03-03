import React from 'react'
import { FaRunning } from 'react-icons/fa'


const ActivityList = ({activities}) => {
  return (
    <div className="activity-list">
        <h3>Past Activities</h3>
        {activities.length ===0  ? (<p>No activities recorded yet.</p>) : (
            activities.map((activity, index)=>(
                <div key={index} className="activity-item" >
                    <FaRunning className="activity-icon" />
                    <p>
                        <strong>Calories Burned:</strong>{activity.calories} -
                        <strong>Distance:</strong>{activity.distance} KM -
                        <strong>Steps:</strong>{activity.steps} -
                        <strong>Date:</strong>{activity.date}
                    </p>
                </div>
            ))
        )}
       
    </div>
  )
}

export default ActivityList
//✅ Now the Past Activities list updates in real-time when a new activity is added.