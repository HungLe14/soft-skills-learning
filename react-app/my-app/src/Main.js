import React from "react";
import Create from "./Create";
import Read from "./Read";
import Update from "./Update";

export const Main = (props) => {
  const { mode, prefix, suffix } = props;

  function renderComponent() {
    switch (mode) {
      case "create":
        return <Create prefix={prefix} suffix={suffix} />;
      case "update":
        return <Update prefix={prefix} suffix={suffix} />;
      case "read":
        return <Read prefix={prefix} suffix={suffix}/>;
      default:
    }
  }

  return <React.Fragment>{renderComponent()}</React.Fragment>;
};
