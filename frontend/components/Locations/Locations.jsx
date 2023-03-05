import { Map, Marker, ZoomControl } from "pigeon-maps";
import { osm } from "pigeon-maps/providers";
import { useEffect, useState } from "react";
import styles from "./Locations.module.css";

const Locations = ({ locs }) => {
  const [active, setActive] = useState(false);
  useEffect(() => {
    setTimeout(() => setActive(true), 0);
  }, []);

  return (
    <div className={`${styles.map} ${active ? styles.active : ""}`}>
      <Map
        provider={osm}
        // height={"100%"}
        defaultCenter={[locs[0].y, locs[0].x]}
        defaultZoom={11}
      >
        <ZoomControl />
        {locs.map((loc, i) => (
          <Marker width={20} anchor={[loc.y, loc.x]} key={i} color="#D14D0C" />
        ))}
      </Map>
    </div>
  );
};

export default Locations;
