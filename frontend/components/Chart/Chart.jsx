import ReactEcharts from "echarts-for-react";
import { useWindowSize } from "../../hooks/useWindowSize";
import styles from "./Chart.module.css";

const Chart = ({ data, title }) => {
  const { width: windowWidth, height: windowHeight } = useWindowSize();

  const pieOption = {
    orient: "vertical",
    backgroundColor: "#302D2D",
    tooltip: {
      trigger: "item",
      formatter: "{b}: {d}%",
    },
    series: [
      {
        minAngle: 3,
        stillShowZeroSum: false,
        type: "pie",
        data: data,
        labelLine: {
          lineStyle: {
            color: "rgba(255, 255, 0, 0.3)",
          },
          smooth: 0.2,
          length: 10,
          length2: 20,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  const mobilePieOption = {
    ...pieOption,
    title: { subtext: title, left: "center" },
  };

  return (
    <div className={styles.chart}>
      <ReactEcharts
        option={windowWidth < windowHeight ? mobilePieOption : pieOption}
        className={styles.pie}
        style={{
          height: "100%",
          width: "100%",
        }}
      />
    </div>
  );
};

export default Chart;
