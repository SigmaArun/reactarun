
import React ,{ useContext, useState}from "react";
import { Container, Row, Col, Form, Alert, Button } from "react-bootstrap";
import AuthContext from "../store/AuthContext";
// this is brilliant concept i can use same for otp 
const VerifyEmail=()=>{
    const authCtx=useContext(AuthContext);

    const [enteredVerifyEmail, setEnteredEmail] = useState("");
    const [error, setError] = useState(null);

    const emailHandler = (event) => {
        setEnteredEmail(event.target.value);
      };
        
      const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
    
        if (!authCtx.token) {
          setError("User not authenticated. Please log in.");
          return;
        }
    
        try {
          const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyByqGR1J2yVZHGlFvq-QaigXuZjIz4qrZw',
            {
              method: "POST",
              body: JSON.stringify({
                requestType: "VERIFY_EMAIL",
                idToken: authCtx.token,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
    
          if (response.ok) {
            alert("Verification email sent! Check your email.");
          } else {
            const data = await response.json();
            const errorMessage = data.error?.message || "Failed to send verification email.";
            setError(errorMessage);
          }
        } catch (error) {
          setError("An error occurred. Please try again.");
        }
      };

    return(
        <>
     <Container className="d-flex align-items-center justify-content-center" style={{ height: "80vh" }}>
          <Row className="w-100">
        <Col md={4} className="mx-auto">
          <div className="border p-4 rounded shadow">
            <h2 className="text-center">Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail">
               
                <Form.Control
                  type="verifyemail"
                  placeholder="verifyEmail"
                  name="email"
                  value={enteredVerifyEmail}
                  onChange={emailHandler}
                />
              </Form.Group>
                     
              <Button variant="primary" type="submit">
                submit Email
              </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>  

        </>
    )
}
export default VerifyEmail;