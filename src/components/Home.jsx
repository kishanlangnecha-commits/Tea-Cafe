import React, { useEffect, useState } from 'react';
import { Container, Navbar, Nav, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Coffee, Leaf, Wind, Award, ArrowRight, Instagram, Facebook, Twitter, MapPin, Clock, Phone, UserCog, User, Calendar, ShieldCheck } from 'lucide-react';
import '../styles/home.css';

const Home = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const categories = [
        { name: "Green Tea", img: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
        { name: "Black Tea", img: "https://images.unsplash.com/photo-1594631252845-29fc4586c567?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
        { name: "Herbal", img: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
        { name: "Oolong", img: "https://images.unsplash.com/photo-1563911892149-1456a0033104?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" }
    ];

    return (
        <div className="home-container">
            {/* Navbar */}
            <Navbar expand="lg" fixed="top" className={`glass-nav ${scrolled ? 'shadow-sm' : ''}`}>
                <Container>
                    <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2" style={{ color: 'var(--tea-primary)', fontWeight: 'bold', fontSize: '1.5rem' }}>
                        <Coffee size={32} />
                        Tea Cafe
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#about">About</Nav.Link>
                            <Nav.Link href="#menu">Menu</Nav.Link>
                            <Nav.Link href="#contact">Contact</Nav.Link>
                            <Button as={Link} to="/login" variant="outline-primary" className="ms-lg-3 rounded-pill px-4" style={{ borderColor: 'var(--tea-primary)', color: 'var(--tea-primary)' }}>
                                Login
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Quick Access Section */}
            <div className="quick-access-bar">
                <Container>
                    <Row className="justify-content-center g-3">
                        <Col xs={6} md={3}>
                            <Button as={Link} to="/staff" variant="light" className="access-btn">
                                <UserCog size={20} />
                                <span>Staff Access</span>
                            </Button>
                        </Col>
                        <Col xs={6} md={3}>
                            <Button variant="light" className="access-btn">
                                <User size={20} />
                                <span>Client Access</span>
                            </Button>
                        </Col>
                        <Col xs={6} md={3}>
                            <Button variant="light" className="access-btn">
                                <Calendar size={20} />
                                <span>Book Table</span>
                            </Button>
                        </Col>
                        <Col xs={6} md={3}>
                            <Button variant="light" className="access-btn">
                                <ShieldCheck size={20} />
                                <span>Owner Access</span>
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>


            {/* Features Section */}
            <section className="features-section">
                <Container>
                    <div className="section-header">
                        <h2>Why Choose Tea Cafe?</h2>
                        <div className="underline"></div>
                    </div>
                    <Row className="g-4">
                        <Col md={4}>
                            <div className="feature-card">
                                <div className="feature-icon-wrapper">
                                    <Leaf size={35} />
                                </div>
                                <h3>Pure Organic</h3>
                                <p className="text-muted">We only use 100% organic tea leaves sourced directly from certified sustainable farms.</p>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="feature-card">
                                <div className="feature-icon-wrapper">
                                    <Wind size={35} />
                                </div>
                                <h3>Freshly Brewed</h3>
                                <p className="text-muted">Every cup is brewed to perfection at the ideal temperature to preserve the natural essence.</p>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="feature-card">
                                <div className="feature-icon-wrapper">
                                    <Award size={35} />
                                </div>
                                <h3>Award Winning</h3>
                                <p className="text-muted">Voted the best tea experience for three consecutive years by the Brewing Association.</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Category Section */}
            <section className="category-section">
                <Container>
                    <div className="section-header">
                        <h2>Explore Categories</h2>
                        <div className="underline"></div>
                    </div>
                    <Row className="text-center">
                        {categories.map((cat, index) => (
                            <Col xs={6} md={3} key={index} className="mb-4">
                                <div className="category-circle">
                                    <img src={cat.img} alt={cat.name} />
                                </div>
                                <h5 className="category-name">{cat.name}</h5>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>


            {/* Footer */}
            <footer>
                <Container>
                    <Row className="mb-5">
                        <Col lg={4} className="mb-4 mb-lg-0">
                            <div className="footer-logo">
                                <Coffee size={32} />
                                Tea Cafe
                            </div>
                            <p className="opacity-75 pe-lg-5">
                                Bringing the finest teas from around the globe to your cup. Experience the tranquility of a perfect brew.
                            </p>
                            <div className="social-links">
                                <button className="social-icon border-0 bg-transparent text-white"><Instagram size={20} /></button>
                                <button className="social-icon border-0 bg-transparent text-white"><Facebook size={20} /></button>
                                <button className="social-icon border-0 bg-transparent text-white"><Twitter size={20} /></button>
                            </div>
                        </Col>
                        <Col lg={2} md={4} className="mb-4 mb-md-0">
                            <h5>Quick Links</h5>
                            <ul className="list-unstyled mt-3 opacity-75">
                                <li className="mb-2"><a href="#" className="text-white text-decoration-none">Home</a></li>
                                <li className="mb-2"><a href="#" className="text-white text-decoration-none">Menu</a></li>
                                <li className="mb-2"><a href="#" className="text-white text-decoration-none">About</a></li>
                                <li className="mb-2"><a href="#" className="text-white text-decoration-none">Store</a></li>
                            </ul>
                        </Col>
                        <Col lg={3} md={4} className="mb-4 mb-md-0">
                            <h5>Contact Us</h5>
                            <ul className="list-unstyled mt-3 opacity-75">
                                <li className="mb-3 d-flex align-items-center gap-2">
                                    <MapPin size={18} /> 123 Tea Garden St, Brew City
                                </li>
                                <li className="mb-3 d-flex align-items-center gap-2">
                                    <Phone size={18} /> +1 (555) TEA-CAFE
                                </li>
                                <li className="mb-3 d-flex align-items-center gap-2">
                                    <Clock size={18} /> Mon - Sun: 8am - 10pm
                                </li>
                            </ul>
                        </Col>
                        <Col lg={3} md={4}>
                            <h5>Newsletter</h5>
                            <p className="small opacity-75 mt-3">Subscribe to get the latest tea recipes and special offers.</p>
                            <div className="d-flex gap-2">
                                <input type="email" placeholder="Email" className="form-control bg-transparent border-secondary text-white" />
                                <Button className="btn-primary-tea px-3">Join</Button>
                            </div>
                        </Col>
                    </Row>
                    <hr className="opacity-25" />
                    <div className="text-center pt-3 opacity-50 small">
                        &copy; 2024 Tea Cafe. All rights reserved. Designed for tea lovers.
                    </div>
                </Container>
            </footer>
        </div>
    );
};

export default Home;
