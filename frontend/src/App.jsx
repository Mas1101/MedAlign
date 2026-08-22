import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import MarketingPage from "./pages/MarketingPage";
import AdminDashboard from "./pages/AdminDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import DoctorsPage from "./pages/DoctorsPage";
import ContactPage from "./pages/ContactPage";
import GetStartedPage from "./pages/GetStartedPage";
import PatientPage from "./pages/PatientPage";
import Auth from "./components/Auth";
import DoctorAuth from "./components/DoctorAuth";
import api from "./api";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const raw = localStorage.getItem('user');

    setAuthenticated(Boolean(token));

    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch (e) {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  const handleLoginSuccess = (token, user, redirectUrl) => {
    localStorage.setItem("access_token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setAuthenticated(true);
    setUser(user);

    if (redirectUrl) {
      navigate(redirectUrl);
    } else if (user?.role === 'patient') {
      navigate('/patient');
    } else if (user?.role === 'doctor') {
      navigate('/doctor');
    } else if (user?.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (e) {
      // ignore errors; still clear local state
    }
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    setAuthenticated(false);
    setUser(null);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              onLoginClick={() => navigate('/auth')}
              onMarketingClick={() => navigate('/marketing')}
              onAdminClick={() => navigate('/admin')}
              onPatientClick={() => navigate('/patient')}
              onDoctorClick={() => navigate(authenticated && user?.role === "doctor" ? '/doctor' : '/doctor-auth')}
              onDoctorsClick={() => navigate('/doctors')}
              onContactClick={() => navigate('/contact')}
              onGetStarted={() => navigate('/get-started')}
              authenticated={authenticated}
              onLogout={handleLogout}
              user={user}
            />
          }
        />
        <Route path="/auth" element={<Auth onSuccess={handleLoginSuccess} onBack={() => navigate('/')} />} />
        <Route path="/doctor-auth" element={<DoctorAuth onSuccess={handleLoginSuccess} onBack={() => navigate('/')} />} />
        <Route path="/doctors" element={<DoctorsPage onBack={() => navigate('/')} onDoctorSignIn={() => navigate('/doctor-auth')} />} />
        <Route path="/contact" element={<ContactPage onBack={() => navigate('/')} />} />
        <Route
          path="/get-started"
          element={
            <GetStartedPage
              onBack={() => navigate('/')}
              onDoctorClick={() => navigate('/doctor')}
              onPatientClick={() => navigate('/patient')}
            />
          }
        />
        <Route
          path="/marketing"
          element={
            <MarketingPage
              onBack={() => navigate('/')}
              onAdminClick={() => navigate('/admin')}
              onDoctorClick={() => navigate('/doctor')}
            />
          }
        />
        <Route path="/admin" element={<AdminDashboard onBack={() => navigate('/')} />} />
        <Route
          path="/doctor"
          element={
            <DoctorDashboard
              user={user}
              onLogout={handleLogout}
              onBack={() => navigate('/')}
            />
          }
        />
        <Route
          path="/patient"
          element={
            <PatientPage
              authenticated={authenticated}
              user={user}
              onLogout={handleLogout}
              onLoginClick={() => navigate('/auth')}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
