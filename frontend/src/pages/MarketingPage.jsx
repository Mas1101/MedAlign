import MedAlignBrand from "../components/MedAlignBrand";
import {
  Activity,
  ArrowRight,
  BarChart3,
  BellRing,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  FileText,
  HeartPulse,
  LayoutDashboard,
  Pill,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";

const services = [
  { icon: CalendarClock, title: "Queue Management", description: "Keep reception, counters, and consultation rooms aligned in real time.", detail: "Live patient flow", tone: "blue" },
  { icon: Stethoscope, title: "Doctor Workspace", description: "Give every clinician a focused view of current patients and what is next.", detail: "Doctor dashboard", tone: "indigo" },
  { icon: FileText, title: "Rapid Prescriptions", description: "Move from completed consultation to a clear digital prescription in seconds.", detail: "Prescription engine", tone: "emerald" },
  { icon: ShieldCheck, title: "Medical Vault", description: "Keep patient history and post-consultation records organized and protected.", detail: "Secure records", tone: "amber" },
];

const workflow = [
  { number: "01", icon: Users, label: "Reception Desk", text: "Patient checked in and 6-digit token created." },
  { number: "02", icon: BellRing, label: "Queue Tracker", text: "Patient receives SMS/WhatsApp updates as turn approaches." },
  { number: "03", icon: Stethoscope, label: "Doctor Dashboard", text: "Doctor calls, consults, and completes the visit." },
  { number: "04", icon: Pill, label: "Prescription Delivery", text: "Digital prescription moves to the patient vault." },
];

function MarketingPage({ onBack, onAdminClick, onDoctorClick }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50/40 to-white text-slate-900">
      <header className="border-b border-slate-200 bg-white/85 backdrop-blur-xl sticky top-0 z-30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <MedAlignBrand onClick={onBack} label="Return to home" />
          <div className="flex items-center gap-2 text-xs font-bold text-sky-700 bg-sky-50 border border-sky-200/80 px-3.5 py-1.5 rounded-full">
            <HeartPulse className="h-4 w-4" /> Platform Services
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-14 space-y-12">
        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.28em] text-sky-600">One Connected Healthcare Engine</span>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">Every handoff, visible and synchronized.</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
              MedAlign seamlessly connects the outpatient waiting lobby, doctor consultation workspace, digital prescription signing, and patient medical vault into one coherent operating system.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button onClick={onAdminClick} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-700 to-indigo-600 hover:from-sky-600 hover:to-indigo-500 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-sky-700/20 transition cursor-pointer">
                Open Admin Console <ArrowRight className="h-4 w-4" />
              </button>
              <button onClick={onDoctorClick} className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 px-5 py-3 text-xs font-bold text-emerald-700 transition cursor-pointer">
                Open Doctor Workspace <Stethoscope className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Live Clinic Pulse</p>
                <h2 className="mt-1 text-lg font-bold text-slate-900">Real-Time Throughput</h2>
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-xs font-bold text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> Live System
              </span>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              <PulseMetric label="Active Queue" value="24" tone="blue" />
              <PulseMetric label="On-Duty Doctors" value="18" tone="indigo" />
              <PulseMetric label="Avg Wait Time" value="14m" tone="amber" />
            </div>
            <div className="mt-5 flex items-center gap-3 rounded-2xl bg-slate-950 p-4 text-white">
              <Activity className="h-5 w-5 text-emerald-300 shrink-0" />
              <div>
                <p className="text-xs font-bold">End-to-End Coordination</p>
                <p className="text-[11px] text-slate-400">From counter check-in to secure medical vault</p>
              </div>
              <CheckCircle2 className="ml-auto h-5 w-5 text-emerald-300 shrink-0" />
            </div>
          </div>
        </section>

        <section>
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-sky-600">Core Capabilities</span>
              <h2 className="mt-1 text-2xl font-bold text-slate-950">Built around real clinical workflows</h2>
            </div>
            <p className="max-w-md text-xs leading-relaxed text-slate-500">Each role gets the exact contextual tools needed to eliminate waiting bottlenecks.</p>
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {services.map(({ icon: Icon, title, description, detail, tone }) => (
              <ServiceCard key={title} icon={<Icon className="h-5 w-5" />} title={title} description={description} detail={detail} tone={tone} />
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-indigo-600">Connected Workflow</span>
              <h2 className="mt-1 text-2xl font-bold text-slate-950">From Arrival to Aftercare</h2>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-100 px-3 py-1.5 text-xs font-bold text-indigo-700">
              <LayoutDashboard className="h-4 w-4" /> 4 Connected Stages
            </div>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-4">
            {workflow.map(({ number, icon: Icon, label, text }, index) => (
              <div key={label} className="relative rounded-2xl bg-slate-50 p-5 border border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold tracking-[0.2em] text-slate-400">{number}</span>
                  <Icon className="h-5 w-5 text-sky-600" />
                </div>
                <h3 className="mt-6 font-bold text-sm text-slate-900">{label}</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">{text}</p>
                {index < workflow.length - 1 && <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 text-slate-300 lg:block" />}
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <ActionPanel icon={<BarChart3 className="h-6 w-6" />} eyebrow="For Clinic Leadership" title="Live operational analytics" text="Bring queue health, clinician availability, daily walkout rates, and staff permissions into one centralized console." action="Launch Admin Console" onClick={onAdminClick} tone="blue" />
          <ActionPanel icon={<ClipboardList className="h-6 w-6" />} eyebrow="For Healthcare Providers" title="Focused consultation workspace" text="Keep the active patient front and center, review medical records, and issue prescription items in seconds." action="Launch Doctor Workspace" onClick={onDoctorClick} tone="emerald" />
        </section>
      </main>
    </div>
  );
}

function PulseMetric({ label, value, tone }) {
  const tones = { blue: "bg-sky-50 text-sky-700 border-sky-100", indigo: "bg-indigo-50 text-indigo-700 border-indigo-100", amber: "bg-amber-50 text-amber-700 border-amber-100" };
  return (
    <div className={`rounded-2xl p-4 border ${tones[tone]}`}>
      <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">{label}</p>
      <p className="mt-2 text-2xl font-extrabold">{value}</p>
    </div>
  );
}

function ServiceCard({ icon, title, description, detail, tone }) {
  const tones = {
    blue: "bg-sky-50 text-sky-700 border-sky-200/60",
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-200/60",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
    amber: "bg-amber-50 text-amber-700 border-amber-200/60"
  };
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${tones[tone]}`}>{icon}</div>
      <div className="mt-5 flex items-center justify-between gap-3">
        <h3 className="font-bold text-sm text-slate-900">{title}</h3>
        <span className="text-[10px] font-bold uppercase text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{detail}</span>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-slate-500">{description}</p>
    </article>
  );
}

function ActionPanel({ icon, eyebrow, title, text, action, onClick, tone }) {
  const tones = tone === "blue" ? "bg-gradient-to-r from-sky-700 to-indigo-600 hover:from-sky-600 hover:to-indigo-500" : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500";
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8 flex flex-col justify-between">
      <div>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">{icon}</div>
        <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{eyebrow}</p>
        <h2 className="mt-1 text-xl font-bold text-slate-950">{title}</h2>
        <p className="mt-2 text-xs leading-relaxed text-slate-500">{text}</p>
      </div>
      <button onClick={onClick} className={`mt-6 inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs font-bold text-white shadow-md transition cursor-pointer ${tones}`}>
        {action} <ArrowRight className="h-4 w-4" />
      </button>
    </article>
  );
}

export default MarketingPage;