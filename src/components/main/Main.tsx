import React from "react";
import { Switch, Route } from "react-router-dom";
import { Dimension } from "./Dimension";
import "./main.css";

export const Main = () => {
  return (
    <Switch>
      <Route exact path="/">
        <div className="main">lijst home</div>;
      </Route>
      <Route path="/dimensions">
        <Dimension />
      </Route>
      <Route path="/locations">
        <div className="main locations">lijst locations</div>;
      </Route>
      <Route path="/episodes">
        <div className="main episodes">lijst content</div>;
      </Route>
    </Switch>
  );
};
