import { NAV } from "../../constants";
import Link from "next/link";
import styles from "./Sidebar.module.css";

const Sidebar = ({ id = "overview", activeItem }) => {
  return (
    <nav>
      {Object.entries(NAV).map(([k, v]) => (
        <Link
          href={`/${encodeURIComponent(id)}/${encodeURIComponent(k)}`}
          key={k}
          className={activeItem === k ? styles.active : ""}
        >
          {v}
        </Link>
      ))}
      <Link href={`/map`} className={activeItem === "map" ? styles.active : ""}>
        На карте
      </Link>
    </nav>
  );
};

export default Sidebar;
