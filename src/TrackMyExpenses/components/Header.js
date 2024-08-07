// src/TrackMyExpenses/components/Header.js
import React, { useContext, useState } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import AuthContext from "../store/AuthContext";
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

  const logoutHandler = () => {
   // dispatch(authActions.logout());
   authCtx.logout();
    history.replace('/home');
    setExpanded(false); // Close the navbar
  };

  const handleNavLinkClick = () => {
    setExpanded(false); 
  };

  return (
    <>
      <Navbar className="navbar-fixed" bg="dark" variant="dark" expand="md" expanded={expanded}>
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(!expanded)} />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mx-auto">
              <NavLink to="/home" className="nav-link" activeClassName="active" onClick={handleNavLinkClick}>HOME</NavLink>
            </Nav>
            <div className="ml-auto d-flex align-items-center">
              {authCtx.isLoggedIn && <span className="text-white mr-3">Hello, {authCtx.userEmail}</span>}
              <NavLink to="/signup" className="nav-link">
                <Button variant="primary" onClick={handleNavLinkClick} className="nav-link-button">SignUp</Button>
              </NavLink>
              {authCtx.isLoggedIn ? (
                <Button onClick={logoutHandler} variant="primary" className="nav-link-button">Logout</Button>
              ) : (
                <NavLink to="/login" className="nav-link">
                  <Button variant="primary" onClick={handleNavLinkClick} className="nav-link-button">Login</Button>
                </NavLink>
              )}
              {authCtx.isLoggedIn && (
                <NavLink to="/verifyemail" className="nav-link">
                  <Button variant="primary" onClick={handleNavLinkClick} className="nav-link-button">Verify Email</Button>
                </NavLink>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
