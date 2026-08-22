import { useState } from 'react';
import api from '../api';

const Register = ({ onSuccess, onRequireOtp }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('reception'); // admin | doctor | reception
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await api.post('/auth/register', {
        name,
        email,
        phone,
        password,
        role,
      });

      if (response.data.requires_otp) {
        if (onRequireOtp) {
          onRequireOtp(email, 'registration');
        }
      } else if (response.data.access_token) {
        if (onSuccess) onSuccess(response.data.access_token, response.data.user);
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Unable to create account. Please check your inputs.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-3xl bg-white shadow-xl shadow-slate-200 border border-slate-100">
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Create an account</h2>
      <p className="text-xs text-slate-500 mb-6">Enter your details to register. An OTP code will be sent to your email for verification.</p>
      
      {error && <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Full Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="e.g. Dr. Sarah Jenkins"
            className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100"
          />
        </label>

        <label className="block">
          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Email Address</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="name@clinic.org"
            className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100"
          />
        </label>

        <label className="block">
          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Phone Number</span>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 (555) 019-2834"
            className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100"
          />
        </label>

        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="••••••••"
              className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100"
            />
          </label>

          <label className="block">
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Account Role</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white"
            >
              <option value="patient">Patient</option>
              <option value="admin">Admin</option>
              <option value="doctor">Doctor</option>
              <option value="reception">Receptionist</option>
            </select>
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-2 rounded-full bg-gradient-to-r from-sky-700 to-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:from-sky-600 hover:to-indigo-500 shadow-md shadow-sky-500/20 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
        >
          {isLoading ? 'Creating Account & Dispatching OTP...' : 'Register & Get OTP'}
        </button>
      </form>
    </div>
  );
};

export default Register;
