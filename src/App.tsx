import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryCache, ReactQueryCacheProvider } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import { Topbar } from "./components/topbar/Topbar";
import { Navigation } from "./components/navigation/Navigation";
import { Main } from "./components/main/Main";

import "./App.css";

const queryCache = new QueryCache();

function App() {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Router>
        <div className="app">
          <Topbar />
          <div className="wrapper">
            <Navigation />
            <Main />
          </div>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen />
    </ReactQueryCacheProvider>
  );
}

export default App;
