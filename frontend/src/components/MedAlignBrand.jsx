import { Stethoscope } from "lucide-react";

function MedAlignBrand({ onClick, label = "MedAlign home" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="group inline-flex items-center gap-3 rounded-2xl px-2 py-1.5 text-left transition hover:bg-blue-50"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-700 text-white shadow-md shadow-blue-200 transition group-hover:bg-blue-600">
        <Stethoscope className="h-5 w-5" />
      </span>
      <span>
        <span className="block text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">MedAlign</span>
        <span className="block text-xs text-slate-500">Care, connected</span>
      </span>
    </button>
  );
}

export default MedAlignBrand;
