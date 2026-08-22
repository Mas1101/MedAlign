import { useState } from 'react';
import Login from './Login';
import Register from './Register';
import MedAlignBrand from './MedAlignBrand';

function DoctorAuth({ onSuccess, onBack }) {
  const [mode, setMode] = useState('login');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/40 to-white px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">MedAlign for clinicians</p>
            <h1 className="mt-3 text-3xl font-bold text-slate-950">{mode === 'login' ? 'Doctor Sign In' : 'Create a Doctor Account'}</h1>
            <p className="mt-2 text-sm text-slate-500">Access your clinic queue and patient workspace.</p>
          </div>
          <MedAlignBrand onClick={onBack} label="Return to doctors page" />
        </div>
        <div className="rounded-3xl border border-emerald-100 bg-white p-2 shadow-xl shadow-emerald-900/5">
          <div className="flex gap-3 px-6 pt-6">
            <button onClick={() => setMode('login')} className={`rounded-full px-4 py-2 text-sm font-semibold ${mode === 'login' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}`}>Sign In</button>
            <button onClick={() => setMode('register')} className={`rounded-full px-4 py-2 text-sm font-semibold ${mode === 'register' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}`}>Create Account</button>
          </div>
          {mode === 'login' ? <Login onSuccess={onSuccess} allowedRole="doctor" localOnly title="Sign in to your doctor workspace" /> : <Register onSuccess={onSuccess} role="doctor" localOnly title="Create your doctor account" />}
        </div>
      </div>
    </div>
  );
}

export default DoctorAuth;