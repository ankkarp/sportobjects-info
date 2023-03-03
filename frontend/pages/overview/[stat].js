import MainLayout from "../../layouts/MainLayout/MainLayout";
import { NAMES } from "../../constants";

const StatisticPage = ({ title, data, renameLabels }) => {
  return <MainLayout title={title} data={data} renameLabels={renameLabels} />;
};

export async function getServerSideProps(context) {
  // const res = await fetch(`http://localhost:8000/data`);
  const res = await fetch(`http://localhost:8000/stats/${context.params.stat}`);
  const data = await res.json();
  // console.log(data);
  // console.log(
  //   Object.entries(data).map(([k, v]) => {
  //     return { value: v, name: k };
  //   })
  // );

  //   return {
  //     redirect: {
  //       destination: "/overview/sports",
  //       permanent: false,
  //     },
  //   };
  const title = NAMES[context.params.stat];
  const toBeRenamed = ["active", "funding"];
  const renameLabels = toBeRenamed.includes(context.params.stat);

  return { props: { title, data, renameLabels } };
}

export default StatisticPage;
