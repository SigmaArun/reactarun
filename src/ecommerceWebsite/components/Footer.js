import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="bg-dark text-white text-center py-3">
            <Container>
                <h3 className="footer-title">The Generics</h3>
                <Row className="justify-content-center">
                    <Col xs={6} md={4} lg={2} className="mb-3">
                        <Button variant="link" className="text-white">App</Button>
                    </Col>
                    <Col xs={6} md={4} lg={2} className="mb-3">
                        <Button variant="link" className="text-white">YouTube</Button>
                    </Col>
                    <Col xs={6} md={4} lg={2} className="mb-3">
                        <Button variant="link" className="text-white">Podcast</Button>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
