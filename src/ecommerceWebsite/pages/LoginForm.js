import React, { useState ,useContext} from "react";
import { Container, Row, Col, Form, Alert, Button } from "react-bootstrap";
import AuthContext from "../store/AuthContext";
import { useHistory } from 'react-router-dom';

const LoginForm = () => {

  const authCtx=useContext(AuthContext);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [error, setError] = useState(null);
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

    if (!enteredEmail.trim() || !enteredPassword.trim()) {
    
      setError("Please fill out all fields.");
      return;
    }
    // post request auth

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyADmXqIuQyG0nZ4Yeu7Hi13m2EP7oX6PfU",
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
        authCtx.login(data.idToken, enteredEmail); // Log in with the received idToken
        setEnteredEmail("");
        setEnteredPassword("");
        history.push('/store');
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
    <>
      <Container className="mt-5 mb-5">
        <Row className="justify-content-md-center">
          <Col md={6}>
            <h2>Login </h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={enteredEmail}
                  onChange={emailHandler}
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter six digit password"
                  name="password"
                  value={enteredPassword}
                  onChange={passwordHandler}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default LoginForm;
