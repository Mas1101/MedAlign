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
  { number: "01", icon: Users, label: "Reception desk", text: "Patient checked in and token created." },
  { number: "02", icon: BellRing, label: "Queue tracker", text: "Patient receives updates as their turn approaches." },
  { number: "03", icon: Stethoscope, label: "Doctor dashboard", text: "Doctor calls, consults, and completes the visit." },
  { number: "04", icon: Pill, label: "Prescription delivery", text: "Digital prescription moves to the patient vault." },
];

function MarketingPage({ onBack, onAdminClick, onDoctorClick }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-white text-slate-900">
      <header className="border-b border-slate-200 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <MedAlignBrand onClick={onBack} />
          <div className="flex items-center gap-2 text-sm font-semibold text-blue-700"><HeartPulse className="h-5 w-5" /> Services</div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-14">
        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-600">One connected clinic</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">Every handoff, visible and ready.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">MedAlign connects the clinic floor, doctor workflow, prescriptions, and patient records in one calm operating view.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button onClick={onAdminClick} className="inline-flex items-center gap-2 rounded-full bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-600">Open Admin Dashboard <ArrowRight className="h-4 w-4" /></button>
              <button onClick={onDoctorClick} className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-700 transition hover:border-emerald-300 hover:bg-emerald-100">Open Doctor Dashboard <Stethoscope className="h-4 w-4" /></button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between"><div><p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Clinic pulse</p><h2 className="mt-2 text-xl font-semibold">A clearer day at a glance</h2></div><span className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Live system</span></div>
            <div className="mt-6 grid grid-cols-3 gap-3"><PulseMetric label="Queue" value="24" tone="blue" /><PulseMetric label="Doctors" value="18" tone="indigo" /><PulseMetric label="Wait" value="15m" tone="amber" /></div>
            <div className="mt-5 flex items-center gap-3 rounded-2xl bg-slate-950 p-4 text-white"><Activity className="h-5 w-5 text-emerald-300" /><div><p className="text-sm font-semibold">Operations stay in sync</p><p className="mt-1 text-xs text-slate-400">From check-in to medical vault</p></div><CheckCircle2 className="ml-auto h-5 w-5 text-emerald-300" /></div>
          </div>
        </section>

        <section className="mt-14"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">Service suite</p><h2 className="mt-2 text-2xl font-semibold">Built around the real clinic workflow</h2></div><p className="max-w-md text-sm leading-6 text-slate-500">Each workspace hands the right context to the next person, so patients do not disappear between steps.</p></div><div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">{services.map(({ icon: Icon, title, description, detail, tone }) => <ServiceCard key={title} icon={<Icon />} title={title} description={description} detail={detail} tone={tone} />)}</div></section>

        <section className="mt-14 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8"><div className="flex flex-wrap items-start justify-between gap-5"><div><p className="text-sm font-semibold uppercase tracking-[0.22em] text-indigo-600">Connected workflow</p><h2 className="mt-2 text-2xl font-semibold">From arrival to aftercare</h2></div><div className="flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700"><LayoutDashboard className="h-4 w-4" /> Four connected handoffs</div></div><div className="mt-8 grid gap-4 lg:grid-cols-4">{workflow.map(({ number, icon: Icon, label, text }, index) => <div key={label} className="relative rounded-2xl bg-slate-50 p-5"><div className="flex items-center justify-between"><span className="text-xs font-bold tracking-[0.2em] text-slate-400">{number}</span><Icon className="h-5 w-5 text-blue-600" /></div><h3 className="mt-7 font-semibold">{label}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>{index < workflow.length - 1 && <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 text-slate-300 lg:block" />}</div>)}</div></section>

        <section className="mt-6 grid gap-6 lg:grid-cols-2"><ActionPanel icon={<BarChart3 />} eyebrow="For clinic leaders" title="See the operation, not just the activity" text="Admin tools bring queue health, doctor availability, analytics, billing, and staff roles into one control surface." action="Go to Admin Dashboard" onClick={onAdminClick} tone="blue" /><ActionPanel icon={<ClipboardList />} eyebrow="For care teams" title="Give the consultation its own rhythm" text="The doctor workspace keeps the current patient prominent, the next five close at hand, and prescription work one step away." action="Go to Doctor Dashboard" onClick={onDoctorClick} tone="emerald" /></section>
      </main>
    </div>
  );
}

function PulseMetric({ label, value, tone }) {
  const tones = { blue: "bg-blue-50 text-blue-700", indigo: "bg-indigo-50 text-indigo-700", amber: "bg-amber-50 text-amber-700" };
  return <div className={`rounded-2xl p-4 ${tones[tone]}`}><p className="text-xs font-medium uppercase tracking-wider opacity-70">{label}</p><p className="mt-2 text-2xl font-semibold">{value}</p></div>;
}

function ServiceCard({ icon, title, description, detail, tone }) {
  const tones = { blue: "bg-blue-50 text-blue-700 border-blue-100", indigo: "bg-indigo-50 text-indigo-700 border-indigo-100", emerald: "bg-emerald-50 text-emerald-700 border-emerald-100", amber: "bg-amber-50 text-amber-700 border-amber-100" };
  return <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"><div className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${tones[tone]}`}>{icon}</div><div className="mt-6 flex items-center justify-between gap-3"><h3 className="font-semibold">{title}</h3><span className="text-xs font-semibold text-slate-400">{detail}</span></div><p className="mt-3 text-sm leading-6 text-slate-500">{description}</p></article>;
}

function ActionPanel({ icon, eyebrow, title, text, action, onClick, tone }) {
  const tones = tone === "blue" ? "bg-blue-700 hover:bg-blue-600" : "bg-emerald-600 hover:bg-emerald-500";
  return <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">{icon}</div><p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{eyebrow}</p><h2 className="mt-2 text-xl font-semibold">{title}</h2><p className="mt-3 max-w-lg text-sm leading-6 text-slate-500">{text}</p><button onClick={onClick} className={`mt-6 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition ${tones}`}>{action}<ArrowRight className="h-4 w-4" /></button></article>;
}

export default MarketingPage;
