import { Stethoscope } from "lucide-react";

function MedAlignBrand({ onClick, label = "MedAlign home" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="group inline-flex items-center gap-3 rounded-2xl px-2 py-1.5 text-left transition hover:bg-sky-50 cursor-pointer"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 text-white shadow-md shadow-sky-500/20 transition group-hover:scale-105">
        <Stethoscope className="h-5 w-5" />
      </span>
      <span>
        <span className="block text-sm font-bold uppercase tracking-[0.2em] bg-gradient-to-r from-sky-700 to-indigo-700 bg-clip-text text-transparent">MedAlign</span>
        <span className="block text-xs text-slate-500 font-medium">Care, connected</span>
      </span>
    </button>
  );
}

export default MedAlignBrand;
