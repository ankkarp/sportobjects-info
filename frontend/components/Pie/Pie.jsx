import ReactEcharts from "echarts-for-react";

const Pie = ({ data }) => {
  const option = {
    backgroundColor: "#302D2D",
    title: {
      text: "Customized Pie",
      left: "center",
      top: 20,
      textStyle: {
        color: "#ccc",
      },
    },
    title: {
      subtext: "Финансирование",
      left: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "{b}: {d}% ({c})",
    },
    series: [
      {
        stillShowZeroSum: false,
        type: "pie",
        data: data,
        label: {
          color: "rgba(255, 255, 255, 0.3)",
        },
        labelLine: {
          lineStyle: {
            color: "rgba(255, 255, 255, 0.3)",
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
        radius: "50%",
      },
    ],

    legend: {
      icon: "circle",
      x: "center",
      y: "50px",
      data: Object.keys(data),
      textStyle: {
        color: "#fff",
      },
    },
  };

  //   const option = {
  // title: {
  //   subtext: "Финансирование",
  //   left: "center",
  // },
  // legend: {
  //   icon: "circle",
  //   x: "center",
  //   y: "50px",
  //   data: Object.entries(data).map(([k, v]) => ({ k: k, v: v })),
  //   textStyle: {
  //     color: "#fff",
  //   },
  // },
  // data: {
  //   legendText: "{a}",
  //   toolTipContent: "{k}: <strong>{v}%</strong>",
  //   indexLabel: "{c}%",
  //   indexLabelPlacement: "inside",
  // },
  // tooltip: {
  //   trigger: "item",
  //   formatter: "{d}%",
  // },
  // series: [
  //   {
  //     name: "Access From",
  //     type: "pie",
  //     radius: "50%",
  //     // data: Object.entries(data).map((k, v) => ({ value: v, name: k })),
  //     data: Object.entries(data).map((k, v) => ({ value: v, name: k })),
  //     emphasis: {
  //       itemStyle: {
  //         shadowBlur: 10,
  //         shadowOffsetX: 0,
  //         shadowColor: "rgba(0, 0, 0, 0.5)",
  //       },
  //     },
  //     label: {
  //       normal: {
  //         show: true,
  //         formatter: "{c}", // {c} data: [{value:},]
  //       },
  //       emphasis: {
  //         show: true,
  //       },
  //     },
  //     legend: {
  //       orient: "vertical",
  //       left: 10,
  //       data: ["Mon", "Tues", "Wed", "Thurs", "Fri"],
  //     },
  // data: Object.entries(data).map(([k, v]) => ({ k: k, v: v })),
  //   },
  // ],
  //   };
  return <ReactEcharts option={option} />;
};

export default Pie;
