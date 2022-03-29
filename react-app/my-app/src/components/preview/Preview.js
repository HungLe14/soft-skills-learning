import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Preview.module.css";
import { practiceAction } from "../store";
import { ListPractice } from "../list-practice/ListPractice";
import { Test } from "../practice/Test";
import { Practice } from "../practice/Practice";
import { Week } from "../week/Week";
import { PreviewFragment } from "../preview-fragment/PreviewFragment";
import { ReadPractice } from "../read-practice/ReadPractice";

export const Preview = (props) => {
  const weekArr = useSelector((state) => state.weekArr);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const [showTest, setShowTest] = useState(false);
  const [preview] = useState(true);

  const currentWeek = useSelector((state) => state.currentWeek);
  const currentTest = useSelector((state) => state.currentTest);
  const currentPractice = useSelector((state) => state.currentPractice);

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

  const markAsComplete = async (e) => {
    console.log(e);

    const url = window.location.href;
    console.log(url);
    const id = url.split("/").at(-1);
    console.log(id);

    const practiceId =
      weekArr[currentWeek - 1].practice[currentPractice - 1]?.id;

    console.log(practiceId);

    await fetch(`/api/course/${id}/lecture/${practiceId}`, {
      method: "PUT",
    });
  };

  const submitExamResultHandler = async (e) => {
    console.log(e);
    const answers = weekArr[currentWeek - 1].test[currentTest - 1]?.answers;
    const exams = weekArr[currentWeek - 1].test[currentTest - 1]?.exams;

    const url = window.location.href;
    console.log(url);
    const id = url.split("/").at(-1);
    console.log(id);

    const testId = weekArr[currentWeek - 1].test[currentTest - 1]?.id;

    const totalMark = exams.reduce((totalMark, exam) => {
      return Number(exam.point) + totalMark;
    }, 0);

    const answerResult = answers.reduce(
      (obj, answer, index) => {
        const isCorrect = exams[index].correctAnswer === answer;
        if (isCorrect) {
          obj.mark += 1;
        }

        obj.answerDetails.push({
          isCorrect,
          correctAnswer: exams[index].correctAnswer,
          studentAnswer: answer,
        });

        return obj;
      },
      {
        mark: 0,
        answerDetails: [],
      }
    );

    const markPercentage = Math.floor((answerResult.mark / totalMark) * 100);

    console.log("answer", answers);
    console.log("exam", exams);
    console.log("totalMark", totalMark);
    console.log("result", answerResult);
    console.log(markPercentage);

    await fetch(`/api/course/${id}/test/${testId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mark: markPercentage }),
    });
  };

  return (
    <React.Fragment>
      <div className={classes["form-wrapper"]}>
        <div className={classes["form-menu"]}>
          <div className={classes["practice-detail"]}>
            {weekArr?.map((week, indexWeek) => {
              return (
                <div key={indexWeek}>
                  <Week onClick={changeWeekHandler} week={indexWeek} />
                  <ListPractice>
                    {weekArr[indexWeek]?.practice?.map((practice, index) => {
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
          <ReadPractice
            showTest={showTest}
            prefix={props.prefix}
            suffix={props.suffix}
          />
        </div>
      </div>
      <button
        className={classes["submit-test"]}
        onClick={!showTest ? markAsComplete : submitExamResultHandler}
      >
        {showTest ? "Submit" : "Mark as completed"}
      </button>
    </React.Fragment>
  );
};
