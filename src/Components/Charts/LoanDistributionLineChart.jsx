import { ResponsiveLine } from "@nivo/line";
import "./Chart.css";

const randomColorThemes = () => {
  const themes = ["dark2", "nivo", "category10", "accent", "paired", "set1"];
  const randomIndex = Math.floor(Math.random() * themes.length);
  return themes[randomIndex];
};

const LoanDistributionLineChart = ({ data, label, yaxis, xaxis }) => {
  return (
    <div className="bar-chart-container">
      <h2 className="chart-title">{label}</h2>
      <div className="chart">
        <ResponsiveLine
          data={data}
          curve="cardinal"
          colors={{ scheme: randomColorThemes() }}
          enableArea={true}
          margin={{ top: 10, right: 15, bottom: 20, left: 40 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: 0,
            max: "auto",
            stacked: true,
            reverse: false,
          }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 0,
            tickPadding: 10,
            tickRotation: 0,
            // legend: xaxis,
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            tickSize: 0,
            tickPadding: 10,
            tickRotation: 0,
            // legend: yaxis,
            legendOffset: -40,
            legendPosition: "middle",
          }}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
          enableGridX={false}
          enableGridY={false}
        />
      </div>
    </div>
  );
};

export default LoanDistributionLineChart;
