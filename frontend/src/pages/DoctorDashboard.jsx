import { useEffect, useState } from "react";
import {
  Activity,
  ArrowRight,
  CalendarClock,
  Check,
  CheckCircle2,
  Clock3,
  FileText,
  LoaderCircle,
  Phone,
  RefreshCw,
  SkipForward,
  Stethoscope,
  UserRound,
  Users,
} from "lucide-react";
import api from "../api";
import MedAlignBrand from "../components/MedAlignBrand";

const formatTime = (value) => value
  ? new Intl.DateTimeFormat("en", { hour: "numeric", minute: "2-digit" }).format(new Date(value))
  : "-";

const initials = (name = "Patient") => name.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase();

function DoctorDashboard({ user, onLogout, onBack }) {
  const [dashboard, setDashboard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");
  const [isOffline, setIsOffline] = useState(false);

  const loadDashboard = async () => {
    setError("");
    try {
      const response = await api.get("/doctor/dashboard");
      setDashboard(response.data);
      setIsOffline(false);
    } catch (requestError) {
      setDashboard((current) => current || {
        doctor: { name: user?.name || "Doctor", specialization: "Clinic workspace" },
        current: null,
        queue: [],
        stats: { waiting: 0, completed_today: 0, average_wait: 0, consulted_today: 0 },
        recent_prescriptions: [],
      });
      setIsOffline(true);
      setError("");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initialLoad = window.setTimeout(loadDashboard, 0);
    const interval = window.setInterval(loadDashboard, 30000);
    return () => {
      window.clearTimeout(initialLoad);
      window.clearInterval(interval);
    };
  }, []);

  const updateQueue = async (url, data = {}) => {
    setIsUpdating(true);
    setError("");
    try {
      await api.request({ method: data ? "patch" : "post", url, data });
      await loadDashboard();
    } catch (requestError) {
      setError(requestError.response?.data?.message || "That queue action could not be completed.");
    } finally {
      setIsUpdating(false);
    }
  };

  const current = dashboard?.current;
  const profileName = dashboard?.doctor?.name || user?.name || "Doctor";

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-500"><LoaderCircle className="mr-3 h-5 w-5 animate-spin" /> Loading your clinic queue...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-white text-slate-900">
      <header className="border-b border-slate-200 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <div className="flex items-center gap-4">
            <MedAlignBrand onClick={onBack} label="Return to previous page" />
            <div className="hidden border-l border-slate-200 pl-4 sm:block">
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Doctor Dashboard</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={loadDashboard} title="Refresh dashboard" className="rounded-full border border-slate-200 bg-white p-2.5 text-slate-500 transition hover:border-blue-300 hover:text-blue-700"><RefreshCw className="h-4 w-4" /></button>
            <div className="hidden text-right sm:block"><p className="text-sm font-semibold">{profileName}</p><p className="text-xs text-slate-500">{dashboard?.doctor?.specialization}</p></div>
            <button onClick={onLogout} className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700" title="Sign out">{initials(profileName)}</button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        {isOffline && <div className="mb-6 flex items-center justify-between rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800"><span>Live clinic data is unavailable. Start the MySQL service to load the current queue.</span><button onClick={loadDashboard} aria-label="Retry loading dashboard" className="font-semibold underline">Retry</button></div>}
        {error && <div className="mb-6 flex items-center justify-between rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"><span>{error}</span><button onClick={() => setError("")} aria-label="Dismiss error">×</button></div>}

        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Metric icon={<CalendarClock />} label="Waiting now" value={dashboard?.stats?.waiting ?? 0} detail="Patients in the shared queue" tone="blue" />
          <Metric icon={<CheckCircle2 />} label="Completed today" value={dashboard?.stats?.completed_today ?? 0} detail="Consultations closed" tone="green" />
          <Metric icon={<Clock3 />} label="Average wait" value={`${dashboard?.stats?.average_wait ?? 0}m`} detail="Check-in to consultation" tone="indigo" />
          <Metric icon={<Activity />} label="Today's activity" value={dashboard?.stats?.consulted_today ?? 0} detail="Patients called or completed" tone="amber" />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div><p className="text-sm font-medium uppercase tracking-[0.18em] text-blue-600">Live consultation</p><h2 className="mt-2 text-2xl font-semibold">Current patient</h2><p className="mt-1 text-sm text-slate-500">The active token for your consultation room.</p></div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-700">{current ? "In consultation" : "Room available"}</span>
            </div>
            {current ? <div className="mt-8 rounded-3xl bg-slate-950 p-6 text-white sm:p-8"><div className="flex items-start justify-between gap-4"><div><p className="text-sm text-slate-400">Token</p><p className="mt-1 text-6xl font-semibold tracking-tight">{current.number}</p></div><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-300"><UserRound className="h-7 w-7" /></div></div><div className="mt-8 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xl font-semibold">{current.patient.name}</p><p className="mt-1 text-sm text-slate-400">Checked in {formatTime(current.check_in_time)} · {current.patient.phone}</p></div><p className="text-sm text-slate-400">Called {formatTime(current.called_time)}</p></div><div className="mt-7 flex flex-wrap gap-3"><button disabled={isUpdating} onClick={() => updateQueue(`/doctor/queue/${current.id}`, { status: "completed" })} className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 disabled:opacity-50"><Check className="h-4 w-4" /> Mark complete</button><button disabled={isUpdating} onClick={() => updateQueue(`/doctor/queue/${current.id}`, { status: "skipped" })} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 disabled:opacity-50"><SkipForward className="h-4 w-4" /> Skip patient</button></div></div> : <div className="mt-8 flex min-h-56 flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 text-center"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-700"><Clock3 className="h-7 w-7" /></div><p className="mt-4 font-semibold">Your consultation room is ready</p><p className="mt-1 max-w-xs text-sm text-slate-500">Call the next patient when you are ready to begin.</p></div>}
            <button disabled={isUpdating || Boolean(current) || !dashboard?.queue?.length} onClick={() => updateQueue("/doctor/queue/next", null)} className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-700 px-5 py-4 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"><Phone className="h-4 w-4" /> Call next patient <ArrowRight className="h-4 w-4" /></button>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8"><div className="flex items-start justify-between"><div><p className="text-sm font-medium uppercase tracking-[0.18em] text-blue-600">Up next</p><h2 className="mt-2 text-2xl font-semibold">Queue</h2><p className="mt-1 text-sm text-slate-500">Next five patients from reception.</p></div><Users className="h-6 w-6 text-blue-600" /></div><div className="mt-6 space-y-3">{dashboard?.queue?.length ? dashboard.queue.map((token, index) => <div key={token.id} className="flex items-center gap-3 rounded-2xl border border-slate-100 p-3"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-700">{token.number}</div><div className="min-w-0 flex-1"><p className="truncate font-medium">{token.patient.name}</p><p className="text-xs text-slate-500">Estimated wait {token.est_wait_time || index * (dashboard.doctor?.avg_consult_min || 15)} min</p></div><span className="text-xs font-medium text-slate-400">{formatTime(token.check_in_time)}</span></div>) : <div className="rounded-2xl bg-emerald-50 p-5 text-sm text-emerald-800">The queue is clear. New arrivals will appear here.</div>}</div></div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]"><div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-center gap-3"><div className="rounded-2xl bg-indigo-50 p-3 text-indigo-600"><FileText className="h-5 w-5" /></div><div><h2 className="text-lg font-semibold">Rapid Prescription Engine</h2><p className="text-sm text-slate-500">Continue to a patient prescription workflow.</p></div></div><button className="mt-6 inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"><FileText className="h-4 w-4" /> Open prescription engine <ArrowRight className="h-4 w-4" /></button></div><div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-center justify-between"><div><h2 className="text-lg font-semibold">Recent prescriptions</h2><p className="text-sm text-slate-500">Recently issued from your clinic.</p></div><CheckCircle2 className="h-5 w-5 text-emerald-600" /></div><div className="mt-5 grid gap-3 sm:grid-cols-2">{dashboard?.recent_prescriptions?.length ? dashboard.recent_prescriptions.map((prescription) => <div key={prescription.id} className="rounded-2xl bg-slate-50 p-4"><p className="font-medium">{prescription.patient}</p><p className="mt-1 text-xs text-slate-500">Issued {formatTime(prescription.issued_at)}</p></div>) : <p className="text-sm text-slate-500">No prescriptions issued yet.</p>}</div></div></section>
      </main>
    </div>
  );
}

function Metric({ icon, label, value, detail, tone }) {
  const colors = { blue: "bg-blue-50 text-blue-700", green: "bg-emerald-50 text-emerald-700", indigo: "bg-indigo-50 text-indigo-700", amber: "bg-amber-50 text-amber-700" };
  return <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${colors[tone]}`}>{icon}</div><p className="mt-5 text-sm font-medium text-slate-500">{label}</p><p className="mt-1 text-3xl font-semibold tracking-tight">{value}</p><p className="mt-2 text-sm text-slate-500">{detail}</p></div>;
}

export default DoctorDashboard;
