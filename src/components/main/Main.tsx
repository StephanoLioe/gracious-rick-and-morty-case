import React from "react";
import { Switch, Route } from "react-router-dom";
import { Dimension } from "./Dimension";
import { Episodes } from "./Episodes";
import "./main.css";

export const Main = () => {
  return (
    <Switch>
      <Route path="/dimensions">
        <Dimension />
      </Route>
      {/* <Route path="/locations">
        <Location />
      </Route> */}
      <Route path="/episodes/">
        <Episodes />;
      </Route>
    </Switch>
  );
};
