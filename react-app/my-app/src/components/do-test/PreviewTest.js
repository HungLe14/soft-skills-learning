import React, { useState } from "react";
import classes from "./PreviewTest.module.css";
import { practiceAction } from "../store";
import { useSelector, useDispatch } from "react-redux";
import { CoutingTime } from "../counting-time/CoutingTime";

export const PreviewTest = (props) => {
  const weekArr = useSelector((state) => state.weekArr);
  const currentWeek = useSelector((state) => state.currentWeek);
  const currentTest = useSelector((state) => state.currentTest);

  let min = weekArr[currentWeek - 1].test[currentTest - 1].time?.min;
  let second = weekArr[currentWeek - 1].test[currentTest - 1].time?.second;
  const isStart = weekArr[currentWeek - 1].test[currentTest - 1].isStart;
  const dispatch = useDispatch();
  const [isTimeout, setIsTimeOut] = useState(false);
  const updateAnswer = (examIndex, answerIndex) => {
    dispatch(practiceAction.chooseCorrectAnswer({ examIndex, answerIndex }));
  };

  const startingTest = () => {
    dispatch(practiceAction.startTestCheck());
  };

  return (
    <React.Fragment>
      {!isStart && (
        <button
          className={classes.startBtn}
          onClick={() => {
            startingTest();
          }}
        >
          BẮT ĐẦU
        </button>
      )}
      {isStart && (
        <React.Fragment>
          <CoutingTime onSetTimeOut={setIsTimeOut} min={min} second={second} />
          {!isTimeout &&
            props?.exams?.map((exam, examIndex) => {
              return (
                <div className={classes.questionWrapper} key={examIndex}>
                  <p className={classes.questionNumber}>{`Câu ${
                    examIndex + 1
                  }:`}</p>
                  <p className={classes.questionContent}>{exam.question}</p>
                  {exam?.answer?.map((answer, answerIndex) => {
                    return (
                      <div className={classes.answerWrapper} key={answerIndex}>
                        <input
                          type="radio"
                          name={`question-${examIndex}`}
                          id={`question-${examIndex}`}
                          onChange={() => {
                            updateAnswer(examIndex, answerIndex);
                          }}
                        />
                        <label htmlFor={`question-${examIndex}`}>
                          {answer}
                        </label>
                      </div>
                    );
                  })}
                </div>
              );
            })}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
