//Step 1: Verify my Backend API
//Step 2: Set Up API Calls in activityService.js, which is Get (Fetch all activities from the backend API), and Post (create a new activity to the backend API).
//Step 3: Fetch Data in the Activity Component. Fetch Activities from the API. Use the API Calls in the ActivityPage component. 
//Step 4: Test the Application.
//Step 5: Verify the Data in MySQL.

import axios from "axios";

// const getApiUrlActivities = (userId) => `http://localhost:8086/activities/users/${userId}`;
// const getApiUrlActivity = (userId) => `http://localhost:8086/activities/user/${userId}/new`;


const API_BASE_URL = "http://localhost:8086/activities"; // Base URL for API

const getApiUrlActivities = (userId) => `${API_BASE_URL}/users/${userId}`;
const getApiUrlActivity = (userId) => `${API_BASE_URL}/user/${userId}/new`;


//Fetch all activities from the backend API (get is fetch data from the server, get the data that user requested)
export const getActivities = async (userId) => {
    
    if(!userId){   //Ensures userId exists before making API calls (prevents undefined requests).

        console.error("Error: userId is undefined. Cannot fetch activities.");
        return []; // Return an empty array instead of making a bad request
    }
    
    try {
        const response = await axios.get(getApiUrlActivities(userId));
        return response.data;
    } catch (error) {
        console.error(`Error fetching activities: ${error.response ? error.response.status : 'Network Error'}`);
        return [];  // Return an empty array to prevent crashing
    }

}

//create a new activity to the backend API,, (post is send data to the server)
export const createActivity = async (userId, activity) => {
    if(!userId){
        console.error("Error: userId is undefined. Cannot create activity.");
        return null;
    }
    
    try {
        const response = await axios.post(getApiUrlActivity(userId), activity);
        return response.data;
    } catch (error) {
        console.error(`Error creating activity: ${error.response ? error.response.status : 'Network Error'}`);
        return null;  // to prevent crashing
    }
}

//✅ **Now, our frontend can fetch and store activities in MySQL.**

/**
 * getActivities() and createActivity() functions are part of my frontend service file (activityService.js). These functions:

Send HTTP requests from the frontend (React) to the backend (Spring Boot).
Receive responses from the backend and return data to the frontend.
Handle errors properly to catch issues like server errors or network failures.

 */


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


