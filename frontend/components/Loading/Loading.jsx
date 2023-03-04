import styles from "./Loading.module.css";
import Image from "next/image";
import loadingLogo from "../../public/square-loading.gif";
import { useEffect, useState } from "react";

const Loading = () => {
  const [active, setActive] = useState(false);
  useEffect(() => {
    setTimeout(() => setActive(true), 500);
  }, []);

  return (
    <div className={`${styles.loading} ${active ? styles.active : ""}`}>
      <Image src={loadingLogo} alt="loading..." width={100} height={100} />
    </div>
  );
};

export default Loading;
