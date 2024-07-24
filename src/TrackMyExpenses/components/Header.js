import React,{useState} from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { NavLink} from "react-router-dom";

import "./Header.css";


const Header = () => {

  const [expanded, setExpanded] = useState(false);



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
            <NavLink to="/signup" className="nav-link">
              <Button variant="primary" onClick={handleNavLinkClick} className="mr-2">SignUp</Button>
            </NavLink>

              <NavLink to="/login" className="nav-link">
                <Button variant="primary" onClick={handleNavLinkClick} >Login</Button>
              </NavLink>
         
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
   
    </>
  );
};

export default Header;
