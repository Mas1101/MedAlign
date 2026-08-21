import { useState } from 'react';
import Login from './Login';
import Register from './Register';
import MedAlignBrand from './MedAlignBrand';

const Auth = ({ onSuccess, onBack }) => {
  const [mode, setMode] = useState('login'); // login | register

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Sign in to MedAlign</h1>
            <p className="text-sm text-slate-500">Choose Login if you already have an account, or Sign Up to create one.</p>
          </div>
          <MedAlignBrand onClick={onBack} label="Return to previous page" />
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <div className="mb-6 flex gap-3">
            <button
              className={`px-4 py-2 rounded-full ${mode === 'login' ? 'bg-sky-700 text-white' : 'bg-slate-100 text-slate-700'}`}
              onClick={() => setMode('login')}
            >
              Login
            </button>
            <button
              className={`px-4 py-2 rounded-full ${mode === 'register' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'}`}
              onClick={() => setMode('register')}
            >
              Sign Up
            </button>
          </div>

          {mode === 'login' ? <Login onSuccess={onSuccess} /> : <Register onSuccess={onSuccess} />}
        </div>
      </div>
    </div>
  );
};

export default Auth;
