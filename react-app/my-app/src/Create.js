import { useState } from "react";
import "./App.css";
import { CreateCourse } from "./components/create-course/CreateCourse";
import { DashBoard } from "./components/DashBoard/DashBoard";
import { Form } from "./components/form/Form";

function Create() {
  const [createCourse, setCreateCourse] = useState(true);

  return (
    <div className="App">
      <DashBoard>
        {createCourse ? (
          <CreateCourse onCreateCourse={setCreateCourse} />
        ) : (
          <Form onCancel={setCreateCourse} />
        )}
      </DashBoard>
    </div>
  );
}

export default Create;