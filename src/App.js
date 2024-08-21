import React, { useState } from "react";
import "./App.css";
import { Container, Button } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Home from "./mailBoxClient/pages/Home";
import Login from "./mailBoxClient/pages/Login";
import SignUp from "./mailBoxClient/pages/SignUp";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = () => {
    setShowLogin(true);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  return (
    <>
      <Router>
        <Container>
          <Button onClick={loginHandler}>Login</Button>

          <Switch>
            <Route path="/home">
              {isLoggedIn ? <Home /> : <Redirect to="/" />}
            </Route>

            <Route path="/">
              {showLogin ? (
                <Login onLoginSuccess={handleLoginSuccess} />
              ) : (
                <Redirect to="/" />
              )}
            </Route>

           
            <Route path="/signup" component={SignUp} />
          </Switch>
        </Container>
      </Router>
    </>
  );
};

export default App;
