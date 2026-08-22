import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Bell,
  FileText,
  Search,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  MessageSquare,
  QrCode,
  Download,
  Printer,
  ChevronRight,
  User,
  MapPin,
  Calendar,
  Stethoscope,
  ShieldCheck,
  Building2,
  Activity,
  ArrowRight,
  Filter,
  X,
  Lock,
  Key,
  RefreshCw,
  Sliders,
  Share2
} from "lucide-react";
import Navbar from "../components/Navbar";
import api from "../api";

// Initial Mock Data according to MedAlign ERD & Workflow
const MOCK_PATIENT = {
  patient_id: 1,
  name: "Eleanor Vance",
  phone: "+1 (555) 019-2834",
  email: "eleanor.vance@example.com",
  dob: "1990-05-14",
  gender: "Female"
};

const MOCK_TOKENS = [
  {
    token_id: 104,
    token_number: 104,
    clinic_name: "Metro Care Specialist Clinic",
    clinic_address: "742 Medical Center Blvd, Suite 400",
    doctor_name: "Dr. Sarah Jenkins",
    specialization: "Cardiology & Internal Medicine",
    counter_name: "Counter 2 (General OPD)",
    status: "waiting", // waiting | called | in_consultation | completed
    check_in_time: "10:15 AM",
    patients_ahead: 2,
    currently_serving: 102,
    est_wait_time: 15
  },
  {
    token_id: 102,
    token_number: 102,
    clinic_name: "Metro Care Specialist Clinic",
    clinic_address: "742 Medical Center Blvd, Suite 400",
    doctor_name: "Dr. Sarah Jenkins",
    specialization: "Cardiology & Internal Medicine",
    counter_name: "Counter 2 (General OPD)",
    status: "completed",
    check_in_time: "09:30 AM",
    patients_ahead: 0,
    currently_serving: 102,
    est_wait_time: 0
  }
];

const MOCK_PRESCRIPTIONS = [
  {
    prescription_id: 201,
    rx_code: "RX-2026-1048",
    issued_at: "2026-08-19",
    doctor_name: "Dr. Sarah Jenkins",
    doctor_title: "MD, FACC - Senior Cardiologist",
    clinic_name: "Metro Care Specialist Clinic",
    clinic_phone: "+1 (555) 234-5678",
    clinic_address: "742 Medical Center Blvd, Suite 400",
    notes: "Patient presented mild hypertension and seasonal sinus congestion. Drink plenty of water, maintain low sodium diet, and monitor blood pressure daily.",
    qr_code_hash: "QR-MED-994821-EV104",
    pdf_path: "#",
    items: [
      {
        item_id: 1,
        medicine_name: "Amoxicillin 500mg",
        dosage: "1 Capsule",
        frequency: "Three times daily (1-1-1)",
        duration: "7 Days",
        instructions: "Take after meals with a full glass of water."
      },
      {
        item_id: 2,
        medicine_name: "Loratadine 10mg",
        dosage: "1 Tablet",
        frequency: "Once daily (0-0-1)",
        duration: "10 Days",
        instructions: "Take at night before sleep."
      },
      {
        item_id: 3,
        medicine_name: "Lisinopril 10mg",
        dosage: "1 Tablet",
        frequency: "Once daily in morning (1-0-0)",
        duration: "30 Days",
        instructions: "Monitor BP weekly."
      }
    ]
  },
  {
    prescription_id: 198,
    rx_code: "RX-2026-0922",
    issued_at: "2026-07-22",
    doctor_name: "Dr. Robert Vance",
    doctor_title: "MD - General Practitioner",
    clinic_name: "Metro Care Specialist Clinic",
    clinic_phone: "+1 (555) 234-5678",
    clinic_address: "742 Medical Center Blvd, Suite 400",
    notes: "Routine quarterly health review. Lipid panel completed. EKG normal.",
    qr_code_hash: "QR-MED-883102-EV098",
    pdf_path: "#",
    items: [
      {
        item_id: 4,
        medicine_name: "Atorvastatin 10mg",
        dosage: "1 Tablet",
        frequency: "Once daily (0-0-1)",
        duration: "30 Days",
        instructions: "Take with evening meal."
      },
      {
        item_id: 5,
        medicine_name: "Multivitamin Complex",
        dosage: "1 Tablet",
        frequency: "Once daily (1-0-0)",
        duration: "60 Days",
        instructions: "Take with breakfast."
      }
    ]
  }
];

