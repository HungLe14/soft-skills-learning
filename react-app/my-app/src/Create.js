import { useState } from "react";
import "./App.css";
import { CreateCourse } from "./components/create-course/CreateCourse";
import { DashBoard } from "./components/DashBoard/DashBoard";
import { Form } from "./components/form/Form";

function Create(props) {
  const [createCourse, setCreateCourse] = useState(true);

  const cancleConfirm = () => {
    if (window.confirm("Bạn chắc chắn muốn hủy?")) {
      setCreateCourse(true);
    }
  };

  return (
    <div className="App">
      <DashBoard>
        {createCourse ? (
          <CreateCourse onCreateCourse={setCreateCourse} />
        ) : (
          <Form
            prefix={props.prefix}
            suffix={props.suffix}
            onCancelCourse={cancleConfirm}
          />
        )}
      </DashBoard>
    </div>
  );
}

export default Create;
