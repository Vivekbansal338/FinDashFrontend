import React from "react";
import LineChart from "../Charts/LineChart";
import Loading from "../Shared/Loading";
import "./LargeLineCard.css";

const LargeLineCard = ({
  data,
  isLoading,
  label,
  yaxis,
  xaxis,
  setYearlyData,
  selectedYear,
}) => {
  const handleYearChange = (event) => {
    setYearlyData(event.target.value);
  };

  return (
    <div className="largelinecard">
      <div className="largelinecard-top">
        <h3>{label}</h3>
        <select
          className="linechart-year-select"
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
      <div className="largelinecard-main">
        {isLoading ? (
          <Loading />
        ) : (
          <LineChart
            data={data}
            isLoading={isLoading}
            label={label}
            yaxis={yaxis}
            xaxis={xaxis}
            setYearlyData={setYearlyData}
            selectedYear={selectedYear}
          />
        )}
      </div>
    </div>
  );
};

export default LargeLineCard;
