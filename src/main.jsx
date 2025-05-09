import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import App from './App';
import Login from './pages/Login';
import Dashboard from './pages/dashboard';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from './AuthContext';
import AdminDashboard from './pages/AdminDashboard';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        {/* top‑left nav: only Home & Login */}
        <nav style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          display: 'flex',
          gap: '12px',
          fontWeight: 'bold'
        }}>
          <Link to="/" style={{ color: '#333', textDecoration: 'none' }}>Home</Link>
          <Link to="/login" style={{ color: '#333', textDecoration: 'none' }}>Login</Link>
        </nav>

        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
        />
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
