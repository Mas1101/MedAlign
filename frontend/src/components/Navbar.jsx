function Navbar() {
  return (
    <nav className="bg-slate-950 border-b border-slate-800 px-8 py-5">

      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-teal-400">
          MedAlign
        </h1>


        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-slate-300">

          <a
            href="#"
            className="hover:text-teal-400 transition"
          >
            Home
          </a>

          <a
            href="#"
            className="hover:text-teal-400 transition"
          >
            Doctors
          </a>

          <a
            href="#"
            className="hover:text-teal-400 transition"
          >
            Services
          </a>

          <a
            href="#"
            className="hover:text-teal-400 transition"
          >
            Contact
          </a>

        </div>


        {/* Login Button */}
        <button className="px-6 py-2 rounded-full bg-teal-500 text-slate-900 font-semibold hover:bg-teal-400 transition shadow-lg">
          Login
        </button>


      </div>

    </nav>
  );
}

export default Navbar;