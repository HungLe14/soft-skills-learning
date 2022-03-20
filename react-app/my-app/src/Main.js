import React from "react";
import Create from "./Create";
import Update from "./Update";

export const Main = () => {
  const isCreate = false;

  return <React.Fragment>{isCreate ? <Create /> : <Update />}</React.Fragment>;
};
