import { useEffect, useState } from "react";
import {
  Activity,
  BarChart3,
  CalendarClock,
  CheckCircle2,
  Clock3,
  CreditCard,
  Stethoscope,
  Users,
} from "lucide-react";

function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch(
  `${import.meta.env.VITE_API_URL}/api/admin/dashboard`,
  {
    headers: {
      "X-API-TOKEN": import.meta.env.VITE_API_TOKEN,
      Accept: "application/json",
    },
  }
);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        setDashboard(data);
      } catch (err) {
        setError("Failed to load dashboard data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-600">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  const queue = dashboard?.queue_snapshot ?? {};
  const doctors = dashboard?.doctor_activity ?? {};
  const subscriptions = dashboard?.subscription_status ?? {};
  const analytics = dashboard?.analytics ?? {};

  const doctorAvailability =
    doctors.total_doctors > 0
      ? Math.round((doctors.available / doctors.total_doctors) * 100)
      : 0;

  const analyticsPerformance =
    analytics.total_patients > 0
      ? Math.max(0, Math.min(100, 100 - analytics.average_walkout_rate))
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-white text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-blue-600">
              MedAlign
            </p>

            <h1 className="mt-1 text-3xl font-semibold tracking-tight">
              Admin Dashboard
            </h1>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-700">
            <Users className="h-5 w-5" />
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        {/* Overview Cards */}
        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Queue */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">
                <CalendarClock className="h-6 w-6" />
              </div>

              <span className="text-sm font-medium text-green-600">
                Today
              </span>
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Queue Snapshot
            </p>

            <p className="mt-2 text-3xl font-semibold">
              {queue.waiting ?? 0}
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Patients currently waiting
            </p>
          </div>

          {/* Doctors */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="rounded-2xl bg-indigo-50 p-3 text-indigo-600">
                <Stethoscope className="h-6 w-6" />
              </div>

              <span className="text-sm font-medium text-green-600">
                Active
              </span>
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Doctor Activity
            </p>

            <p className="mt-2 text-3xl font-semibold">
              {doctors.available ?? 0}
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Doctors currently active
            </p>
          </div>

          {/* Subscription */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="rounded-2xl bg-green-50 p-3 text-green-600">
                <CreditCard className="h-6 w-6" />
              </div>

              <span className="text-sm font-medium text-green-600">
                Active
              </span>
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Subscription Status
            </p>

            <p className="mt-2 text-3xl font-semibold">
              {subscriptions.active_clinics ?? 0}
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Active clinic subscriptions
            </p>
          </div>

          {/* Analytics */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="rounded-2xl bg-purple-50 p-3 text-purple-600">
                <BarChart3 className="h-6 w-6" />
              </div>

              <span className="text-sm font-medium text-blue-600">
                Current
              </span>
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Analytics
            </p>

            <p className="mt-2 text-3xl font-semibold">
              {analyticsPerformance}%
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Platform performance
            </p>
          </div>
        </section>

        {/* Main Dashboard Sections */}
        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* Queue Snapshot */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Queue Snapshot</h2>

                <p className="mt-1 text-sm text-slate-500">
                  Current patient queue overview
                </p>
              </div>

              <Clock3 className="h-6 w-6 text-blue-600" />
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between rounded-2xl bg-blue-50 p-4">
                <div>
                  <p className="font-medium text-slate-800">Waiting</p>

                  <p className="text-sm text-slate-500">
                    Patients in queue
                  </p>
                </div>

                <span className="text-2xl font-semibold text-blue-700">
                  {queue.waiting ?? 0}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-green-50 p-4">
                <div>
                  <p className="font-medium text-slate-800">
                    In Consultation
                  </p>

                  <p className="text-sm text-slate-500">
                    Currently being served
                  </p>
                </div>

                <span className="text-2xl font-semibold text-green-700">
                  {queue.called ?? 0}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                <div>
                  <p className="font-medium text-slate-800">
                    Completed
                  </p>

                  <p className="text-sm text-slate-500">
                    Completed queue tokens
                  </p>
                </div>

                <span className="text-2xl font-semibold text-slate-700">
                  {queue.completed ?? 0}
                </span>
              </div>
            </div>
          </div>

          {/* Doctor Activity */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Doctor Activity</h2>

                <p className="mt-1 text-sm text-slate-500">
                  Current doctor availability
                </p>
              </div>

              <Activity className="h-6 w-6 text-indigo-600" />
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between rounded-2xl border border-slate-100 p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-indigo-100" />

                  <div>
                    <p className="font-medium">Available Doctors</p>

                    <p className="text-sm text-slate-500">
                      Currently available
                    </p>
                  </div>
                </div>

                <span className="flex items-center gap-2 text-sm font-medium text-green-600">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  {doctors.available ?? 0}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-slate-100 p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100" />

                  <div>
                    <p className="font-medium">Total Doctors</p>

                    <p className="text-sm text-slate-500">
                      Registered doctors
                    </p>
                  </div>
                </div>

                <span className="text-sm font-medium text-blue-600">
                  {doctors.total_doctors ?? 0}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-slate-100 p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-purple-100" />

                  <div>
                    <p className="font-medium">Unavailable Doctors</p>

                    <p className="text-sm text-slate-500">
                      Currently unavailable
                    </p>
                  </div>
                </div>

                <span className="text-sm font-medium text-slate-500">
                  {doctors.unavailable ?? 0}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Subscription and Analytics */}
        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Subscription Status */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-green-50 p-3 text-green-600">
                <CheckCircle2 className="h-6 w-6" />
              </div>

              <div>
                <h2 className="text-xl font-semibold">
                  Subscription Status
                </h2>

                <p className="text-sm text-slate-500">
                  Current subscription overview
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-green-50 p-4 text-center">
                <p className="text-2xl font-semibold text-green-700">
                  {subscriptions.active_clinics ?? 0}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Active
                </p>
              </div>

              <div className="rounded-2xl bg-yellow-50 p-4 text-center">
                <p className="text-2xl font-semibold text-yellow-700">
                  {subscriptions.inactive_clinics ?? 0}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Inactive
                </p>
              </div>

              <div className="rounded-2xl bg-red-50 p-4 text-center">
                <p className="text-2xl font-semibold text-red-700">
                  {subscriptions.total_plans ?? 0}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Plans
                </p>
              </div>
            </div>
          </div>

          {/* Analytics */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Analytics</h2>

                <p className="mt-1 text-sm text-slate-500">
                  Platform performance overview
                </p>
              </div>

              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>

            <div className="mt-6 space-y-5">
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-slate-600">
                    Platform performance
                  </span>

                  <span className="font-semibold">
                    {analyticsPerformance}%
                  </span>
                </div>

                <div className="h-2 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-blue-600"
                    style={{ width: `${analyticsPerformance}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-slate-600">
                    Average wait time
                  </span>

                  <span className="font-semibold">
                    {analytics.average_wait_time ?? 0} min
                  </span>
                </div>

                <div className="h-2 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-green-500"
                    style={{
                      width: `${Math.min(
                        100,
                        (analytics.average_wait_time ?? 0) * 5
                      )}%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-slate-600">
                    Walkout rate
                  </span>

                  <span className="font-semibold">
                    {analytics.average_walkout_rate ?? 0}%
                  </span>
                </div>

                <div className="h-2 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-indigo-600"
                    style={{
                      width: `${Math.min(
                        100,
                        analytics.average_walkout_rate ?? 0
                      )}%`,
                    }}
                  />
                </div>
              </div>

              <div className="pt-1 text-sm text-slate-500">
                Total patients recorded:{" "}
                <span className="font-semibold text-slate-700">
                  {analytics.total_patients ?? 0}
                </span>
              </div>

              <div className="text-sm text-slate-500">
                Doctor availability:{" "}
                <span className="font-semibold text-slate-700">
                  {doctorAvailability}%
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;