import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import practiceStore from "../src/components/store/index";
import { Main } from "./Main";

export const mount = (
  containerId,
  history, // used to allow for passing down a history state: RouteComponentProps['history'] = createBrowserHistory(),
  props
) => {
  let externalContext = props;
  console.log(externalContext);

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={practiceStore}>
        <Main mode={props.mode} prefix={props.prefix} suffix={props.suffix} />
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
