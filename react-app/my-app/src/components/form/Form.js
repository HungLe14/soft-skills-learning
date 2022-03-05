import React, { useState } from "react";
import { AddPic } from "../add-pic/AddPic";
import { AddPractice } from "../add-practice/AddPractice";
import { AddTest } from "../add-test/AddTest";
import { AddWeek } from "../add-week/AddWeek";
import { ButtonControl } from "../button-control/ButtonControl";
import { HorInput } from "../hor-input/HorInput";
import { ListPractice } from "../list-practice/ListPractice";
import { Practice } from "../practice/Practice";
import { VerInput } from "../ver-input/VerInput";
import { Week } from "../week/Week";
import classes from "./Form.module.css";
import { useSelector, useDispatch } from "react-redux";
import { practiceAction } from "../store";

export const Form = (props) => {
  const weekArr = useSelector((state) => state.weekArr);
  const currentWeek = useSelector((state) => state.currentWeek);
  const dispatch = useDispatch();

  // add practice
  const addWeekHandler = () => {
    dispatch(practiceAction.addWeek());
  };

  // add test
  const addTestHandler = () => {
    dispatch(practiceAction.addTest());
  };

  // change current week
  const changeWeekHandler = (string) => {
    const payload = string.match(/\d/);
    console.log(payload[0]);
    dispatch(practiceAction.changeCurrentWeek(payload[0]));
    console.log(string);
  };
  return (
    <React.Fragment>
      <form>
        <div className={classes["form-wrapper"]}>
          <div className={classes["form-menu"]}>
            <div className={classes["practice-detail"]}>
              {weekArr.map((week, index) => {
                return (
                  <div key={index}>
                    <Week onClick={changeWeekHandler} />
                    <ListPractice>
                      {weekArr[currentWeek - 1].week.test.map(
                        (practice, index) => {
                          return <Practice key={index} />;
                        }
                      )}
                    </ListPractice>
                  </div>
                );
              })}
            </div>
            <AddPractice />
            <AddTest onClick={addTestHandler} />
            <AddWeek onClick={addWeekHandler} />
          </div>
          <div className={classes["form-content"]}>
            <VerInput />
            <AddPic />
            <HorInput />
            <ButtonControl />
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};
