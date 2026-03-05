import React, { useState } from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ClipboardList, ArrowLeft, Clock, RefreshCw, CheckCircle, Package, XCircle, Settings } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import SettingsModal from './SettingsModal';
import '../styles/staff.css';

const StaffView = () => {
    const { t } = useSettings();
    const [activeTab, setActiveTab] = useState('Pending');
    const [showOrderView, setShowOrderView] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    const tabs = [
        { name: t.pending, id: 'Pending', icon: <Clock size={32} /> },
        { name: t.processing, id: 'Processing', icon: <RefreshCw size={32} /> },
        { name: t.prepared, id: 'Prepared', icon: <CheckCircle size={32} /> },
        { name: t.completed, id: 'Completed', icon: <Package size={32} /> },
        { name: t.rejected, id: 'Rejected', icon: <XCircle size={32} /> }
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
                    className={`back-btn text-white position-absolute start-0 ms-3 mt-2 ${showOrderView ? 'v-desktop-tablet' : ''}`}
                >
                    <ArrowLeft size={24} />
                </Button>

                {/* Back button for mobile order view */}
                {showOrderView && (
                    <Button
                        variant="link"
                        className="mobile-back-btn text-white position-absolute start-0 ms-3 mt-2 v-mobile"
                        onClick={() => setShowOrderView(false)}
                    >
                        <ArrowLeft size={24} />
                    </Button>
                )}

                <h2 className="header-title m-0 py-3">
                    <span className="v-desktop-tablet-inline">{t.staffTitle}</span>
                    <span className="v-mobile-inline">
                        {showOrderView ? `${tabs.find(p => p.id === activeTab).name} Orders` : t.staffTitle}
                    </span>
                </h2>

                <Button
                    variant="link"
                    className={`settings-btn text-white position-absolute end-0 me-3 mt-2`}
                    onClick={() => setShowSettings(true)}
                >
                    <Settings size={24} />
                </Button>



                {/* Tabs - Guaranteed visibility on Desktop and Tablet (> 576px) */}
                <div className="staff-tabs-container v-desktop-tablet">
                    <Nav className="justify-content-center staff-tabs flex-nowrap w-100">
                        {tabs.map((tab) => (
                            <Nav.Item key={tab.name}>
                                <Nav.Link
                                    className={`staff-tab-link ${activeTab === tab.id ? 'active' : ''}`}
                                    onClick={() => {
                                        setActiveTab(tab.id);
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
                    <div className="mobile-category-grid v-mobile">
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

                {/* Orders View */}
                <div className={`orders-view w-100 flex-column align-items-center justify-content-center h-100 ${showOrderView ? 'd-flex' : 'v-desktop-tablet-flex'}`}>
                    <div className="empty-state text-center">
                        <ClipboardList size={100} className="empty-icon mb-4" />
                        <p className="empty-text">{t.noOrders.replace('{status}', tabs.find(p => p.id === activeTab).name)}</p>
                    </div>
                </div>
            </div>
            <SettingsModal show={showSettings} onHide={() => setShowSettings(false)} />
        </div>
    );
};

export default StaffView;