import React, { useState,useEffect } from "react";
import { Container, Form, Button,Alert,Row,Col } from "react-bootstrap";

const Profile = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredUrl, setEnteredUrl] = useState("");
  const [error, setError] = useState(null); 
  const [userId, setUserId] = useState(null);
  

  // i will add a useEffect to fetch data 

  useEffect(() => {
    // Fetch profile data from Firebase on component mount
    const fetchProfileData = async () => {
      try {
        const response = await fetch("https://trackmyexpenses-5d3c6-default-rtdb.firebaseio.com/userdata.json");
        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }
        const data = await response.json();
        if (data) {
          const userData = Object.entries(data)[0]; // Get the first user data entry
          setUserId(userData[0]); // Set the user ID
          setEnteredName(userData[1].userName || "");
          setEnteredUrl(userData[1].url || "");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError("Failed to fetch profile data");
      }
    };

    fetchProfileData();
  }, []);
  // function to fetch finished here inside useefffect

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

         
    try {
      let response;
      if (userId) {
        // If userId exists, update the existing data
        response = await fetch(
          `https://trackmyexpenses-5d3c6-default-rtdb.firebaseio.com/userdata/${userId}.json`,
          {
            method: "PUT", // Use PUT to update the existing data
            body: JSON.stringify(profileData),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        // If userId does not exist, create new data
        response = await fetch(
          "https://trackmyexpenses-5d3c6-default-rtdb.firebaseio.com/userdata.json",
          {
            method: "POST", // Use POST to create new data
            body: JSON.stringify(profileData),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }

      if (!response.ok) {
        throw new Error("Failed to save user");
      }

      if (!userId) {
        // If new data was created, get the new userId
        const newUserData = await response.json();
        setUserId(Object.keys(newUserData)[0]);
      }

      setEnteredName("");
      setEnteredUrl("");
      setError(null);

      alert("Profile saved successfully!");
      props.onProfileUpdate(); // Call the callback function to update showMessage

    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save user");
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
