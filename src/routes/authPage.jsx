import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "../containers/login";
import SignUp from "../containers/SignUp";
import Logout from "../containers/logout";
export default function AuthPage() {
  return (
    <Switch>
      <Redirect exact from="/" to="/login" />
      <Route path="/login" component={Login} />
      <Route path="/signUp" component={SignUp} />
      <Route path="/logout" component={Logout} />
    </Switch>
  );
}
