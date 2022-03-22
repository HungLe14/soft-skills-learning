import React from "react";
import Create from "./Create";
import Read from "./Read";
import Update from "./Update";

export const Main = (props) => {
  const { mode } = props;

  function renderComponent() {
    switch (mode) {
      case "create":
        return <Create />;
      case "update":
        return <Update />;
      case "read":
        return <Read />;
      default:
    }
  }

  return <React.Fragment>{renderComponent()}</React.Fragment>;
};
