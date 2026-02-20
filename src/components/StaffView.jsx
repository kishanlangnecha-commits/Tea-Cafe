import React, { useState } from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ClipboardList, ArrowLeft } from 'lucide-react';
import '../styles/staff.css';

const StaffView = () => {
    const [activeTab, setActiveTab] = useState('Pending');

    const tabs = ['Pending', 'Processing', 'Prepared', 'Completed', 'Rejected'];

    return (
        <div className="staff-view-container">
            {/* Header */}
            <div className="staff-header text-center">
                <Button
                    variant="link"
                    as={Link}
                    to="/"
                    className="back-btn text-white position-absolute start-0 ms-3 mt-2"
                >
                    <ArrowLeft size={24} />
                </Button>
                <h2 className="header-title m-0 py-3">Kitchen Staff View</h2>


                {/* Tabs */}
                <div className="staff-tabs-container">
                    <Nav className="justify-content-center staff-tabs flex-nowrap w-100">
                        {tabs.map((tab) => (
                            <Nav.Item key={tab}>
                                <Nav.Link
                                    className={`staff-tab-link ${activeTab === tab ? 'active' : ''}`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab}
                                </Nav.Link>
                            </Nav.Item>
                        ))}
                    </Nav>
                </div>
            </div>

            {/* Content Area */}
            <div className="staff-content-area d-flex flex-column align-items-center justify-content-center">
                <div className="empty-state text-center">
                    <ClipboardList size={100} className="empty-icon mb-4" />
                    <p className="empty-text">No {activeTab} orders</p>
                </div>
            </div>
        </div>
    );
};

export default StaffView;
