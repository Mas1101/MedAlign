import { useState, useRef, useEffect } from 'react';

function Navbar({ onLoginClick, authenticated, onLogout, user }) {
  const [open, setOpen] = useState(false);
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
    <nav className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-2xl border-b border-blue-100 px-8 py-4 shadow-sm hover:shadow-md transition-shadow">

      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <h1 style={{
          background: 'linear-gradient(to right, #1e40af, #3b82f6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          backgroundSize: '200% 100%',
          backgroundPosition: '0% 0%',
          display: 'inline-block'
        }} className="text-2xl font-bold">
          MedAlign
        </h1>


        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">

          <a
            href="#"
            className="hover:text-blue-700 transition duration-300 relative group"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400 group-hover:w-full transition-all duration-300"></span>
          </a>

          <a
            href="#"
            className="hover:text-blue-700 transition duration-300 relative group"
          >
            Doctors
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400 group-hover:w-full transition-all duration-300"></span>
          </a>

          <a
            href="#"
            className="hover:text-blue-700 transition duration-300 relative group"
          >
            Services
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400 group-hover:w-full transition-all duration-300"></span>
          </a>

          <a
            href="#"
            className="hover:text-blue-700 transition duration-300 relative group"
          >
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400 group-hover:w-full transition-all duration-300"></span>
          </a>

        </div>


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

    </nav>
  );
}

export default Navbar;