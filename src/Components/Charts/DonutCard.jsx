import { ResponsivePie } from "@nivo/pie";
import "./DountCard.css";

const randomFillStyles = () => {
  const styles = ["lines", "dots"];
  const randomIndex = Math.floor(Math.random() * styles.length);
  return styles[randomIndex];
};

const randomColorThemes = () => {
  const themes = [
    "pastel1",
    "dark2",
    "nivo",
    "category10",
    "accent",
    "paired",
    "pastel2",
    "set1",
    "set2",
    "set3",
  ];
  const randomIndex = Math.floor(Math.random() * themes.length);
  return themes[randomIndex];
};

const DountCard = ({ data }) => (
  <div className="dountcard">
    <ResponsivePie
      data={data}
      colors={{ scheme: randomColorThemes() }}
      // margin={{ top: 40, right: 40, bottom: 80, left: 40 }}
      margin={{ top: 15, right: 15, bottom: 15, left: 15 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor="black"
      arcLabelsRadiusOffset={1.5}
      enableArcLinkLabels={false}
      enableArcLabels={false}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={data.map((d) => ({
        match: {
          id: d.id,
        },
        id: randomFillStyles(),
      }))}
      // legends={[
      //   {
      //     anchor: "bottom",
      //     direction: "row",
      //     justify: false,
      //     translateX: 0,
      //     translateY: 56,
      //     itemsSpacing: 0,
      //     itemWidth: 100,
      //     itemHeight: 18,
      //     itemTextColor: "#000",
      //     itemDirection: "left-to-right",
      //     itemOpacity: 1,
      //     symbolSize: 18,
      //     symbolShape: "circle",
      //     effects: [
      //       {
      //         on: "hover",
      //         style: {
      //           itemTextColor: "#000",
      //         },
      //       },
      //     ],
      //   },
      // ]}
    />
  </div>
);

export default DountCard;
