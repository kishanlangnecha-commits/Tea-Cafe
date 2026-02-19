import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, InputGroup } from 'react-bootstrap';
import { Coffee, LogIn, UserPlus, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/auth.css';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="auth-wrapper">
            <Container>
                <Row className="justify-content-center align-items-center min-vh-100">
                    <Col xs={12} className="d-flex justify-content-center">
                        <Card className="auth-card shadow-lg border-0">
                            <Card.Body className="p-5">
                                <div className="text-center mb-4">
                                    <div className="brand-icon mb-3">
                                        <Coffee size={40} className="tea-icon" />
                                    </div>
                                    <h2 className="brand-name">Tea Cafe</h2>
                                    <p className="text-muted mb-2">Login to enjoy your tea</p>
                                    <hr className="short-line" />
                                </div>

                                <Form>
                                    <div className="form-group-animated delay-1">
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Email Address</Form.Label>
                                            <InputGroup className="custom-input-group">
                                                <InputGroup.Text className="input-icon-text">
                                                    <Mail size={18} />
                                                </InputGroup.Text>
                                                <Form.Control
                                                    type="email"
                                                    placeholder=""
                                                    className="custom-input border-start-0"
                                                />
                                            </InputGroup>
                                        </Form.Group>
                                    </div>

                                    <div className="form-group-animated delay-2">
                                        <Form.Group className="mb-4" controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <InputGroup className="custom-input-group">
                                                <InputGroup.Text className="input-icon-text">
                                                    <Lock size={18} />
                                                </InputGroup.Text>
                                                <Form.Control
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder=""
                                                    className="custom-input border-start-0 border-end-0"
                                                />
                                                <Button
                                                    variant="outline-secondary"
                                                    className="password-toggle-btn"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </Button>
                                            </InputGroup>
                                        </Form.Group>
                                    </div>

                                    <div className="d-grid gap-2 form-group-animated delay-3">
                                        <Button variant="primary" type="submit" className="btn-tea py-2">
                                            <LogIn size={18} className="me-2" /> Login
                                        </Button>
                                    </div>
                                </Form>

                                <div className="text-center mt-4 form-group-animated delay-4">
                                    <p className="mb-0">Don't have an account?
                                        <Link to="/signup" className="ms-2 signup-link">Sign Up</Link>
                                    </p>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Login;
