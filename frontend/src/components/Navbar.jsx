import { useState, useRef, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

function Navbar({ onLoginClick, onDoctorClick, onAdminClick, onContactClick, authenticated, onLogout, user }) {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef(null);

  const profileName = user
    ? (
        user.name ||
        [user.first_name, user.last_name].filter(Boolean).join(' ') ||
        user.email ||
        'User'
      )
    : 'User';

  const profileAddress = user
    ? (
        user.address ||
        user.main_address ||
        user.address_line ||
        user.location ||
        user.email ||
        'User'
      )
    : 'User';

  const profileInitial = profileName.charAt(0).toUpperCase();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-blue-100 bg-white/95 px-8 py-4 shadow-sm backdrop-blur-2xl transition-shadow hover:shadow-md">

      <div className="relative mx-auto flex max-w-6xl items-center justify-between">
        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-white text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <h1 style={{
          background: 'linear-gradient(to right, #1e40af, #3b82f6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          backgroundSize: '200% 100%',
          backgroundPosition: '0% 0%',
          display: 'inline-block'
        }} className="absolute left-1/2 -translate-x-1/2 text-2xl font-bold">
          MedAlign
        </h1>


        {/* Login / Profile */}
        {authenticated ? (
          <div className="relative" ref={ref}>
            <button
              onClick={() => setOpen((s) => !s)}
              className="inline-flex items-center gap-3 rounded-full px-3 py-1.5 bg-white border border-slate-200 shadow-sm hover:shadow-md cursor-pointer"
            >
              <div className="h-8 w-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-semibold">
                {profileInitial}
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-slate-900">{profileName}</div>
                <div className="text-xs text-slate-500">{profileAddress}</div>
              </div>
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-56 rounded-lg border border-slate-200 bg-white shadow-lg p-3 z-50">
                <div className="px-2 py-2">
                  <div className="text-sm font-semibold text-slate-900">{profileName}</div>
                  <div className="text-xs text-slate-500">{profileAddress}</div>
                </div>
                <div className="mt-2 border-t border-slate-100 pt-2">
                  <button onClick={onLogout} className="w-full text-left text-sm text-red-600 hover:text-red-700">Logout</button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button onClick={onLoginClick} className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white font-semibold transition duration-300 shadow-md hover:shadow-lg hover:shadow-blue-300/50">
            Login
          </button>
        )}

      </div>

      <div
        className={`fixed inset-0 z-40 bg-slate-950/25 transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        aria-hidden="true"
      />

      <aside
        id="main-navigation"
        aria-label="Main navigation"
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-80 max-w-[88vw] flex-col overflow-y-auto border-r border-blue-100 bg-white px-8 pb-10 pt-8 shadow-2xl transition-transform duration-300 ease-out ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">MedAlign</span>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close navigation menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-blue-50 hover:text-blue-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-14 space-y-4">
          {['Home'].map((item) => (
            <a
              key={item}
              href="#"
              className="block rounded-2xl px-5 py-5 text-lg font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
            >
              {item}
            </a>
          ))}
          <button
            type="button"
            onClick={onDoctorClick}
            className="block w-full rounded-2xl px-5 py-5 text-left text-lg font-medium text-emerald-700 transition hover:bg-emerald-50"
          >
            Doctor Dashboard
          </button>
          <button
            type="button"
            onClick={onAdminClick}
            className="block w-full rounded-2xl px-5 py-5 text-left text-lg font-medium text-blue-700 transition hover:bg-blue-50"
          >
            Admin Dashboard
          </button>
          <button
            type="button"
            onClick={onContactClick}
            className="block w-full rounded-2xl px-5 py-5 text-left text-lg font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
          >
            Contact
          </button>
        </div>
      </aside>

    </nav>
  );
}

export default Navbar;