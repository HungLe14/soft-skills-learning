import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { practiceAction } from "../store";
import classes from "./TestModule.module.css";

export const TestModule = (props) => {
  const dispatch = useDispatch();
  const answerArr = new Array(4).fill({});
  const weekArr = useSelector((state) => state.weekArr);
  const currentWeek = useSelector((state) => state.currentWeek);
  const currentTest = useSelector((state) => state.currentTest);

  const setQuestionContenHandler = (e, questionIndex) => {
    dispatch(
      practiceAction.setQuestionContent({
        questionContent: e.target.value,
        questionIndex: questionIndex,
      })
    );
  };

  const setPointContenHandler = (e, questionIndex) => {
    dispatch(
      practiceAction.setPointContent({
        point: e.target.value,
        questionIndex: questionIndex,
      })
    );
  };

  const setAnswerContentHandler = (e, questionIndex, answerIndex) => {
    dispatch(
      practiceAction.setAnswerContent({
        answer: e.target.value,
        questionIndex,
        answerIndex,
      })
    );
  };

  const setCorrectAnswerHandler = (questionIndex, answerIndex) => {
    dispatch(
      practiceAction.setCorrectAnswer({
        questionIndex,
        answerIndex,
      })
    );
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.questionHeader}>
        <p className={classes.questionNumber}>Câu {props.questionIndex + 1}</p>
        <input
          className={classes.question}
          type="text"
          placeholder="Nhập câu hỏi"
          onChange={(e) => {
            setQuestionContenHandler(e, props.questionIndex);
          }}
          value={
            weekArr[currentWeek - 1].test[currentTest - 1]?.exams[
              props.questionIndex
            ]?.question
          }
        />
        <p className={classes.point}>Điểm</p>
        <input
          className={classes.pointInput}
          type="number"
          onChange={(e) => {
            setPointContenHandler(e, props.questionIndex);
          }}
          value={
            weekArr[currentWeek - 1].test[currentTest - 1]?.exams[
              props.questionIndex
            ]?.point
          }
        />
      </div>
      {answerArr?.map((_, index) => {
        return (
          <div className={classes.questionBody} key={index}>
            <input
              className={classes.answer}
              type="text"
              placeholder="Nhập câu trả lời"
              onChange={(e) => {
                setAnswerContentHandler(e, props.questionIndex, index);
              }}
              value={
                weekArr[currentWeek - 1].test[currentTest - 1].exams[
                  props.questionIndex
                ].answer[index]
              }
            />
            <input
              className={classes.rightAnswer}
              name={`question ${props.questionIndex + 1}`}
              type="radio"
              onChange={(e) => {
                if (e.target.checked) {
                  setCorrectAnswerHandler(props.questionIndex, index);
                }
              }}
              checked={
                weekArr[currentWeek - 1].test[currentTest - 1].exams[
                  props.questionIndex
                ].correctAnswer === index
              }
            />
          </div>
        );
      })}
    </div>
  );
};
