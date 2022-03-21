import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DoTest } from "../do-test/DoTest";
import classes from "./Preview.module.css";

export const Preview = (props) => {
  const week = useSelector((state) => state.weekArr);
  const currentWeek = useSelector((state) => state.currentWeek);
  const currentPractice = useSelector((state) => state.currentPractice);
  const practice = week[currentWeek - 1].practice[currentPractice - 1];
  const currentTest = useSelector((state) => state.currentTest);
  const test = week[currentWeek - 1].test[currentTest - 1];

  const dispatch = useDispatch();
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
        {!props.showTest ? (
          practice.description.map((des, desIndex) => {
            return (
              <React.Fragment key={desIndex}>
                {des.image.map((image, imageIndex) => {
                  return (
                    <img
                      key={imageIndex}
                      src={`https://firebasestorage.googleapis.com/v0/b/soft-skill-bc141.appspot.com/o/${image.name}?alt=media`}
                      alt="description img"
                      className={classes.previewPicture}
                    />
                  );
                })}

                <p className={classes.previewContent}>{des.content}</p>
              </React.Fragment>
            );
          })
        ) : (
          <DoTest exams={test.exams} />
        )}
      </div>
    </React.Fragment>
  );
};