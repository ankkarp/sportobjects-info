import { NAV } from "../../constants";
import Link from "next/link";
import styles from "./Sidebar.module.css";
import MenuIcon from "../MenuIcon/MenuIcon";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useEffect, useState } from "react";

const Sidebar = ({ id = "overview", activeItem }) => {
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const [show, setShow] = useState(false);

  useEffect(() => setShow(false), [activeItem]);

  return (
    <div>
      <nav className={`${styles.sidebar} ${show && styles.show}`}>
        {Object.entries(NAV).map(([k, v]) => (
          <Link
            href={`/${encodeURIComponent(id)}/${encodeURIComponent(k)}`}
            key={k}
            className={`${styles.nav} ${activeItem === k ? styles.active : ""}`}
          >
            {v}
          </Link>
        ))}
        <Link
          href={`/map`}
          className={`${styles.nav} ${
            activeItem === "map" ? styles.active : ""
          }`}
        >
          На карте
        </Link>
      </nav>
      {windowWidth < windowHeight && (
        <div className={styles.menu} onClick={() => setShow(true)}>
          <MenuIcon />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
