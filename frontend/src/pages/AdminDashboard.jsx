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
import MedAlignBrand from "../components/MedAlignBrand";

function AdminDashboard({ onBack }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-white text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <div className="flex items-center gap-4">
            <MedAlignBrand onClick={onBack} label="Return to previous page" />
            <div className="hidden border-l border-slate-200 pl-4 sm:block">
              <h1 className="text-3xl font-semibold tracking-tight">Admin Dashboard</h1>
            </div>
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
            <p className="mt-2 text-3xl font-semibold">24</p>
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
            <p className="mt-2 text-3xl font-semibold">18</p>
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
                +8.4%
              </span>
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Subscription Status
            </p>
            <p className="mt-2 text-3xl font-semibold">1,284</p>
            <p className="mt-2 text-sm text-slate-500">
              Active subscriptions
            </p>
          </div>

          {/* Analytics */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="rounded-2xl bg-purple-50 p-3 text-purple-600">
                <BarChart3 className="h-6 w-6" />
              </div>
              <span className="text-sm font-medium text-blue-600">
                This month
              </span>
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Analytics
            </p>
            <p className="mt-2 text-3xl font-semibold">92.6%</p>
            <p className="mt-2 text-sm text-slate-500">
              Overall platform performance
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
                  24
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-green-50 p-4">
                <div>
                  <p className="font-medium text-slate-800">In Consultation</p>
                  <p className="text-sm text-slate-500">
                    Currently being served
                  </p>
                </div>
                <span className="text-2xl font-semibold text-green-700">
                  12
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                <div>
                  <p className="font-medium text-slate-800">Average Wait</p>
                  <p className="text-sm text-slate-500">
                    Current average
                  </p>
                </div>
                <span className="text-2xl font-semibold text-slate-700">
                  15m
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
                    <p className="font-medium">Dr. Sarah Ahmed</p>
                    <p className="text-sm text-slate-500">
                      Cardiology
                    </p>
                  </div>
                </div>

                <span className="flex items-center gap-2 text-sm font-medium text-green-600">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  Online
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-slate-100 p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100" />
                  <div>
                    <p className="font-medium">Dr. Rahim Khan</p>
                    <p className="text-sm text-slate-500">
                      Neurology
                    </p>
                  </div>
                </div>

                <span className="flex items-center gap-2 text-sm font-medium text-green-600">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  Online
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-slate-100 p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-purple-100" />
                  <div>
                    <p className="font-medium">Dr. Emily Wilson</p>
                    <p className="text-sm text-slate-500">
                      Pediatrics
                    </p>
                  </div>
                </div>

                <span className="flex items-center gap-2 text-sm font-medium text-slate-500">
                  <span className="h-2 w-2 rounded-full bg-slate-400" />
                  Offline
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
                <p className="text-2xl font-semibold text-green-700">1,284</p>
                <p className="mt-1 text-xs text-slate-500">Active</p>
              </div>

              <div className="rounded-2xl bg-yellow-50 p-4 text-center">
                <p className="text-2xl font-semibold text-yellow-700">86</p>
                <p className="mt-1 text-xs text-slate-500">Pending</p>
              </div>

              <div className="rounded-2xl bg-red-50 p-4 text-center">
                <p className="text-2xl font-semibold text-red-700">42</p>
                <p className="mt-1 text-xs text-slate-500">Expired</p>
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
                    Appointment completion
                  </span>
                  <span className="font-semibold">92%</span>
                </div>

                <div className="h-2 rounded-full bg-slate-100">
                  <div className="h-2 w-[92%] rounded-full bg-blue-600" />
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-slate-600">
                    Patient satisfaction
                  </span>
                  <span className="font-semibold">96%</span>
                </div>

                <div className="h-2 rounded-full bg-slate-100">
                  <div className="h-2 w-[96%] rounded-full bg-green-500" />
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-slate-600">
                    Doctor availability
                  </span>
                  <span className="font-semibold">84%</span>
                </div>

                <div className="h-2 rounded-full bg-slate-100">
                  <div className="h-2 w-[84%] rounded-full bg-indigo-600" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;