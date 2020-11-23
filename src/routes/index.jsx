import React from "react";
import { Router, Switch } from "react-router-dom";
import AuthPage from "./authPage";
import HomePage from "./homePage";
import history from "./history";

export default function Routes({ isAuthorized }) {
  return (
    <Router history={history}>
      <Switch>
        {!isAuthorized ? <AuthPage /> : <HomePage user={isAuthorized} />}
      </Switch>
    </Router>
  );
}
