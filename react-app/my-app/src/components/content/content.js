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
  const picArr =
    weekArr[currentWeek - 1].practice[currentPractice - 1].description[
      props.contentIndex
    ]?.image;

  const addPicHandler = (contentIndex) => {
    dispatch(practiceAction.addPicPractice(contentIndex));
  };

  const selectPicHandler = (e, inputIndex, contentIndex) => {
    // code xu li upload len server
    e.preventDefault();
        const data = new FormData();
        data.append('file', e.target.files[0] );
        fetch("/api/file", {
             method: 'POST',
             headers: {
                 'Accept': 'application/json'
             },
             body: data
        }).then((response) =>  {
           return response.json();
        }).then(data => {
          console.log(data);
          const name = data[1];
          dispatch(
            practiceAction.selectPic({
              name,
              inputIndex,
              contentIndex,
            })
          );

        })



    
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
      <AddPic onClick={addPicHandler} contentIndex={props.contentIndex} />
    </div>
  );
};
