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
import ProtectedRoute from "./components/ProtectedRoute";
import api from "./api";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  // Track hydration so we don't flash redirects before localStorage is read
  const [hydrated, setHydrated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const raw   = localStorage.getItem("user");

    setAuthenticated(Boolean(token));

    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        setUser(null);
      }
    }
    setHydrated(true);
  }, []);

  const handleLoginSuccess = (token, userObj, redirectUrl) => {
    localStorage.setItem("access_token", token);
    localStorage.setItem("user", JSON.stringify(userObj));
    setAuthenticated(true);
    setUser(userObj);

    if (redirectUrl) {
      navigate(redirectUrl);
    } else if (userObj?.role === "patient") {
      navigate("/patient");
    } else if (userObj?.role === "doctor") {
      navigate("/doctor");
    } else if (userObj?.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      // ignore errors; still clear local state
    }
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setAuthenticated(false);
    setUser(null);
    navigate("/");
  };

  // Don't render protected routes until we've read localStorage
  if (!hydrated) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      <Routes>
        {/* ── Public Routes ─────────────────────────────────────────────── */}
        <Route
          path="/"
          element={
            <LandingPage
              onLoginClick={() => navigate("/auth")}
              onMarketingClick={() => navigate("/marketing")}
              onPatientClick={() => navigate("/patient")}
              onDoctorClick={() =>
                navigate(
                  authenticated && user?.role === "doctor"
                    ? "/doctor"
                    : "/doctor-auth"
                )
              }
              onDoctorsClick={() => navigate("/doctors")}
              onContactClick={() => navigate("/contact")}
              onGetStarted={() => navigate("/get-started")}
              authenticated={authenticated}
              onLogout={handleLogout}
              user={user}
            />
          }
        />

        {/* Login pages — redirect already-logged-in users to their dashboard */}
        <Route
          path="/auth"
          element={
            authenticated ? (
              <Navigate
                to={
                  user?.role === "doctor"
                    ? "/doctor"
                    : user?.role === "admin"
                    ? "/admin"
                    : "/patient"
                }
                replace
              />
            ) : (
              <Auth onSuccess={handleLoginSuccess} onBack={() => navigate("/")} />
            )
          }
        />
        <Route
          path="/doctor-auth"
          element={
            authenticated && user?.role === "doctor" ? (
              <Navigate to="/doctor" replace />
            ) : (
              <DoctorAuth onSuccess={handleLoginSuccess} onBack={() => navigate("/")} />
            )
          }
        />

        <Route path="/doctors"     element={<DoctorsPage  onBack={() => navigate("/")} onDoctorSignIn={() => navigate("/doctor-auth")} />} />
        <Route path="/contact"     element={<ContactPage  onBack={() => navigate("/")} />} />
        <Route path="/marketing"   element={<MarketingPage onBack={() => navigate("/")} onDoctorClick={() => navigate("/doctor")} />} />
        <Route
          path="/get-started"
          element={
            <GetStartedPage
              onBack={() => navigate("/")}
              onDoctorClick={() => navigate("/doctor-auth")}
              onPatientClick={() => navigate("/patient")}
            />
          }
        />

        {/* ── Protected: Admin only ──────────────────────────────────────── */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              authenticated={authenticated}
              user={user}
              allowedRoles={["admin"]}
              loginPath="/auth"
            >
              <AdminDashboard onBack={() => navigate("/")} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />

        {/* ── Protected: Doctor only ─────────────────────────────────────── */}
        <Route
          path="/doctor"
          element={
            <ProtectedRoute
              authenticated={authenticated}
              user={user}
              allowedRoles={["doctor"]}
              loginPath="/doctor-auth"
            >
              <DoctorDashboard
                user={user}
                onLogout={handleLogout}
                onBack={() => navigate("/")}
              />
            </ProtectedRoute>
          }
        />

        {/* ── Protected: Patient (and admin can view too for support) ───── */}
        <Route
          path="/patient"
          element={
            <ProtectedRoute
              authenticated={authenticated}
              user={user}
              allowedRoles={["patient", "admin"]}
              loginPath="/auth"
            >
              <PatientPage
                authenticated={authenticated}
                user={user}
                onLogout={handleLogout}
                onLoginClick={() => navigate("/auth")}
              />
            </ProtectedRoute>
          }
        />

        {/* ── Catch-all ─────────────────────────────────────────────────── */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
