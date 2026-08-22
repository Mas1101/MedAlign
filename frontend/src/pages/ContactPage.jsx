import { useState } from 'react';
import { Clock3, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import MedAlignBrand from '../components/MedAlignBrand';

const contactDetails = [
  { icon: <MapPin className="h-5 w-5" />, label: 'Visit us', value: '24 Crescent Road, MedAlign Health Centre', detail: 'Appointments and clinic support' },
  { icon: <Phone className="h-5 w-5" />, label: 'Call our team', value: '+1 555 0100', detail: 'Mon-Fri, 8:00 AM - 6:00 PM' },
  { icon: <Mail className="h-5 w-5" />, label: 'Email support', value: 'support@medalign.com', detail: 'We reply within one business day' },
  { icon: <Clock3 className="h-5 w-5" />, label: 'Care hours', value: 'Every day, 8:00 AM - 8:00 PM', detail: 'Online booking is always open' },
];

function ContactPage({ onBack }) {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/30 to-white text-slate-900">
      <header className="border-b border-slate-200 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <MedAlignBrand onClick={onBack} label="Return to previous page" />
          <div className="flex items-center gap-2 text-sm font-semibold text-amber-700"><MessageCircle className="h-5 w-5" /> Contact MedAlign</div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-600">We are here to help</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">Let us make your care easier.</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">Whether you need help booking a visit, managing your clinic, or finding the right support, our team is ready to listen.</p>
        </div>

        <section className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contactDetails.map((detail) => (
            <div key={detail.label} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">{detail.icon}</div>
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">{detail.label}</p>
              <p className="mt-3 font-semibold text-slate-950">{detail.value}</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">{detail.detail}</p>
            </div>
          ))}
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-3xl bg-slate-950 p-8 text-white lg:p-10">
            <MessageCircle className="h-8 w-8 text-amber-300" />
            <h2 className="mt-8 text-3xl font-semibold">Questions about your next visit?</h2>
            <p className="mt-4 leading-7 text-slate-400">Tell us what you need and a member of the MedAlign team will point you in the right direction.</p>
            <div className="mt-8 space-y-4 text-sm text-slate-300"><p className="flex items-center gap-3"><Phone className="h-4 w-4 text-amber-300" /> Same-day booking support</p><p className="flex items-center gap-3"><Mail className="h-4 w-4 text-amber-300" /> Friendly help from real people</p></div>
          </div>
          <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:p-10">
            <h2 className="text-2xl font-semibold text-slate-950">Send us a message</h2>
            {sent ? <div className="mt-8 rounded-2xl bg-emerald-50 p-5 text-sm font-medium leading-6 text-emerald-800">Thanks for reaching out. Our team will get back to you within one business day.</div> : <div className="mt-7 space-y-5"><div className="grid gap-5 sm:grid-cols-2"><label className="block"><span className="text-sm font-medium text-slate-700">Your name</span><input required className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100" /></label><label className="block"><span className="text-sm font-medium text-slate-700">Email address</span><input required type="email" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100" /></label></div><label className="block"><span className="text-sm font-medium text-slate-700">How can we help?</span><textarea required rows="5" className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100" /></label><button type="submit" className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400">Send message <Send className="h-4 w-4" /></button></div>}
          </form>
        </section>
      </main>
    </div>
  );
}

export default ContactPage;