import React, { useEffect, useState } from "react";
import classes from "./CountingTime.module.css";

export const CoutingTime = (props) => {
  let min = props.min;
  let second = props.second;
  const [isTimeOut, setIsTimeOut] = useState(false);
  const [minutes, setMinutes] = useState(min);
  const [seconds, setSeconds] = useState(second);
  useEffect(() => {
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
