import Head from "next/head";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Router } from "next/router";
import styles from "./MainLayout.module.css";
import Loading from "../../components/Loading/Loading";

const MainLayout = ({ children, activeItem, id = "overview" }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <div className="main-container">
      <Head>
        <title>СпортИнфо</title>
        <meta name="description" content="Статистика спортивных объектов" />
      </Head>
      <Header />
      <div className={styles.statistics}>
        <Sidebar activeItem={activeItem} />
        {loading ? <Loading /> : children}
      </div>
    </div>
  );
};

export default MainLayout;
