export const getContentInsidePTag = (string) => {
  const contentInside = string.match(/(?<=^<p>)([\s\S]+?)(?=<\/p>)/);
  return contentInside && contentInside[0];
};

export const deletePTag = (string) => {
  const reg = /(^<p>)([\s\S]+?)(<\/p>)/;
  const wholeContent = string.replace(reg, "");
  return wholeContent;
};

export const getImgNameFromSrc = (string) => {
  const reg = /(?<=^<img src=")([\s\S]+?)(?=\?alt=media"\/>)/;
  const nameImg = string.match(reg);

  return (
    nameImg &&
    nameImg[0] &&
    nameImg[0].split("/")[nameImg[0].split("/").length - 1]
  );
};

export const deleteImgTag = (string) => {
  const reg = /(^<img src=")([\s\S]+?)("\/>)/;
  const wholeContent = string.replace(reg, "");
  return wholeContent;
};

export const getImgNameCourse = (string) => {
  const reg = /(?<=^)([\s\S]+?)(?=\?alt=media)/;
  const nameImg = string.match(reg);
  return (
    nameImg &&
    nameImg[0] &&
    nameImg[0].split("/")[nameImg[0].split("/").length - 1]
  );
};

export const buildReduxObject = (data) => {
  const finalObject = {};

  // get all course information

  finalObject.id = data.id;
  finalObject.courseName = data.title;
  finalObject.courseImg = getImgNameCourse(data.imageUrl);

  let description = data.content;
  const courseDescriptions = getCourseDescription(description);

  finalObject.courseDescriptions = courseDescriptions;

  const weekArr = [];

  const weekKey = new Set(
    data?.lectures
      ?.map((lecture) => lecture.week)
      .concat(data.tests.map((test) => test.week))
  );
  let index = 0;

  weekKey.forEach((key) => {
    console.log(index);
    const tests = data.tests.filter((test) => test.week === key);
    const practices = data.lectures.filter((lecture) => lecture.week === key);

    weekArr.push({
      numberOfWeek: index + 1,
      totalTest: tests.length,
      test: tests?.map((test, index) => ({
        id: test.id,
        testNumber: index + 1,
        exams: test?.content?.split("\n").map((exam) => {
          return {
            question: exam.split("||")[2],
            point: exam.split("||")[1],
            answer: exam.split("||")[3].split("|"),
            correctAnswer: Number(exam.split("||")[4]),
          };
        }),
        answers: [], // need after check
      })),
      totalPractice: practices.length,
      practice: practices?.map((practice, index) => {
        // nem vao
        const practiceDescription = getPracticeDescription(practice.content);

        return {
          id: practice.id,
          practiceNumber: index + 1,
          description: practiceDescription,
        };
      }),
      numberOfPractice: tests.length,
      numberOfTest: tests.length,
    });
    index++;
  });

  finalObject.weekArr = weekArr;

  return finalObject;
};

export const getCourseDescription = (description) => {
  const courseDescriptions = [];
  let isFinish = true;
  while (isFinish) {
    const contentInsidePTag = getContentInsidePTag(description);
    if (contentInsidePTag) {
      courseDescriptions.push({
        description: contentInsidePTag,
        images: [],
      });
      description = deletePTag(description);
      continue;
    }
    const nameImgFromSrc = getImgNameFromSrc(description);
    if (nameImgFromSrc) {
      if (!courseDescriptions[courseDescriptions.length - 1].images) {
        courseDescriptions[courseDescriptions.length - 1].images = [];
      }
      courseDescriptions[courseDescriptions.length - 1].images.push({
        name: nameImgFromSrc,
      });
      description = deleteImgTag(description);
      continue;
    }
    if (!contentInsidePTag && !nameImgFromSrc) {
      isFinish = false;
    }
  }

  return courseDescriptions;
};

export const getPracticeDescription = (description) => {
  const practiceDescriptions = [];

  let isFinish = true;
  let count = 0;
  while (isFinish) {
    const contentInsidePTag = getContentInsidePTag(description);
    if (contentInsidePTag) {
      count++;
      practiceDescriptions.push({
        number: count,
        content: contentInsidePTag,
        image: []
      });
      description = deletePTag(description);
      continue;
    }
    const nameImgFromSrc = getImgNameFromSrc(description);
    if (nameImgFromSrc) {
      if (!practiceDescriptions[practiceDescriptions.length - 1].image) {
        practiceDescriptions[practiceDescriptions.length - 1].image = [];
      }
      practiceDescriptions[practiceDescriptions.length - 1].image.push({
        name: nameImgFromSrc,
      });
      description = deleteImgTag(description);
      continue;
    }
    if (!contentInsidePTag && !nameImgFromSrc) {
      isFinish = false;
    }
  }

  return practiceDescriptions;
};
