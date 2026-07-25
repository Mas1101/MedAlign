function MarketingPage({ onBack }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-white text-slate-900">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <button
          onClick={onBack}
          className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900 transition"
        >
          ← Back to Home
        </button>

        <h1 className="text-4xl font-bold text-slate-900">MedAlign for Clinics</h1>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl">
          Everything your clinic needs to manage patients, appointments, and staff — all in one platform.
        </p>

        <section className="mt-16">
          <h2 className="text-2xl font-semibold text-slate-900">Overview</h2>
          <p className="mt-3 text-slate-600 max-w-2xl">
            Placeholder overview content — replace with real product details.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-semibold text-slate-900">Pricing</h2>
          <p className="mt-3 text-slate-600 max-w-2xl">
            Placeholder pricing tiers go here.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-semibold text-slate-900">Book a Demo</h2>
          <p className="mt-3 text-slate-600 max-w-2xl">
            Placeholder demo booking form/CTA goes here.
          </p>
        </section>
      </div>
    </div>
  );
}

export default MarketingPage;