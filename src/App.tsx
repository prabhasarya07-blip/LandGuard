import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import PropertiesPage from './pages/PropertiesPage';
import AddPropertyPage from './pages/AddPropertyPage';
import PropertyIntelligencePage from './pages/PropertyIntelligencePage';
import RiskReportPage from './pages/RiskReportPage';
import AlertsPage from './pages/AlertsPage';
import DisputesPage from './pages/DisputesPage';
import SourcesPage from './pages/SourcesPage';
import DocumentsPage from './pages/DocumentsPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/properties" element={<ProtectedRoute><PropertiesPage /></ProtectedRoute>} />
          <Route path="/properties/add" element={<ProtectedRoute><AddPropertyPage /></ProtectedRoute>} />
          <Route path="/properties/:id" element={<ProtectedRoute><PropertyIntelligencePage /></ProtectedRoute>} />
          <Route path="/properties/:id/report" element={<ProtectedRoute><RiskReportPage /></ProtectedRoute>} />
          <Route path="/alerts" element={<ProtectedRoute><AlertsPage /></ProtectedRoute>} />
          <Route path="/disputes" element={<ProtectedRoute><DisputesPage /></ProtectedRoute>} />
          <Route path="/sources" element={<ProtectedRoute><SourcesPage /></ProtectedRoute>} />
          <Route path="/documents" element={<ProtectedRoute><DocumentsPage /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
