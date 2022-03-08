import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./VerInput.module.css";
import { practiceAction } from "../store";

export const VerInput = (props) => {
  const weekArr = useSelector((state) => state.weekArr);
  const currentWeek = useSelector((state) => state.currentWeek);
  const currentPractice = useSelector((state) => state.currentPractice);

  const dispatch = useDispatch();
  const inputRef = useRef();

  const changeInputHandler = () => {
    dispatch(practiceAction.changeInput(inputRef.current.value));
  };

  return (
    <div>
      <div className={classes["ver-input"]}>
        <label htmlFor="des-course">Nội dung bài giảng:</label>
        <textarea
          rows="10"
          placeholder="Viết tóm tắt nội dung khóa học"
          id="des-course"
          name="des-course"
          ref={inputRef}
          onChange={changeInputHandler}
          value={
            weekArr[currentWeek - 1]?.week.practice[currentPractice - 1]
              ?.description
          }
        ></textarea>
      </div>
    </div>
  );
};
