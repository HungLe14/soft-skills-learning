import React from "react";
import classes from "./TestModule.module.css";

export const TestModule = (props) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.questionHeader}>
        <p className={classes.questionNumber}>Câu 1</p>
        <input
          className={classes.question}
          type="text"
          placeholder="Nhập câu hỏi"
        />
        <p className={classes.point}>Điểm</p>
        <input className={classes.pointInput} type="number" />
      </div>
      <div className={classes.questionBody}>
        <input
          className={classes.answer}
          type="text"
          placeholder="Nhập câu trả lời"
        />
        <input
          className={classes.rightAnswer}
          type="checkbox"
          value={"answer"}
        />
      </div>
      <div className={classes.questionBody}>
        <input
          className={classes.answer}
          type="text"
          placeholder="Nhập câu trả lời"
        />
        <input
          className={classes.rightAnswer}
          type="checkbox"
          value={"answer"}
        />
      </div>
      <div className={classes.questionBody}>
        <input
          className={classes.answer}
          type="text"
          placeholder="Nhập câu trả lời"
        />
        <input
          className={classes.rightAnswer}
          type="checkbox"
          value={"answer"}
        />
      </div>
      <div className={classes.questionBody}>
        <input
          className={classes.answer}
          type="text"
          placeholder="Nhập câu trả lời"
        />
        <input
          className={classes.rightAnswer}
          type="checkbox"
          value={"answer"}
        />
      </div>
    </div>
  );
};
