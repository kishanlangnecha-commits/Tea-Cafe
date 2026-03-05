import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import StaffView from './components/StaffView';
import ClientView from './components/ClientView';
import Booking from './components/Booking';
import OwnerAccess from './components/OwnerAccess';
import { SettingsProvider } from './context/SettingsContext';
import './App.css';

function App() {
  return (
    <SettingsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/staff" element={<StaffView />} />
          <Route path="/client" element={<ClientView />} />
          <Route path="/book-table" element={<Booking />} />
          <Route path="/owner" element={<OwnerAccess />} />
        </Routes>
      </Router>
    </SettingsProvider>
  );
}

export default App;
