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
    <div className="min-h-screen bg-slate-950 text-white">

      <Navbar />


      {/* Hero Section */}
      <section className="px-8 py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950">

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">


          {/* Hero Text */}
          <motion.div
            className="md:w-1/2 text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >

            <h1 className="text-6xl font-bold text-teal-400">
              MedAlign
            </h1>


            <h2 className="mt-5 text-3xl font-semibold">
              Your Health, Connected Better
            </h2>


            <p className="mt-5 text-lg text-slate-300">
              Find trusted doctors, book appointments, and manage your
              healthcare journey with a smart digital platform.
            </p>


            <button className="mt-8 px-8 py-3 bg-teal-500 text-slate-900 font-semibold rounded-full text-lg hover:bg-teal-400 transition shadow-lg">
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

            <div className="relative w-96 h-96">


              <div className="absolute inset-0 bg-teal-500/20 rounded-3xl blur-3xl"></div>


              <div className="relative w-full h-full rounded-3xl bg-slate-900 border border-teal-400/30 shadow-2xl flex flex-col items-center justify-center">


                <Stethoscope className="text-teal-400 w-24 h-24" />


                <h3 className="mt-6 text-2xl font-bold">
                  Smart Healthcare
                </h3>


                <p className="mt-3 text-center text-slate-400 px-8">
                  Connect with doctors, manage appointments,
                  and track your health easily.
                </p>


              </div>


            </div>


          </motion.div>


        </div>

      </section>



      {/* Features Section */}
      <section className="px-8 py-20 bg-slate-950">


        <h2 className="text-4xl font-bold text-center">
          Why Choose MedAlign?
        </h2>


        <p className="mt-3 text-center text-slate-400">
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
            className="p-8 rounded-2xl bg-slate-900 border border-slate-700 hover:border-teal-400 transition"
            whileHover={{ y: -8 }}
          >

            <Stethoscope className="text-teal-400 w-12 h-12" />


            <h3 className="mt-5 text-xl font-bold text-teal-400">
              Find Doctors
            </h3>


            <p className="mt-3 text-slate-400">
              Connect with verified doctors based on your healthcare needs.
            </p>


                    </motion.div>



          <motion.div
            className="p-8 rounded-2xl bg-slate-900 border border-slate-700 hover:border-teal-400 transition"
            whileHover={{ y: -8 }}
          >

            <CalendarDays className="text-teal-400 w-12 h-12" />


            <h3 className="mt-5 text-xl font-bold text-teal-400">
              Easy Appointments
            </h3>


            <p className="mt-3 text-slate-400">
              Schedule appointments quickly without unnecessary waiting.
            </p>


          </motion.div>




          <motion.div
            className="p-8 rounded-2xl bg-slate-900 border border-slate-700 hover:border-teal-400 transition"
            whileHover={{ y: -8 }}
          >

            <ShieldCheck className="text-teal-400 w-12 h-12" />


            <h3 className="mt-5 text-xl font-bold text-teal-400">
              Secure Records
            </h3>


            <p className="mt-3 text-slate-400">
              Keep your medical information private and protected.
            </p>


          </motion.div>


        </motion.div>


      </section>





      {/* Services Section */}
      <section className="px-8 py-20 bg-slate-900">


        <h2 className="text-4xl font-bold text-center">
          Our Healthcare Services
        </h2>


        <p className="mt-3 text-center text-slate-400">
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
            className="p-6 rounded-2xl bg-slate-950 border border-slate-700 hover:border-teal-400 transition"
            whileHover={{ y: -8 }}
          >

            <Stethoscope className="text-teal-400 w-12 h-12" />


            <h3 className="mt-4 text-xl font-bold text-teal-400">
              Online Consultation
            </h3>


            <p className="mt-3 text-slate-400">
              Consult with healthcare professionals from anywhere.
            </p>


          </motion.div>





          {/* Service Card 2 */}
          <motion.div
            className="p-6 rounded-2xl bg-slate-950 border border-slate-700 hover:border-teal-400 transition"
            whileHover={{ y: -8 }}
          >

            <Ambulance className="text-teal-400 w-12 h-12" />


            <h3 className="mt-4 text-xl font-bold text-teal-400">
              Emergency Support
            </h3>


            <p className="mt-3 text-slate-400">
              Get quick access to emergency healthcare assistance.
            </p>


          </motion.div>





          {/* Service Card 3 */}
          <motion.div
            className="p-6 rounded-2xl bg-slate-950 border border-slate-700 hover:border-teal-400 transition"
            whileHover={{ y: -8 }}
          >

            <ClipboardList className="text-teal-400 w-12 h-12" />


            <h3 className="mt-4 text-xl font-bold text-teal-400">
              Health Tracking
            </h3>


            <p className="mt-3 text-slate-400">
              Monitor and manage your health records securely.
            </p>


                    </motion.div>




          {/* Service Card 4 */}
          <motion.div
            className="p-6 rounded-2xl bg-slate-950 border border-slate-700 hover:border-teal-400 transition"
            whileHover={{ y: -8 }}
          >

            <Pill className="text-teal-400 w-12 h-12" />


            <h3 className="mt-4 text-xl font-bold text-teal-400">
              Medicine Support
            </h3>


            <p className="mt-3 text-slate-400">
              Manage prescriptions and medication information.
            </p>


          </motion.div>


        </motion.div>


      </section>





      {/* CTA Section */}
      <section className="px-8 py-20 bg-gradient-to-r from-teal-600 to-cyan-600">


        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >

          <h2 className="text-4xl font-bold">
            Ready to Take Control of Your Health?
          </h2>


          <p className="mt-4 text-lg text-teal-100">
            Join MedAlign and connect with healthcare professionals
            anytime, anywhere.
          </p>


          <button className="mt-8 px-10 py-3 bg-white text-teal-600 font-bold rounded-full hover:bg-slate-100 transition shadow-lg">
            Get Started
          </button>


        </motion.div>


      </section>





      {/* Footer */}
      <footer className="px-8 py-12 bg-slate-950 border-t border-slate-800">


        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">


          <div>

            <h2 className="text-3xl font-bold text-teal-400">
              MedAlign
            </h2>


            <p className="mt-4 text-slate-400">
              Connecting patients with smarter healthcare solutions.
            </p>


          </div>





          <div>

            <h3 className="text-xl font-bold">
              Quick Links
            </h3>


            <ul className="mt-4 space-y-3 text-slate-400">

              <li>Home</li>
              <li>Services</li>
              <li>About</li>
              <li>Contact</li>

            </ul>


          </div>





          <div>

            <h3 className="text-xl font-bold">
              Services
            </h3>


            <ul className="mt-4 space-y-3 text-slate-400">

              <li>Online Consultation</li>
              <li>Emergency Support</li>
              <li>Health Tracking</li>
              <li>Medicine Support</li>

            </ul>


          </div>





          <div>

            <h3 className="text-xl font-bold">
              Contact
            </h3>


            <p className="mt-4 text-slate-400">
              Email: support@medalign.com
            </p>


            <p className="mt-2 text-slate-400">
              Phone: +880 1234 567890
            </p>


          </div>


        </div>




        <div className="mt-10 pt-6 border-t border-slate-800 text-center text-slate-500">

          © 2026 MedAlign. All rights reserved.

        </div>


      </footer>


    </div>
  );
}


export default LandingPage;