import React, { useContext, useState } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import CartContext from '../store/CartContext';
import AuthContext from "../store/AuthContext";
import "./Header.css";
import logoImg from './logo/generic.png';

const Header = () => {
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const [expanded, setExpanded] = useState(false);

  const handleCartButtonClick = () => {
    cartCtx.openCart();
    setExpanded(false); // Close the navbar
  };

  const logoutHandler = () => {
    authCtx.logout();
    history.replace('/home');
    setExpanded(false); // i Closed  the navbar
  };

  const handleNavLinkClick = () => {
    setExpanded(false); // i Close the navbar
  };

  const totalItems = cartCtx.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <Navbar className="navbar-fixed" bg="dark" variant="dark" expand="md" expanded={expanded}>
        <Container>
          <Navbar.Brand  as ={NavLink} to="/home">
            <img
              src={logoImg}
              width="45"
              height="45"
              className="d-inline-block align-top"
              alt="Company Logo"
              loading="lazy"
            />
            {' '}
            The Generics
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(!expanded)} />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mx-auto">
              <NavLink to="/home" className="nav-link" activeClassName="active" onClick={handleNavLinkClick}>HOME</NavLink>
              <NavLink to="/store" className="nav-link" activeClassName="active" onClick={handleNavLinkClick}>STORE</NavLink>
              <NavLink to="/about" className="nav-link" onClick={handleNavLinkClick}>ABOUT</NavLink>
              <NavLink to="/contact" className="nav-link" onClick={handleNavLinkClick}>CONTACT US</NavLink>
              {authCtx.isLoggedIn && <NavLink to="/profile" className="nav-link" onClick={handleNavLinkClick}>Profile</NavLink>}
            </Nav>
            <div className="ml-auto d-flex align-items-center">
            <NavLink to="/signup" className="nav-link">
              <Button variant="primary" onClick={handleNavLinkClick} className="mr-2">SignUp</Button>
            </NavLink>

            {authCtx.isLoggedIn && (
              <Button onClick={logoutHandler} variant="primary" className="mr-2">Logout</Button>
            )}

{authCtx.isLoggedIn ? (
  <Button onClick={handleCartButtonClick} variant="primary">Cart ({totalItems})</Button>
) : (
  <NavLink to="/login" className="nav-link">
    <Button variant="primary" onClick={handleNavLinkClick}>Login</Button>
  </NavLink>
)}

            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid className="p-0">
        <section className="section">
          <h1>The GENERICS</h1>
        </section>
      </Container>
    </>
  );
};

export default Header;
