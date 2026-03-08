import React, { useEffect, useState, useRef } from 'react';
import { Container, Navbar, Nav, Row, Col, Button, Card, Modal, Form, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Coffee, Leaf, Wind, Award, ArrowRight, Instagram, Facebook, Twitter, MapPin, Clock, Phone, UserCog, User, Calendar, ShieldCheck, Scan, X, Camera, QrCode, Check, ShoppingBag, Plus, Minus, Trash2, Settings } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { useSettings } from '../context/SettingsContext';
import SettingsModal from './SettingsModal';
import '../styles/home.css';

const Home = () => {
    const { language, t } = useSettings();
    const [scrolled, setScrolled] = useState(false);
    const [showScanner, setShowScanner] = useState(false);
    const [showQRMenu, setShowQRMenu] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [selectedTable, setSelectedTable] = useState('');
    const [selectedOrderTable, setSelectedOrderTable] = useState('');
    const [showSettings, setShowSettings] = useState(false);
    const [generatedQR, setGeneratedQR] = useState(null);
    const [navExpanded, setNavExpanded] = useState(false);

    const [cart, setCart] = useState([]);
    const [stream, setStream] = useState(null);
    const videoRef = useRef(null);

    const menuItems = [
        { id: 1, name: "Masala Chai", price: 20, category: "Tea", icon: <Leaf size={20} /> },
        { id: 2, name: "Green Tea", price: 30, category: "Tea", icon: <Leaf size={20} /> },
        { id: 3, name: "Black Coffee", price: 40, category: "Coffee", icon: <Coffee size={20} /> },
        { id: 4, name: "Cappuccino", price: 60, category: "Coffee", icon: <Coffee size={20} /> },
        { id: 5, name: "Samosa (2pcs)", price: 30, category: "Snacks", icon: <Award size={20} /> },
        { id: 6, name: "Maskabun", price: 35, category: "Snacks", icon: <Award size={20} /> },
    ];

    const tables = [
        'A1', 'A2', 'A3', 'A4', 'A5',
        'B1', 'B2', 'B3', 'B4', 'B5',
        'C1', 'C2', 'C3', 'C4', 'C5',
        'D1', 'D2', 'D3', 'D4', 'D5'
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            if (navExpanded) {
                setNavExpanded(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [stream, navExpanded]);

    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
            setShowScanner(true);
        } catch (err) {
            console.error("Error accessing camera:", err);
            alert("Could not access camera. Please ensure camera permissions are granted.");
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
        setShowScanner(false);
    };

    const handleGenerateQR = () => {
        setShowQRMenu(true);
    };

    const confirmGenerateQR = (tableId) => {
        const qrValue = `${window.location.origin}/client?table=${tableId}`;
        setGeneratedQR({ tableId, value: qrValue });
        setShowQRMenu(false);
    };

    const closeQRModal = () => {
        setGeneratedQR(null);
        setSelectedTable('');
    };

    const addToCart = (item) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) {
                return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
            }
            return [...prev, { ...item, qty: 1 }];
        });
    };

    const removeFromCart = (itemId) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === itemId);
            if (existing.qty > 1) {
                return prev.map(i => i.id === itemId ? { ...i, qty: i.qty - 1 } : i);
            }
            return prev.filter(i => i.id !== itemId);
        });
    };

    const placeOrder = () => {
        if (!selectedOrderTable) {
            alert("Please select a table before placing order!");
            return;
        }
        alert(`Order placed successfully for Table ${selectedOrderTable}! \nTotal Amount: ₹${cart.reduce((s, i) => s + (i.price * i.qty), 0)}`);
        setCart([]);
        setSelectedOrderTable('');
        setShowMenu(false);
    };

    const categories = [
        { name: "Green Tea", img: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
        { name: "Black Tea", img: "/black-tea.jpg" },
        { name: "Herbal", img: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
        { name: "Oolong", img: "/oolong-tea.jpg" }
    ];

    return (
        <div className="home-container">
            {/* Navbar */}
            <Navbar 
                expand="lg" 
                fixed="top" 
                expanded={navExpanded}
                onToggle={setNavExpanded}
                className={`glass-nav ${scrolled ? 'shadow-sm' : ''}`}
            >
                <Container>
                    <Navbar.Brand as={Link} to="/" onClick={() => setNavExpanded(false)} className="d-flex align-items-center gap-2" style={{ color: 'var(--tea-primary)', fontWeight: 'bold', fontSize: '1.5rem' }}>
                        <Coffee size={32} />
                        Tea Cafe
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto" onClick={() => setNavExpanded(false)}>
                            <Nav.Link href="#contact" onClick={() => setNavExpanded(false)}>{t.contact}</Nav.Link>
                            <Nav.Link className="d-flex align-items-center gap-1 nav-settings-link" onClick={() => { setShowSettings(true); setNavExpanded(false); }} style={{ cursor: 'pointer' }}>
                                <Settings size={18} /> {t.settings}
                            </Nav.Link>
                            <Button as={Link} to="/login" variant="outline-primary" onClick={() => setNavExpanded(false)} className="ms-lg-3 rounded-pill px-4 btn-outline-tea">
                                {t.login}
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Quick Access Section */}
            <div className="quick-access-bar">
                <Container>
                    <Row className="justify-content-center g-3 mb-3">
                        <Col xs={6} md={3}>
                            <Button as={Link} to="/staff" variant="light" className="access-btn">
                                <UserCog size={20} />
                                <span>{t.staff}</span>
                            </Button>
                        </Col>
                        <Col xs={6} md={3}>
                            <Button as={Link} to="/client" variant="light" className="access-btn">
                                <User size={20} />
                                <span>{t.client}</span>
                            </Button>
                        </Col>
                        <Col xs={6} md={3}>
                            <Button as={Link} to="/book-table" variant="light" className="access-btn">
                                <Calendar size={20} />
                                <span>{t.book}</span>
                            </Button>
                        </Col>
                        <Col xs={6} md={3}>
                            <Button as={Link} to="/owner" variant="light" className="access-btn">
                                <ShieldCheck size={20} />
                                <span>{t.owner}</span>
                            </Button>
                        </Col>
                    </Row>

                    <Row className="justify-content-center g-3 mb-3">
                        <Col xs={12} md={6}>
                            <Button onClick={() => setShowMenu(true)} variant="light" className="access-btn menu-special-btn">
                                <ShoppingBag size={24} />
                                <span>{t.orderMenu}</span>
                            </Button>
                        </Col>
                    </Row>

                    <Row className="justify-content-center g-3">
                        <Col xs={6} md={3}>
                            <Button onClick={startCamera} variant="light" className="access-btn scanner-special-btn">
                                <Scan size={24} />
                                <span>{t.scanner}</span>
                            </Button>
                        </Col>
                        <Col xs={6} md={3}>
                            <Button onClick={handleGenerateQR} variant="light" className="access-btn qr-special-btn">
                                <QrCode size={24} />
                                <span>{t.qrCode}</span>
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Scanner Modal overlay */}
            {showScanner && (
                <div className="scanner-overlay">
                    <div className="scanner-content">
                        <div className="scanner-header">
                            <h3><Camera className="me-2" /> Live Scanner</h3>
                            <button className="close-scanner" onClick={stopCamera}>
                                <X size={24} />
                            </button>
                        </div>
                        <div className="video-wrapper">
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                className="scanner-video"
                            />
                            <div className="scan-area"></div>
                        </div>
                        <div className="scanner-footer">
                            <p>Align QR code/bar code within the frame to scan</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Table Selection Modal */}
            <Modal show={showQRMenu} onHide={() => setShowQRMenu(false)} centered className="table-selection-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Select Table</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="table-grid-menu">
                        {tables.map(table => (
                            <button
                                key={table}
                                className={`table-select-item ${selectedTable === table ? 'active' : ''}`}
                                onClick={() => setSelectedTable(table)}
                            >
                                {table}
                                {selectedTable === table && <Check size={14} className="ms-1" />}
                            </button>
                        ))}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowQRMenu(false)}>Cancel</Button>
                    <Button
                        className="btn-primary-tea"
                        disabled={!selectedTable}
                        onClick={() => confirmGenerateQR(selectedTable)}
                    >
                        Generate QR
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* QR Code Display Modal */}
            <Modal show={!!generatedQR} onHide={closeQRModal} centered className="qr-display-modal">
                <Modal.Header closeButton>
                    <Modal.Title>QR Code - Table {generatedQR?.tableId}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center p-5">
                    <div className="qr-container-wrapper shadow-lg p-4 rounded-4 bg-white d-inline-block">
                        {generatedQR && (
                            <QRCodeCanvas
                                value={generatedQR.value}
                                size={250}
                                level={"H"}
                                includeMargin={true}
                                imageSettings={{
                                    src: "/tea-logo.png", // Fallback to icon if this doesn't exist
                                    x: undefined,
                                    y: undefined,
                                    height: 40,
                                    width: 40,
                                    excavate: true,
                                }}
                            />
                        )}
                    </div>
                    <div className="mt-4">
                        <p className="fw-bold text-muted">Scan this code at Table {generatedQR?.tableId}</p>
                        <p className="small text-secondary">{generatedQR?.value}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary" onClick={() => window.print()}>Print QR</Button>
                    <Button className="btn-primary-tea" onClick={closeQRModal}>Done</Button>
                </Modal.Footer>
            </Modal>

            {/* Menu & Ordering Modal */}
            <Modal show={showMenu} onHide={() => setShowMenu(false)} size="lg" centered className="menu-ordering-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Tea Cafe Menu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col lg={7}>
                            <h5 className="mb-3">Select Items</h5>
                            <div className="menu-items-list p-2">
                                {menuItems.map(item => (
                                    <div key={item.id} className="menu-item-row d-flex align-items-center justify-content-between p-3 mb-2 rounded-3 bg-light border">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="item-icon-box">{item.icon}</div>
                                            <div>
                                                <div className="fw-bold">{item.name}</div>
                                                <div className="text-muted small">₹{item.price} - {item.category}</div>
                                            </div>
                                        </div>
                                        <Button variant="outline-success" size="sm" onClick={() => addToCart(item)}>
                                            <Plus size={16} /> Add
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </Col>
                        <Col lg={5}>
                            <div className="order-summary-box p-3 rounded-4 bg-white border h-100">
                                <h5 className="mb-3 d-flex align-items-center gap-2">
                                    <ShoppingBag size={20} /> Order Cart
                                </h5>

                                {cart.length === 0 ? (
                                    <div className="text-center py-5 text-muted">Cart is empty</div>
                                ) : (
                                    <>
                                        <div className="cart-items mb-3">
                                            {cart.map(item => (
                                                <div key={item.id} className="cart-item d-flex justify-content-between align-items-center mb-2">
                                                    <div>
                                                        <div className="small fw-bold">{item.name}</div>
                                                        <div className="small opacity-75">₹{item.price * item.qty}</div>
                                                    </div>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <Button variant="light" size="sm" className="p-1 rounded-circle border" onClick={() => removeFromCart(item.id)}>
                                                            <Minus size={12} />
                                                        </Button>
                                                        <span className="small">{item.qty}</span>
                                                        <Button variant="light" size="sm" className="p-1 rounded-circle border" onClick={() => addToCart(item)}>
                                                            <Plus size={12} />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <hr />
                                        <div className="mb-3">
                                            <label className="small fw-bold mb-1">Assign Table <span className="text-danger">*</span></label>
                                            <Form.Select
                                                size="sm"
                                                value={selectedOrderTable}
                                                className={!selectedOrderTable ? "border-danger shadow-none" : ""}
                                                onChange={(e) => setSelectedOrderTable(e.target.value)}
                                            >
                                                <option value="">Choose table (Required)...</option>
                                                {tables.map(t => <option key={t} value={t}>{t}</option>)}
                                            </Form.Select>
                                            {!selectedOrderTable && <div className="text-danger mt-1" style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>* Table selection is required to place order</div>}
                                        </div>
                                        <div className="d-flex justify-content-between fw-bold mb-3">
                                            <span>Total</span>
                                            <span>₹{cart.reduce((s, i) => s + (i.price * i.qty), 0)}</span>
                                        </div>
                                        <Button className="btn-primary-tea w-100 py-3 rounded-pill fw-bold" onClick={placeOrder}>
                                            Place Order
                                        </Button>
                                    </>
                                )}
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
            {/* Settings Modal Component */}
            <SettingsModal show={showSettings} onHide={() => setShowSettings(false)} />




            {/* Features Section */}
            <section className="features-section">
                <Container>
                    <div className="section-header">
                        <h2>{t.chooseTea}</h2>
                        <div className="underline"></div>
                    </div>
                    <Row className="g-4">
                        <Col md={4}>
                            <div className="feature-card">
                                <div className="feature-icon-wrapper">
                                    <Leaf size={35} />
                                </div>
                                <h3>{t.organic}</h3>
                                <p className="text-muted">{t.organicText}</p>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="feature-card">
                                <div className="feature-icon-wrapper">
                                    <Wind size={35} />
                                </div>
                                <h3>{t.brewed}</h3>
                                <p className="text-muted">{t.brewedText}</p>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="feature-card">
                                <div className="feature-icon-wrapper">
                                    <Award size={35} />
                                </div>
                                <h3>{t.award}</h3>
                                <p className="text-muted">{t.awardText}</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Category Section */}
            <section className="category-section">
                <Container>
                    <div className="section-header">
                        <h2>{t.explore}</h2>
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
                                    <Phone size={18} /> +91 1234567890  TEA-CAFE
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
                                {/* <input type="email" placeholder="Email" className="form-control bg-transparent border-secondary text-white" />
                                <Button className="btn-primary-tea px-3">Join</Button> */}
                            </div>
                        </Col>
                    </Row>
                    <hr className="opacity-25" />
                    <div className="text-center pt-3 opacity-50 small">
                        &copy; 2026 Tea Cafe. All rights reserved. Designed for tea lovers.
                    </div>
                </Container>
            </footer>
        </div>
    );
};

export default Home;
