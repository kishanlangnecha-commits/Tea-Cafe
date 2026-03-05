import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Settings, Check } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

const SettingsModal = ({ show, onHide }) => {
    const { language, changeLanguage, selectedTheme, changeTheme, themes, darkMode, toggleDarkMode, t } = useSettings();

    return (
        <Modal show={show} onHide={onHide} centered className="settings-modal flex-wrap">
            <Modal.Header closeButton className="border-0 pb-0">
                <Modal.Title className="fw-bold d-flex align-items-center gap-2">
                    <Settings size={24} className="text-secondary" /> {t.settings}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="pt-4">
                <div className="settings-section mb-4">
                    <h6 className="text-muted text-uppercase small fw-bold mb-3 ls-1">{t.langPref}</h6>
                    <div className="language-grid">
                        {['English', 'Hindi', 'Gujarati'].map((lang) => (
                            <button
                                key={lang}
                                className={`lang-btn ${language === lang ? 'active' : ''}`}
                                onClick={() => changeLanguage(lang)}
                            >
                                <div className="d-flex align-items-center justify-content-between w-100">
                                    <span>{lang}</span>
                                    {language === lang && <Check size={18} className="text-white" />}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="settings-section mb-4">
                    <h6 className="text-muted text-uppercase small fw-bold mb-3 ls-1">{t.themeColors}</h6>
                    <div className="theme-grid">
                        {themes.map((t_item) => (
                            <button
                                key={t_item.name}
                                className={`theme-btn ${selectedTheme === t_item.name ? 'active' : ''}`}
                                onClick={() => changeTheme(t_item.name)}
                                title={t_item.name}
                            >
                                <div className="theme-preview" style={{ background: t_item.primary }}>
                                    <div className="theme-accent" style={{ background: t_item.secondary }}></div>
                                </div>
                                <span className="tiny-text mt-1">{t_item.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="settings-section mb-4">
                    <h6 className="text-muted text-uppercase small fw-bold mb-3 ls-1">{t.appConfig}</h6>
                    <div className="settings-item d-flex justify-content-between align-items-center p-3 rounded-3 bg-light mb-2">
                        <div>
                            <div className="fw-bold small">{t.darkMode}</div>
                            <div className="text-muted extra-small">Adjust theme to your preference</div>
                        </div>
                        <Form.Check
                            type="switch"
                            id="dark-mode-switch"
                            checked={darkMode}
                            onChange={toggleDarkMode}
                        />
                    </div>
                    <div className="settings-item d-flex justify-content-between align-items-center p-3 rounded-3 bg-light">
                        <div>
                            <div className="fw-bold small">{t.notifications}</div>
                            <div className="text-muted extra-small">Receive order updates</div>
                        </div>
                        <Form.Check type="switch" id="notif-switch" defaultChecked />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className="border-0 pt-0">
                <Button variant="light" className="w-100 rounded-pill py-2 fw-bold" onClick={onHide}>
                    {t.saveChanges}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SettingsModal;
