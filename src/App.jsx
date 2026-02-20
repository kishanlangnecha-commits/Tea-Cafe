import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import StaffView from './components/StaffView';
import ClientView from './components/ClientView';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/staff" element={<StaffView />} />
        <Route path="/client" element={<ClientView />} />
      </Routes>
    </Router>
  );
}

export default App;
