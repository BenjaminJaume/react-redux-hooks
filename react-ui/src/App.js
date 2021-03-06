import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Router, Switch, Route } from "react-router-dom";

// Loading containers
import Home from "./containers/Home";
import Login from "./containers/Login";
import SignUp from "./containers/SignUp";
import Profile from "./containers/Profile";
import UserWords from "./containers/UserWords";
import Moderator from "./containers/Moderator";
import Admin from "./containers/Admin";
import Jokes from "./containers/Jokes";
import Page404 from "./containers/Page404";

// Loading components
import NavigationBar from "./components/NavigationBar";

import { clearMessage } from "./redux";

import { history } from "./helpers/history";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  return (
    <Router history={history}>
      <NavigationBar />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/modo" component={Moderator} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/my-words" component={UserWords} />
        <Route exact path="/jokes" component={Jokes} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route component={Page404} />
      </Switch>
    </Router>
  );
}

export default App;
