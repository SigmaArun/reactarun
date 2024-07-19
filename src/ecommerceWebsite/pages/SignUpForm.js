import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useHistory } from 'react-router-dom';

const SignUpForm = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    setError(null);

            // Validation for empty fields
    if (!enteredEmail.trim() || !enteredPassword.trim()) {
      setIsLoading(false);
      setError("Please fill out all fields.");
      return;
    }
    // post request auth
    try{
       const response= await  fetch(
         "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyADmXqIuQyG0nZ4Yeu7Hi13m2EP7oX6PfU",

       {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
          }),
           headers: {
          "content-Type": "application/json",
           },
        }
       )
        setIsLoading(false);
     if(response.ok){
      setEnteredEmail("");
      setEnteredPassword("");
      history.push('/store');

     }else{
      const data = await response.json();
      // setError(data.error.message || "Email already exists or weak password.");
      //setError("Email already exists or weak password.");
      handleFirebaseErrors(data.error.message);

     }
    }catch (error) {
      setIsLoading(false);
      setError("An error occurred. Please try again.");
     }
  
  };
  const handleFirebaseErrors = (errorCode) => {
    let errorMessage;
    switch (errorCode) {
      case "EMAIL_EXISTS":
        errorMessage = "Email already exists.";
        break;
      case "WEAK_PASSWORD : Password should be at least 6 characters":
        errorMessage = "Weak password. Please choose a stronger password.";
        break;
      default:
        errorMessage = "An error occurred. Please try again.";
    }
    setError(errorMessage);
  };
  return (
    <>
      <Container className="mt-5 mb-5">
        <Row className="justify-content-md-center">
          <Col md={6}>
          <p>You have to use a  valid Email Id and you can enter any password minimum six character
            your Account will be created on Generics .please use these email and password to 
            login to your account when you see login form.
          </p>
            <h2>SignUp Form</h2>
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
                <Form.Label>Choose a strong Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter six digit password"
                  name="password"
                  value={enteredPassword}
                  onChange={passwordHandler}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                {isLoading ? "sendingRequest..." : "SignUp"}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default SignUpForm;
