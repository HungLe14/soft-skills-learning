import React, { useState } from "react";
import { AddPic } from "../add-pic/AddPic";
import { AddPractice } from "../add-practice/AddPractice";
import { AddTest } from "../add-test/AddTest";
import { AddWeek } from "../add-week/AddWeek";
import { ButtonControl } from "../button-control/ButtonControl";
import { HorInput } from "../hor-input/HorInput";
import { ListPractice } from "../list-practice/ListPractice";
import { Practice } from "../practice/Practice";
import { Test } from "../practice/Test";
import { VerInput } from "../ver-input/VerInput";
import { Week } from "../week/Week";
import classes from "./Form.module.css";
import { useSelector, useDispatch } from "react-redux";
import { practiceAction } from "../store";

export const Form = (props) => {
  const weekArr = useSelector((state) => state.weekArr);
  const dispatch = useDispatch();

  // add week
  const addWeekHandler = () => {
    dispatch(practiceAction.addWeek());
  };

  // add test
  const addTestHandler = () => {
    dispatch(practiceAction.addTest());
  };

  // delete test
  const deleteTestHandler = (id) => {
    dispatch(practiceAction.deleteTest(id));
  };

  // add practice
  const addPracticeHandler = () => {
    dispatch(practiceAction.addPractice());
  };

  // delete practice
  const deletePracticeHandler = (id) => {
    dispatch(practiceAction.deletePractice(id));
  };

  // change current week
  const changeWeekHandler = (string) => {
    const payload = string.match(/\d/);
    dispatch(practiceAction.changeCurrentWeek(payload[0]));
  };

  return (
    <React.Fragment>
      <form>
        <div className={classes["form-wrapper"]}>
          <div className={classes["form-menu"]}>
            <div className={classes["practice-detail"]}>
              {weekArr.map((week, indexWeek) => {
                return (
                  <div key={indexWeek}>
                    <Week onClick={changeWeekHandler} week={indexWeek} />
                    <ListPractice>
                      {weekArr[indexWeek].week.practice.map(
                        (practice, index) => {
                          return (
                            <Practice
                              key={index}
                              practice={practice.practiceNumber}
                              onDelete={deletePracticeHandler}
                            />
                          );
                        }
                      )}
                      {weekArr[indexWeek].week.test.map((test, index) => {
                        return (
                          <Test
                            key={index}
                            test={test.testNumber}
                            onDelete={deleteTestHandler}
                          />
                        );
                      })}
                    </ListPractice>
                  </div>
                );
              })}
            </div>
            <AddPractice onClick={addPracticeHandler} />
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
