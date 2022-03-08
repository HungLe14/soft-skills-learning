import React, { useState } from "react";
import classes from "./HorInput.module.css";

export const HorInput = () => {
  const [file, setFile] = useState();
  const selectFileHandler = (e) => {
    setFile(e.target.files[0].name);
  };
  return (
    <div>
      <div className={classes["hor-input"]}>
        <label>File đính kèm:</label>
        <div className={classes["input-file-wrapper"]}>
          <label className={classes["img-course-label"]} htmlFor="img-course">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={classes["file-icon"]}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            {file ? file : "Chọn tệp"}
          </label>
          <input
            type="file"
            id="img-course"
            name="img-course"
            onChange={(e) => {
              selectFileHandler(e);
            }}
          />
        </div>
      </div>
    </div>
  );
};
