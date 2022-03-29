import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import { DashBoard } from "./components/DashBoard/DashBoard";
import { Preview } from "./components/preview/Preview";
import LoadingSpinner from "./components/spinner/Spinner";
import { practiceAction } from "./components/store";

function Read(props) {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchData = async () => {
    const url = window.location.href;
    console.log(url);
    const id = url.split("/").at(-1);
    console.log(id);
    if (process.env.NODE_ENV === "development") {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(require("./data-from-api.json"));
        }, 3000);
      });
    }
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
        ) : (
          <Preview prefix={props.prefix} suffix={props.suffix} enrollmentId={props.enrollmentId}/>
        )}
      </DashBoard>
    </div>
  );
}

export default Read;
