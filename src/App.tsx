import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { LeadProvider } from './contexts/LeadContext';
import { AnalyticsProvider } from './contexts/AnalyticsContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Layout } from './components/layout/Layout';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { LeadsListPage } from './pages/LeadsListPage';
import { AnalyticsPage } from './pages/AnalyticsPage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LeadProvider>
          <AnalyticsProvider>
            <Router>
              <Toaster position="top-right" />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                <Route element={<ProtectedRoute />}>
                  <Route element={<Layout />}>
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/leads" element={<LeadsListPage />} />
                    <Route path="/analytics" element={<AnalyticsPage />} />
                  </Route>
                </Route>
              </Routes>
            </Router>
          </AnalyticsProvider>
        </LeadProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;