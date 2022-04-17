import { createSlice, configureStore, current } from "@reduxjs/toolkit";
import {
  deleteImgTag,
  deletePTag,
  getContentInsidePTag,
  getImgNameFromSrc,
  getImgNameCourse,
  buildReduxObject,
} from "../utils";

const initState = {
  mode: "",
  courseName: "",
  courseImg: "",
  courseDescriptions: [
    {
      description: "",
      images: [
        {
          name: "Chọn tệp",
        },
      ],
    },
  ],
  weekArr: [],
  numberOfWeek: 0,
  currentWeek: 0,
  currentPractice: 0,
  currentContent: 0,
  currentTest: 0,
};

const rootReducer = {
  loadAPItoRedux(state, action) {
    state.mode = "update";
    const reduxObject = buildReduxObject(action.payload);
    console.log(reduxObject);

    state.id = reduxObject.id;
    state.courseName = reduxObject.courseName;
    state.courseImg = reduxObject.courseImg;
    state.weekArr = reduxObject.weekArr;
    state.courseDescriptions = reduxObject.courseDescriptions;
  },

  setId(state, action) {
    state.id = action.payload;
  },

  changeCourseName(state, action) {
    state.courseName = action.payload;
  },

  addCourseMainImg(state, action) {
    state.courseImg = action.payload;
  },

  addCourseDescription(state) {
    state.courseDescriptions.push("");
  },

  addCourseImage(state, action) {
    const images = state.courseDescriptions[action.payload].images;
    images.push({
      name: "Chọn tệp",
    });
  },

  changeCourseDescription(state, action) {
    state.courseDescriptions[action.payload.desIndex].description =
      action.payload.description;
  },

  addDescriptions(state, action) {
    state.courseDescriptions.push({
      description: "",
      images: [],
    });
  },

  selectPictureOnDescription(state, action) {
    const image =
      state.courseDescriptions[action.payload.descriptionIndex].images[
        action.payload.imageIndex
      ];
    image.name = action.payload.name;
  },

  deleteLastDescription(state) {
    state.courseDescriptions.pop(
      state.courseDescriptions[state.courseDescriptions.length - 1]
    );
  },

  addWeek(state) {
    state.numberOfWeek++;
    state.weekArr.push({
      numberOfWeek: state.numberOfWeek,
      totalTest: 0,
      test: [],
      totalPractice: 0,
      practice: [],
    });
    state.currentWeek = state.weekArr.length;
    state.currentPractice = 0;
    state.currentTest = 0;
  },

  addTest(state) {
    let testArr = state.weekArr[state.currentWeek - 1];
    testArr.totalTest++;
    testArr.test.push({
      testNumber:
        testArr?.test[testArr.test.length - 1]?.testNumber + 1 ||
        state.currentTest + 1,
      exams: [],
      answers: [],
      time: {
        min: 0,
        second: 0,
        totalTime: 0,
      },
    });

    testArr = {
      ...testArr,
      numberOfTest: testArr.totalTest,
    };

    state.currentTest = testArr.test[testArr.test.length - 1].testNumber;
  },

  deleteTest(state, action) {
    const testArr = state.weekArr[state.currentWeek - 1];
    testArr.totalTest--;
    const newTestArr = testArr.test.filter((test) => {
      return test.testNumber !== action.payload;
    });
    testArr.test = [...newTestArr];
    state.currentTest = testArr?.test[testArr.test.length - 1]?.testNumber || 0;
  },

  addQuestionToTest(state, action) {
    const exams =
      state.weekArr[state.currentWeek - 1].test[state.currentTest - 1]?.exams;
    exams?.push({
      question: "",
      point: 0,
      answer: [],
      correctAnswer: "",
    });

    const answers =
      state.weekArr[state.currentWeek - 1].test[state.currentTest - 1]?.answers;
    answers.push("");
  },

  countTotalTime(state) {
    const min =
      state.weekArr[state.currentWeek - 1].test[state.currentTest - 1].time.min;
    const second =
      state.weekArr[state.currentWeek - 1].test[state.currentTest - 1].time
        .second;
    state.weekArr[state.currentWeek - 1].test[
      state.currentTest - 1
    ].time.totalTime = min * 60 + second;
  },

  addMinToTest(state, action) {
    state.weekArr[state.currentWeek - 1].test[state.currentTest - 1].time.min =
      action.payload;
  },

  addSecondToTest(state, action) {
    state.weekArr[state.currentWeek - 1].test[
      state.currentTest - 1
    ].time.second = action.payload;
  },

  chooseCorrectAnswer(state, action) {
    const temp = state;
    temp.weekArr[temp.currentWeek - 1].test[temp.currentTest - 1].answers[
      action.payload.examIndex
    ] = action.payload.answerIndex;

    state = { ...temp };
  },

  addPractice(state) {
    let practiceArr = state.weekArr[state.currentWeek - 1];
    practiceArr.totalPractice++;
    practiceArr.practice.push({
      practiceNumber:
        practiceArr?.practice[practiceArr.practice.length - 1]?.practiceNumber +
          1 || state.currentPractice + 1,
      description: [],
    });

    practiceArr = {
      ...practiceArr,
      numberOfPractice: practiceArr.totalPractice,
    };

    state.currentPractice =
      practiceArr.practice[practiceArr.practice.length - 1].practiceNumber;

    state.currentContent = 0;
  },

  deletePractice(state, action) {
    const practiceArr = state.weekArr[state.currentWeek - 1];
    practiceArr.totalPractice--;
    const newPracticeArr = practiceArr.practice.filter((practice) => {
      return practice.practiceNumber !== action.payload;
    });
    practiceArr.practice = [...newPracticeArr];
    state.currentPractice =
      practiceArr?.practice[practiceArr.practice.length - 1]?.practiceNumber ||
      0;
  },

  addContentPractice(state) {
    const contentArr =
      state.weekArr[state.currentWeek - 1].practice[state.currentPractice - 1]
        .description;
    state.currentContent = contentArr.length;
    state.currentContent++;
    contentArr.push({
      number: state.currentContent,
      content: "",
      image: [],
    });
  },

  addPicPractice(state, action) {
    const imageArr =
      state.weekArr[state.currentWeek - 1].practice[state.currentPractice - 1]
        .description[action.payload]?.image;
    imageArr.push({
      name: "Chọn ảnh",
    });
  },

  selectPic(state, action) {
    const imageArr =
      state.weekArr[state.currentWeek - 1].practice[state.currentPractice - 1]
        .description[action.payload.contentIndex].image;
    imageArr[action.payload.inputIndex] = {
      ...imageArr[action.payload.inputIndex],
      name: action.payload.name,
    };
  },

  changeCurrentWeek(state, action) {
    state.currentWeek = action.payload;
    state.currentPractice = 1;
    state.currentTest = 1;
  },

  changeCurrentPractice(state, action) {
    state.currentPractice = action.payload.practice;
    state.currentWeek = action.payload.week;
    state.currentContent = 0;
  },

  changeCurrentContent(state, action) {
    state.currentContent = action.payload;
  },

  changeCurrentTest(state, action) {
    state.currentTest = action.payload.currentTest;
    state.currentWeek = action.payload.week;
  },

  changeInput(state, action) {
    const contentArr =
      state.weekArr[state.currentWeek - 1].practice[state.currentPractice - 1]
        .description;
    contentArr[state.currentContent - 1] = {
      ...contentArr[state.currentContent - 1],
      content: action.payload,
    };
  },

  setQuestionContent(state, action) {
    const { exams } =
      state.weekArr[state.currentWeek - 1].test[state.currentTest - 1];
    exams[action.payload.questionIndex].question =
      action.payload.questionContent;
  },

  setPointContent(state, action) {
    const { exams } =
      state.weekArr[state.currentWeek - 1].test[state.currentTest - 1];
    exams[action.payload.questionIndex].point = action.payload.point;
  },

  setAnswerContent(state, action) {
    const { exams } =
      state.weekArr[state.currentWeek - 1].test[state.currentTest - 1];
    exams[action.payload.questionIndex].answer[action.payload.answerIndex] =
      action.payload.answer;
  },

  setCorrectAnswer(state, action) {
    const { exams } =
      state.weekArr[state.currentWeek - 1].test[state.currentTest - 1];
    exams[action.payload.questionIndex].correctAnswer =
      action.payload.answerIndex;
  },

  markLectureCompleted(state, action) {
    state.weekArr[state.currentWeek - 1].practice[
      state.currentPractice - 1
    ].isFinished = true;
  },
  markTestCompleted(state, action) {
    state.weekArr[state.currentWeek - 1].test[
      state.currentTest - 1
    ].isFinished = true;
    state.weekArr[state.currentWeek - 1].test[state.currentTest - 1].mark =
      action.payload.mark;
  },
};

const practiceSlice = createSlice({
  name: "practice",
  initialState: initState,
  reducers: rootReducer,
});

const practiceStore = configureStore({
  reducer: practiceSlice.reducer,
});

export const practiceAction = practiceSlice.actions;

export default practiceStore;
