import React from "react";
import { useSelector } from "react-redux";
import classes from "./Week.module.css";

export const Week = (props) => {
  const currentWeek = useSelector((state) => state.currentWeek);
  return (
    <div
      onClick={(e) => {
        props.onClick(props.week + 1);
      }}
    >
      <p
        className={classes["week"]}
        style={{
          color: `${currentWeek === props.week + 1 ? `#40abdf` : `#000`}`,
        }}
      >
        Tuần {props.week + 1}
      </p>
    </div>
  );
};
