import React, { useState, useEffect } from 'react'
import ActivityForm from './ActivityForm'
import ActivityList from './ActivityList'
import "../../App.css"
import './ActivityPage.css'
import { getActivities, createActivity } from '../../services/activityService'


const ActivityPage = () => {

   
   //retrieve userId from localStorage
   const userId = JSON.parse(localStorage.getItem("currentUserId"));

  

  //State to hold/store activities
  //✅ with useState hook, activities state will store all activities, and addActivity will update it.
  const [activities, setActivities] = useState([]) // State to store activities //useState([]): Creates a state variable activities to store the activities.


  // Fetch activities from the backend when the page loads and userId is available using useEffect hook.
  // Fetch activities when user logs in
  useEffect(() => {
    if(!userId) return; // Ensure userId is defined before making the request, Prevent unnecessary API call if userId is missing
    
    //✅ getActivities function fetches activities from the backend API and updates the activities state.
    
    const fetchActivities = async () => {
      
      try{
        const data = await getActivities(userId) //Calls the backend API.  getActivities() function fetches activities from the backend API.
    
        setActivities(data)  //Update state with fetched activities,, Updates frontend state.  Updates the activities state with the list of activities.
      }catch(error){
        console.error("Error fetching activities:", error);
      }
      
    }

    fetchActivities()
  
  }, [userId])   // Runs when `userId` changes
 

  // ✅Function to add a new activity to the list.  that takes an activity object as an argument and logs the activity object to the console.

  // const addActivity = (newActivity) => {
  //   console.log(newActivity);
  //   setActivities([newActivity, ...activities]); //Updates the state using setActivities(), adding the new activity to the list.
  // }

  // Function to handle form submission
  const handleSubmit = async(activityData) => {
   

    if(!userId){
      console.error("Error: userId is undefined, cannot post activity.");
      return;
    }

    try{
       const response = await createActivity(userId, activityData)
       if(response){
          setActivities([response,...activities]);  // Update activity list
       }
    }catch(error){
       console.error("Error posting activity:", error);
    }

  }

  return (
    <div className="pageDiv">
      <h2>Activity</h2>
      <div className="activity-content">
        <ActivityForm onSubmit={handleSubmit}/>
        <ActivityList activities={activities} setActivities={setActivities}/>   {/* Passes activities as a prop, Passes the state variable activities as a prop to the ActivityList component. */}
      </div>
    </div>
  )
}
export default ActivityPage

/*
✅ onAddActivity is a prop inside ActivityForm, but it refers to a function (addActivity) that was passed from the parent.
✅ addActivity is a function that updates state (setActivities).

✅ The ActivityPage component renders the ActivityForm and ActivityList components.
✅ The ActivityPage component has a state variable activities that stores the list of activities.

useState Hook
The useState hook is a function that lets you add state to functional components in React. When you call useState, it returns an array with two elements:

1. The current state value.
2. A function that lets you update the state.
You can call this function from an event handler or somewhere else. It tells React to re-render the component with the new state.
*/

/**
 *
 * 🔹 What this does:
 * useState([]): Creates a state variable activities to store the activities.
 * useEffect(...): Runs once when the ActivityPage component loads.
 * Calls getActivities(), retrieves the list of activities from the backend, and updates the state using setActivities(data).
 * 
 * 🛠 How This Works
When ActivityPage loads, useEffect() runs.
It calls getActivities(), which fetches activities from the backend.
setActivities(data) updates the UI with the retrieved activities.
 */

/**
 * 📝 Note: Passing a Function as a Prop
 *  Parent Component (ActivityPage.jsx) passes a function addActivity to the child component ActivityForm.jsx.
 *  This function is called when a new activity is created in the form.
 *  The new activity is then added to the list of activities in the parent component.
 * This is an example of how functions can be passed as props in React.
 * 
 * ActivityForm receives onAddActivity as a prop.
   onAddActivity={addActivity} means:
   The addActivity function is passed down to ActivityForm as a prop.
   Inside ActivityForm, it is called onAddActivity.

    When the form is submitted, the new activity is passed to the onAddActivity function.

 
  *Function (addActivity) in ActivityPage.jsx
 💡 What does addActivity do?

1.Takes newActivity as an argument (this is the activity saved from the backend).
2.Updates the state using setActivities(), adding the new activity to the list.
3.Re-renders the component so the UI updates automatically.


5️⃣ Summary: What’s Happening?
✅ addActivity is a function in the parent (ActivityPage).
✅ The function is passed down as a prop (onAddActivity).
✅ The child (ActivityForm) calls this function when a new activity is created.
✅ The function updates the state (setActivities), so React re-renders the list dynamically.

✅ When onAddActivity(newActivity) is called:
setActivities([newActivity, ...activities]) updates the state.
React re-renders the UI, and the new activity appears in ActivityList.

🚀 Final Takeaways
Props allow parent-to-child communication in React.
Functions can be passed as props, letting child components send data back to the parent.
React state updates dynamically, so the UI changes immediately without a full page reload.




| Step | Action | What Happens? |
| --- | --- | --- |
| 1️⃣ | `ActivityPage` renders | `ActivityForm` and `ActivityList` are displayed |
| 2️⃣ | User fills in form & submits | `handleSubmit()` runs in `ActivityForm` |
| 3️⃣ | API call is made | `postActivity(formData)` sends data to the backend |
| 4️⃣ | Backend saves activity | Returns the **newly created activity** |
| 5️⃣ | `onAddActivity(newActivity)` is called | **Updates state (`setActivities`)** |
| 6️⃣ | UI updates dynamically | New activity **appears in the list** |
 */






