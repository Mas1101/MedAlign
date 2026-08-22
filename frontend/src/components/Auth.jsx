import { useState } from 'react';
import Login from './Login';
import Register from './Register';
import api from '../api';

const Auth = ({ onSuccess, onBack }) => {
  const [mode, setMode] = useState('login'); // login | register | otp
  const [otpEmail, setOtpEmail] = useState('');
  const [otpType, setOtpType] = useState('registration');
  const [otpCode, setOtpCode] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRequireOtp = (email, type) => {
    setOtpEmail(email);
    setOtpType(type);
    setMode('otp');
    setError('');
    setMessage(`A 6-digit OTP code has been dispatched to ${email}. Please check your inbox or Mailpit (http://localhost:8025).`);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await api.post('/auth/verify-otp', {
        email: otpEmail,
        otp_code: otpCode,
        type: otpType,
      });

      const { access_token, user, redirect_url } = response.data;
      if (onSuccess) onSuccess(access_token, user, redirect_url);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Invalid or expired OTP code. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError('');
    setMessage('');
    try {
      await api.post('/auth/send-otp', {
        email: otpEmail,
        type: otpType,
      });
      setMessage(`Fresh OTP code resent to ${otpEmail}. Check Mailpit (http://localhost:8025) or your inbox.`);
    } catch (err) {
      setError('Unable to resend OTP code.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-slate-50 via-slate-100 to-white">
      <div className="w-full max-w-xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">MedAlign Portal Auth</h1>
            <p className="text-sm text-slate-500">Secure role-based access for Admins, Doctors, and Receptionists.</p>
          </div>
          <div>
            <button onClick={onBack} className="text-sm font-semibold text-slate-600 hover:text-blue-700 cursor-pointer">← Back Home</button>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-slate-200/80 shadow-2xl p-6 sm:p-8">
          {mode !== 'otp' && (
            <div className="mb-6 flex gap-3 border-b border-slate-100 pb-4">
              <button
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                  mode === 'login'
                    ? 'bg-gradient-to-r from-sky-700 to-indigo-600 text-white shadow-md shadow-sky-500/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                onClick={() => setMode('login')}
              >
                Sign In
              </button>
              <button
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                  mode === 'register'
                    ? 'bg-gradient-to-r from-sky-700 to-indigo-600 text-white shadow-md shadow-sky-500/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                onClick={() => setMode('register')}
              >
                Register
              </button>
            </div>
          )}

          {mode === 'login' && <Login onSuccess={onSuccess} onRequireOtp={handleRequireOtp} />}
          {mode === 'register' && <Register onSuccess={onSuccess} onRequireOtp={handleRequireOtp} />}

          {mode === 'otp' && (
            <div className="space-y-5 max-w-md mx-auto">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Verify Email with OTP</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Enter the 6-digit verification code sent to <strong>{otpEmail}</strong>.
                </p>
              </div>

              {message && (
                <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-800 font-medium">
                  {message}
                </div>
              )}

              <div className="flex items-center justify-between bg-sky-50 border border-sky-200 rounded-2xl p-3 text-xs text-sky-800">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Mailpit Virtual Inbox:</span>
                </div>
                <a
                  href="http://localhost:8025"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold underline text-sky-900 hover:text-sky-700"
                >
                  View Sent Code (localhost:8025) ↗
                </a>
              </div>

              {error && (
                <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                  {error}
                </div>
              )}

              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <label className="block">
                  <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">6-Digit OTP Code</span>
                  <input
                    type="text"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                    required
                    placeholder="123456"
                    className="mt-1 w-full text-center text-3xl font-extrabold tracking-[10px] rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-blue-900 outline-none focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100"
                  />
                </label>

                <button
                  type="submit"
                  disabled={isLoading || otpCode.length !== 6}
                  className="w-full rounded-full bg-gradient-to-r from-sky-700 to-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:from-sky-600 hover:to-indigo-500 shadow-md shadow-sky-500/20 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                >
                  {isLoading ? 'Verifying OTP...' : 'Verify OTP & Log In'}
                </button>
              </form>

              <div className="flex items-center justify-between text-xs border-t border-slate-100 pt-4">
                <button
                  onClick={() => setMode('login')}
                  className="text-slate-500 hover:text-slate-700 font-medium cursor-pointer"
                >
                  ← Back to Login
                </button>
                <button
                  onClick={handleResendOtp}
                  className="text-blue-700 hover:text-blue-800 font-semibold cursor-pointer"
                >
                  Resend OTP Code
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
