import Navbar from "../components/Navbar";
import {
  Stethoscope,
  CalendarDays,
  ShieldCheck,
  Ambulance,
  ClipboardList,
  Pill,
} from "lucide-react";
import { motion } from "framer-motion";

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-gray-50 text-gray-900 overflow-hidden">
      {/* Premium Glassmorphism Background Elements */}
      <div className="fixed inset-0 -z-10">
        {/* Main blur shapes */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-blue-300/15 rounded-full blur-4xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200/15 rounded-full blur-4xl"></div>
        
        {/* Additional depth layers */}
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-indigo-200/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-1/3 w-72 h-72 bg-blue-400/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-purple-300/8 rounded-full blur-4xl"></div>
        
        {/* Subtle accent colors */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-100/5 to-transparent"></div>
      </div>

      <Navbar />


      {/* Hero Section */}
      <section className="px-8 py-32 bg-transparent relative mt-16">

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">


          {/* Hero Text */}
          <motion.div
            className="md:w-1/2 text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >



            <h2 className="mt-5 text-3xl font-semibold text-gray-800">
              Your Health, Connected Better
            </h2>


            <p className="mt-5 text-lg text-gray-600">
              Find trusted doctors, book appointments, and manage your
              healthcare journey with a smart digital platform.
            </p>


            <button className="mt-8 px-8 py-3 bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white font-semibold rounded-full text-lg transition duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-400/60 backdrop-blur-sm border border-blue-400/30">
              Get Started
            </button>


          </motion.div>



          {/* Hero Card */}
          <motion.div
            className="mt-12 md:mt-0 md:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >

            <div className="relative w-96 h-96 group">

              <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-blue-50/80 to-blue-100/70 backdrop-blur-2xl border border-blue-300/50 shadow-2xl hover:shadow-3xl hover:shadow-blue-400/40 hover:border-blue-400/70 flex flex-col items-center justify-center transition duration-500 overflow-hidden">
                {/* Glossy inner border effect */}
                <div className="absolute inset-0 rounded-3xl border border-blue-200/50 pointer-events-none"></div>
                {/* Soft glow effect */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-blue-400/10 to-blue-500/5 blur-xl -z-10"></div>

                <Stethoscope className="text-blue-600 w-24 h-24 group-hover:text-blue-700 transition duration-500" />


                <h3 className="mt-6 text-2xl font-bold text-gray-800">
                  Smart Healthcare
                </h3>


                <p className="mt-3 text-center text-gray-600 px-8">
                  Connect with doctors, manage appointments,
                  and track your health easily.
                </p>


              </div>


            </div>


          </motion.div>


        </div>

      </section>



      {/* Features Section */}
      <section className="px-8 py-20 bg-transparent relative">


        <h2 className="text-5xl font-bold text-center bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
          Why Choose us?
        </h2>


        <p className="mt-3 text-center text-gray-600">
          Smart healthcare solutions designed for everyone.
        </p>


        <motion.div
          className="mt-12 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >


          <motion.div
            className="p-8 rounded-2xl bg-gradient-to-br from-blue-50/80 to-blue-100/60 backdrop-blur-2xl border border-blue-300/50 hover:border-blue-400/70 hover:bg-blue-100/70 transition duration-500 shadow-lg hover:shadow-2xl hover:shadow-blue-400/30 group overflow-hidden relative"
            whileHover={{ y: -8 }}
          >
            <div className="absolute inset-0 rounded-2xl border border-blue-200/40 pointer-events-none"></div>
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-blue-300/10 to-blue-400/5 blur-lg -z-10"></div>
            <Stethoscope className="text-blue-600 group-hover:text-blue-700 w-12 h-12 transition duration-500 relative z-10" />


            <h3 className="mt-5 text-xl font-bold text-blue-700 relative z-10">
              Find Doctors
            </h3>


            <p className="mt-3 text-gray-700 relative z-10">
              Connect with verified doctors based on your healthcare needs.
            </p>


                    </motion.div>



          <motion.div
            className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50/80 to-indigo-100/60 backdrop-blur-2xl border border-indigo-300/50 hover:border-indigo-400/70 hover:bg-indigo-100/70 transition duration-500 shadow-lg hover:shadow-2xl hover:shadow-indigo-400/30 group overflow-hidden relative"
            whileHover={{ y: -8 }}
          >
            <div className="absolute inset-0 rounded-2xl border border-indigo-200/40 pointer-events-none"></div>
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-indigo-300/10 to-indigo-400/5 blur-lg -z-10"></div>
            <CalendarDays className="text-indigo-600 group-hover:text-indigo-700 w-12 h-12 transition duration-500 relative z-10" />


            <h3 className="mt-5 text-xl font-bold text-indigo-700 relative z-10">
              Easy Appointments
            </h3>


            <p className="mt-3 text-gray-700 relative z-10">
              Schedule appointments quickly without unnecessary waiting.
            </p>


          </motion.div>




          <motion.div
            className="p-8 rounded-2xl bg-gradient-to-br from-green-50/80 to-green-100/60 backdrop-blur-2xl border border-green-300/50 hover:border-green-400/70 hover:bg-green-100/70 transition duration-500 shadow-lg hover:shadow-2xl hover:shadow-green-400/30 group overflow-hidden relative"
            whileHover={{ y: -8 }}
          >
            <div className="absolute inset-0 rounded-2xl border border-green-200/40 pointer-events-none"></div>
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-green-300/10 to-green-400/5 blur-lg -z-10"></div>
            <ShieldCheck className="text-green-600 group-hover:text-green-700 w-12 h-12 transition duration-500 relative z-10" />


            <h3 className="mt-5 text-xl font-bold text-green-700 relative z-10">
              Secure Records
            </h3>


            <p className="mt-3 text-gray-700 relative z-10">
              Keep your medical information private and protected.
            </p>


          </motion.div>


        </motion.div>


      </section>





      {/* Services Section */}
      <section className="px-8 py-20 bg-transparent relative">


        <h2 className="text-5xl font-bold text-center bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
          Our Healthcare Services
        </h2>


        <p className="mt-3 text-center text-gray-600">
          Comprehensive healthcare solutions in one platform.
        </p>



        <motion.div
          className="mt-12 grid md:grid-cols-4 gap-6 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >



          {/* Service Card 1 */}
          <motion.div
            className="p-6 rounded-2xl bg-gradient-to-br from-blue-50/80 to-blue-100/60 backdrop-blur-2xl border border-blue-300/50 hover:border-blue-400/70 hover:bg-blue-100/70 transition duration-500 shadow-lg hover:shadow-2xl hover:shadow-blue-400/30 group overflow-hidden relative"
            whileHover={{ y: -8 }}
          >
            <div className="absolute inset-0 rounded-2xl border border-blue-200/40 pointer-events-none"></div>
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-blue-300/10 to-blue-400/5 blur-lg -z-10"></div>
            <Stethoscope className="text-blue-600 group-hover:text-blue-700 w-12 h-12 transition duration-500 relative z-10" />


            <h3 className="mt-4 text-xl font-bold text-blue-700 relative z-10">
              Online Consultation
            </h3>


            <p className="mt-3 text-gray-700 relative z-10">
              Consult with healthcare professionals from anywhere.
            </p>


          </motion.div>





          {/* Service Card 2 */}
          <motion.div
            className="p-6 rounded-2xl bg-gradient-to-br from-red-50/80 to-red-100/60 backdrop-blur-2xl border border-red-300/50 hover:border-red-400/70 hover:bg-red-100/70 transition duration-500 shadow-lg hover:shadow-2xl hover:shadow-red-400/30 group overflow-hidden relative"
            whileHover={{ y: -8 }}
          >
            <div className="absolute inset-0 rounded-2xl border border-red-200/40 pointer-events-none"></div>
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-red-300/10 to-red-400/5 blur-lg -z-10"></div>
            <Ambulance className="text-red-600 group-hover:text-red-700 w-12 h-12 transition duration-500 relative z-10" />


            <h3 className="mt-4 text-xl font-bold text-red-700 relative z-10">
              Emergency Support
            </h3>


            <p className="mt-3 text-gray-700 relative z-10">
              Get quick access to emergency healthcare assistance.
            </p>


          </motion.div>





          {/* Service Card 3 */}
          <motion.div
            className="p-6 rounded-2xl bg-gradient-to-br from-green-50/80 to-green-100/60 backdrop-blur-2xl border border-green-300/50 hover:border-green-400/70 hover:bg-green-100/70 transition duration-500 shadow-lg hover:shadow-2xl hover:shadow-green-400/30 group overflow-hidden relative"
            whileHover={{ y: -8 }}
          >
            <div className="absolute inset-0 rounded-2xl border border-green-200/40 pointer-events-none"></div>
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-green-300/10 to-green-400/5 blur-lg -z-10"></div>
            <ClipboardList className="text-green-600 group-hover:text-green-700 w-12 h-12 transition duration-500 relative z-10" />


            <h3 className="mt-4 text-xl font-bold text-green-700 relative z-10">
              Health Tracking
            </h3>


            <p className="mt-3 text-gray-700 relative z-10">
              Monitor and manage your health records securely.
            </p>


                    </motion.div>




          {/* Service Card 4 */}
          <motion.div
            className="p-6 rounded-2xl bg-gradient-to-br from-purple-50/80 to-purple-100/60 backdrop-blur-2xl border border-purple-300/50 hover:border-purple-400/70 hover:bg-purple-100/70 transition duration-500 shadow-lg hover:shadow-2xl hover:shadow-purple-400/30 group overflow-hidden relative"
            whileHover={{ y: -8 }}
          >
            <div className="absolute inset-0 rounded-2xl border border-purple-200/40 pointer-events-none"></div>
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-purple-300/10 to-purple-400/5 blur-lg -z-10"></div>
            <Pill className="text-purple-600 group-hover:text-purple-700 w-12 h-12 transition duration-500 relative z-10" />


            <h3 className="mt-4 text-xl font-bold text-purple-700 relative z-10">
              Medicine Support
            </h3>


            <p className="mt-3 text-gray-700 relative z-10">
              Manage prescriptions and medication information.
            </p>


          </motion.div>


        </motion.div>


      </section>





      {/* CTA Section */}
      <section className="px-8 py-20 bg-transparent relative">


        <motion.div
          className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-r from-blue-100/70 to-indigo-100/70 backdrop-blur-2xl border border-blue-300/60 shadow-2xl hover:border-blue-400/80 transition duration-500 hover:shadow-3xl hover:shadow-blue-400/40 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Glow layer */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-300/15 to-indigo-300/15 blur-2xl -z-10"></div>
          <div className="absolute inset-0 rounded-3xl border border-blue-200/40 pointer-events-none"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
              Ready to Take Control of Your Health?
            </h2>


            <p className="mt-4 text-lg text-gray-700">
              Join MedAlign and connect with healthcare professionals
              anytime, anywhere.
            </p>


            <button className="mt-8 px-10 py-3 bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white font-bold rounded-full transition duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-400/60 backdrop-blur-sm border border-blue-400/30">
              Get Started
            </button>
          </div>


        </motion.div>


      </section>





      {/* Footer */}
      <footer className="px-8 py-12 bg-gradient-to-r from-blue-50 to-indigo-50 backdrop-blur-xl border-t border-blue-200 relative mt-12">


        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">


          <div>

            <h2 style={{
              background: 'linear-gradient(to right, #1e40af, #3b82f6)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              backgroundSize: '200% 100%',
              backgroundPosition: '0% 0%',
              display: 'inline-block'
            }} className="text-3xl font-bold">
              MedAlign
            </h2>


            <p className="mt-4 text-gray-600">
              Connecting patients with smarter healthcare solutions.
            </p>


          </div>





          <div>

            <h3 className="text-xl font-bold text-gray-800">
              Quick Links
            </h3>


            <ul className="mt-4 space-y-3 text-gray-600">

              <li className="hover:text-blue-700 cursor-pointer transition">Home</li>
              <li className="hover:text-blue-700 cursor-pointer transition">Services</li>
              <li className="hover:text-blue-700 cursor-pointer transition">About</li>
              <li className="hover:text-blue-700 cursor-pointer transition">Contact</li>

            </ul>


          </div>





          <div>

            <h3 className="text-xl font-bold text-gray-800">
              Services
            </h3>


            <ul className="mt-4 space-y-3 text-gray-600">

              <li className="hover:text-blue-700 cursor-pointer transition">Online Consultation</li>
              <li className="hover:text-blue-700 cursor-pointer transition">Emergency Support</li>
              <li className="hover:text-blue-700 cursor-pointer transition">Health Tracking</li>
              <li className="hover:text-blue-700 cursor-pointer transition">Medicine Support</li>

            </ul>


          </div>





          <div>

            <h3 className="text-xl font-bold text-gray-800">
              Contact
            </h3>


            <p className="mt-4 text-gray-600">
              Email: support@medalign.com
            </p>


            <p className="mt-2 text-gray-600">
              Phone: +880 1234 567890
            </p>


          </div>


        </div>




        <div className="mt-10 pt-6 border-t border-blue-200 text-center text-gray-500">

          © 2026 MedAlign. All rights reserved.

        </div>


      </footer>


    </div>
  );
}


export default LandingPage;