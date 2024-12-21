import React, { useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import "./CourseStat.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GetStats } from "../../RTK/Slices/CourseSlice";

const CourseStat = () => {
  // Extract progress data
  const params = useParams();
  const currCourseID = params.courseid;

  const dispatch = useDispatch();

  let data = useSelector((state) => state.Course);
  useEffect(() => {
    dispatch(GetStats(currCourseID));
  }, []);
  data = data?.courseStat;
  console.log(data);
  const totalStudents = data?.total_students;

  // Calculate pass percentages for quizzes
  const quizPasses = data?.quizzes?.flat().reduce((acc, quiz) => {
    return (
      acc +
      quiz?.student?.filter(
        (student) => student.pass === true && student.grade !== null
      ).length
    );
  }, 0);
  const quizPassPercentage = ((quizPasses / totalStudents) * 100).toFixed(2);

  // Calculate pass percentages for assignments
  const assignmentPasses = data?.assignments
    ?.flat()
    .reduce((acc, assignment) => {
      return (
        acc +
        assignment.student.filter(
          (student) => student.passfail === true && student.grade !== null
        ).length
      );
    }, 0);
  const assignmentPassPercentage = (
    (assignmentPasses / totalStudents) *
    100
  ).toFixed(2);

  // Calculate pass percentages for contests
  const contestPasses = data?.contests?.reduce((acc, contest) => {
    return (
      acc +
      contest?.student?.filter(
        (student) => student.pass === true && student.grade !== null
      ).length
    );
  }, 0);
  const contestPassPercentage = ((contestPasses / totalStudents) * 100).toFixed(
    2
  );

  // Data for the bar chart showing percentages
  const passBarData = {
    labels: ["Quizzes", "Assignments", "Contests"],
    datasets: [
      {
        label: "Percentage of Students Passing",
        data: [
          parseFloat(quizPassPercentage),
          parseFloat(assignmentPassPercentage),
          parseFloat(contestPassPercentage),
        ],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
        borderWidth: 1,
      },
    ],
  };

  // Progress distribution
  const progressBuckets = [0, 0, 0, 0]; // Buckets for 0-25, 25-50, 50-75, 75-100
  data?.students_progress?.forEach((student) => {
    const progress = student.student_progress * 100;
    if (progress <= 25) progressBuckets[0]++;
    else if (progress <= 50) progressBuckets[1]++;
    else if (progress <= 75) progressBuckets[2]++;
    else progressBuckets[3]++;
  });

  // Extract pie chart data
  const pieData = {
    assignments: data?.assignments?.length || 0,
    contests: data?.contests?.length || 0,
    quizzes: data?.quizzes?.length || 0,
  };

  const barChartData = {
    labels: ["0-25%", "25-50%", "50-75%", "75-100%"],
    datasets: [
      {
        label: "Number of Students",
        data: progressBuckets,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        borderColor: "#333",
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: ["Assignments", "Contests", "Quizzes"],
    datasets: [
      {
        data: [pieData.assignments, pieData.contests, pieData.quizzes],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div className="stats-graph">
      <h2 className="h44442">Student Progress and Activity</h2>
      <div className="chart-container">
        <div className="bar-chart">
          <h3>Student Progress Distribution</h3>
          <Bar data={barChartData} />
        </div>
        <div className="pie-chart">
          <h3 className="h444">Activity Distribution</h3>
          <Pie data={pieChartData} />
        </div>
        <div className="bar-chart">
          <h3 className="h444">Percentage of Students Passing</h3>
          <Bar data={passBarData} />
        </div>
      </div>
    </div>
  );
};

export default CourseStat;
