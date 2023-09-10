import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function AreaChartCard({
  label,
  options,
  setYearlyData,
  selectedYear,
  data,
}) {
  const chartdata = {
    labels,
    datasets: [
      {
        fill: true,
        // label: label,
        data: data,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const handleYearChange = (event) => {
    setYearlyData(event.target.value);
  };

  return (
    <div className="bar-chart-container">
      <h2 className="chart-title">{label}</h2>
      <div className="chart">
        <Line options={options} data={chartdata} />
      </div>
      <div className="year-selector">
        {/* <label htmlFor="year-select">Select year:</label> */}
        <select
          id="year-select"
          onChange={handleYearChange}
          value={selectedYear}
        >
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
        </select>
      </div>
    </div>
  );
}