export default function PatientPage({ authenticated, user, onLogout, onLoginClick }) {
  const [activeTab, setActiveTab] = useState("tracker"); // tracker | alerts | vault
  const [searchQuery, setSearchQuery] = useState("104");
  const [currentToken, setCurrentToken] = useState(MOCK_TOKENS[0]);
  const [patient, setPatient] = useState(MOCK_PATIENT);
  
  // Alert Preferences state
  const [alerts, setAlerts] = useState({
    sms_enabled: true,
    whatsapp_enabled: true,
    near_turn_threshold: 3
  });
  const [alertSavedToast, setAlertSavedToast] = useState(false);

  // Vault state
  const [rxSearch, setRxSearch] = useState("");
  const [selectedRx, setSelectedRx] = useState(null);

  // Load from API if backend is running, otherwise use seamless mock state
  useEffect(() => {
    fetchPatientData(searchQuery);
  }, []);

  const fetchPatientData = async (query) => {
    try {
      const res = await api.get(`/patient/search?query=${encodeURIComponent(query)}`);
      if (res.data && res.data.success) {
        if (res.data.patient) setPatient(res.data.patient);
        if (res.data.latest_token) {
          const t = res.data.latest_token;
          setCurrentToken({
            token_id: t.token_id,
            token_number: t.token_number,
            clinic_name: t.doctor?.clinic?.name || "Metro Care Specialist Clinic",
            clinic_address: t.doctor?.clinic?.address || "742 Medical Center Blvd, Suite 400",
            doctor_name: t.doctor?.user?.name || "Dr. Sarah Jenkins",
            specialization: t.doctor?.specialization || "Cardiology & Internal Medicine",
            counter_name: t.counter?.counter_name || "Counter 2 (General OPD)",
            status: t.status || "waiting",
            check_in_time: t.check_in_time ? new Date(t.check_in_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "10:15 AM",
            patients_ahead: res.data.patients_ahead ?? 2,
            currently_serving: res.data.currently_serving ?? 102,
            est_wait_time: (res.data.patients_ahead ?? 2) * 12
          });
        }
        if (res.data.alert_preferences) {
          setAlerts(res.data.alert_preferences);
        }
      }
    } catch (e) {
      // Backend api offline or fallback mode
    }
  };

  const handleSearchToken = (e) => {
    e.preventDefault();
    const found = MOCK_TOKENS.find(
      (t) => t.token_number.toString() === searchQuery.trim() || t.token_id.toString() === searchQuery.trim()
    );
    if (found) {
      setCurrentToken(found);
    } else {
      fetchPatientData(searchQuery);
    }
  };

  const handleSaveAlerts = async () => {
    try {
      await api.post(`/patient/${patient.patient_id}/alerts`, alerts);
    } catch (e) {
      // offline fallback handled
    }
    setAlertSavedToast(true);
    setTimeout(() => setAlertSavedToast(false), 3500);
  };

  const filteredPrescriptions = MOCK_PRESCRIPTIONS.filter((rx) => {
    const q = rxSearch.toLowerCase();
    return (
      rx.rx_code.toLowerCase().includes(q) ||
      rx.doctor_name.toLowerCase().includes(q) ||
      rx.notes.toLowerCase().includes(q) ||
      rx.items.some((i) => i.medicine_name.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-white text-slate-900 font-sans pb-20 overflow-hidden">
      {/* Soft Ambient Background Glows matching Homepage */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute -left-32 top-28 h-80 w-80 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="absolute right-0 top-32 h-72 w-72 rounded-full bg-indigo-400/10 blur-3xl" />
        <div className="absolute left-1/2 bottom-24 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <Navbar authenticated={authenticated} user={user} onLogout={onLogout} onLoginClick={onLoginClick} />

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-24">
        {/* Top Header Banner */}
        <div className="mb-8 p-6 sm:p-8 rounded-3xl bg-white/90 border border-slate-200/80 shadow-lg backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/80 border border-blue-200 text-blue-700 text-xs font-semibold mb-3">
              <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              Patient Experience Portal (PWA)
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Welcome back, {patient.name}
            </h1>
            <p className="text-slate-600 mt-1 text-sm sm:text-base">
              Track live queue tokens, manage SMS/WhatsApp alerts, and access your digital medical vault.
            </p>
          </div>

          {/* Quick Lookup Form */}
          <form onSubmit={handleSearchToken} className="w-full md:w-auto flex items-center gap-2 bg-slate-100 p-2 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2 px-3 text-slate-500">
              <Search className="w-4 h-4 text-blue-600" />
              <input
                type="text"
                placeholder="Enter Token # or Phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-sm text-slate-900 focus:outline-none w-36 sm:w-44 placeholder-slate-400 font-medium"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-sky-700 to-indigo-600 hover:from-sky-600 hover:to-indigo-500 text-white shadow-md shadow-sky-500/20 transition cursor-pointer"
            >
              Track Token
            </button>
          </form>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex items-center gap-3 border-b border-slate-200/80 pb-4 mb-8 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab("tracker")}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "tracker"
                ? "bg-gradient-to-r from-sky-700 to-indigo-600 text-white shadow-lg shadow-sky-500/20 border border-sky-600"
                : "bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-slate-200 shadow-sm"
            }`}
          >
            <Clock className="w-4 h-4" />
            Live Queue Tracker
          </button>

          <button
            onClick={() => setActiveTab("alerts")}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "alerts"
                ? "bg-gradient-to-r from-sky-700 to-indigo-600 text-white shadow-lg shadow-sky-500/20 border border-sky-600"
                : "bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-slate-200 shadow-sm"
            }`}
          >
            <Bell className="w-4 h-4" />
            Alert Preferences
          </button>

          <button
            onClick={() => setActiveTab("vault")}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "vault"
                ? "bg-gradient-to-r from-sky-700 to-indigo-600 text-white shadow-lg shadow-sky-500/20 border border-sky-600"
                : "bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-slate-200 shadow-sm"
            }`}
          >
            <FileText className="w-4 h-4" />
            Medical Vault & Rx
          </button>
        </div>

        {/* Tab 1: Live Patient Queue Tracker (PWA) */}
        {activeTab === "tracker" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Near Turn Alert Banner if patients ahead <= 2 */}
            {currentToken.patients_ahead <= 2 && currentToken.status === "waiting" && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
                    <Bell className="w-5 h-5 animate-bounce" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-amber-950">Your Turn is Approaching!</h4>
                    <p className="text-xs text-amber-800">
                      There are only {currentToken.patients_ahead} patient(s) ahead of you. Please remain near {currentToken.counter_name}.
                    </p>
                  </div>
                </div>
                <span className="hidden sm:block text-xs font-semibold px-3 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-800">
                  Near Turn Notice
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Primary Token Card */}
              <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xl flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/40 blur-3xl pointer-events-none rounded-full" />
                
                <div>
                  <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Active Queue Token</span>
                      <h3 className="text-2xl font-bold text-slate-900 mt-1">{currentToken.clinic_name}</h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-blue-600" />
                        {currentToken.clinic_address}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        currentToken.status === "waiting"
                          ? "bg-sky-100 text-sky-700 border border-sky-200"
                          : currentToken.status === "called"
                          ? "bg-amber-100 text-amber-700 border border-amber-200"
                          : "bg-emerald-100 text-emerald-700 border border-emerald-200"
                      }`}>
                        <span className="h-1.5 w-1.5 rounded-full bg-current animate-ping" />
                        {currentToken.status.replace("_", " ")}
                      </span>
                    </div>
                  </div>

                  {/* Main Token Display Banner */}
                  <div className="my-8 text-center bg-gradient-to-br from-blue-50/70 via-slate-50 to-indigo-50/50 p-8 rounded-3xl border border-blue-100 relative shadow-inner">
                    <span className="text-sm font-semibold uppercase tracking-widest text-slate-500">Your Token Number</span>
                    <div className="text-6xl sm:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-blue-700 via-sky-600 to-indigo-700 bg-clip-text text-transparent my-2">
                      #{currentToken.token_number}
                    </div>
                    <div className="flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      Checked in at {currentToken.check_in_time}
                    </div>
                  </div>

                  {/* Status Timeline Stepper */}
                  <div className="py-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-4">
                      Live Consultation Flow
                    </span>
                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-emerald-500/20">
                          ✓
                        </div>
                        <span className="text-[11px] font-semibold text-emerald-700 mt-2">Check-in</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shadow-md ${
                          currentToken.status === "waiting" || currentToken.status === "called" || currentToken.status === "completed"
                            ? "bg-blue-600 text-white shadow-blue-500/20"
                            : "bg-slate-100 text-slate-400"
                        }`}>
                          2
                        </div>
                        <span className="text-[11px] font-semibold text-slate-700 mt-2">In Queue</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${
                          currentToken.status === "called" || currentToken.status === "completed"
                            ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
                            : "bg-slate-100 text-slate-400 border border-slate-200"
                        }`}>
                          3
                        </div>
                        <span className="text-[11px] font-medium text-slate-500 mt-2">Doctor Call</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${
                          currentToken.status === "completed"
                            ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                            : "bg-slate-100 text-slate-400 border border-slate-200"
                        }`}>
                          4
                        </div>
                        <span className="text-[11px] font-medium text-slate-500 mt-2">Complete</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-blue-600" />
                    <span>Attending: <strong className="text-slate-900">{currentToken.doctor_name}</strong> ({currentToken.specialization})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-indigo-600" />
                    <span>Location: <strong className="text-slate-900">{currentToken.counter_name}</strong></span>
                  </div>
                </div>
              </div>

              {/* Side Cards: Queue Stats & Estimated Wait */}
              <div className="space-y-6">
                {/* Stats Card 1: Patients Ahead */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xl">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider">Queue Position</span>
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-4xl font-extrabold text-slate-900">
                    {currentToken.patients_ahead}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Patient(s) ahead of you in line
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-700">
                    <span>Now Serving Token:</span>
                    <span className="font-bold text-blue-700 text-sm">#{currentToken.currently_serving}</span>
                  </div>
                </div>

                {/* Stats Card 2: Estimated Wait Time */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xl">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider">Estimated Wait</span>
                    <Clock className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="text-4xl font-extrabold text-slate-900">
                    ~{currentToken.est_wait_time} <span className="text-lg font-normal text-slate-500">mins</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Based on average consult time (~12 mins/patient)
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-700">
                    <span>Alert Status:</span>
                    <span className="font-semibold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> SMS & WA Active
                    </span>
                  </div>
                </div>

                {/* Quick Action Button */}
                <button
                  onClick={() => setActiveTab("alerts")}
                  className="w-full py-3.5 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-sm font-semibold text-slate-700 flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Bell className="w-4 h-4 text-blue-600" />
                  Customize Alert Threshold
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 2: Alert Preferences */}
        {activeTab === "alerts" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xl">
              <div className="flex items-center gap-3 pb-6 border-b border-slate-100 mb-6">
                <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 text-blue-700">
                  <Bell className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Near-Turn Notification Settings</h3>
                  <p className="text-xs text-slate-500">
                    Set how and when MedAlign sends automated updates to your mobile phone.
                  </p>
                </div>
              </div>

              {alertSavedToast && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-3 text-sm shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Preferences saved! You will receive live alerts when your turn approaches.</span>
                </div>
              )}

              <div className="space-y-6">
                {/* SMS Toggle */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-white text-blue-600 shadow-sm border border-slate-200">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">SMS Notifications</h4>
                      <p className="text-xs text-slate-500">Receive text messages on {patient.phone}</p>
                    </div>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={alerts.sms_enabled}
                      onChange={(e) => setAlerts({ ...alerts, sms_enabled: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {/* WhatsApp Toggle */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-white text-emerald-600 shadow-sm border border-slate-200">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">WhatsApp Notifications</h4>
                      <p className="text-xs text-slate-500">Receive instant queue updates & digital Rx via WhatsApp</p>
                    </div>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={alerts.whatsapp_enabled}
                      onChange={(e) => setAlerts({ ...alerts, whatsapp_enabled: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>

                {/* Near Turn Threshold Selector */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">Near-Turn Threshold</h4>
                      <p className="text-xs text-slate-500">Notify me when this number of patients remain ahead of me</p>
                    </div>
                    <span className="px-3 py-1 rounded-xl bg-blue-100 text-blue-800 font-bold text-sm border border-blue-200">
                      {alerts.near_turn_threshold} Patients Ahead
                    </span>
                  </div>

                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={alerts.near_turn_threshold}
                    onChange={(e) => setAlerts({ ...alerts, near_turn_threshold: parseInt(e.target.value) })}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />

                  <div className="flex justify-between text-[11px] text-slate-500 font-medium px-1">
                    <span>1 Patient (Immediate)</span>
                    <span>2 Patients</span>
                    <span>3 Patients (Recommended)</span>
                    <span>4 Patients</span>
                    <span>5 Patients</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
                <button
                  onClick={handleSaveAlerts}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-700 to-indigo-600 hover:from-sky-600 hover:to-indigo-500 text-white font-semibold text-sm shadow-md shadow-sky-500/20 transition cursor-pointer"
                >
                  Save Alert Preferences
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 3: Patient Medical Vault */}
        {activeTab === "vault" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Search and Filters for Prescriptions */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by Rx code, medicine, or doctor..."
                  value={rxSearch}
                  onChange={(e) => setRxSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-500 placeholder-slate-400 font-medium"
                />
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto justify-end text-xs text-slate-600 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Encrypted & Verified Digital Health Records</span>
              </div>
            </div>

            {/* Prescriptions List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPrescriptions.map((rx) => (
                <div
                  key={rx.prescription_id}
                  className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xl hover:shadow-2xl transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <div>
                        <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">{rx.rx_code}</span>
                        <h4 className="text-lg font-bold text-slate-900 mt-1">{rx.doctor_name}</h4>
                        <p className="text-xs text-slate-500">{rx.doctor_title}</p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-600 font-medium">
                        {rx.issued_at}
                      </span>
                    </div>

                    <div className="my-4 space-y-2">
                      <span className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Prescribed Medicines</span>
                      <div className="flex flex-wrap gap-2">
                        {rx.items.map((item) => (
                          <span
                            key={item.item_id}
                            className="px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold"
                          >
                            {item.medicine_name}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      "{rx.notes}"
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 flex items-center gap-1 font-mono">
                      <QrCode className="w-3.5 h-3.5 text-blue-600" /> {rx.qr_code_hash}
                    </span>

                    <button
                      onClick={() => setSelectedRx(rx)}
                      className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 font-semibold text-xs flex items-center gap-1.5 transition cursor-pointer"
                    >
                      View Digital Rx <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Prescription Detail Modal / Sheet */}
        <AnimatePresence>
          {selectedRx && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-2xl bg-white text-slate-900 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[90vh] overflow-y-auto my-8 border border-slate-200"
              >
                {/* Rx Header */}
                <div className="flex items-start justify-between pb-6 border-b border-slate-200">
                  <div>
                    <h2 className="text-2xl font-bold text-blue-900">{selectedRx.clinic_name}</h2>
                    <p className="text-xs text-slate-500 mt-1">{selectedRx.clinic_address} • {selectedRx.clinic_phone}</p>
                  </div>

                  <button
                    onClick={() => setSelectedRx(null)}
                    className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Doctor & Patient Info Grid */}
                <div className="grid grid-cols-2 gap-4 py-4 border-b border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 uppercase font-semibold text-[10px]">Prescribing Doctor</span>
                    <p className="font-bold text-slate-800 text-sm mt-0.5">{selectedRx.doctor_name}</p>
                    <p className="text-slate-500">{selectedRx.doctor_title}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 uppercase font-semibold text-[10px]">Patient Information</span>
                    <p className="font-bold text-slate-800 text-sm mt-0.5">{patient.name}</p>
                    <p className="text-slate-500">{patient.gender} • DOB: {patient.dob}</p>
                  </div>
                </div>

                {/* Prescription Code & Date */}
                <div className="flex items-center justify-between py-3 text-xs text-slate-600 bg-slate-50 px-4 rounded-xl my-4 border border-slate-100 font-medium">
                  <span>Rx Reference: <strong className="text-slate-900">{selectedRx.rx_code}</strong></span>
                  <span>Issued Date: <strong className="text-slate-900">{selectedRx.issued_at}</strong></span>
                </div>

                {/* Prescribed Medicines Table */}
                <div className="my-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                    Prescribed Medication & Dosage
                  </h4>
                  <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                        <tr>
                          <th className="p-3">Medicine</th>
                          <th className="p-3">Dosage</th>
                          <th className="p-3">Frequency</th>
                          <th className="p-3">Duration</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {selectedRx.items.map((item) => (
                          <tr key={item.item_id}>
                            <td className="p-3 font-semibold text-slate-900">{item.medicine_name}</td>
                            <td className="p-3 text-slate-600">{item.dosage}</td>
                            <td className="p-3 text-slate-600">{item.frequency}</td>
                            <td className="p-3 text-slate-600">{item.duration}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Advice / Clinical Notes */}
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-950 mb-6">
                  <strong className="block font-bold mb-1 text-blue-900">Clinical Notes & Instructions:</strong>
                  <p>{selectedRx.notes}</p>
                </div>

                {/* QR Code Verification Footer */}
                <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-900 rounded-xl text-white">
                      <QrCode className="w-8 h-8" />
                    </div>
                    <div className="text-[11px] text-slate-500">
                      <span className="font-semibold text-slate-800 block">Verified Digital Prescription</span>
                      Hash: {selectedRx.qr_code_hash}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => window.print()}
                      className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" /> Print
                    </button>
                    <button
                      onClick={() => alert("Downloading official PDF prescription document...")}
                      className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <Download className="w-3.5 h-3.5" /> Download PDF
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
