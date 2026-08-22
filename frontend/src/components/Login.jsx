import { useState } from 'react';
import api from '../api';

const Login = ({ onSuccess, onRequireOtp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      const { access_token, user } = response.data;

      setEmail('');
      setPassword('');
      setError('');

      if (onSuccess) onSuccess(access_token, user);
    } catch (err) {
      if (err.response && err.response.data) {
        if (err.response.data.requires_otp) {
          if (onRequireOtp) {
            onRequireOtp(err.response.data.email || email, 'login');
          }
          return;
        }
        setError(err.response.data.message || 'Invalid email or password.');
      } else {
        setError('Unable to sign in. Please check backend connection.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-3xl bg-white shadow-xl shadow-slate-200 border border-slate-100">
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Sign in to MedAlign</h2>
      <p className="text-xs text-slate-500 mb-6">Enter your credentials to access your administrative, doctor, or receptionist portal.</p>
      
      {error && <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <label className="block">
          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Email or Phone Number</span>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="name@clinic.org or +1 (555) ..."
            className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100"
          />
        </label>

        <label className="block">
          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100"
          />
        </label>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-full bg-gradient-to-r from-sky-700 to-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:from-sky-600 hover:to-indigo-500 shadow-md shadow-sky-500/20 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

export default Login;
