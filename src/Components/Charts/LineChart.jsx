import { ResponsiveLine } from "@nivo/line";
import "./LineChart.css";

const randomColorThemes = () => {
  const themes = ["dark2", "nivo", "category10", "accent", "paired", "set1"];
  const randomIndex = Math.floor(Math.random() * themes.length);
  return themes[randomIndex];
};

const LineChart = ({ data, yaxis, xaxis }) => {
  return (
    <div className="linechart">
      <ResponsiveLine
        data={data || []}
        curve="cardinal"
        colors={{ scheme: randomColorThemes() }}
        enableArea={true}
        margin={{ top: 10, right: 10, bottom: 20, left: 40 }}
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
        // legends={[
        //   {
        //     anchor: "bottom-right",
        //     direction: "column",
        //     justify: false,
        //     translateX: 100,
        //     translateY: 0,
        //     itemsSpacing: 0,
        //     itemDirection: "left-to-right",
        //     itemWidth: 80,
        //     itemHeight: 20,
        //     itemOpacity: 0.75,
        //     symbolSize: 12,
        //     symbolShape: "circle",
        //     symbolBorderColor: "rgba(0, 0, 0, .5)",
        //     effects: [
        //       {
        //         on: "hover",
        //         style: {
        //           itemBackground: "rgba(0, 0, 0, .03)",
        //           itemOpacity: 1,
        //         },
        //       },
        //     ],
        //   },
        // ]}
      />
    </div>
  );
};

export default LineChart;
