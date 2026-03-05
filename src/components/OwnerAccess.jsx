import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BarChart2, Home, CheckCircle2, ClipboardList, XCircle, IndianRupee, Calendar, Columns, Grid, LayoutDashboard, UtensilsCrossed, Table, Ticket, MessageSquareWarning, Upload, Download, RotateCcw, Printer, Receipt, Eye, ChevronRight, FileText, Settings } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import SettingsModal from './SettingsModal';
import '../styles/owner.css';

const OwnerAccess = () => {
    const { t } = useSettings();
    const navigate = useNavigate();
    const [showSettings, setShowSettings] = React.useState(false);

    const metrics = [
        {
            title: t.served,
            value: "1",
            icon: <CheckCircle2 size={32} />,
            colorClass: "metric-served"
        },
        {
            title: t.ongoing,
            value: "1",
            icon: <ClipboardList size={32} />,
            colorClass: "metric-ongoing"
        },
        {
            title: t.rejected,
            value: "0",
            icon: <XCircle size={32} />,
            colorClass: "metric-rejected"
        },
        {
            title: t.revenue,
            value: "36",
            icon: <IndianRupee size={32} />,
            colorClass: "metric-revenue"
        }
    ];

    return (
        <div className="owner-dashboard-container">
            {/* Header */}
            <header className="owner-header">
                <Container className="d-flex align-items-center justify-content-between h-100">
                    <div className="d-flex align-items-center gap-3">
                        <Button
                            variant="link"
                            onClick={() => navigate('/')}
                            className="header-btn p-0"
                        >
                            <ArrowLeft size={24} />
                        </Button>
                        <div className="dashboard-title-group d-flex align-items-center gap-2">
                            <BarChart2 size={24} className="dashboard-icon" />
                            <h1 className="header-title">{t.ownerDashboard}</h1>
                        </div>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <Button
                            variant="link"
                            onClick={() => setShowSettings(true)}
                            className="header-btn p-0"
                        >
                            <Settings size={24} />
                        </Button>
                        <Button
                            variant="link"
                            onClick={() => navigate('/')}
                            className="header-btn p-0"
                        >
                            <Home size={24} />
                        </Button>
                    </div>
                </Container>
            </header>

            <main className="owner-main-content">
                <Container>
                    <h2 className="section-title">{t.keyMetrics}</h2>

                    <Row className="g-3">
                        {metrics.map((metric, index) => (
                            <Col xs={6} key={index}>
                                <div className={`metric-card ${metric.colorClass}`}>
                                    <div className="metric-icon-wrapper">
                                        {metric.icon}
                                    </div>
                                    <div className="metric-value">{metric.value}</div>
                                    <div className="metric-label">{metric.title}</div>
                                </div>
                            </Col>
                        ))}
                    </Row>

                    {/* Revenue Breakdown Section */}
                    <div className="revenue-breakdown-card mt-4">
                        <h3 className="breakdown-title">{t.revenueBreakdown}</h3>

                        <div className="breakdown-list">
                            <div className="breakdown-item">
                                <div className="item-left">
                                    <div className="item-icon-box bg-today">
                                        <Calendar size={20} className="text-today" />
                                    </div>
                                    <div className="item-info">
                                        <div className="item-name">{t.today}</div>
                                    </div>
                                </div>
                                <div className="item-right">
                                    <div className="item-value text-today">₹0.00</div>
                                </div>
                            </div>

                            <div className="breakdown-item">
                                <div className="item-left">
                                    <div className="item-icon-box bg-week">
                                        <Columns size={20} className="text-week" />
                                    </div>
                                    <div className="item-info">
                                        <div className="item-name">{t.thisWeek}</div>
                                        <div className="item-subtext">Avg. ₹0.00 per day</div>
                                    </div>
                                </div>
                                <div className="item-right">
                                    <div className="item-value text-week">₹0.00</div>
                                </div>
                            </div>

                            <div className="breakdown-item">
                                <div className="item-left">
                                    <div className="item-icon-box bg-month">
                                        <Grid size={20} className="text-month" />
                                    </div>
                                    <div className="item-info">
                                        <div className="item-name">{t.thisMonth}</div>
                                        <div className="item-subtext">Avg. ₹1.27 per day</div>
                                    </div>
                                </div>
                                <div className="item-right">
                                    <div className="item-value text-month">₹35.67</div>
                                </div>
                            </div>

                            <div className="breakdown-item border-0">
                                <div className="item-left">
                                    <div className="item-icon-box bg-avg">
                                        <LayoutDashboard size={20} className="text-avg" />
                                    </div>
                                    <div className="item-info">
                                        <div className="item-name">{t.avgOrder}</div>
                                    </div>
                                </div>
                                <div className="item-right">
                                    <div className="item-value text-avg">₹35.67</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Management Actions Section */}
                    <div className="management-actions-section mt-5">
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <h3 className="section-title mb-0">{t.manageActions}</h3>
                            <div className="date-badge">Saturday, Feb 28</div>
                        </div>

                        <div className="today-orders-box mb-4">
                            <h4 className="orders-box-title">Today's Orders</h4>
                            <div className="orders-action-row">
                                <Button className="btn-action-outline">
                                    <Receipt size={18} />
                                    <span>View Served Orders</span>
                                </Button>
                                <Button className="btn-action-solid">
                                    <Printer size={18} />
                                    <span>Print Report</span>
                                </Button>
                            </div>
                        </div>

                        <Row className="g-3 action-grid">
                            <Col xs={6}>
                                <div className="action-card bg-manage-menu">
                                    <UtensilsCrossed size={28} className="action-icon" />
                                    <span className="action-label">{t.manageMenu}</span>
                                </div>
                            </Col>
                            <Col xs={6}>
                                <div className="action-card bg-table-sessions">
                                    <Table size={28} className="action-icon" />
                                    <span className="action-label">{t.tableSessions}</span>
                                </div>
                            </Col>
                            <Col xs={6}>
                                <div className="action-card bg-table-bookings">
                                    <Ticket size={28} className="action-icon" />
                                    <span className="action-label">{t.book}</span>
                                </div>
                            </Col>
                            <Col xs={6}>
                                <div className="action-card bg-feedback">
                                    <MessageSquareWarning size={28} className="action-icon" />
                                    <span className="action-label">{t.feedback}</span>
                                </div>
                            </Col>
                            <Col xs={6}>
                                <div className="action-card bg-import">
                                    <Upload size={28} className="action-icon" />
                                    <span className="action-label">Import Menu</span>
                                </div>
                            </Col>
                            <Col xs={6}>
                                <div className="action-card bg-export">
                                    <Download size={28} className="action-icon" />
                                    <span className="action-label">Export Menu</span>
                                </div>
                            </Col>
                            <Col xs={6}>
                                <div className="action-card bg-reset">
                                    <RotateCcw size={28} className="action-icon" />
                                    <span className="action-label">Reset Data</span>
                                </div>
                            </Col>
                            <Col xs={6}>
                                <div className="action-card bg-calendar">
                                    <Calendar size={28} className="action-icon" />
                                    <span className="action-label">Calendar View</span>
                                </div>
                            </Col>
                        </Row>
                    </div>

                    {/* Recent Orders Section */}
                    <div className="recent-orders-card mt-5">
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <h3 className="section-title mb-0">{t.recentOrders}</h3>
                            <div className="view-all-link">
                                <Eye size={16} />
                                <span>{t.viewOrd}</span>
                            </div>
                        </div>

                        <div className="order-list">
                            <div className="order-item-row">
                                <div className="order-item-content">
                                    <div className="order-icon-circle">
                                        <FileText size={20} />
                                    </div>
                                    <div className="order-details">
                                        <div className="table-name-group">
                                            <span className="table-name">Table A4</span>
                                            <span className="billing-status">Unbilled</span>
                                        </div>
                                        <div className="order-meta">1 Items - ₹8.39</div>
                                    </div>
                                </div>
                                <div className="order-status-group">
                                    <span className="status-badge status-prepared">Prepared</span>
                                    <ChevronRight size={18} className="chevron-icon" />
                                </div>
                            </div>

                            <div className="order-item-row mt-3">
                                <div className="order-item-content">
                                    <div className="order-icon-circle">
                                        <FileText size={20} />
                                    </div>
                                    <div className="order-details">
                                        <div className="table-name-group">
                                            <span className="table-name">Table A1</span>
                                            <span className="billing-status">Unbilled</span>
                                        </div>
                                        <div className="order-meta">2 Items - ₹35.67</div>
                                    </div>
                                </div>
                                <div className="order-status-group">
                                    <span className="status-badge status-received">Received</span>
                                    <ChevronRight size={18} className="chevron-icon" />
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </main>
            <SettingsModal show={showSettings} onHide={() => setShowSettings(false)} />
        </div>
    );
};

export default OwnerAccess;
