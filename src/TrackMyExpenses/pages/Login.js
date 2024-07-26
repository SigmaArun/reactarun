
import React ,{useContext, useState}from "react";
import { Container, Row, Col, Form, Alert, Button } from "react-bootstrap";
import { useHistory,Link } from 'react-router-dom';
import AuthContext from "../store/AuthContext";

const Login=()=>{
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
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyByqGR1J2yVZHGlFvq-QaigXuZjIz4qrZw",
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
            history.push('/home');
          } else {
            const data = await response.json();
            const errorMessage = data.error?.message || "Authentication failed!";
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
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={enteredEmail}
                  onChange={emailHandler}
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
               
                <Form.Control
                  type="password"
                  placeholder="password"
                  name="password"
                  value={enteredPassword}
                  onChange={passwordHandler}
                />
              </Form.Group>
              <Link to="/forgot-password" className="d-block mt-3">Forgot Password?</Link>
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
            </div>
          </Col>
        </Row>
      </Container>
        </>
    )
}
export default Login;