import { useState } from "react";
import { ArrowRight, Building2, CalendarCheck, Check, CheckCircle2, ChevronLeft, Clock3, CreditCard, HeartPulse, KeyRound, ShieldCheck, Stethoscope, UserRound, Users } from "lucide-react";
import MedAlignBrand from "../components/MedAlignBrand";

const doctors = [
  { name: "Dr. Sarah Ahmed", specialty: "Cardiology", clinic: "MedAlign Health Centre", availability: "Available today", slots: ["09:30 AM", "11:00 AM", "02:30 PM"] },
  { name: "Dr. Rahim Khan", specialty: "Neurology", clinic: "MedAlign Central", availability: "Tomorrow", slots: ["10:00 AM", "01:00 PM", "04:00 PM"] },
  { name: "Dr. Emily Wilson", specialty: "Pediatrics", clinic: "Family Care Clinic", availability: "Available today", slots: ["09:00 AM", "12:30 PM", "03:00 PM"] },
];

const clinicSteps = ["Clinic Info", "Doctors", "Plan", "Payment"];
const patientSteps = ["Doctor", "Slot", "Payment", "OTP Verification"];

function GetStartedPage({ onBack, onDoctorClick, onPatientClick }) {
  const [path, setPath] = useState(null);
  const [step, setStep] = useState(1);
  const [completed, setCompleted] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [plan, setPlan] = useState("Professional");

  const steps = path === "clinic" ? clinicSteps : patientSteps;
  const choosePath = (nextPath) => { setPath(nextPath); setStep(1); setCompleted(false); };
  const continueFlow = () => setStep((current) => current === 4 ? current : current + 1);
  const finishFlow = () => setCompleted(true);
  const resetFlow = () => { setPath(null); setStep(1); setCompleted(false); setSelectedDoctor(null); setSelectedSlot(""); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50/30 to-white text-slate-900">
      <header className="border-b border-slate-200 bg-white/85 backdrop-blur-xl sticky top-0 z-30">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-10">
          <MedAlignBrand onClick={onBack} label="Return home" />
          <div className="flex items-center gap-2 text-xs font-bold text-sky-700 bg-sky-50 border border-sky-200/80 px-3.5 py-1.5 rounded-full">
            <HeartPulse className="h-4 w-4" /> Quick Onboarding
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10 lg:px-10 lg:py-14">
        {!path && (
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-sky-600">MedAlign Onboarding</span>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">How would you like to get started?</h1>
            <p className="mt-3 text-base text-slate-600">Select your role to begin quick clinic setup or patient appointment booking.</p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <button
                onClick={() => choosePath("clinic")}
                className="group rounded-3xl border border-slate-200 bg-white p-8 text-left shadow-sm transition hover:-translate-y-1 hover:border-sky-500 hover:shadow-xl cursor-pointer"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-sky-700 group-hover:bg-sky-600 group-hover:text-white transition">
                  <Building2 className="h-7 w-7" />
                </div>
                <h2 className="mt-6 text-xl font-bold text-slate-950">I represent a Clinic</h2>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">Deploy queue counters, manage department rosters, and configure automated patient alerts.</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-sky-700">Setup Clinic Workspace →</span>
              </button>

              <button
                onClick={() => choosePath("patient")}
                className="group rounded-3xl border border-slate-200 bg-white p-8 text-left shadow-sm transition hover:-translate-y-1 hover:border-emerald-500 hover:shadow-xl cursor-pointer"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition">
                  <UserRound className="h-7 w-7" />
                </div>
                <h2 className="mt-6 text-xl font-bold text-slate-950">I am a Patient</h2>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">Find doctors, get live digital queue tickets, and view your prescription medical vault.</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700">Book Visit & Get Token →</span>
              </button>
            </div>
          </div>
        )}

        {path && !completed && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <button onClick={resetFlow} className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-900 cursor-pointer">
                <ChevronLeft className="h-4 w-4" /> Change Path
              </button>
              <div className="flex items-center gap-2">
                {steps.map((label, idx) => (
                  <div key={label} className="flex items-center gap-2">
                    <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${step === idx + 1 ? "bg-sky-600 text-white" : step > idx + 1 ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-600"}`}>
                      {step > idx + 1 ? <Check className="h-3 w-3" /> : idx + 1}
                    </span>
                    <span className={`text-xs font-semibold hidden sm:inline ${step === idx + 1 ? "text-slate-900" : "text-slate-400"}`}>{label}</span>
                    {idx < steps.length - 1 && <span className="h-px w-4 bg-slate-200" />}
                  </div>
                ))}
              </div>
            </div>

            <FlowPanel path={path} step={step} plan={plan} setPlan={setPlan} selectedDoctor={selectedDoctor} setSelectedDoctor={setSelectedDoctor} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />

            <div className="flex justify-between items-center border-t border-slate-200 pt-6">
              <button disabled={step === 1} onClick={() => setStep((s) => s - 1)} className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 cursor-pointer">
                Back
              </button>
              {step < 4 ? (
                <button onClick={continueFlow} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-700 to-indigo-600 hover:from-sky-600 hover:to-indigo-500 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-sky-500/20 cursor-pointer">
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button onClick={finishFlow} className="inline-flex items-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-600/20 cursor-pointer">
                  Finish & Launch <Check className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {completed && <CompleteScreen path={path} onReset={resetFlow} onDoctorClick={onDoctorClick} onPatientClick={onPatientClick} />}
      </main>
    </div>
  );
}

function FlowPanel({ path, step, ...props }) {
  return path === "clinic" ? <ClinicStep step={step} {...props} /> : <PatientStep step={step} {...props} />;
}

function ClinicStep({ step, plan, setPlan }) {
  if (step === 1) return <Panel icon={<Building2 />} eyebrow="Step 1 · Clinic Info" title="Tell us about your facility"><div className="grid gap-4 sm:grid-cols-2"><Field label="Clinic Name" placeholder="MedAlign Health Centre" /><Field label="Address" placeholder="24 Crescent Road" /><Field label="Primary Specialty" placeholder="Multi-Specialty Healthcare" /><Field label="Phone Number" placeholder="+1 555 0100" /></div></Panel>;
  if (step === 2) return <Panel icon={<Users />} eyebrow="Step 2 · Add Clinicians" title="Roster your medical team"><div className="grid gap-4 sm:grid-cols-2"><Field label="Doctor Full Name" placeholder="Dr. Sarah Ahmed" /><Field label="Specialization" placeholder="Cardiology" /><Field label="Operating Days" placeholder="Mon - Sat" /><Field label="Consultation Slot" placeholder="15 Minutes" /></div></Panel>;
  if (step === 3) return <Panel icon={<ShieldCheck />} eyebrow="Step 3 · Subscription Tier" title="Select your operating tier"><div className="grid gap-4 md:grid-cols-3">{[["Starter", "$49", "For small clinics"], ["Professional", "$149", "Most popular for multi-doctor facilities"], ["Enterprise", "Custom", "Multi-site healthcare networks"]].map(([name, price, text]) => <button key={name} onClick={() => setPlan(name)} className={`rounded-2xl border p-5 text-left transition cursor-pointer ${plan === name ? "border-sky-600 bg-sky-50 ring-2 ring-sky-100" : "border-slate-200 bg-white"}`}><span className="font-bold text-slate-900">{name}</span><p className="mt-4 text-2xl font-extrabold text-slate-950">{price}<span className="text-xs font-normal text-slate-500"> / mo</span></p><p className="mt-2 text-xs text-slate-500">{text}</p></button>)}</div></Panel>;
  return <Panel icon={<CreditCard />} eyebrow="Step 4 · Confirmation" title="Activate clinic workspace"><div className="rounded-2xl bg-sky-50 border border-sky-100 p-4 text-xs font-medium text-sky-900">Your {plan} workspace is ready for activation. Complete verification to begin managing live queues.</div><div className="mt-4 grid gap-4 sm:grid-cols-2"><Field label="Administrator Name" placeholder="Dr. Alexander Vance" /><Field label="Admin Contact Email" placeholder="admin@medalign.test" /></div></Panel>;
}

function PatientStep({ step, selectedDoctor, setSelectedDoctor, selectedSlot, setSelectedSlot }) {
  if (step === 1) return <Panel icon={<Stethoscope />} eyebrow="Step 1 · Specialist Selection" title="Select a doctor"><div className="grid gap-3">{doctors.map((doctor) => <button key={doctor.name} onClick={() => { setSelectedDoctor(doctor); setSelectedSlot(""); }} className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition cursor-pointer ${selectedDoctor?.name === doctor.name ? "border-sky-600 bg-sky-50" : "border-slate-200 bg-white"}`}><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-sky-700 font-bold"><UserRound className="h-5 w-5" /></div><div className="min-w-0 flex-1"><p className="font-bold text-sm text-slate-900">{doctor.name}</p><p className="text-xs text-sky-700">{doctor.specialty} · {doctor.clinic}</p></div><span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">{doctor.availability}</span></button>)}</div></Panel>;
  if (step === 2) return <Panel icon={<CalendarCheck />} eyebrow="Step 2 · Consultation Slot" title="Choose arrival window"><div className="rounded-2xl bg-slate-50 p-4"><p className="font-bold text-sm text-slate-900">{selectedDoctor?.name || "Dr. Sarah Ahmed"}</p><p className="text-xs text-slate-500">{selectedDoctor?.specialty || "Cardiology"} · Walk-in queue slot</p></div><div className="mt-4 grid gap-3 sm:grid-cols-3">{(selectedDoctor?.slots || ["09:00 AM", "11:30 AM", "03:00 PM"]).map((slot) => <button key={slot} onClick={() => setSelectedSlot(slot)} className={`rounded-2xl border p-4 text-xs font-bold transition cursor-pointer ${selectedSlot === slot ? "border-sky-600 bg-sky-700 text-white" : "border-slate-200 bg-white text-slate-700"}`}><Clock3 className="mx-auto mb-1.5 h-4 w-4" />{slot}</button>)}</div></Panel>;
  if (step === 3) return <Panel icon={<CreditCard />} eyebrow="Step 3 · Details" title="Patient Information"><div className="grid gap-4 sm:grid-cols-2"><Field label="Patient Name" placeholder="Amina Yusuf" /><Field label="Phone Number" placeholder="+1 555 0101" /></div></Panel>;
  return <Panel icon={<KeyRound />} eyebrow="Step 4 · Verification" title="Generate Queue Token"><p className="text-xs text-slate-500">Your token will be issued immediately and synchronized with the clinic live board.</p><div className="mt-4 rounded-2xl bg-emerald-50 border border-emerald-200 p-5 text-center"><span className="text-xs font-bold uppercase text-emerald-800 tracking-wider">Estimated Queue Token</span><p className="mt-2 text-4xl font-extrabold text-emerald-700">#107</p></div></Panel>;
}

function Panel({ icon, eyebrow, title, children }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">{icon}</div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">{eyebrow}</p>
          <h2 className="text-lg font-bold text-slate-950">{title}</h2>
        </div>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Field({ label, placeholder }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">{label}</span>
      <input placeholder={placeholder} className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100" />
    </label>
  );
}

function CompleteScreen({ path, onReset, onDoctorClick, onPatientClick }) {
  const clinic = path === "clinic";
  return (
    <div className="mx-auto max-w-2xl text-center py-8">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700">
        <CheckCircle2 className="h-8 w-8" />
      </div>
      <span className="mt-6 inline-block text-xs font-bold uppercase tracking-[0.25em] text-emerald-600">{clinic ? "Clinic Onboarding Complete" : "Queue Token Issued"}</span>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">{clinic ? "Workspace Ready!" : "You're Checked In!"}</h1>
      <p className="mx-auto mt-3 max-w-md text-sm text-slate-600">
        {clinic ? "Your clinic workspace has been established. Log into your doctor desk or admin console to start managing queues." : "Your consultation token is active. Track your turn live on the Patient Portal."}
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {clinic ? (
          <button onClick={onDoctorClick} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-700 to-indigo-600 px-6 py-3 text-xs font-bold text-white shadow-md shadow-sky-500/20 cursor-pointer">
            Go to Doctor Workspace <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button onClick={onPatientClick} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3 text-xs font-bold text-white shadow-md shadow-emerald-600/20 cursor-pointer">
            Open Patient Portal <ArrowRight className="h-4 w-4" />
          </button>
        )}
        <button onClick={onReset} className="rounded-full border border-slate-200 bg-white px-6 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer">
          Start Another Flow
        </button>
      </div>
    </div>
  );
}

export default GetStartedPage;
