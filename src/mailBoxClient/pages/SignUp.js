
import React,{useState,useEffect} from "react";

import { Container, Row, Col, Form, Button, Alert} from "react-bootstrap";

const SignUp=()=>{
    const [enteredEmail, setEnteredEmail] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    useEffect(() => {
      if (confirmPassword !== '' ) {
        setPasswordsMatch(enteredPassword === confirmPassword);
      }
    }, [enteredPassword, confirmPassword]);
    

    const emailHandler = (event) => {
        setEnteredEmail(event.target.value);
      };
            
      const passwordHandler = (event) => {
        setEnteredPassword(event.target.value);
      };

      const confirmpasswordHandler=(event)=>{
         setConfirmPassword(event.target.value);
        

      }
    const submitHandler=async (event)=>{

        event.preventDefault();
        setIsLoading(true);
        setError(null);
        setShowSuccessAlert(false);
        if (!enteredEmail.trim() || !enteredPassword.trim() || !confirmPassword.trim()) {
          setIsLoading(false);
          setError("Please fill out all fields.");
          return;
        }

        if (!passwordsMatch) {
          setIsLoading(false);
          setError("Passwords do not match.");
          return;
        }

        try{

 const response=await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC7R1l_s-RE1UBewcABpuamdl_MpAasjIA",
    {

       method:'POST',
       body:JSON.stringify({
         email:enteredEmail,
         password:enteredPassword,
         retrunSecureToken:true,

       }),
       headers:{
        "Content-Type":"application/json",
       },

    })
    setIsLoading(false);

    if(response.ok){
      setEnteredEmail('');
      setEnteredPassword('');
      setConfirmPassword('')
      setShowSuccessAlert(true);

    }else{
      const data=response.json();
      handleFirebaseErrors(data.error.message);
    }

        }catch(error){
          setIsLoading(false);
          setError("An error occurred. Please try again.");
        }

    }

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

    return(
    <>
          <Container className="mt-5 mb-5">
        <Row className="justify-content-md-center">
          <Col md={6}>
         
            <h2>SignUp Form</h2>
            {error && <Alert variant="danger">{error}</Alert>} 
            {showSuccessAlert && (
              <Alert variant="success">
                <Alert.Heading>Signup successful!</Alert.Heading>
                You have successfully signed up.
              </Alert>
            )}
            <Form onSubmit={submitHandler}>
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
                <Form.Label>Enter Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter six digit password"
                  name="password"
                  value={enteredPassword}
                  onChange={passwordHandler}
                />
              </Form.Group>

             
              <Form.Group controlId="formPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="type same password as above"
                  name="confirmpassword"
                  value={confirmPassword}
                  onChange={confirmpasswordHandler}
                />
              </Form.Group>

              {!passwordsMatch && (
                <Alert variant="danger">Passwords do not match.</Alert>
              )}
              <Button variant="primary" type="submit" disabled={isLoading}>
                {isLoading ? "Signing Up..." : "SignUp"}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
    )
}
export default SignUp;