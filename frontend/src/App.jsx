import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import MarketingPage from "./pages/MarketingPage";
import AdminDashboard from "./pages/AdminDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import GetStartedPage from "./pages/GetStartedPage";
import DoctorsPage from "./pages/DoctorsPage";
import ContactPage from "./pages/ContactPage";
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

  const handleLoginSuccess = (token, user) => {
    localStorage.setItem("access_token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setAuthenticated(true);
    setUser(user);
    navigate(user?.role === "doctor" ? "/doctor" : "/");
  };

  const handleLogout = async () => {
    try {
      await api.post('/logout');
    } catch (e) {
      // ignore errors; still clear local state
    }
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    setAuthenticated(false);
    setUser(null);
    navigate('/');
  };

  const handleDoctorLoginSuccess = (token, doctor) => {
    if (doctor?.role !== "doctor") return;
    handleLoginSuccess(token, doctor);
    navigate("/doctor");
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
              onDoctorsClick={() => navigate('/doctors')}
              onDoctorClick={() => navigate(authenticated && user?.role === "doctor" ? '/doctor' : '/doctor-auth')}
              onContactClick={() => navigate('/contact')}
              onGetStarted={() => navigate('/get-started')}
              authenticated={authenticated}
              onLogout={handleLogout}
              user={user}
            />
          }
        />
        <Route path="/auth" element={<Auth onSuccess={handleLoginSuccess} onBack={() => navigate(-1)} />} />
        <Route path="/doctor-auth" element={<DoctorAuth onSuccess={handleDoctorLoginSuccess} onBack={() => navigate(-1)} />} />
        <Route path="/doctors" element={<DoctorsPage onBack={() => navigate(-1)} onDoctorSignIn={() => navigate('/doctor-auth')} />} />
        <Route path="/contact" element={<ContactPage onBack={() => navigate(-1)} />} />
        <Route path="/get-started" element={<GetStartedPage onBack={() => navigate(-1)} onDoctorClick={() => navigate('/doctor')} />} />
        <Route
          path="/marketing"
          element={
            <MarketingPage
              onBack={() => navigate(-1)}
              onAdminClick={() => navigate('/admin')}
              onDoctorClick={() => navigate('/doctor')}
            />
          }
        />
        <Route path="/admin" element={<AdminDashboard onBack={() => navigate(-1)} />} />
        <Route
          path="/doctor"
          element={
            authenticated && user?.role === "doctor" ? (
              <DoctorDashboard user={user} onLogout={handleLogout} onBack={() => navigate(-1)} />
            ) : (
              <Navigate to="/doctor-auth" replace />
            )}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

    </div>
  );
}

export default App;
