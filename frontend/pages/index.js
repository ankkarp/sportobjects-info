import Head from "next/head";
import Image from "next/image";

export default function Home() {
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
            <p>Статистика</p>
            <p>Карта</p>
          </nav>
        </div>
        <div className="search"></div>
      </div>
      <main></main>
    </div>
  );
}
