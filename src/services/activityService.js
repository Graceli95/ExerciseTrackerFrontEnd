//Step 1: Verify my Backend API
//Step 2: Set Up API Calls in activityService.js, which is Get (Fetch all activities from the backend API), and Post (create a new activity to the backend API).
//Step 3: Fetch Data in the Activity Component. Fetch Activities from the API. Use the API Calls in the ActivityPage component. 
//Step 4: Test the Application.
//Step 5: Verify the Data in MySQL.

import axios from "axios";

const API_URL_ACTIVITIES = "http://localhost:8083/api/activities";

const API_URL_ACTIVITY = "http://localhost:8083/api/activity";

//Fetch all activities from the backend API,, (get is fetch data from the server, get the data that user requested)
export const getActivities = async () => {
    try {
        const response = await axios.get(API_URL_ACTIVITIES);
        return response.data;
    } catch (error) {
        console.error(`Error fetching activities: ${error.response ? error.response.status : 'Network Error'}`);
        throw error;
    }

}

//create a new activity to the backend API,, (post is send data to the server)
export const createActivity = async (activity) => {
    try {
        const response = await axios.post(API_URL_ACTIVITY, activity);
        return response.data;
    } catch (error) {
        console.error(`Error creating activity: ${error.response ? error.response.status : 'Network Error'}`);
        throw error;
    }
}

//✅ **Now, our frontend can fetch and store activities in MySQL.**


/**
 *  1. installed axios using: npm install axios
 * 2. imported axios in the activityService.js file
 * 
 * activityService.js is responsible for handling API calls related to activities.
 * 
 * 3. created a function to fetch activities from the API
 * axios.get(API_URL) sends a GET request to "http://localhost:8083/api/activities".
 * If the request succeeds, it returns the response.data (which contains the list of activities).
 * 
 * axios.post(API_URL, activity) sends a POST request to "http://localhost:8083/api/activity", with activity as the data being sent.
 * If the request succeeds, it returns the newly created activity.
 * 
 * 4. exported the function to be used in other components
 * 
 * async: Marks the function as asynchronous.
 * await: Pauses the execution of the function until the axios.post promise is resolved.
 * try...catch: Handles any errors that occur during the asynchronous operation.
 * 
 * The async keyword allows you to write asynchronous code that looks synchronous, making it easier to read and maintain. 
 * In activityService.js file, The async keyword is used to handle API calls with axios in a clean and efficient manner. 
 * 
 * The await keyword is used to wait for the promises returned by axios to resolve, 
 * 
 * and try...catch blocks are used to handle any errors that may occur during these asynchronous operations.
 * 
 * 
 * 
 * Next Step Step 3 is to use this file activityService.js in the ActivityPage component to fetch and display activities.

 */
