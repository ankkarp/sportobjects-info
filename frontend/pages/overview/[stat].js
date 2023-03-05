import MainLayout from "../../layouts/MainLayout/MainLayout";
import { NAMES, NAV } from "../../constants";
import Chart from "../../components/Chart/Chart";
import { useRouter } from "next/router";

const StatisticPage = ({ data, title }) => {
  const router = useRouter();
  const { stat } = router.query;

  return (
    <MainLayout activeItem={stat}>
      <Chart data={data} title={title} />
    </MainLayout>
  );
};

export async function getServerSideProps(context) {
  const res = await fetch(`http://localhost:8000/stats/${context.params.stat}`);
  if (res.status == 404) {
    return {
      redirect: {
        destination: "/overview/active",
        permanent: false,
      },
    };
  }
  const rawData = await res.json();
  // console.log(data);
  console.log(rawData);
  const toBeRenamed = ["active", "funding"];
  const data = Object.entries(rawData).map(([k, v]) => {
    return {
      value: v,
      name: toBeRenamed.includes(context.params.stat) ? NAMES[k] : k,
    };
  });
  const title = NAV[context.params.stat];

  return { props: { data, title } };
}

export default StatisticPage;
