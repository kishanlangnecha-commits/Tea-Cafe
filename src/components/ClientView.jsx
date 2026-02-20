import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Coffee, ArrowLeft, CheckCircle, Clock, MapPin, Star } from 'lucide-react';
import '../styles/client.css';

const ClientView = () => {
    const [selectedTable, setSelectedTable] = useState(null);
    const [isBooked, setIsBooked] = useState(false);
    const navigate = useNavigate();

    const tables = Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        status: i % 4 === 0 ? 'occupied' : 'available',
        capacity: i % 3 === 0 ? 4 : 2,
    }));

    const handleTableSelect = (tableId) => {
        setSelectedTable(tableId);
    };

    const handleConfirmBooking = () => {
        if (selectedTable) {
            setIsBooked(true);
            // Simulate API call or local storage update
            setTimeout(() => {
                // Redirect to menu or home after a delay
                // navigate('/');
            }, 3000);
        }
    };

    return (
        <div className="client-view-container">
            {/* Header */}
            <header className="client-header">
                <Container className="d-flex align-items-center justify-content-between h-100">
                    <Button
                        variant="link"
                        onClick={() => navigate('/')}
                        className="back-btn text-white p-0"
                    >
                        <ArrowLeft className="header-icon" />
                    </Button>
                    <div className="client-logo">
                        <Coffee className="header-icon" />
                        <span>Client Portal</span>
                    </div>
                    <div className="header-spacer"></div>
                </Container>
            </header>

            <main className="client-main-content">
                <Container>
                    {!isBooked ? (
                        <div className="booking-section">
                            <div className="text-center mb-5">
                                <h1 className="display-5 fw-bold mb-2">Reserve Your Table</h1>
                                <p className="text-muted">Select a table to begin your exceptional tea experience.</p>
                            </div>

                            <div className="table-map-container">
                                <div className="table-grid-scroll">
                                    <div className="table-grid-client">
                                        {tables.map((table) => (
                                            <div
                                                key={table.id}
                                                className={`table-card-client ${table.status} ${selectedTable === table.id ? 'active' : ''}`}
                                                onClick={() => table.status === 'available' && handleTableSelect(table.id)}
                                            >
                                                <div className="table-icon-wrapper">
                                                    <div className="table-surface"></div>
                                                    <div className={`chair top ${table.capacity >= 4 ? 'show' : ''}`}></div>
                                                    <div className="chair right"></div>
                                                    <div className={`chair bottom ${table.capacity >= 4 ? 'show' : ''}`}></div>
                                                    <div className="chair left"></div>
                                                </div>
                                                <div className="table-info-client">
                                                    <span className="table-num">Table {table.id}</span>
                                                    <span className="table-cap text-muted">{table.capacity} Persons</span>
                                                </div>
                                                <div className="status-badge">
                                                    {table.status === 'occupied' ? 'Occupied' : 'Select'}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="booking-footer shadow-lg">
                                <div className="d-flex align-items-center justify-content-between w-100 max-width-600 mx-auto">
                                    <div className="selection-preview">
                                        {selectedTable ? (
                                            <>
                                                <span className="label">Selected</span>
                                                <span className="value">Table #{selectedTable}</span>
                                            </>
                                        ) : (
                                            <span className="placeholder">Pick a table</span>
                                        )}
                                    </div>
                                    <Button
                                        className="confirm-booking-btn"
                                        disabled={!selectedTable}
                                        onClick={handleConfirmBooking}
                                    >
                                        Confirm Reservation
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="success-screen text-center animate-fade-in">
                            <div className="success-icon-wrapper mb-4">
                                <CheckCircle size={80} color="#28a745" />
                            </div>
                            <h1 className="display-4 fw-bold mb-3">Reservation Confirmed!</h1>
                            <p className="lead mb-5">Your table <strong>#{selectedTable}</strong> is ready for you. Welcome to Tea Cafe.</p>

                            <Row className="justify-content-center g-4 mb-5">
                                <Col md={4}>
                                    <Card className="info-card-client h-100">
                                        <Card.Body>
                                            <Clock className="mb-3 text-primary" />
                                            <h5>Validity</h5>
                                            <p className="text-muted small">Your reservation is held for 15 minutes.</p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={4}>
                                    <Card className="info-card-client h-100">
                                        <Card.Body>
                                            <Star className="mb-3 text-warning" />
                                            <h5>Next Step</h5>
                                            <p className="text-muted small">Browse our menu and place your order.</p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>

                            <Button as={Link} to="/" className="btn-premium btn-primary-tea px-5">
                                Back to Home
                            </Button>
                        </div>
                    )}
                </Container>
            </main>
        </div>
    );
};

export default ClientView;
