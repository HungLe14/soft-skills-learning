import React, { useState } from "react";
import classes from "./PreviewTest.module.css";
import { practiceAction } from "../store";
import { useDispatch } from "react-redux";
import { CoutingTime } from "../counting-time/CoutingTime";

export const PreviewTest = (props) => {
  const dispatch = useDispatch();
  const [isTimeout, setIsTimeOut] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const updateAnswer = (examIndex, answerIndex) => {
    dispatch(practiceAction.chooseCorrectAnswer({ examIndex, answerIndex }));
  };

  return (
    <React.Fragment>
      {!isStart && (
        <button
          className={classes.startBtn}
          onClick={() => {
            setIsStart(true);
          }}
        >
          BẮT ĐẦU
        </button>
      )}
      {isStart && (
        <React.Fragment>
          <CoutingTime onSetTimeOut={setIsTimeOut} />
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
