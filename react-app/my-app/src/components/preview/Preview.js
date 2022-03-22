import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Preview.module.css";
import { practiceAction } from "../store";
import { ListPractice } from "../list-practice/ListPractice";
import { Test } from "../practice/Test";
import { Practice } from "../practice/Practice";
import { Week } from "../week/Week";
import { PreviewFragment } from "../preview-fragment/PreviewFragment";

export const Preview = (props) => {
  const weekArr = useSelector((state) => state.weekArr);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const [showTest, setShowTest] = useState(false);
  const [preview] = useState(true);

  const currentWeek = useSelector((state) => state.currentWeek);
  const currentTest = useSelector((state) => state.currentTest);


  // change current week
  const changeWeekHandler = (weekNum) => {
    // const payload = string.match(/\d/);
    dispatch(practiceAction.changeCurrentWeek(weekNum));
  };

  // change current practice
  const changePracticeHandler = (practiceNum) => {
    dispatch(practiceAction.changeCurrentPractice(practiceNum));
    setShowTest(false);
  };

  // show test
  const switchTestHandler = (currentTest, week) => {
    setShowTest(true);
    dispatch(
      practiceAction.changeCurrentTest({
        currentTest,
        week,
      })
    );
  };

  const submitExamResultHandler = (e) => {
    console.log(e);
    const answers = weekArr[currentWeek - 1].test[currentTest - 1]?.answers;
    console.log(answers);
  }

  return (
    <React.Fragment>
      <div className={classes["form-wrapper"]}>
        <div className={classes["form-menu"]}>
          <div className={classes["practice-detail"]}>
            {weekArr.map((week, indexWeek) => {
              return (
                <div key={indexWeek}>
                  <Week onClick={changeWeekHandler} week={indexWeek} />
                  <ListPractice>
                    {weekArr[indexWeek].practice.map((practice, index) => {
                      return (
                        <Practice
                          key={index}
                          week={indexWeek}
                          practice={practice.practiceNumber}
                          onClick={changePracticeHandler}
                          showTest={showTest}
                          preview={preview}
                        />
                      );
                    })}
                    {weekArr[indexWeek].test.map((test, index) => {
                      return (
                        <Test
                          key={index}
                          week={indexWeek}
                          test={test.testNumber}
                          onClick={switchTestHandler}
                          showTest={showTest}
                          preview={preview}
                        />
                      );
                    })}
                  </ListPractice>
                </div>
              );
            })}
          </div>
        </div>
        <div className={classes["form-content"]}>
          <PreviewFragment showTest={showTest} />
        </div>
      </div>
      <button className={classes["submit-test"]} style={{display: showTest ? 'block' : 'none'}} onClick={submitExamResultHandler}>Submit</button>
    </React.Fragment>
  );
};
