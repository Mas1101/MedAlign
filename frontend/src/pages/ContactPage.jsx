import { useState } from 'react';
import { Clock3, Mail, MapPin, MessageCircle, Phone, Send, CheckCircle2 } from 'lucide-react';
import MedAlignBrand from '../components/MedAlignBrand';

const contactDetails = [
  { icon: <MapPin className="h-5 w-5" />, label: 'Visit us', value: '24 Crescent Road, MedAlign Health Centre', detail: 'Appointments and clinic support' },
  { icon: <Phone className="h-5 w-5" />, label: 'Call our team', value: '+1 555 0100', detail: 'Mon-Fri, 8:00 AM - 6:00 PM' },
  { icon: <Mail className="h-5 w-5" />, label: 'Email support', value: 'support@medalign.org', detail: 'We reply within one business day' },
  { icon: <Clock3 className="h-5 w-5" />, label: 'Care hours', value: 'Every day, 8:00 AM - 8:00 PM', detail: 'Online queue tracking is always live' },
];

function ContactPage({ onBack }) {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/20 to-white text-slate-900">
      <header className="border-b border-slate-200 bg-white/85 backdrop-blur-xl sticky top-0 z-30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <MedAlignBrand onClick={onBack} label="Return to previous page" />
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200/80 px-3.5 py-1.5 rounded-full">
            <MessageCircle className="h-4 w-4" /> Support & Assistance
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-600">We are here to help</span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">Let us make your care seamless.</h1>
          <p className="mt-3 text-base leading-relaxed text-slate-600">Whether you need help with your queue ticket, managing clinic records, or integrating the MedAlign platform, our team is ready to assist.</p>
        </div>

        <section className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {contactDetails.map((detail) => (
            <div key={detail.label} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">{detail.icon}</div>
              <p className="mt-5 text-xs font-bold uppercase tracking-wider text-slate-500">{detail.label}</p>
              <p className="mt-2 text-sm font-bold text-slate-950">{detail.value}</p>
              <p className="mt-1 text-xs leading-normal text-slate-500">{detail.detail}</p>
            </div>
          ))}
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-3xl bg-slate-950 p-8 text-white lg:p-10 shadow-2xl flex flex-col justify-between">
            <div>
              <MessageCircle className="h-8 w-8 text-amber-300" />
              <h2 className="mt-6 text-2xl font-bold">Questions about your clinic or token?</h2>
              <p className="mt-3 text-xs leading-relaxed text-slate-400">Tell us what you need and our healthcare operations team will assist promptly.</p>
            </div>
            <div className="mt-8 space-y-3 text-xs text-slate-300 border-t border-slate-800 pt-6">
              <p className="flex items-center gap-3"><Phone className="h-4 w-4 text-amber-300" /> Instant Queue Inquiries</p>
              <p className="flex items-center gap-3"><Mail className="h-4 w-4 text-amber-300" /> Dedicated Technical Support</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:p-10">
            <h2 className="text-xl font-bold text-slate-950">Send us a direct message</h2>
            {sent ? (
              <div className="mt-6 rounded-2xl bg-emerald-50 border border-emerald-200 p-6 text-xs font-medium leading-relaxed text-emerald-900 flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-emerald-800 text-sm">Message Sent Successfully!</p>
                  <p className="mt-1 text-emerald-700">Thank you for reaching out. A MedAlign coordinator will respond to your email within one business day.</p>
                </div>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Your Name</span>
                    <input required placeholder="Jane Doe" className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-100" />
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Email Address</span>
                    <input required type="email" placeholder="jane@example.com" className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-100" />
                  </label>
                </div>
                <label className="block">
                  <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">How can we help?</span>
                  <textarea required rows="4" placeholder="Briefly describe your request or issue..." className="mt-1 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-100" />
                </label>
                <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 px-6 py-3 text-xs font-bold text-slate-950 transition cursor-pointer shadow-md shadow-amber-500/20">
                  Send Message <Send className="h-4 w-4" />
                </button>
              </div>
            )}
          </form>
        </section>
      </main>
    </div>
  );
}

export default ContactPage;
