import React from "react";
import classes from "./ListPractice.module.css";

export const ListPractice = (props) => {
  return (
    <div>
      <ul className={classes["list-practice"]}>{props.children}</ul>
    </div>
  );
};
