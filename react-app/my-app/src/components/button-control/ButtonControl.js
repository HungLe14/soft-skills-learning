import React from "react";
import { useSelector } from "react-redux";
import classes from "./ButtonControl.module.css";

export const ButtonControl = (props) => {
  //https://firebasestorage.googleapis.com/v0/b/fpt-soft-skill-learning.appspot.com/o/IMG_HERE?alt=media
  const courseTitle = useSelector((state) => state.courseName);
  const courseImgUrl = useSelector((state) => state.courseImg);
  const courseDescriptions = useSelector((state) => state.courseDescriptions);
  const week = useSelector((state) => state.weekArr);
  const state = useSelector((state) => state);

  const submitData = async () => {
    const lectureDtos = [];
    const testDtos = [];

    week.forEach((weekEl, weekIndex) => {
      weekEl.practice.forEach((practiceEl, practiceIndex) => {
        const content = practiceEl.description
          .map((des) => {
            const imgStr = des.image
              .map((img) =>
                img.name === "Chọn ảnh"
                  ? undefined
                  : `<img src=https://firebasestorage.googleapis.com/v0/b/fpt-soft-skill-learning.appspot.com/o/${img.name}?alt=media/>`
              )
              .filter((img) => img !== undefined)
              .join("");

            return `<p>${des.content}</p>${imgStr}`;
          })
          .join("");

        lectureDtos.push({
          week: `Tuan ${weekIndex + 1}`,
          practiceIndex,
          resouceUrl: "",
          content,
          name: `Bai ${practiceIndex + 1}`,
        });
      });

      weekEl.test.forEach((testEl, testIndex) => {
        const content = testEl.exams
          .map((exam, index) => {
            const answers = exam.answer.map((ans) => `${ans}`).join("|");
            return `Bai ${index + 1}||${exam.point}||${
              exam.question
            }||${answers}||${exam.correctAnswer}`;
          })
          .join("\n");

        testDtos.push({
          week: `Tuan ${weekIndex + 1}`,
          index: testIndex,
          content,
          name: `Bai kiem tra ${testEl.testNumber}`,
        });
      });
    });

    const content = courseDescriptions
      .map((el) => {
        const imgStr = el.images
          .map((img) =>
            img.name === "Chọn tệp"
              ? undefined
              : `<img src=https://firebasestorage.googleapis.com/v0/b/fpt-soft-skill-learning.appspot.com/o/${img.name}?alt=media/>`
          )
          .filter((img) => img !== undefined)
          .join("");
        return `<p>${el.description}</p>${imgStr}`;
      })
      .join("");

    // const testDtos = week.test.map((el, index) => {
    //   return {
    //     week: `Bai ${index+1}`,
    //     index,
    //     resouceUrl: "",
    //     content: '',

    //   };
    // });

    const data = {
      courseTitle,
      courseImgUrl: `https://firebasestorage.googleapis.com/v0/b/fpt-soft-skill-learning.appspot.com/o/${courseImgUrl}?alt=media`,
      content,
      lectureDtos,
      testDtos,
    };

    fetch("/api/course", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((data) => data.json())
      .then((data) => console.log(data));

    console.log("==========================");
    console.log(state);
  };
  return (
    <React.Fragment>
      <div className={classes["button-control"]}>
        <button
          type="button"
          className={`${classes["button-node"]} ${classes.review}`}
          onClick={props.onClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Xem trước
        </button>
        <button
          type="button"
          className={`${classes["button-node"]} ${classes.confirm}`}
          onClick={submitData}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Tạo khóa học
        </button>
        <button
          type="button"
          className={`${classes["button-node"]} ${classes.cancel}`}
          onClick={() => {
            props.onCancel(true);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Hủy
        </button>
      </div>
    </React.Fragment>
  );
};
