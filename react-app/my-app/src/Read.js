import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import { DashBoard } from "./components/DashBoard/DashBoard";
import { Preview } from "./components/preview/Preview";
import LoadingSpinner from "./components/spinner/Spinner";
import { practiceAction } from "./components/store";

function Read() {
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
      if (data) {
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
        ) : <Preview/>}
      </DashBoard>
    </div>
  );
}

export default Read;
