import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.scss";
import "antd/dist/antd.css";

import Home from "./components/Home/Home";

interface AppProps {}
const App: React.FC<AppProps> = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        {/* Catch all */}
        <Route path="/">
          <Redirect to="/" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
