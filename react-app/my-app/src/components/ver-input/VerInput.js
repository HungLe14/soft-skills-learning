import React from "react";
import classes from "./VerInput.module.css";

export const VerInput = () => {
  return (
    <div>
      <div className={classes["ver-input"]}>
        <label htmlFor="des-course">Nội dung bài giảng:</label>
        <textarea
          rows="3"
          placeholder="Viết tóm tắt nội dung khóa học"
          id="des-course"
          name="des-course"
        ></textarea>
      </div>
    </div>
  );
};
