import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Dashboard from "../containers/dashboard";
// import Donor from "../Donor";
import NotFound from "../containers/notFound";
import AddOrganization from "../containers/addOrganization";
import UpdateOrganization from "../containers/editOrganization";
import Profile from "../containers/profile";
import AppBar from "../components/dashboard/AppBar";
import Footer from "../components/dashboard/Footer";

export default function HomePage({ user }) {
  return (
    <>
      <header>
        <AppBar user={user} />
      </header>
      <main role='main' className='container'>
        <div className='container mt-3'>
          <Switch>
            {/* Redirect from root URL to /dashboard. */}
            <Route exact path='/dashboard' component={Dashboard} />

            <Route path='/add-org' component={AddOrganization} />
            <Route path='/update-org' component={UpdateOrganization} />
            <Route path='/profile' component={Profile} />
            <Route path='/not-found' component={NotFound} />
            {<Redirect from='/' to='/dashboard' />}
            <Redirect to='/not-found' />
          </Switch>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
