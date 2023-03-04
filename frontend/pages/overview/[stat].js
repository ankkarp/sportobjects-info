import MainLayout from "../../layouts/MainLayout/MainLayout";
import { NAMES, NAV } from "../../constants";
import Pie from "../../components/Pie/Pie";
import { useRouter } from "next/router";

const StatisticPage = ({ data, renameLabels }) => {
  const router = useRouter();
  const { stat } = router.query;

  return (
    <MainLayout activeItem={stat}>
      <Pie
        data={Object.entries(data).map(([k, v]) => {
          return {
            value: v,
            name: k == "null" ? "Не указано" : renameLabels ? NAMES[k] : k,
          };
        })}
      />
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
  const data = await res.json();
  // console.log(data);
  const toBeRenamed = ["active", "funding"];
  const renameLabels = toBeRenamed.includes(context.params.stat);

  return { props: { data, renameLabels } };
}

export default StatisticPage;
