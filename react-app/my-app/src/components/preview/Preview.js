import React from "react";
import classes from "./Preview.module.css";

export const Preview = () => {
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
        <img src="" alt="description img" />
        <p></p>
      </div>
    </React.Fragment>
  );
};
