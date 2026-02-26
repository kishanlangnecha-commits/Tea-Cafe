
import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, Clock, Armchair, Star, Keyboard, CheckCircle } from 'lucide-react';
import '../styles/booking.css';

const Booking = () => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(23);
    const [selectedTable, setSelectedTable] = useState('A1');
    const [startTime, setStartTime] = useState('10:00 AM');
    const [endTime, setEndTime] = useState('11:00 AM');
    const [guests, setGuests] = useState('2 Persons');
    const [bookingType, setBookingType] = useState('Casual');

    const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false);
    const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
    const [isBooked, setIsBooked] = useState(false);

    const timeSlots = [
        "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
        "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM",
        "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
        "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM",
        "08:00 PM", "08:30 PM", "09:00 PM", "09:30 PM", "10:00 PM"
    ];

    const guestOptions = ["1 Person", "2 Persons", "3 Persons", "4 Persons", "5-8 Persons", "Large Group"];
    const typeOptions = ["Casual", "Business", "Birthday", "Anniversary", "Study", "Date"];

    // Custom Picker State
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const [pickingFor, setPickingFor] = useState('start'); // 'start' or 'end'
    const [pickerMode, setPickerMode] = useState('hours'); // 'hours' or 'minutes'
    const [tempHour, setTempHour] = useState('7');
    const [tempMinute, setTempMinute] = useState('00');
    const [tempPeriod, setTempPeriod] = useState('PM');

    const handleTimeBoxClick = (type) => {
        setPickingFor(type);
        const currentTime = type === 'start' ? startTime : endTime;
        const [time, period] = currentTime.split(' ');
        const [h, m] = time.split(':');
        setTempHour(parseInt(h).toString());
        setTempMinute(m);
        setTempPeriod(period);
        setPickerMode('hours');
        setIsPickerOpen(true);
    };

    const handleClockSelect = (val) => {
        if (pickerMode === 'hours') {
            setTempHour(val.toString());
            setPickerMode('minutes');
        } else {
            setTempMinute(val.toString().padStart(2, '0'));
        }
    };

    const handleTimeInput = (val, setter, currentVal) => {
        // 1. Initial cleanup: only numbers, colon, space, and A,P,M allowed
        let clean = val.toUpperCase().replace(/[^0-9: APM]/g, '');

        // 2. Extract digits for validation
        const digits = clean.replace(/\D/g, '');
        let hh = digits.slice(0, 2);
        let mm = digits.slice(2, 4);

        // 3. Strict Hours Validation (01-12)
        if (hh.length === 2) {
            const hVal = parseInt(hh);
            if (hVal > 12) hh = '12';
            else if (hVal === 0) hh = '01';
        }

        // 4. Strict Minutes Validation (00-59)
        if (mm.length === 2) {
            const mVal = parseInt(mm);
            if (mVal > 59) mm = '59';
        }

        // 5. Build formatted string
        let res = hh;
        if (hh.length === 2) {
            res += ':' + mm;
            if (mm.length === 2) {
                // Determine AM/PM (defaults to current if not explicitly typing 'P')
                const hasP = clean.includes('P');
                res += hasP ? ' PM' : ' AM';
            }
        }

        // 6. Handle Deletion - allow removing characters naturally
        if (val.length < currentVal.length) {
            setter(clean);
            return;
        }

        // 7. Update state with validated format (limit to 8 chars: HH:MM AM)
        setter(res.slice(0, 8));
    };



    // Polar coordinate helper — places a number on the dial circle
    // dialRadius = half of dial width (115 for 230px dial)
    // r = distance from center to number center
    const getPos = (index, total, r = 88) => {
        const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
        return {
            top: `calc(50% + ${Math.round(r * Math.sin(angle))}px)`,
            left: `calc(50% + ${Math.round(r * Math.cos(angle))}px)`,
        };
    };

    const confirmTime = () => {
        const formattedTime = `${tempHour.padStart(2, '0')}:${tempMinute} ${tempPeriod}`;
        if (pickingFor === 'start') setStartTime(formattedTime);
        else setEndTime(formattedTime);
        setIsPickerOpen(false);
    };

    const tables = [
        'A1', 'A2', 'A3', 'A4', 'A5',
        'B1', 'B2', 'B3', 'B4', 'B5',
        'C1', 'C2', 'C3', 'C4', 'C5',
        'D1', 'D2', 'D3', 'D4', 'D5'
    ];

    const calendarDays = Array.from({ length: 28 }, (_, i) => i + 1);

    return (
        <div className="booking-page">
            <header className="booking-header">
                <ArrowLeft className="back-icon" size={24} onClick={() => navigate(-1)} />
                <h1>Book a Table</h1>
            </header>

            <Container className={`booking-container ${isBooked ? 'success-view' : ''}`}>
                {!isBooked ? (
                    <>
                        {/* Calendar Section */}
                        <div className="booking-card">
                            <div className="calendar-wrapper">
                                <div className="calendar-nav">
                                    <ChevronLeft size={20} className="cursor-pointer" />
                                    <span>February 2026</span>
                                    <ChevronRight size={20} className="cursor-pointer" />
                                </div>

                                <div className="calendar-grid">
                                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                        <div key={day} className="calendar-day-label">{day}</div>
                                    ))}
                                    {calendarDays.map(day => (
                                        <div
                                            key={day}
                                            className={`calendar-day ${selectedDate === day ? 'active' : ''}`}
                                            onClick={() => setSelectedDate(day)}
                                        >
                                            {day}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Time Selection Section */}
                        <div className="booking-card">
                            <h2 className="booking-title">Select Time</h2>
                            <div className="time-selection-row">
                                <div className="time-field">
                                    <label>Start Time</label>
                                    <div className="time-input-box" onClick={() => handleTimeBoxClick('start')}>
                                        <Clock size={16} color="#6F4E37" className="d-none d-lg-block" />
                                        <input
                                            className="editable-time d-none d-lg-block"
                                            value={startTime}
                                            onChange={(e) => handleTimeInput(e.target.value, setStartTime, startTime)}
                                            onClick={(e) => e.stopPropagation()}
                                            maxLength={8}
                                            placeholder="10:00 AM"
                                        />
                                        <span className="time-display-val d-lg-none">{startTime}</span>
                                        <Clock
                                            size={18}
                                            color="#6F4E37"
                                            className="ms-auto cursor-pointer d-none d-lg-block"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleTimeBoxClick('start');
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="time-field">
                                    <label>End Time</label>
                                    <div className="time-input-box" onClick={() => handleTimeBoxClick('end')}>
                                        <Clock size={16} color="#6F4E37" className="d-none d-lg-block" />
                                        <input
                                            className="editable-time d-none d-lg-block"
                                            value={endTime}
                                            onChange={(e) => handleTimeInput(e.target.value, setEndTime, endTime)}
                                            onClick={(e) => e.stopPropagation()}
                                            maxLength={8}
                                            placeholder="11:00 AM"
                                        />
                                        <span className="time-display-val d-lg-none">{endTime}</span>
                                        <Clock
                                            size={18}
                                            color="#6F4E37"
                                            className="ms-auto cursor-pointer d-none d-lg-block"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleTimeBoxClick('end');
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="time-selection-row mt-3">
                                <div className="time-field">
                                    <label>Number of Guests</label>
                                    <div
                                        className={`custom-dropdown-container ${isGuestDropdownOpen ? 'open' : ''}`}
                                        onClick={() => {
                                            setIsGuestDropdownOpen(!isGuestDropdownOpen);
                                            setIsTypeDropdownOpen(false);
                                        }}
                                    >
                                        <div className="dropdown-trigger">
                                            <Armchair size={18} color="#6F4E37" />
                                            <span>{guests}</span>
                                            <div className="dropdown-arrow"></div>
                                        </div>
                                        {isGuestDropdownOpen && (
                                            <div className="dropdown-options-list">
                                                {guestOptions.map(opt => (
                                                    <div
                                                        key={opt}
                                                        className={`dropdown-item ${guests === opt ? 'active' : ''}`}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setGuests(opt);
                                                            setIsGuestDropdownOpen(false);
                                                        }}
                                                    >
                                                        {opt}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="time-field">
                                    <label>Booking Category (Unique Type)</label>
                                    <div
                                        className={`custom-dropdown-container ${isTypeDropdownOpen ? 'open' : ''}`}
                                        onClick={() => {
                                            setIsTypeDropdownOpen(!isTypeDropdownOpen);
                                            setIsGuestDropdownOpen(false);
                                        }}
                                    >
                                        <div className="dropdown-trigger">
                                            <Star size={18} color="#6F4E37" />
                                            <span>{bookingType}</span>
                                            <div className="dropdown-arrow"></div>
                                        </div>
                                        {isTypeDropdownOpen && (
                                            <div className="dropdown-options-list">
                                                {typeOptions.map(opt => (
                                                    <div
                                                        key={opt}
                                                        className={`dropdown-item ${bookingType === opt ? 'active' : ''}`}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setBookingType(opt);
                                                            setIsTypeDropdownOpen(false);
                                                        }}
                                                    >
                                                        {opt}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <p className="selected-date-text">
                                Selected Date: {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][(selectedDate - 1) % 7]}, February {selectedDate}, 2026
                            </p>
                        </div>

                        {/* Table Selection Section */}
                        <div className="booking-card">
                            <h2 className="booking-title">Select Table</h2>

                            <span className="table-status-label">Available Tables</span>
                            <div className="tables-grid">
                                {tables.map(table => (
                                    <div
                                        key={table}
                                        className={`table-btn ${selectedTable === table ? 'selected' : ''}`}
                                        onClick={() => setSelectedTable(table)}
                                    >
                                        <Armchair size={16} />
                                        <span>{table}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="booked-section">
                                <span className="table-status-label">Booked Tables</span>
                                <p className="booked-placeholder">All tables are available for selected time.</p>
                            </div>
                        </div>

                        <div className="text-center mt-5 confirm-btn-wrapper">
                            <Button
                                className="btn-primary-tea px-5 py-3 rounded-pill fw-bold shadow-lg"
                                onClick={() => setIsBooked(true)}
                            >
                                Confirm Reservation
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className="booking-success-container animate-fade-in">
                        <div className="success-card shadow-lg text-center">
                            <div className="success-icon-badge mb-4">
                                <CheckCircle size={80} color="#28a745" />
                            </div>
                            <h2 className="display-6 fw-bold mb-3">Table Reserved!</h2>
                            <p className="text-muted mb-5">Your reservation at Tea Cafe has been confirmed. We look forward to serving you.</p>

                            <div className="summary-details p-4 rounded-4 mb-5">
                                <div className="summary-row">
                                    <span className="summary-label">Table</span>
                                    <span className="summary-val">#{selectedTable}</span>
                                </div>
                                <div className="summary-line"></div>
                                <div className="summary-row">
                                    <span className="summary-label">Date</span>
                                    <span className="summary-val">Feb {selectedDate}, 2026</span>
                                </div>
                                <div className="summary-line"></div>
                                <div className="summary-row">
                                    <span className="summary-label">Time</span>
                                    <span className="summary-val">{startTime} - {endTime}</span>
                                </div>
                                <div className="summary-line"></div>
                                <div className="summary-row">
                                    <span className="summary-label">Guests</span>
                                    <span className="summary-val">{guests}</span>
                                </div>
                            </div>

                            <div className="d-grid gap-3">
                                <Button
                                    as={Link}
                                    to="/"
                                    className="btn-primary-tea py-3 rounded-pill fw-bold"
                                >
                                    Back to Home
                                </Button>
                                <Button
                                    variant="outline-secondary"
                                    className="py-3 rounded-pill border-0"
                                    onClick={() => setIsBooked(false)}
                                >
                                    Edit Reservation
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </Container>

            {/* Material Time Picker Modal */}
            {isPickerOpen && (
                <div className="picker-overlay" onClick={() => setIsPickerOpen(false)}>
                    <div className="picker-modal" onClick={e => e.stopPropagation()}>
                        <div className="picker-header">SELECT TIME</div>

                        <div className="picker-digital-display">
                            <div
                                className={`time-box hour-box ${pickerMode === 'hours' ? 'active' : ''}`}
                                onClick={() => setPickerMode('hours')}
                            >
                                {tempHour}
                            </div>
                            <div className="time-separator">:</div>
                            <div
                                className={`time-box min-box ${pickerMode === 'minutes' ? 'active' : ''}`}
                                onClick={() => setPickerMode('minutes')}
                            >
                                {tempMinute}
                            </div>
                            <div className="period-toggle">
                                <div
                                    className={`period-btn ${tempPeriod === 'AM' ? 'active' : ''}`}
                                    onClick={() => setTempPeriod('AM')}
                                >AM</div>
                                <div
                                    className={`period-btn ${tempPeriod === 'PM' ? 'active' : ''}`}
                                    onClick={() => setTempPeriod('PM')}
                                >PM</div>
                            </div>
                        </div>

                        <div className="clock-dial-container">
                            <div className="clock-dial">
                                {pickerMode === 'hours' ? (
                                    [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((h, i) => {
                                        const isActive = tempHour === h.toString();
                                        const pos = getPos(i, 12);
                                        return (
                                            <div
                                                key={h}
                                                className={`dial-number ${isActive ? 'active' : ''}`}
                                                style={{
                                                    top: pos.top,
                                                    left: pos.left,
                                                    transform: 'translate(-50%, -50%)'
                                                }}
                                                onClick={() => handleClockSelect(h)}
                                            >
                                                {h}
                                            </div>
                                        );
                                    })
                                ) : (
                                    [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map((m, i) => {
                                        const isActive = parseInt(tempMinute) === m;
                                        const pos = getPos(i, 12);
                                        return (
                                            <div
                                                key={m}
                                                className={`dial-number ${isActive ? 'active' : ''}`}
                                                style={{
                                                    top: pos.top,
                                                    left: pos.left,
                                                    transform: 'translate(-50%, -50%)'
                                                }}
                                                onClick={() => handleClockSelect(m)}
                                            >
                                                {m.toString().padStart(2, '0')}
                                            </div>
                                        );
                                    })
                                )}
                                <div
                                    className="clock-hand"
                                    style={{
                                        transform: `rotate(${pickerMode === 'hours'
                                            ? (parseInt(tempHour) % 12) * 30
                                            : (parseInt(tempMinute) % 60) * 6}deg)`
                                    }}
                                >
                                    <div className="hand-circle"></div>
                                </div>
                                <div className="clock-center"></div>
                            </div>
                        </div>

                        <div className="picker-actions">
                            <div className="picker-keyboard-icon">
                                <Keyboard size={20} color="#757575" />
                            </div>
                            <div className="picker-btns">
                                <button className="action-btn cancel" onClick={() => setIsPickerOpen(false)}>CANCEL</button>
                                <button className="action-btn ok" onClick={confirmTime}>OK</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Booking;
