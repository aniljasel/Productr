import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>; // Or a nice spinner
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  // If authenticated and on auth page, redirect to dashboard? 
  // (Optional, but good practice. For now, let's just focus on hiding sidebar)

  return (
    <div className="app-container">
      {isAuthenticated && <Sidebar />}
      <div className={isAuthenticated ? "main-content" : "full-content"}>
        {isAuthenticated && <Topbar />}
        <div className={isAuthenticated ? "page-content" : ""}>
          <Routes>
            <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
            <Route path="/signup" element={isAuthenticated ? <Navigate to="/" replace /> : <Signup />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/products" element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
