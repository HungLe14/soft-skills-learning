import React, { useEffect, useState } from "react";
import { practiceAction } from "../store";
import { useDispatch, useSelector } from "react-redux";
import classes from "./CountingTime.module.css";

export const CoutingTime = (props) => {
  const dispatch = useDispatch();
  const weekArr = useSelector((state) => state.weekArr);
  const currentWeek = useSelector((state) => state.currentWeek);
  const currentTest = useSelector((state) => state.currentTest);
  let min = props.min;
  let second = props.second;
  const [isTimeOut, setIsTimeOut] = useState(false);
  const [minutes, setMinutes] = useState(min);
  const [seconds, setSeconds] = useState(second);

  useEffect(() => {
    dispatch(practiceAction.addTimeCompletedTest(minutes * 60 + seconds));
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
      if (minutes === 0 && seconds === 0) {
        setIsTimeOut(true);
        props.onSetTimeOut(true);
        setTimeout(() => {
          props.onAutoSubmit();
          dispatch(practiceAction.addTimeCompletedTest(minutes * 60 + seconds));
        }, 1000);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <div className={classes.countingWrapper}>
      <span>{isTimeOut ? "HẾT GIỜ" : "Thời gian còn lại:"} </span>
      {!isTimeOut && (
        <React.Fragment>
          <span>{minutes < 10 ? `0` + minutes : minutes}</span>
          <span>:</span>
          <span>{seconds < 10 ? `0` + seconds : seconds}</span>
        </React.Fragment>
      )}
    </div>
  );
};
