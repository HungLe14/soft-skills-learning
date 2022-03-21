import React from "react";
import classes from "./PreviewTest.module.css";

export const PreviewTest = (props) => {
  return (
    <React.Fragment>
      {props.exams.map((exam, examIndex) => {
        return (
          <div className={classes.questionWrapper} key={examIndex}>
            <p className={classes.questionNumber}>{`Câu ${examIndex + 1}:`}</p>
            <p className={classes.questionContent}>{exam.question}</p>
            {exam.answer.map((answer, answerIndex) => {
              return (
                <div className={classes.answerWrapper} key={answerIndex}>
                  <input
                    type="radio"
                    name={`question-${examIndex}`}
                    id={`question-${examIndex}`}
                  />
                  <label htmlFor={`question-${examIndex}`}>{answer}</label>
                </div>
              );
            })}
          </div>
        );
      })}
    </React.Fragment>
  );
};
