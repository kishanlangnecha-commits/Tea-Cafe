import React, { useState } from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ClipboardList, ArrowLeft, Clock, RefreshCw, CheckCircle, Package, XCircle } from 'lucide-react';
import '../styles/staff.css';

const StaffView = () => {
    const [activeTab, setActiveTab] = useState('Pending');
    const [showOrderView, setShowOrderView] = useState(false); // For mobile view navigation

    const tabs = [
        { name: 'Pending', icon: <Clock size={32} /> },
        { name: 'Processing', icon: <RefreshCw size={32} /> },
        { name: 'Prepared', icon: <CheckCircle size={32} /> },
        { name: 'Completed', icon: <Package size={32} /> },
        { name: 'Rejected', icon: <XCircle size={32} /> }
    ];

    const handleCategoryClick = (tabName) => {
        setActiveTab(tabName);
        setShowOrderView(true);
    };

    return (
        <div className="staff-view-container">
            {/* Header */}
            <div className="staff-header text-center">
                <Button
                    variant="link"
                    as={Link}
                    to="/"
                    className={`back-btn text-white position-absolute start-0 ms-3 mt-2 ${showOrderView ? 'd-none d-md-block' : ''}`}
                >
                    <ArrowLeft size={24} />
                </Button>

                {/* Back button for mobile order view */}
                {showOrderView && (
                    <Button
                        variant="link"
                        className="mobile-back-btn text-white position-absolute start-0 ms-3 mt-2 d-md-none"
                        onClick={() => setShowOrderView(false)}
                    >
                        <ArrowLeft size={24} />
                    </Button>
                )}

                <h2 className="header-title m-0 py-3">
                    <span className="d-none d-md-inline">Kitchen Staff View</span>
                    <span className="d-md-none">
                        {showOrderView ? `${activeTab} Orders` : 'Kitchen Staff View'}
                    </span>
                </h2>


                {/* Tabs - Hidden on mobile, only visible on desktop */}
                <div className="staff-tabs-container d-none d-md-block">
                    <Nav className="justify-content-center staff-tabs flex-nowrap w-100">
                        {tabs.map((tab) => (
                            <Nav.Item key={tab.name}>
                                <Nav.Link
                                    className={`staff-tab-link ${activeTab === tab.name ? 'active' : ''}`}
                                    onClick={() => {
                                        setActiveTab(tab.name);
                                        setShowOrderView(true);
                                    }}
                                >
                                    {tab.name}
                                </Nav.Link>
                            </Nav.Item>
                        ))}
                    </Nav>
                </div>
            </div>

            {/* Content Area */}
            <div className="staff-content-area">
                {!showOrderView && (
                    /* Mobile Category Grid - Only visible on small screens when not viewing orders */
                    <div className="mobile-category-grid d-md-none">
                        {tabs.map((tab) => (
                            <div
                                key={tab.name}
                                className="category-card"
                                onClick={() => handleCategoryClick(tab.name)}
                            >
                                <div className="card-content">
                                    <div className="card-icon">{tab.icon}</div>
                                    <span className="card-label">Order</span>
                                    <h3 className="card-title">{tab.name}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Orders View - Shown when showOrderView is true (mobile) OR always on desktop (md and up) */}
                <div className={`orders-view w-100 flex-column align-items-center justify-content-center h-100 ${showOrderView ? 'd-flex' : 'd-none d-md-flex'}`}>
                    <div className="empty-state text-center">
                        <ClipboardList size={100} className="empty-icon mb-4" />
                        <p className="empty-text">No {activeTab} orders</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffView;
