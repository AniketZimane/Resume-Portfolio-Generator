import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import ResumeBuilder from './pages/resume/ResumeBuilder';
import ResumeHistory from './pages/resume/ResumeHistory';
import PortfolioBuilder from './pages/portfolio/PortfolioBuilder';
import PortfolioView from './pages/portfolio/PortfolioView';
import Templates from './pages/templates/Templates';
import Profile from './pages/user/Profile';
import NotFound from './pages/NotFound';

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/resume/builder" element={
            <ProtectedRoute>
              <ResumeBuilder />
            </ProtectedRoute>
          } />
          <Route path="/resume/builder/:id" element={
            <ProtectedRoute>
              <ResumeBuilder />
            </ProtectedRoute>
          } />
          <Route path="/resume/history" element={
            <ProtectedRoute>
              <ResumeHistory />
            </ProtectedRoute>
          } />
          <Route path="/resume/history/:id" element={
            <ProtectedRoute>
              <ResumeHistory />
            </ProtectedRoute>
          } />
          <Route path="/portfolio/builder" element={
            <ProtectedRoute>
              <PortfolioBuilder />
            </ProtectedRoute>
          } />
          <Route path="/portfolio/builder/:id" element={
            <ProtectedRoute>
              <PortfolioBuilder />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          
          {/* Public Routes */}
          <Route path="/templates" element={<Templates />} />
          <Route path="/portfolio/:username" element={<PortfolioView />} />
          
          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;