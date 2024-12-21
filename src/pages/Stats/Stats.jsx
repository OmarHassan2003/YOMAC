import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import "./Stats.css";
import { getCategories } from "../../RTK/Slices/CategorySlice";
import { getStats } from "../../RTK/Slices/StatSlice";

const Stats = () => {
  const dispatch = useDispatch();

  let dataCategory = useSelector((state) => state.category);
  let dataStat = useSelector((state) => state.stat);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getStats());
  }, [dispatch]);

  dataCategory = dataCategory?.categories || [];
  dataStat = dataStat?.object || {};

  // Data for Bar Chart (Categories vs. Number of Courses)
  const barChartData = {
    labels: dataCategory.map((category) => category.categorytext),
    datasets: [
      {
        label: "Number of Courses",
        data: dataCategory.map((category) => category.numofcourses),
        backgroundColor: [
          "#36A2EB",
          "#FF6384",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Data for Pie Chart (Distribution of Students, Instructors, Courses)
  const pieChartData = {
    labels: ["Students", "Instructors", "Courses"],
    datasets: [
      {
        data: [
          dataStat.num_students || 0,
          dataStat.num_instructors || 0,
          dataStat.num_courses || 0,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div className="stats-container">
      <h2 className="stats-title">Platform Statistics</h2>
      <div className="stats-charts">
        <div className="chart-item">
          <h3>Number of Courses per Category</h3>
          <Bar data={barChartData} />
        </div>
        <div className="chart-item">
          <h3>Overall Platform Distribution</h3>
          <Pie data={pieChartData} />
        </div>
      </div>
    </div>
  );
};

export default Stats;
