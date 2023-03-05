import Locations from "../components/Locations/Locations";
import MainLayout from "../layouts/MainLayout/MainLayout";

const MapPage = ({ locs }) => {
  return (
    <MainLayout activeItem="map">
      <Locations locs={locs} />
    </MainLayout>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`http://web:8000/locs`);
  const locs = await res.json();
  console.log(locs.length);

  return { props: { locs } };
}

export default MapPage;
