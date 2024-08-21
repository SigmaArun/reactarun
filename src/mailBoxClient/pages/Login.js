import React, { useState } from "react";
import { Container, Row, Col, Form, Button ,Alert} from "react-bootstrap";
import "./Login.css";
import { useHistory, Link } from 'react-router-dom';

const Login = ({ onLoginSuccess }) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [error, setError] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const history = useHistory();

  const emailHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setShowSuccessAlert(false);

    if (!enteredEmail.trim() || !enteredPassword.trim()) {
      setError("Please fill out all fields.");
      return;
    }
    try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC7R1l_s-RE1UBewcABpuamdl_MpAasjIA",
          {
            method: "POST",
            body: JSON.stringify({
              email: enteredEmail,
              password: enteredPassword,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('token', data.idToken); 
          localStorage.setItem('email', enteredEmail);
      
          setEnteredEmail("");
          setEnteredPassword("");
         
          setShowSuccessAlert(true);
         
          onLoginSuccess(); 
        //   history.push('/home');
        setTimeout(() => {
            history.push('/home');
          }, 3000); 
        
        } else {
          const data = await response.json();
          const errorMessage = data.error?.message || "Authentication failed!";
          setError(errorMessage);
        }
      } catch (error) {
        setError("An error occurred. Please try again.");
      }
    };

  return (
    <Container>
      <div className="wave"></div>
      <Row className="justify-content-center">
        <Col md={4} className="form-container">
          <h2 className="text-center title">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {showSuccessAlert && (
              <Alert variant="success">
                <Alert.Heading>Login successful!</Alert.Heading>
                You have successfully Logged in .
              </Alert>
            )}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                value={enteredEmail}
                onChange={emailHandler}
                className="input"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Control
                type="password"
                placeholder="password"
                name="password"
                value={enteredPassword}
                onChange={passwordHandler}
                className="input"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="login-button">
              Login
            </Button>
            <Link to="#" className="forgot-password">
              Forgot password?
            </Link>
          </Form>

          <p className="text-center signup-text">
            Don't have an account?{" "}
            <Link to="#" className="signup-link">
              Sign up
            </Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
