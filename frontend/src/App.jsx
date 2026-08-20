import { useEffect, useState } from "react";
import LandingPage from "./pages/LandingPage";
import MarketingPage from "./pages/MarketingPage";
import AdminDashboard from "./pages/AdminDashboard";
import Auth from "./components/Auth";
import api from "./api";

function App() {
  const [route, setRoute] = useState("landing"); // landing | auth | marketing | admin
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

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
  }, [route]);

  const handleLoginSuccess = (token, user) => {
    localStorage.setItem("access_token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setAuthenticated(true);
    setUser(user);
    setRoute("landing");
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
    setRoute('landing');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {route === 'landing' && (
        <LandingPage
          onLoginClick={() => setRoute('auth')}
          onMarketingClick={() => setRoute('marketing')}
          onAdminClick={() => setRoute('admin')}
          authenticated={authenticated}
          onLogout={handleLogout}
          user={user}
        />
      )}

      {route === 'auth' && (
        <Auth onSuccess={handleLoginSuccess} onBack={() => setRoute('landing')} />
      )}

      {route === 'marketing' && (
        <MarketingPage onBack={() => setRoute('landing')} />
      )}
      {route === 'admin' && (
       <AdminDashboard />
      )}

    </div>
  );
}

export default App;
