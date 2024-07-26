import React, { useState } from "react";
import { Container, Row, Col, Form, Alert, Button, Spinner } from "react-bootstrap";

const ForgotPassword = () => {
    const [enteredEmail, setEnteredEmail] = useState("");
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const emailHandler = (event) => {
        setEnteredEmail(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setMessage(null);
        setError(null);
        setLoading(true);

        try {
            const response = await fetch(
                "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyByqGR1J2yVZHGlFvq-QaigXuZjIz4qrZw",
                {
                    method: "POST",
                    body: JSON.stringify({
                        requestType: "PASSWORD_RESET",
                        email: enteredEmail,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            setLoading(false);

            if (response.ok) {
                setMessage("Password reset email sent! Check your inbox.");
                setEnteredEmail("");
            } else {
                const data = await response.json();
                const errorMessage = data.error?.message || "Password reset failed!";
                setError(errorMessage);
            }
        } catch (error) {
            setLoading(false);
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ height: "80vh" }}>
            <Row className="w-100">
                <Col md={4} className="mx-auto">
                    <div className="border p-4 rounded shadow">
                        <h2 className="text-center">Forgot Password</h2>
                        {message && <Alert variant="success">{message}</Alert>}
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
                            <Button variant="primary" type="submit" disabled={loading}>
                                {loading ? <Spinner animation="border" size="sm" /> : "Send Reset Link"}
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ForgotPassword;
