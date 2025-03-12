import React, { useEffect, useRef, useState } from "react";
import ApexCharts from "apexcharts";
import "../../App.css";
import "./dashboard.css";
import axios from "axios";

const WorkoutCharts = () => {
  const caloriesChartRef = useRef(null);
  const durationChartRef = useRef(null);

  const userId = localStorage.getItem("currentUserId");

  const [workouts, setWorkouts] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    if (!userId) return; // Ensure userId is defined before making the request

    const fetchWorkoutsAndActivities = async () => {
      try {
        const workoutResponse = await axios.get(`http://localhost:8086/users/${userId}/workouts`);
        const activityResponse = await axios.get(`http://localhost:8086/activities/users/${userId}`);
        setWorkouts(workoutResponse.data);
        setActivities(activityResponse.data);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchWorkoutsAndActivities();
  }, [userId]);

  useEffect(() => {
    if (workouts.length === 0 && activities.length === 0) return; // Ensure data is available

    // Function to format date as MM/DD/YY
    function formatDate(dateStr) {
      const date = new Date(dateStr);
      if (isNaN(date)) return dateStr; // Keep original if invalid date
      return new Intl.DateTimeFormat("en-US", { month: "2-digit", day: "2-digit", year: "2-digit" }).format(date);
    }

    // Function to generate date range (-6 to +6 days around today)
    function getDateRange() {
      const dates = [];
      for (let i = -6; i <= 6; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        dates.push(formatDate(date.toISOString()));
      }
      return dates;
    }

    const dateRange = getDateRange(); // Generate range from -6 days to +6 days

    function sumByDate(data, field) {
      return data.reduce((acc, entry) => {
        const formattedDate = formatDate(entry.date);
        if (dateRange.includes(formattedDate)) { // Only include dates in range
          acc[formattedDate] = (acc[formattedDate] || 0) + entry[field];
        }
        return acc;
      }, {});
    }

    // Sum calories and duration for both workout and activity
    const summedWorkoutCalories = sumByDate(workouts, "caloriesBurned");
    const summedActivityCalories = sumByDate(activities, "caloriesBurned");
    const summedWorkoutDuration = sumByDate(workouts, "duration");
    const summedActivityDuration = sumByDate(activities, "duration");

    // Ensure x-axis contains only the desired range (-6 to +6 days)
    const allDates = dateRange; 

    // Get values per date (default to 0 if missing)
    const workoutCalories = allDates.map(date => summedWorkoutCalories[date] || 0);
    const activityCalories = allDates.map(date => summedActivityCalories[date] || 0);
    const workoutDuration = allDates.map(date => summedWorkoutDuration[date] || 0);
    const activityDuration = allDates.map(date => summedActivityDuration[date] || 0);

    // Calories Chart (Stacked Bar Graph)
    const caloriesOptions = {
      chart: { type: "bar", height: 400, stacked: true },
      xaxis: { categories: allDates, title: { text: "Date" } },
      yaxis: { title: { text: "Calories Burned" } },
      tooltip: { enabled: true },
      dataLabels: { enabled: false },
      series: [
        { name: "Workout Calories", data: workoutCalories, color: "#ff5733" },
        { name: "Activity Calories", data: activityCalories, color: "#33aaff" }
      ]
    };

    // Duration Chart (Line Graph)
    const durationOptions = {
      chart: { type: "line", height: 400 },
      xaxis: { categories: allDates, title: { text: "Date" } },
      yaxis: { title: { text: "Duration (Minutes)" } },
      tooltip: { enabled: true },
      dataLabels: { enabled: false },
      series: [
        { name: "Workout Duration", data: workoutDuration, color: "#ff5733" },
        { name: "Activity Duration", data: activityDuration, color: "#33aaff" }
      ]
    };

    // Destroy previous charts before rendering new ones
    if (caloriesChartRef.current) {
      caloriesChartRef.current.destroy();
    }
    if (durationChartRef.current) {
      durationChartRef.current.destroy();
    }

    caloriesChartRef.current = new ApexCharts(document.querySelector("#caloriesChart"), caloriesOptions);
    caloriesChartRef.current.render();

    durationChartRef.current = new ApexCharts(document.querySelector("#durationChart"), durationOptions);
    durationChartRef.current.render();
    
  }, [workouts, activities]); // Re-run when workouts or activities change

  return (
    <div className="pageDiv">
      <div className="chartContainer">
        <div className="chart">
          <h3>Calories Burned (-6 to +6 days)</h3>
          <div id="caloriesChart"></div>
        </div>
        <div className="chart" style={{ marginLeft: "48px" }}>
          <h3>Total Duration (-6 to +6 days)</h3>
          <div id="durationChart"></div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCharts;
