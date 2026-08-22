import { ArrowRight, Award, Building2, Clock3, Stethoscope, UserRound } from 'lucide-react';
import MedAlignBrand from '../components/MedAlignBrand';

const doctors = [
  { name: 'Dr. Amelia Stone', specialty: 'Cardiology', clinic: 'Health Hub', experience: '14 years experience', detail: 'Heart health, preventive cardiology, and online consultations.', availability: 'Available today' },
  { name: 'Dr. Rahim Khan', specialty: 'Neurology', clinic: 'MedAlign Central', experience: '11 years experience', detail: 'Neurological care, migraine treatment, and recovery planning.', availability: 'Next available tomorrow' },
  { name: 'Dr. Emily Wilson', specialty: 'Pediatrics', clinic: 'Family Care', experience: '9 years experience', detail: 'Friendly, family-focused care for children and young adults.', availability: 'Available today' },
];

function DoctorsPage({ onBack, onDoctorSignIn }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-white text-slate-900">
      <header className="border-b border-slate-200 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <MedAlignBrand onClick={onBack} label="Return to previous page" />
          <button onClick={onDoctorSignIn} className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-500">
            Doctor Sign In <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">Meet your care team</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">Find the right doctor for your next visit.</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">Explore verified specialists, their clinics, and the experience they bring to every consultation.</p>
        </div>
        <section className="mt-12 grid gap-6 lg:grid-cols-3">
          {doctors.map((doctor) => (
            <article key={doctor.name} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700"><UserRound className="h-7 w-7" /></div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">{doctor.availability}</span>
              </div>
              <h2 className="mt-7 text-2xl font-semibold text-slate-950">{doctor.name}</h2>
              <p className="mt-2 font-medium text-emerald-700">{doctor.specialty}</p>
              <div className="mt-6 space-y-3 text-sm text-slate-600">
                <p className="flex items-center gap-3"><Building2 className="h-4 w-4 text-slate-400" /> {doctor.clinic}</p>
                <p className="flex items-center gap-3"><Award className="h-4 w-4 text-slate-400" /> {doctor.experience}</p>
                <p className="flex items-center gap-3"><Clock3 className="h-4 w-4 text-slate-400" /> Flexible in-person and online visits</p>
              </div>
              <p className="mt-6 border-t border-slate-100 pt-5 text-sm leading-6 text-slate-500">{doctor.detail}</p>
            </article>
          ))}
        </section>
        <div className="mt-12 rounded-3xl bg-slate-950 p-7 text-white sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-9">
          <div><div className="flex items-center gap-3"><Stethoscope className="h-5 w-5 text-emerald-300" /><p className="font-semibold">Are you a MedAlign doctor?</p></div><p className="mt-2 text-sm text-slate-400">Sign in to manage your queue, consultations, and prescriptions.</p></div>
          <button onClick={onDoctorSignIn} className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 sm:mt-0">Doctor Sign In <ArrowRight className="h-4 w-4" /></button>
        </div>
      </main>
    </div>
  );
}

export default DoctorsPage;