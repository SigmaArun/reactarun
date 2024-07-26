import React, { useState } from "react";
import { Container, Form, Button,Alert,Row,Col } from "react-bootstrap";

const Profile = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredUrl, setEnteredUrl] = useState("");
  const [error, setError] = useState(null); 
  

  const nameHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const urlHandler = (event) => {
    setEnteredUrl(event.target.value);
  };

  const cancelHandler=()=>{
      props.show();
        setEnteredName('');
        setEnteredUrl('');
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    if (enteredName.trim() === "" || enteredUrl.trim() === "" ) {
      setError("All fields are required.");
      return;
    }
   
    const profileData = {
      userName: enteredName,
      url:enteredUrl,
    };

    try{
      const response=await fetch('https://trackmyexpenses-5d3c6-default-rtdb.firebaseio.com/userdata.json',
        {
          method:'POST',
          body:JSON.stringify(profileData),
          headers: {
            'Content-Type': 'application/json'
          }
        }

      );
      if (!response.ok) {
        throw new Error('Failed to add user');
      }

    
      setEnteredName('');
      setEnteredUrl('');
   
      setError(null);

      alert('profile added successfully!');
      props.onProfileUpdate(); 


    }catch(error){
      console.error('Error:', error);
      alert('Failed to add user');
    }
  };

  return (
    <Container className="mt-4">
    <h3>Profile Details</h3>
    {error && <Alert variant="danger">{error}</Alert>}
    <Form onSubmit={submitHandler} className="border p-4 rounded">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Form.Group controlId="formname">
            <Form.Label>Enter Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your Name"
              name="username"
              value={enteredName}
              onChange={nameHandler}
            />
          </Form.Group>

          <Form.Group controlId="formurl">
            <Form.Label>Profile Photo URL:</Form.Label>
            <Form.Control
              type="url"
              placeholder="Enter URL"
              name="userurl"
              value={enteredUrl}
              onChange={urlHandler}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Update
          </Button>

          <Button variant="danger" className="mt-3 ml-2" onClick={cancelHandler}>
            Cancel
          </Button>
        </Col>
      </Row>
    </Form>
  </Container>
  );
};

export default Profile;
