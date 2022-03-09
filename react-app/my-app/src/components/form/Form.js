import React, { useState } from "react";
import { AddPractice } from "../add-practice/AddPractice";
import { AddTest } from "../add-test/AddTest";
import { AddWeek } from "../add-week/AddWeek";
import { ButtonControl } from "../button-control/ButtonControl";
import { HorInput } from "../hor-input/HorInput";
import { ListPractice } from "../list-practice/ListPractice";
import { Practice } from "../practice/Practice";
import { Test } from "../practice/Test";
import { Week } from "../week/Week";
import classes from "./Form.module.css";
import { useSelector, useDispatch } from "react-redux";
import { practiceAction } from "../store";
import { AddContent } from "../add-content/AddContent";
import { Content } from "../content/content";
import { TestModule } from "../test/TestModule";
import { AddQuestion } from "../add-question/AddQuestion";

export const Form = (props) => {
  const [showTest, setShowTest] = useState(false);
  const weekArr = useSelector((state) => state.weekArr);
  const currentWeek = useSelector((state) => state.currentWeek);
  const currentPractice = useSelector((state) => state.currentPractice);
  const currentTest = useSelector((state) => state.currentTest);
  const dispatch = useDispatch();

  // add week
  const addWeekHandler = () => {
    dispatch(practiceAction.addWeek());
  };

  // add test
  const addTestHandler = () => {
    dispatch(practiceAction.addTest());
  };

  // delete test
  const deleteTestHandler = (id) => {
    dispatch(practiceAction.deleteTest(id));
  };

  // add question to test
  const addQuestionHandler = () => {
    dispatch(practiceAction.addQuestionToTest());
  };

  // add practice
  const addPracticeHandler = () => {
    dispatch(practiceAction.addPractice());
  };

  // delete practice
  const deletePracticeHandler = (id) => {
    dispatch(practiceAction.deletePractice(id));
  };

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

  // add content
  const addContentHandler = () => {
    dispatch(practiceAction.addContentPractice());
  };

  // show test
  const switchTestHandler = (currentTest, weekIndex) => {
    setShowTest(true);
    dispatch(
      practiceAction.changeCurrentTest({
        currentTest,
        weekIndex,
      })
    );
  };

  return (
    <React.Fragment>
      <form>
        <div className={classes["form-wrapper"]}>
          <div className={classes["form-menu"]}>
            <div className={classes["practice-detail"]}>
              {weekArr.map((week, indexWeek) => {
                return (
                  <div key={indexWeek}>
                    <Week
                      onClick={changeWeekHandler}
                      week={indexWeek}
                      showTest={showTest}
                    />
                    <ListPractice>
                      {weekArr[indexWeek].practice.map((practice, index) => {
                        return (
                          <Practice
                            key={index}
                            week={indexWeek}
                            practice={practice.practiceNumber}
                            onDelete={deletePracticeHandler}
                            onClick={changePracticeHandler}
                            showTest={showTest}
                          />
                        );
                      })}
                      {weekArr[indexWeek].test.map((test, index) => {
                        return (
                          <Test
                            key={index}
                            week={indexWeek}
                            test={test.testNumber}
                            onDelete={deleteTestHandler}
                            onClick={switchTestHandler}
                            showTest={showTest}
                          />
                        );
                      })}
                    </ListPractice>
                  </div>
                );
              })}
            </div>
            <AddPractice onClick={addPracticeHandler} />
            <AddTest onClick={addTestHandler} />
            <AddWeek onClick={addWeekHandler} />
          </div>
          <div className={classes["form-content"]}>
            {!showTest ? (
              <React.Fragment>
                {weekArr[currentWeek - 1]?.practice[
                  currentPractice - 1
                ]?.description.map((c, index) => (
                  <Content key={index} contentIndex={index} />
                ))}
                <AddContent onClick={addContentHandler} />
                <HorInput />
              </React.Fragment>
            ) : (
              <React.Fragment>
                {weekArr[currentWeek - 1]?.test[currentTest - 1]?.exams?.map(
                  (e, index) => {
                    return <TestModule questionIndex={index} key={index} />;
                  }
                )}

                <AddQuestion onClick={addQuestionHandler} />
              </React.Fragment>
            )}
            <ButtonControl />
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};
