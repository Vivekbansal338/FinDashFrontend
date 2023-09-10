import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const colorCombinations = [
  { background: "rgba(255, 99, 132, 0.2)", border: "rgba(255, 99, 132, 1)" },
  { background: "rgba(75, 192, 192, 0.2)", border: "rgba(75, 192, 192, 1)" },
  { background: "rgba(255, 206, 86, 0.2)", border: "rgba(255, 206, 86, 1)" },
  { background: "rgba(255, 159, 64, 0.2)", border: "rgba(255, 159, 64, 1)" },
];

const cardBackgroundColors = [
  "#3498db", // Blue
  "#e74c3c", // Red
  "#2ecc71", // Green
  "#f1c40f", // Yellow
  "#9b59b6", // Purple
  "#e67e22", // Orange
];

const getRandomCombination = () => {
  const randomIndex = Math.floor(Math.random() * colorCombinations.length);
  return colorCombinations[randomIndex];
};

const getRandomBackgroundColor = () => {
  const randomIndex = Math.floor(Math.random() * cardBackgroundColors.length);
  return cardBackgroundColors[randomIndex];
};

const DataCard = ({ data, label }) => {
  const { background, border } = getRandomCombination();
  const cardBackgroundColor = getRandomBackgroundColor();

  const chartData = {
    // labels: [label],
    datasets: [
      {
        label: [label],
        data: [data],
        backgroundColor: [background],
        borderColor: [border],
        borderWidth: 1,
      },
    ],
  };

  // CSS styles for the futuristic card container
  const cardStyle = {
    width: "150px",
    border: "none",
    borderRadius: "10px",
    padding: "16px",
    margin: "16px",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: `linear-gradient(45deg, ${cardBackgroundColor}, ${background})`,
    color: "#FFFFFF",
  };

  const titleStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "8px",
  };

  const valueStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    margin: "8px 0",
  };

  return (
    <div style={cardStyle}>
      <h2 style={titleStyle}>{label}</h2>
      <Doughnut data={chartData} />
      <p style={valueStyle}>{data}</p>
    </div>
  );
};

export default DataCard;
