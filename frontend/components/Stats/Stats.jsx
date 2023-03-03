import { useState } from "react";
import { COLUMNS } from "../../constants";
import Pie from "../Pie/Pie";

const Stats = ({ data }) => {
  const [active, setActive] = useState("sctive");

  return (
    <div className="sidebar">
      <Pie
        data={Object.entries(data.funding).map(([k, v]) => {
          return { value: v, name: COLUMNS[k] };
        })}
      />
      <Pie
        data={Object.entries(data.sporttype).map(([k, v]) => {
          return { value: v, name: k };
        })}
      />
      {/* {Object.entries(data.funding).map(([col, val], i) => (
        <div className="stats-grid">
          {!COLUMNS[col].match("english|координата") &&
            val &&
            !val.toString().match("nan|None|id") && (
              <>
                <p>{COLUMNS[col]}</p>
                <p>{val}</p>
              </>
            )}
        </div>
      ))} */}
    </div>
  );
};

export default Stats;
