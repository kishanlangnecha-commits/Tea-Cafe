import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Coffee, ArrowLeft, Table, ChevronDown, Edit3, Receipt } from 'lucide-react';
import '../styles/client.css';

const ClientView = () => {
    const navigate = useNavigate();
    const [selectedTable, setSelectedTable] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [viewingOrders, setViewingOrders] = useState(false);

    const tables = ['Table 1', 'Table 2', 'Table 3', 'Table 4', 'Table 5'];

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
                <Container className="d-flex flex-column align-items-center">
                    <div className="table-selector-card animate-fade-in">
                        <h2 className="selector-title">Select Your Table Number</h2>

                        <div className="selector-row">
                            <div className="custom-table-dropdown">
                                <span className="dropdown-label">Table Number</span>
                                <div
                                    className={`dropdown-select ${showDropdown ? 'open' : ''}`}
                                    onClick={() => setShowDropdown(!showDropdown)}
                                >
                                    <Table size={20} className="icon-left" />
                                    <span>{selectedTable || 'Select table'}</span>
                                    <ChevronDown size={20} className="icon-right" />

                                    {showDropdown && (
                                        <div className="dropdown-menu-list">
                                            {tables.map(table => (
                                                <div
                                                    key={table}
                                                    className="dropdown-item-client"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedTable(table);
                                                        setShowDropdown(false);
                                                    }}
                                                >
                                                    {table}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <Button className="btn-view-orders">
                                View Orders
                            </Button>
                        </div>

                        <div className="or-divider">OR</div>

                        <div className="manual-entry-box">
                            <Edit3 size={20} className="icon-left" />
                            <input
                                type="text"
                                placeholder="Manual Table Entry"
                                className="manual-input"
                                value={selectedTable.startsWith('Table') ? '' : selectedTable}
                                onChange={(e) => setSelectedTable(e.target.value)}
                            />
                        </div>
                    </div>

                    {!viewingOrders && (
                        <div className="empty-orders-state text-center mt-5 opacity-75">
                            <div className="receipt-icon-wrapper mb-3">
                                <Receipt size={100} strokeWidth={1} />
                            </div>
                            <p className="empty-state-text">Enter your table number to view orders</p>
                        </div>
                    )}
                </Container>
            </main>
        </div>
    );
};

export default ClientView;
