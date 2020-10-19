import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Topbar } from "./components/topbar/Topbar";
import { Navigation } from "./components/navigation/Navigation";
import { Main } from "./components/main/Main";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Topbar />
        <div className="wrapper">
          <Navigation />
          <Main />
        </div>
      </div>
    </Router>
  );
}

export default App;
