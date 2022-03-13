import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputPicOnCourse } from "../input-pic/InputPicOnCourse";
import { practiceAction } from "../store";
import classes from "./CreateCourse.module.css";

export const CreateCourse = (props) => {
  const courseName = useSelector((state) => state.courseName);
  const courseImg = useSelector((state) => state.courseImg);
  const courseDescriptions = useSelector((state) => state.courseDescriptions);
  const dispatch = useDispatch();

  // change course name
  const changeCourseNameHandler = (e) => {
    dispatch(practiceAction.changeCourseName(e.target.value));
  };

  // show file name
  const addCourseImg = (e) => {
    dispatch(practiceAction.addCourseMainImg(e.target.files[0].name));
  };

  // change description content
  const changeCourseDescription = (e, desIndex) => {
    dispatch(
      practiceAction.changeCourseDescription({
        description: e.target.value,
        desIndex,
      })
    );
  };

  // add picture
  const addPictureHandler = (courseIndex) => {
    dispatch(practiceAction.addCourseImage(courseIndex));
  };

  // add discription
  const addDiscriptionHandler = () => {
    dispatch(practiceAction.addDescriptions());
  };

  // show image name
  const selectPicture = (name, imageIndex, descriptionIndex) => {
    dispatch(
      practiceAction.selectPictureOnDescription({
        name,
        imageIndex,
        descriptionIndex,
      })
    );
  };

  return (
    <React.Fragment>
      <div className={classes["hor-input"]}>
        <label htmlFor="name-course">Tên khóa học:</label>
        <input
          type="text"
          id="name-course"
          name="name-course"
          onChange={changeCourseNameHandler}
          value={courseName}
        />
      </div>
      <div className={classes["hor-input"]}>
        <label>Ảnh đại diện khóa học:</label>
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
            {courseImg ? courseImg : "Chọn tệp"}
          </label>
          <input
            type="file"
            id="img-course"
            name="img-course"
            accept=".jpg,.jpeg,.png"
            onChange={addCourseImg}
          />
        </div>
      </div>
      {courseDescriptions.map((des, index) => {
        return (
          <React.Fragment>
            <div className={classes["ver-input"]} key={index}>
              <label htmlFor="des-course">Mô tả:</label>
              <textarea
                rows="3"
                placeholder="Viết tóm tắt nội dung khóa học"
                id="des-course"
                name="des-course"
                onChange={(e) => {
                  changeCourseDescription(e, index);
                }}
                value={courseDescriptions[index].descriptions}
              ></textarea>
            </div>
            {des.images.map((image, imageIndex) => (
              <InputPicOnCourse
                fileName={image.name}
                imageIndex={imageIndex}
                descriptionIndex={index}
                onSelect={selectPicture}
              />
            ))}
            <div
              className={classes["add-pic"]}
              onClick={() => {
                addPictureHandler(index);
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
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Thêm ảnh mô tả</span>
            </div>
          </React.Fragment>
        );
      })}

      <div className={`${classes["button-control"]} ${classes["flex-start"]}`}>
        <button
          type="button"
          className={`${classes["button-node"]} ${classes["confirm"]}`}
          onClick={addDiscriptionHandler}
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
          <span>Thêm mô tả</span>
        </button>
        <button
          type="button"
          className={`${classes["button-node"]} ${classes["cancel"]}`}
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
          Xóa
        </button>
      </div>
      <div className={`${classes["button-control"]} ${classes["flex-end"]}`}>
        <button
          type="button"
          className={`${classes["button-node"]} ${classes["confirm"]}`}
          onClick={() => {
            props.onCreateCourse(false);
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
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Tạo khóa học</span>
        </button>
        <button
          type="button"
          className={`${classes["button-node"]} ${classes["cancel"]}`}
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
