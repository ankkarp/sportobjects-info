import { useState } from "react";
import { NAMES } from "../../constants";
import Pie from "../Pie/Pie";

const Stats = ({ title, data, renameLabels }) => {
  return (
    <Pie
      title={title}
      data={Object.entries(data).map(([k, v]) => {
        return {
          value: v,
          name: k == "null" ? "Не указано" : renameLabels ? NAMES[k] : k,
        };
      })}
    />
  );
};

export default Stats;
