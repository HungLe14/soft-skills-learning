import React from "react";
import { useSelector } from "react-redux";
import classes from "./Practice.module.css";

export const Practice = (props) => {
  const currentWeek = useSelector((state) => state.currentWeek);
  const currentPractice = useSelector((state) => state.currentPractice);
  return (
    <div>
      <li className={classes["practice"]}>
        <div className={classes["practice-wrapper"]}>
          <div className={classes["practice-list-icon"]}>
            {!props.preview ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256z" />
              </svg>
            ) : props.isFinished ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={classes["tick-icon"]}
                viewBox="0 0 20 20"
                fill="green"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={classes["tick-icon"]}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
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
                  currentWeek === props.week + 1 &&
                  !props.showTest
                    ? `#40abdf`
                    : `#000`
                }`,
              }}
            >
              Bài {props.practice}
            </span>
          </div>
          {!props.preview ? (
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
          ) : null}
        </div>
      </li>
    </div>
  );
};
