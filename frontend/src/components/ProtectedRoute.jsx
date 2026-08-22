import { Navigate, useLocation } from "react-router-dom";
import { ShieldX, LogIn, Stethoscope, UserRound, ShieldCheck } from "lucide-react";

/**
 * ProtectedRoute — Guards a route by authentication state and allowed roles.
 *
 * Props:
 *  - authenticated  {boolean}   Is the user logged in?
 *  - user           {object}    User object (with .role)
 *  - allowedRoles   {string[]}  Roles that may access this route
 *  - loginPath      {string}    Where to redirect unauthenticated users (default: '/auth')
 *  - children       {ReactNode} The protected page element
 *
 * Behaviour:
 *  1. Not authenticated  → redirect to loginPath
 *  2. Wrong role         → show a friendly "Access Denied" screen (no redirect)
 *  3. Correct role       → render children
 */

const ROLE_META = {
  patient: {
    label: "Patient Portal",
    Icon: UserRound,
    dash: "/patient",
    color: "emerald",
    loginPath: "/auth",
  },
  doctor: {
    label: "Doctor Workspace",
    Icon: Stethoscope,
    dash: "/doctor",
    color: "sky",
    loginPath: "/doctor-auth",
  },
  admin: {
    label: "Admin Console",
    Icon: ShieldCheck,
    dash: "/admin",
    color: "indigo",
    loginPath: "/auth",
  },
};

function AccessDenied({ user, allowedRoles }) {
  const roleMeta = ROLE_META[user?.role] ?? null;
  const requiredLabel = allowedRoles
    .map((r) => ROLE_META[r]?.label ?? r)
    .join(" / ");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-slate-100 to-white px-6">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-10 text-center space-y-6">
        {/* Icon */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center">
          <ShieldX className="h-8 w-8 text-red-500" />
        </div>

        {/* Heading */}
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Access Denied
          </h1>
          <p className="mt-2 text-sm text-slate-500 leading-relaxed">
            This page is restricted to{" "}
            <span className="font-bold text-slate-700">{requiredLabel}</span>{" "}
            accounts. Your current role is{" "}
            <span className="font-bold text-red-600 uppercase">
              {user?.role ?? "unknown"}
            </span>
            .
          </p>
        </div>

        {/* Go to my dashboard */}
        {roleMeta && (
          <a
            href={roleMeta.dash}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white bg-gradient-to-r
              ${
                roleMeta.color === "emerald"
                  ? "from-emerald-600 to-teal-600 shadow-emerald-200"
                  : roleMeta.color === "sky"
                  ? "from-sky-600 to-indigo-600 shadow-sky-200"
                  : "from-indigo-600 to-purple-600 shadow-indigo-200"
              } shadow-lg transition hover:opacity-90`}
          >
            <roleMeta.Icon className="h-4 w-4" />
            Go to {roleMeta.label}
          </a>
        )}

        {/* Back to home */}
        <div>
          <a
            href="/"
            className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition underline underline-offset-2"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}

function ProtectedRoute({
  authenticated,
  user,
  allowedRoles,
  loginPath = "/auth",
  children,
}) {
  const location = useLocation();

  // 1. Not logged in → redirect to the appropriate login page
  if (!authenticated) {
    return (
      <Navigate
        to={loginPath}
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  // 2. Wrong role → friendly denial screen
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <AccessDenied user={user} allowedRoles={allowedRoles} />;
  }

  // 3. Authorised → render the page
  return children;
}

export default ProtectedRoute;
