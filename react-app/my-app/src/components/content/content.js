import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddPic } from "../add-pic/AddPic";
import { InputPic } from "../input-pic/InputPic";
import { VerInput } from "../ver-input/VerInput";
import classes from "./Content.module.css";
import { practiceAction } from "../store";

export const Content = (props) => {
  const dispatch = useDispatch();
  const weekArr = useSelector((state) => state.weekArr);
  const currentWeek = useSelector((state) => state.currentWeek);
  const currentPractice = useSelector((state) => state.currentPractice);
  const currentContent = useSelector((state) => state.currentContent);
  const picArr =
    weekArr[currentWeek - 1].week.practice[currentPractice - 1].description[
      currentContent - 1
    ]?.image;
  const addPicHandler = () => {
    dispatch(practiceAction.addPicPractice());
  };

  const selectPicHandler = (name, index) => {
    dispatch(
      practiceAction.selectPic({
        index: index,
        name: name,
      })
    );
  };
  return (
    <div className={classes["content-wrapper"]}>
      <VerInput contentIndex={props.contentIndex} />
      {picArr?.map((_, index) => {
        return (
          <InputPic
            fileName={picArr[index].name}
            contentIndex={props.contentIndex}
            inputIndex={index}
            key={index}
            onSelect={selectPicHandler}
          />
        );
      })}
      <AddPic onClick={addPicHandler} />
    </div>
  );
};