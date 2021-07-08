import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Router, Switch, Route } from "react-router-dom";

// Loading containers
import Home from "./containers/Home";
import Login from "./containers/Login";
import SignUp from "./containers/SignUp";
import Profile from "./containers/Profile";
import UserFavoriteWords from "./containers/UserFavoriteWords";
import BoardModerator from "./containers/BoardModerator";
import BoardAdmin from "./containers/BoardAdmin";
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
        <Route exact path="/admin" component={BoardAdmin} />
        <Route exact path="/mod" component={BoardModerator} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/my-favorites" component={UserFavoriteWords} />
        <Route exact path="/jokes" component={Jokes} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route component={Page404} />
      </Switch>
    </Router>
  );
}

export default App;
