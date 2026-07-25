function Navbar() {
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


        {/* Login Button */}
        <button className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white font-semibold transition duration-300 shadow-md hover:shadow-lg hover:shadow-blue-300/50">
          Login
        </button>


      </div>

    </nav>
  );
}

export default Navbar;