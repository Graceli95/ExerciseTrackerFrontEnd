import React, { useState } from 'react'
import ActivityForm from './ActivityForm'
import ActivityList from './ActivityList'
import './ActivityPage.css'

const ActivityPage = () => {

  //State to hold/store activities
  //✅ with useState hook, activities state will store all activities, and addActivity will update it.
  const [activities, setActivities] = useState([])


  // ✅Function to add a new activity.  that takes an activity object as an argument and logs the activity object to the console.

  const addActivity = (newActivity) => {
    console.log(newActivity);
    setActivities([newActivity, ...activities]);
  }
  return (
    <div className="activity-container">
      <h2>Activity</h2>
      <div className="activity-content">
        <ActivityForm onAddActivity={addActivity}/>
        <ActivityList activities={activities}/>
      </div>
    </div>
  )
}
export default ActivityPage

/*
✅ The ActivityPage component renders the ActivityForm and ActivityList components.
✅ The ActivityPage component has a state variable activities that stores the list of activities.

useState Hook
The useState hook is a function that lets you add state to functional components in React. When you call useState, it returns an array with two elements:

1. The current state value.
2. A function that lets you update the state.
You can call this function from an event handler or somewhere else. It tells React to re-render the component with the new state.
*/