import React, { useState } from "react";

import { Form, Button, Container, Row, Col ,Alert} from 'react-bootstrap';

const Contact=()=>{

  const[enterName,setName]=  useState("");   
   const[email,setEmail]= useState("");
   const[phone,setPhone]= useState(""); 
   // for validation i used state 
   const [error, setError] = useState(null); 

   const nameHandler=(event)=>{
    setName(event.target.value);
   }
   const emailHandler=(event)=>{
    setEmail(event.target.value);
   }
   const phoneHandler=(event)=>{
    setPhone(event.target.value);
   }
     
   const handleSubmit = async (event) => {
    event.preventDefault();

      // Validation
      if (enterName.trim() === "" || email.trim() === "" || phone.trim() === "") {
        setError("All fields are required.");
        return;
      }
    
// this object i acn use for buy ticket window 
    const contactData = {
      userName: enterName,
      emailId: email,
      phone: phone,
    };

    try {
      const response = await fetch('https://akecommerce-app-default-rtdb.firebaseio.com/userData.json', {
        method: 'POST',
        body: JSON.stringify(contactData),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to add user');
      }

    
      setName('');
      setEmail('');
      setPhone('');
      setError(null);

      alert('User added successfully!');

    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add user');
    }
  };
 
    return(
        <Container className="mt-5 mb-5">
        <Row className="justify-content-md-center">
          <Col md={6}>
            <h2>Contact Form</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={enterName}
                  onChange={nameHandler}
                />
              </Form.Group>
  
              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={email}
                  onChange={emailHandler}
                />
              </Form.Group>
  
              <Form.Group controlId="formPhone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter your phone number"
                  name="phone"
                  value={phone}
                  onChange={phoneHandler}
                />
              </Form.Group>
  
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    )
}
export default Contact;