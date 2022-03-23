import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import { CreateCourse } from "./components/create-course/CreateCourse";
import { DashBoard } from "./components/DashBoard/DashBoard";
import { Form } from "./components/form/Form";
import LoadingSpinner from "./components/spinner/Spinner";
import { practiceAction } from "./components/store";

function Update() {
  const [createCourse, setCreateCourse] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  // const fetchData = () => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve(require("./data-from-api.json"));
  //     }, 3000);
  //   });
  // };
  
  const fetchData = async () => {
    const url = window.location.href;
    console.log(url);
    const id = url.split("/").at(-1);
    console.log(id);
    const data = await fetch(`/api/course/${id}`);
    return await data.json();
  };

  useEffect(() => {
    fetchData().then((data) => {
      if (data) {
        console.log(data);
        dispatch(practiceAction.loadAPItoRedux(data));
        dispatch(practiceAction.changeCurrentWeek(1));
        setIsLoading(false);
      }
    });
  }, [dispatch]);

  return (
    <div className="App">
      <DashBoard>
        {isLoading ? (
          <LoadingSpinner />
        ) : createCourse ? (
          <CreateCourse onCreateCourse={setCreateCourse} />
        ) : (
          <Form onCancelCourse={setCreateCourse} />
        )}
      </DashBoard>
    </div>
  );
}

export default Update;
