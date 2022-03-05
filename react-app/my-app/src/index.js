import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import practiceStore from "../src/components/store/index";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={practiceStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
