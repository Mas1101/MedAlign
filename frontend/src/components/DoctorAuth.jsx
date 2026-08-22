import { useState } from 'react';
import Login from './Login';
import Register from './Register';
import MedAlignBrand from './MedAlignBrand';

function DoctorAuth({ onSuccess, onBack }) {
  const [mode, setMode] = useState('login');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/40 to-white px-6 py-10 flex items-center justify-center">
      <div className="w-full max-w-xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-600">MedAlign for Clinicians</p>
            <h1 className="mt-2 text-2xl font-extrabold text-slate-900">{mode === 'login' ? 'Doctor Sign In' : 'Create a Doctor Account'}</h1>
            <p className="mt-1 text-xs text-slate-500">Access your live clinic queue, patient consultations, and prescriptions.</p>
          </div>
          <MedAlignBrand onClick={onBack} label="Return to doctors page" />
        </div>
        <div className="rounded-3xl border border-emerald-100 bg-white/95 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-emerald-900/10">
          <div className="flex gap-3 border-b border-slate-100 pb-4 mb-6">
            <button
              onClick={() => setMode('login')}
              className={`rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                mode === 'login'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('register')}
              className={`rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                mode === 'register'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Create Account
            </button>
          </div>
          {mode === 'login' ? (
            <Login onSuccess={onSuccess} />
          ) : (
            <Register onSuccess={onSuccess} />
          )}
        </div>
      </div>
    </div>
  );
}

export default DoctorAuth;
