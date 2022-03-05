import React from "react";
import classes from "./DashBoard.module.css";

export const DashBoard = (props) => {
  return <div className={classes["dashboard-container"]}>{props.children}</div>;
};
