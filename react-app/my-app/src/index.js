import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import practiceStore from "../src/components/store/index";
import Create from "./Create";
import Update from "./Update";

export const mount = (
  containerId,
  history, // used to allow for passing down a history state: RouteComponentProps['history'] = createBrowserHistory(),
  props
) => {
  let externalContext = props;
  const isCreate = false;

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={practiceStore}>
        {isCreate ? <Create /> : <Update />}
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );
};

window[`renderSoftSkillsLearning`] = mount;

export const unmount = (containerId) => {
  const container = document.getElementById(containerId);
  if (container) ReactDOM.unmountComponentAtNode(container);
};

window[`unmountSoftSkillsLearning`] = unmount;
