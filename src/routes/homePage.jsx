import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Dashboard from "../containers/dashboard";
// import Donor from "../Donor";
import NotFound from "../containers/notFound";
import AddOrganization from "../containers/addOrganization";
import AppBar from "../components/dashboard/AppBar";
import Footer from "../components/dashboard/Footer";

export default function HomePage({ user }) {
  return (
    <>
      <AppBar user={user} />
      <main role="main" className="flex-shrink-0">
        <div className="container">
          <Switch>
            {/* Redirect from root URL to /dashboard. */}
            <Route exact path="/dashboard" component={Dashboard} />

            <Route path="/add-org" component={AddOrganization} />
            <Route path="/not-found" component={NotFound} />
            {<Redirect from="/" to="/dashboard" />}
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </main>
      <Footer />
    </>
  );
}
