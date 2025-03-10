import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import "../../App.css"
import "./dashboard.css"

const WorkoutCharts = () => {
  const caloriesChartRef = useRef(null);
  const durationChartRef = useRef(null);

  useEffect(() => {
    const workoutData = [
      { caloriesBurned: 300, duration: 60, date: "03/02" },
      { caloriesBurned: 450, duration: 75, date: "03/03" },
      { caloriesBurned: 500, duration: 90, date: "03/04" },
      { caloriesBurned: 350, duration: 50, date: "03/05" },
      { caloriesBurned: 450, duration: 100, date: "03/05" },
      { caloriesBurned: 600, duration: 80, date: "03/06" },
      { caloriesBurned: 200, duration: 40, date: "03/07" },
      { caloriesBurned: 700, duration: 100, date: "03/08" }
    ];
    
    const activityData = [
      { caloriesBurned: 150, duration: 30, date: "03/02" },
      { caloriesBurned: 250, duration: 45, date: "03/04" },
      { caloriesBurned: 100, duration: 20, date: "03/05" },
      { caloriesBurned: 300, duration: 60, date: "03/06" },
      { caloriesBurned: 400, duration: 70, date: "03/07" },
      { caloriesBurned: 500, duration: 90, date: "03/08" }
    ];

    function sumByDate(data, field) {
      return data.reduce((acc, entry) => {
        acc[entry.date] = (acc[entry.date] || 0) + entry[field];
        return acc;
      }, {});
    }

    // Sum calories and duration for both workout and activity
    const summedWorkoutCalories = sumByDate(workoutData, "caloriesBurned");
    const summedActivityCalories = sumByDate(activityData, "caloriesBurned");
    const summedWorkoutDuration = sumByDate(workoutData, "duration");
    const summedActivityDuration = sumByDate(activityData, "duration");

    // Get unique dates from all datasets, sort them
    const allDates = Array.from(new Set([
      ...Object.keys(summedWorkoutCalories),
      ...Object.keys(summedActivityCalories),
      ...Object.keys(summedWorkoutDuration),
      ...Object.keys(summedActivityDuration)
    ])).sort();

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
    
  }, []);

  return (
    <div className="pageDiv">
      <div className="chartContainer">
        <div className="chart">
          <h3>Calories Burned Over Past Week</h3>
          <div id="caloriesChart"></div>
        </div>
        <div className="chart"  style={{ marginLeft: "48px" }}>
          <h3>Total Duration Over Past Week</h3>
          <div id="durationChart"></div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCharts;
