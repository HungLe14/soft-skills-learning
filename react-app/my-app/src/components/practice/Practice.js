import React from "react";
import { useSelector } from "react-redux";
import classes from "./Practice.module.css";

export const Practice = (props) => {
  const currentPractice = useSelector((state) => state.currentPractice);
  const currentWeek = useSelector((state) => state.currentWeek);
  return (
    <div>
      <li className={classes["practice"]}>
        <div className={classes["practice-wrapper"]}>
          <span
            className={classes["practice-name"]}
            onClick={() => {
              props.onClick({
                practice: props.practice,
                week: props.week + 1,
              });
            }}
            style={{
              color: `${
                currentPractice === props.practice &&
                currentWeek === props.week + 1
                  ? `#40abdf`
                  : `#000`
              }`,
            }}
          >
            Bài {props.practice}
          </span>
          <svg
            onClick={() => {
              props.onDelete(props.practice);
            }}
            xmlns="http://www.w3.org/2000/svg"
            className={classes["delete-icon"]}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </div>
      </li>
    </div>
  );
};
