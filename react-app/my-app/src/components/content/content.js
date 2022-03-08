import React, { useState } from "react";
import { AddPic } from "../add-pic/AddPic";
import { InputPic } from "../input-pic/InputPic";
import { VerInput } from "../ver-input/VerInput";
import classes from "./Content.module.css";

export const Content = (props) => {
  const [picArr, setPicArr] = useState([]);

  const addPicHandler = () => {
    picArr.push({ name: "Chọn file ảnh" });
    setPicArr([...picArr]);
  };

  const selectPicHandler = (name, index) => {
    const newArr = [...picArr];
    newArr[index].name = name;
    setPicArr([...newArr]);
  };
  return (
    <div className={classes["content-wrapper"]}>
      <VerInput />
      {picArr.map((_, index) => {
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
