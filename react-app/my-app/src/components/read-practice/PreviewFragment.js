import React from "react";
import { useSelector } from "react-redux";
import { PreviewTest } from "../do-test/PreviewTest";
import classes from "./ReadPractice.module.css";

export const ReadPractice = (props) => {
  const week = useSelector((state) => state.weekArr);
  const currentWeek = useSelector((state) => state.currentWeek);
  const currentPractice = useSelector((state) => state.currentPractice);
  const practice =
    week &&
    week[currentWeek - 1]?.practice &&
    week[currentWeek - 1]?.practice[currentPractice - 1];
  const currentTest = useSelector((state) => state.currentTest);
  const test =
    week &&
    week[currentWeek - 1]?.test &&
    week[currentWeek - 1]?.test[currentTest - 1];

  return (
    <React.Fragment>
      <div className={classes.buttonWrapper}>
        <button
          type="button"
          className={`${classes["button-node"]} ${classes.confirm}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
          Bài trước
        </button>
        <button
          type="button"
          className={`${classes["button-node"]} ${classes.confirm}`}
        >
          Bài sau
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      <div className={classes.body}>
        {props.showTest ? (
          <PreviewTest exams={test.exams} />
        ) : (
          <div className={classes.practiceContent}></div>
        )}
      </div>
    </React.Fragment>
  );
};
