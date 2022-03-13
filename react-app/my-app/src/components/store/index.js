import { createSlice, configureStore } from "@reduxjs/toolkit";

const initState = {
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
  },

  addTest(state) {
    const testArr = state.weekArr[state.currentWeek - 1];
    state.currentTest++;
    testArr.totalTest++;
    testArr.test.push({
      testNumber: state.weekArr[state.currentWeek - 1].totalTest,
      exams: [],
    });

    state.weekArr[state.currentWeek - 1] = {
      ...state.weekArr[state.currentWeek - 1],
      numberOfTest: state.weekArr[state.currentWeek - 1].totalTest,
    };
  },

  deleteTest(state, action) {
    const testArr = state.weekArr[state.currentWeek - 1];
    testArr.totalTest--;
    const newTestArr = testArr.test.filter((test) => {
      return test.testNumber !== action.payload;
    });
    testArr.test = [...newTestArr];
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
  },

  addPractice(state) {
    const practiceArr = state.weekArr[state.currentWeek - 1];
    practiceArr.totalPractice++;
    practiceArr.practice.push({
      practiceNumber: state.weekArr[state.currentWeek - 1].totalPractice,
      description: [],
    });

    state.weekArr[state.currentWeek - 1] = {
      ...state.weekArr[state.currentWeek - 1],
      numberOfPractice: state.weekArr[state.currentWeek - 1].totalPractice,
    };

    state.currentPractice =
      state.weekArr[state.currentWeek - 1].practice.length;

    state.currentContent = 0;
  },

  deletePractice(state, action) {
    const practiceArr = state.weekArr[state.currentWeek - 1];
    practiceArr.totalPractice--;
    const newPracticeArr = practiceArr.practice.filter((practice) => {
      return practice.practiceNumber !== action.payload;
    });
    practiceArr.practice = [...newPracticeArr];
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
    state.currentWeek = action.payload.weekIndex + 1;
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
      exams[action.payload.questionIndex].answer[action.payload.answerIndex];
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
