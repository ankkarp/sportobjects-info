import ReactEcharts from "echarts-for-react";

const Pie = ({ data }) => {
  const pieOption = {
    // legend: {
    //   orient: "vertical",
    //   top: "5%",
    //   left: "0",
    //   textStyle: "white",
    //   inactiveColor: "white",
    //   data: data.map((it) => it.name),
    //   label: {
    //     color: "rgba(255, 255, 255, 0.3)",
    //   },
    //   labelLine: {
    //     lineStyle: {
    //       color: "rgba(255, 255, 0, 0.3)",
    //     },
    //     smooth: 0.2,
    //     length: 10,
    //     length2: 20,
    //   },
    //   inactiveColor: "#ccc",
    //   textStyle: {
    //     color: "rgb(255, 255, 255)",
    //     width: 100,
    //     // maxWidth:100,
    //     overflow: "truncate",
    //   },
    // },
    orient: "vertical",
    backgroundColor: "#302D2D",
    // radius: [20, 180],
    tooltip: {
      trigger: "item",
      formatter: "{b}: {d}%",
    },
    // maintainAspectRatio: true,
    series: [
      {
        minAngle: 3,
        stillShowZeroSum: false,
        type: "pie",
        // height: "100%",
        // width: "100%",
        data: data,
        label: {
          color: "rgba(255, 255, 255, 0.3)",
        },
        labelLine: {
          lineStyle: {
            color: "rgba(255, 255, 0, 0.3)",
          },
          smooth: 0.2,
          length: 10,
          length2: 20,
        },
        label: {
          color: "rgba(255, 255, 255, 0.3)",
          normal: {
            show: true,
            formatter: "{b}", // {c} data: [{value:},]
          },
          emphasis: {
            show: true,
          },
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        // radius: "50%",
      },
    ],
    // legend: {
    //   orient: "vertical",
    //   left: 20,
    //   inactiveColor: "#ccc",
    //   textStyle: {
    //     color: "rgb(255, 255, 255)",
    //   },
    //   : data.map((it) => it.name),
    //   textStyle: {},
    // },
  };

  const histOption = {
    xAxis: {
      type: "category",
      data: data.map((it) => it.name),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: data.map((it) => it.value),
        type: "bar",
        // height: 200,
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
      },
    ],
    legend: {
      orient: "vertical",
      itemStyle: {
        color: "rgba(255, 255, 255, 0.8)",
      },
      data: data.map((it) => it.name),
    },
  };

  return (
    <div className="chart">
      <ReactEcharts
        option={pieOption}
        style={{
          height: "100%",
          width: "100%",
        }}
      />
    </div>
  );
};

export default Pie;
