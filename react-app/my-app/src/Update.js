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

  const fetchData = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(require("./data.json"));
      }, 3000);
    });
  };

  useEffect(() => {
    fetchData().then((data) => {
      console.log(data);
      if (data) {
        dispatch(practiceAction.loadAPItoRedux(data));
        setIsLoading(false);
      }
    });
  }, []);

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
