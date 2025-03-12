import React from 'react'
import { useState } from 'react'


const ActivityForm = ({onSubmit}) => {
    
  
  // Initialize form state
  const [formData, setFormData] = useState({
        caloriesBurned: "",
        distance: "",
        steps: "",
        date: "",
    })

    // Handle input changes, and send the new value to update the state
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    } 

     // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()

        await onSubmit(formData)  // Call `handleSubmit` in `ActivityPage.jsx`

        // try {
        //     //Save new activity to the MySQL database
        //     const newActivity = await createActivity(formData)  // Calls backend API, Send data to backend via createActivity function (Post request)

        //     // Update frontend state (pass new activity to parent component)
        //     onAddActivity(newActivity) // Call parent function (addActivity),,,   Update frontend state

            // Clear form, reset form data
        setFormData({
                caloriesBurned: "",
                distance: "",
                steps: "",
                date: "",
        }) 
        // } catch (error) {
        //     console.error("Error posting activity:", error);
        // }
    }

  return (
    <form onSubmit={handleSubmit} className="activityForm">
         <h3>Post New Activity</h3>
         <input type="number" name="caloriesBurned" placeholder="Enter calories burned" value={formData.caloriesBurned} onChange={handleChange} required/>
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
//✅ The ActivityForm component is responsible for adding new activities.

/**
 * 🛠 How This Works
When the user clicks "Submit," handleSubmit() runs.
await createActivity(formData); sends data to the backend via POST.
The backend saves the new activity in MySQL and returns it.
onAddActivity(newActivity); updates the frontend without a page reload.
 */

/**
 * Step-by-step:
 * 1.User types in the form fields (calories burned, distance, steps, date).
 * 2.User clicks Submit → handleSubmit() runs
 *   The form sends the data to the backend (createActivity(formData)).
     If successful, the backend returns the saved new activity.
     onAddActivity(newActivity) adds it to the frontend list without refreshing the page.
 */


 /**
  * 💡 Breaking It Down: How Data Flows
  * I'll break this into 4 major steps:

 1️⃣ When the Page Loads: Fetch Data from Backend
  The frontend (React) needs to show a list of activities.
  It does this by calling the backend API.

  2️⃣ When User Submits a New Activity: Send Data to Backend
  When the user enters a new activity in the form and clicks "Submit", we want to: ✅ Send the form data to the backend
✅ Save it in the MySQL database
✅ Update the frontend so it shows the new activity without a page refresh

3️⃣ Backend Saves the Activity in MySQL
   Frontend sends a POST request to the backend.
   The backend receives the data and saves it in MySQL.
   The backend responds to the frontend and sends back json the newly created activity (including its database id).

4️⃣ Frontend Updates the UI with the New Activity

  *  

🔹 ****** Key Breakdown

1.onAddActivity is passed down as a prop (which is actually addActivity from the parent).
2.When the user submits the form:
  a.The form sends the data to the backend (await createActivity(formData)).
  b.Once the backend saves it, newActivity is returned.
  c.onAddActivity(newActivity) calls the function from the parent (addActivity).
  d.This updates the state so the new activity appears in the list.



🔹 ******Let's map out how the data flows step by step.

Step 1: ActivityPage (Parent) Passes addActivity to ActivityForm
ActivityPage passes down addActivity as onAddActivity to ActivityForm.
This means inside ActivityForm, the function onAddActivity is now available as a prop.

Step 2: User Submits the Form (ActivityForm)
**onAddActivity(newActivity) runs addActivity(newActivity) in the parent.
**The state in the parent (ActivityPage) is updated, so the new activity appears immediately.

Step 3: Parent Updates the UI (ActivityList)
<ActivityList activities={activities} />
Since activities is updated, ActivityList automatically re-renders to show the new activity.

*/    