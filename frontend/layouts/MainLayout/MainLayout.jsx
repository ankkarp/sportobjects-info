import Stats from "../../components/Stats/Stats";
import Map from "../../components/Map/Map";
import { useState } from "react";

const MainLayout = ({ data }) => {
  const [mode, setMode] = useState("stats");

  return (
    <div className="main-container">
      <Head>
        <title>СпортИнфо</title>
        <meta name="description" content="Статистика спортивных объектов" />
      </Head>
      <Header />
      <nav>
        <button onClick={() => setMode("stats")}>Статистика</button>
        <button onClick={() => setMode("map")}>Карта</button>
      </nav>
      <div>{mode == "stats" ? <Stats data={data} /> : <Map data={data} />}</div>
    </div>
  );
};

export default MainLayout;
