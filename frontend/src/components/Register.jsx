import { useState } from 'react';
import api from '../api';

const Register = ({ onSuccess, localOnly = false, role = 'reception', title = 'Create an account' }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (localOnly) {
        onSuccess?.('local-doctor-demo-token', { name, email, role });
        return;
      }

      const response = await api.post('/register', { name, email, password, password_confirmation: password, role });
      const { access_token, user } = response.data;

      setEmail('');
      setName('');
      setPassword('');
      setError('');

      if (onSuccess) onSuccess(access_token, user);
    } catch (err) {
      setError('Unable to create account.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-3xl bg-white shadow-xl shadow-slate-200">
      <h2 className="text-2xl font-semibold text-slate-900 mb-6">{title}</h2>
      {error && <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-5">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Full name</span>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
          />
        </label>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? 'Creating...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default Register;
