import React from "react";
import classes from "./Week.module.css";

export const Week = (props) => {
  return (
    <div
      onClick={(e) => {
        props.onClick(e.target.textContent);
      }}
    >
      <p className={classes["week"]}>Tuần {props.week + 1}</p>
    </div>
  );
};
