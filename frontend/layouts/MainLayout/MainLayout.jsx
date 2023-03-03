import Stats from "../../components/Stats/Stats";
import Map from "../../components/Map/Map";
import Head from "next/head";
import { useState } from "react";
import Header from "../../components/Header/Header";
import { NAV } from "../../constants";
import Link from "next/link";

const MainLayout = ({ title, data, renameLabels }) => {
  const [mode, setMode] = useState("stats");

  return (
    <div className="main-container">
      <Head>
        <title>СпортИнфо</title>
        <meta name="description" content="Статистика спортивных объектов" />
      </Head>
      <Header />
      <nav>
        {Object.entries(NAV).map(([k, v]) => (
          <Link href={`/overview/${encodeURIComponent(k)}`} key={k}>
            {v}
          </Link>
        ))}
      </nav>
      <Stats title={title} data={data} renameLabels={renameLabels} />
    </div>
  );
};

export default MainLayout;
