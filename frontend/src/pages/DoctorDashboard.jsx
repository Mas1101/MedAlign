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
  LogOut,
} from "lucide-react";
import api from "../api";
import MedAlignBrand from "../components/MedAlignBrand";

const formatTime = (value) => value
  ? new Intl.DateTimeFormat("en", { hour: "numeric", minute: "2-digit" }).format(new Date(value))
  : "-";

function DoctorDashboard({ user, onLogout, onBack }) {
  const [dashboard, setDashboard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");
  const [isOffline, setIsOffline] = useState(false);

  const loadDashboard = async () => {
    setError("");
    try {
      const response = await api.get("/doctor/queue-snapshot");
      setDashboard(response.data);
      setIsOffline(false);
    } catch (requestError) {
      setDashboard((current) => current || {
        doctor: { name: user?.name || "Dr. Sarah Ahmed", specialization: "Cardiology" },
        current: null,
        queue: [],
        stats: { waiting: 0, completed_today: 0, average_wait: 0, consulted_today: 0 },
        recent_prescriptions: [],
      });
      setIsOffline(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
    const interval = window.setInterval(loadDashboard, 15000);
    return () => {
      window.clearInterval(interval);
    };
  }, []);

  const updateQueue = async (path, body) => {
    setIsUpdating(true);
    setError("");
    try {
      if (body) {
        await api.patch(path, body);
      } else {
        await api.post(path);
      }
      await loadDashboard();
    } catch (updateError) {
      setError(updateError?.response?.data?.message || "Failed to update queue. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const current = dashboard?.current;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-white text-slate-900">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <div className="flex items-center gap-4">
            <MedAlignBrand onClick={onBack} label="Back to main page" />
            <div className="h-6 w-px bg-slate-200 hidden sm:block" />
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200/60">
                Clinician Workspace
              </span>
              <h1 className="text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
                {dashboard?.doctor?.name || user?.name || "Dr. Consultation Desk"}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadDashboard}
              disabled={isLoading}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin text-sky-600' : ''}`} />
              <span>Refresh Queue</span>
            </button>
            {onLogout && (
              <button
                onClick={onLogout}
                className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 hover:bg-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Sign Out</span>
              </button>
            )}
            {onBack && (
              <button
                onClick={onBack}
                className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 cursor-pointer"
              >
                ← Back
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8 lg:px-10 space-y-8">
        {isOffline && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800 flex items-center justify-between">
            <span>Running in offline-fallback mode. Ensure MySQL backend container is active.</span>
            <button onClick={loadDashboard} className="font-bold underline cursor-pointer">Retry Connection</button>
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700 flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError("")} className="font-bold cursor-pointer">✕</button>
          </div>
        )}

        {/* Metrics Row */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Metric icon={<CalendarClock className="h-5 w-5" />} label="Waiting in Queue" value={dashboard?.stats?.waiting ?? 0} detail="Patients in department" tone="blue" />
          <Metric icon={<CheckCircle2 className="h-5 w-5" />} label="Completed Today" value={dashboard?.stats?.completed_today ?? 0} detail="Consultations finished" tone="green" />
          <Metric icon={<Clock3 className="h-5 w-5" />} label="Avg Consultation" value={`${dashboard?.doctor?.avg_consult_min ?? 15}m`} detail="Standard time slot" tone="indigo" />
          <Metric icon={<Activity className="h-5 w-5" />} label="Total Consulted" value={dashboard?.stats?.consulted_today ?? 0} detail="Called or finished today" tone="amber" />
        </section>

        {/* Live Consultation & Next Up */}
        <section className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          {/* Active Patient Room */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-sky-600">Active Consultation Desk</p>
                <h2 className="mt-1 text-2xl font-bold text-slate-950">Current Patient</h2>
                <p className="text-xs text-slate-500">Live token assigned to your consultation chamber</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${current ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"}`}>
                {current ? "In Consultation" : "Chamber Ready"}
              </span>
            </div>

            {current ? (
              <div className="mt-6 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 p-6 text-white sm:p-8 shadow-xl">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-sky-400">Token Number</span>
                    <p className="mt-1 text-6xl font-extrabold tracking-tight text-white">{current.number}</p>
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-500/20 text-sky-300">
                    <UserRound className="h-7 w-7" />
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-xl font-bold text-white">{current.patient?.name}</p>
                    <p className="text-xs text-slate-400 mt-1">Checked in {formatTime(current.check_in_time)} · Phone: {current.patient?.phone}</p>
                  </div>
                  <p className="text-xs text-sky-300 font-medium">Called at {formatTime(current.called_time)}</p>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    disabled={isUpdating}
                    onClick={() => updateQueue(`/doctor/queue/${current.id}/status`, { status: "completed" })}
                    className="inline-flex items-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-400 px-5 py-2.5 text-xs font-bold text-slate-950 transition cursor-pointer disabled:opacity-50"
                  >
                    <Check className="h-4 w-4" /> Mark Complete & Dispense
                  </button>
                  <button
                    disabled={isUpdating}
                    onClick={() => updateQueue(`/doctor/queue/${current.id}/status`, { status: "skipped" })}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 hover:bg-white/10 px-5 py-2.5 text-xs font-bold text-white transition cursor-pointer disabled:opacity-50"
                  >
                    <SkipForward className="h-4 w-4" /> Skip / No Show
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-6 flex min-h-56 flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50/70 p-8 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                  <Stethoscope className="h-7 w-7" />
                </div>
                <p className="mt-4 text-base font-bold text-slate-900">Consultation chamber is available</p>
                <p className="mt-1 max-w-xs text-xs text-slate-500">Call the next patient in line when you are ready to begin.</p>
              </div>
            )}

            <button
              disabled={isUpdating || Boolean(current) || !dashboard?.queue?.length}
              onClick={() => updateQueue("/doctor/queue/call-next", null)}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-700 to-indigo-600 hover:from-sky-600 hover:to-indigo-500 px-5 py-3.5 text-sm font-bold text-white transition shadow-md shadow-sky-500/20 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:from-slate-200 disabled:to-slate-200 disabled:text-slate-400 cursor-pointer"
            >
              <Phone className="h-4 w-4" /> Call Next Patient <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Up Next in Queue */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-sky-600">Waiting Lobby</p>
                <h2 className="mt-1 text-2xl font-bold text-slate-950">Next in Queue</h2>
                <p className="text-xs text-slate-500">Upcoming patients assigned to counter</p>
              </div>
              <Users className="h-6 w-6 text-sky-600" />
            </div>

            <div className="mt-6 space-y-3">
              {dashboard?.queue?.length ? (
                dashboard.queue.map((token, index) => (
                  <div key={token.id} className="flex items-center gap-3 rounded-2xl border border-slate-100 p-3 hover:bg-slate-50 transition">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sm font-extrabold text-sky-700 border border-sky-100">
                      {token.number}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-slate-900">{token.patient?.name}</p>
                      <p className="text-xs text-slate-500">Est. wait ~{token.est_wait_time || (index + 1) * 15} min</p>
                    </div>
                    <span className="text-xs font-medium text-slate-400">{formatTime(token.check_in_time)}</span>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl bg-emerald-50 border border-emerald-200/60 p-5 text-center text-xs font-medium text-emerald-800">
                  The waiting queue is currently clear.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Prescription Vault Overview */}
        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="rounded-2xl bg-indigo-50 p-2.5 text-indigo-600">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-950">Recent Digital Prescriptions</h2>
                <p className="text-xs text-slate-500 mt-0.5">Dispensed Rx records issued from your consultation</p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {dashboard?.recent_prescriptions?.length ? (
                dashboard.recent_prescriptions.map((rx) => (
                  <div key={rx.id} className="flex items-center justify-between rounded-2xl bg-slate-50 p-3.5 border border-slate-100">
                    <div>
                      <p className="text-sm font-bold text-slate-900">{rx.patient}</p>
                      <p className="text-xs text-slate-500">Issued at {formatTime(rx.issued_at)}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-200">
                      <Check className="h-3 w-3" /> Signed & Vaulted
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500 text-center py-4">No recent prescriptions issued during this shift.</p>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="rounded-2xl bg-emerald-50 p-2.5 text-emerald-600">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-950">Shift Performance Overview</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Summary of today's clinical encounters</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-sky-50/70 border border-sky-100 p-4">
                  <p className="text-xs font-semibold text-slate-600">Avg Consult Duration</p>
                  <p className="mt-2 text-2xl font-extrabold text-sky-800">{dashboard?.doctor?.avg_consult_min ?? 15} <span className="text-sm font-normal">min</span></p>
                </div>
                <div className="rounded-2xl bg-emerald-50/70 border border-emerald-100 p-4">
                  <p className="text-xs font-semibold text-slate-600">Encounters Closed</p>
                  <p className="mt-2 text-2xl font-extrabold text-emerald-800">{dashboard?.stats?.completed_today ?? 0}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Department: <strong>{dashboard?.doctor?.specialization || "Cardiology"}</strong></span>
              <span>Status: <strong className="text-emerald-700">Rostered & Active</strong></span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function Metric({ icon, label, value, detail, tone }) {
  const colors = {
    blue: "bg-sky-50 text-sky-700",
    green: "bg-emerald-50 text-emerald-700",
    indigo: "bg-indigo-50 text-indigo-700",
    amber: "bg-amber-50 text-amber-700",
  };
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${colors[tone]}`}>
        {icon}
      </div>
      <p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-500">{label}</p>
      <p className="mt-1 text-3xl font-extrabold text-slate-950">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{detail}</p>
    </div>
  );
}

export default DoctorDashboard;
