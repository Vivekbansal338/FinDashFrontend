import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
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

export default function BarCard({ options, label, data }) {
  const [selectedYear, setSelectedYear] = useState("2021");
  const chartdata = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: data,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div className="bar-chart-container">
      <h2 className="chart-title">{label}</h2>
      <div className="chart">
        <Bar options={options} data={chartdata} />
      </div>
      <div className="year-selector">
        <label htmlFor="year-select">Select year:</label>
        <select
          id="year-select"
          value={selectedYear}
          onChange={handleYearChange}
        >
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
        </select>
      </div>
    </div>
  );
}
