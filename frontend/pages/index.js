import Head from "next/head";
import { useState } from "react";
import Header from "../components/Header/Header";
import Stats from "../components/Stats/Stats";
import Map from "../components/Map/Map";
import MainLayout from "../layouts/MainLayout/MainLayout";

export default function Home({ data }) {
  const [mode, setMode] = useState("stats");

  return (
    <div className="main-container">
      <Head>
        <title>СпортИнфо</title>
        <meta name="description" content="Статистика спортивных объектов" />
      </Head>
      <div className="header-container">
        <div className="header">
          <h1>СпортИнфо</h1>
          <nav>
            <button
              className={mode == "stats" ? "active" : ""}
              onClick={() => setMode("stats")}
            >
              Статистика
            </button>
            <button
              className={mode == "map" ? "active" : ""}
              onClick={() => setMode("map")}
            >
              Карта
            </button>
          </nav>
        </div>
        <div className="main-block">
          {mode == "stats" ? <Stats data={data} /> : <Map data={data} />}
        </div>
        <div className="search"></div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  // const res = await fetch(`http://localhost:8000/data`);
  const res = await fetch(`http://localhost:8000/funding`);
  const data = { funding: [], sporttype: [] };
  data.funding = await res.json();
  // console.log(data);
  // console.log(
  //   Object.entries(data).map(([k, v]) => {
  //     return { value: v, name: k };
  //   })
  // );

  data.sporttype = await (
    await fetch(`http://localhost:8000/sporttype`)
  ).json();
  console.log(data);

  return { props: { data } };
}
