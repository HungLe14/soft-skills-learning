import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./InputTiming.module.css";
import { practiceAction } from "../store";

export const InputTiming = () => {
  const dispatch = useDispatch();
  const weekArr = useSelector((state) => state.weekArr);
  const currentWeek = useSelector((state) => state.currentWeek);
  const currentTest = useSelector((state) => state.currentTest);

  const [isError, setIsError] = useState();

  const validate = (second) => {
    if (second > 60) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  };

  const inputMinHandler = (time) => {
    dispatch(practiceAction.addMinToTest(time));
    dispatch(practiceAction.countTotalTime());
  };

  const inputSecondHandler = (time) => {
    dispatch(practiceAction.addSecondToTest(time));
    dispatch(practiceAction.countTotalTime());
  };

  return (
    <div className={classes.timingWrapper}>
      <span className={classes.timingHeader}>Thời gian làm bài:</span>
      <input
        type="tel"
        className={classes.timingMin}
        onChange={(e) => {
          inputMinHandler(+e.target.value);
        }}
        value={weekArr[currentWeek - 1].test[currentTest - 1].time?.min}
      />
      <span className={classes.min}>phút</span>
      <input
        type="tel"
        className={`${classes.timingSecond} ${isError ? classes.validate : ""}`}
        onChange={(e) => {
          validate(e.target.value);
          inputSecondHandler(+e.target.value);
        }}
        value={weekArr[currentWeek - 1].test[currentTest - 1].time?.second}
      />
      <span className={classes.second}>giây</span>
      {isError && (
        <span className={classes.validate}>Số giây không được vượt quá 60</span>
      )}
    </div>
  );
};
