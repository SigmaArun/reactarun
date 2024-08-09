// src/TrackMyExpenses/components/Header.js
import React, { useContext, useState } from "react";
import { Container, Navbar, Nav, Button, Row, Col } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import AuthContext from "../store/AuthContext";
import { themeActions } from "../reduxstore/themeSlice";
import { useSelector, useDispatch } from "react-redux";

import "./Header.css";
//import { useDispatch, useSelector } from 'react-redux';
//import { authActions } from '../reduxstore/authSlice';

const Header = () => {
  const authCtx = useContext(AuthContext);
  //const dispatch = useDispatch();
  const history = useHistory();
  const [expanded, setExpanded] = useState(false);
  //const userEmail = useSelector((state) => state.auth.userEmail);
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // for theme
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  const handleToggleTheme = () => {
    dispatch(themeActions.toggleTheme());
  };

  const logoutHandler = () => {
    // dispatch(authActions.logout());
    authCtx.logout();
    history.replace("/home");
    setExpanded(false); // Close the navbar
  };

  const handleNavLinkClick = () => {
    setExpanded(false);
  };

  return (
    <>
      <Navbar
        className="navbar-fixed"
        bg="dark"
        variant="dark"
        expand="md"
        expanded={expanded}
      >
        <Container>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={() => setExpanded(!expanded)}
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mx-auto">
              <NavLink
                to="/home"
                className="nav-link"
                activeClassName="active"
                onClick={handleNavLinkClick}
              >
                HOME
              </NavLink>
            </Nav>
            <Row className="ml-auto w-100">
              <Col xs={12} md="auto" className="text-center text-md-left">
                {authCtx.isLoggedIn && (
                  <span className="text-white mr-md-3">
                    Hello, {authCtx.userEmail}
                  </span>
                )}
              </Col>
              <Col xs={12} md="auto" className="text-center text-md-left">
                <NavLink to="/signup" className="nav-link">
                  <Button
                    variant="primary"
                    onClick={handleNavLinkClick}
                    className="nav-link-button"
                  >
                    SignUp
                  </Button>
                </NavLink>
              </Col>
              <Col xs={12} md="auto" className="text-center text-md-left">
                {authCtx.isLoggedIn ? (
                  <Button
                    onClick={logoutHandler}
                    variant="primary"
                    className="nav-link-button"
                  >
                    Logout
                  </Button>
                ) : (
                  <NavLink to="/login" className="nav-link">
                    <Button
                      variant="primary"
                      onClick={handleNavLinkClick}
                      className="nav-link-button"
                    >
                      Login
                    </Button>
                  </NavLink>
                )}
              </Col>
              {authCtx.isLoggedIn && (
                <Col xs={12} md="auto" className="text-center text-md-left">
                  <NavLink to="/verifyemail" className="nav-link">
                    <Button
                      variant="primary"
                      onClick={handleNavLinkClick}
                      className="nav-link-button"
                    >
                      Verify Email
                    </Button>
                  </NavLink>
                </Col>
              )}
              <Col xs={12} md="auto" className="text-center text-md-left">
                <Button onClick={handleToggleTheme} variant="secondary">
                  Toggle to {theme === "light" ? "Dark" : "Light"} Theme
                </Button>
              </Col>
            </Row>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
