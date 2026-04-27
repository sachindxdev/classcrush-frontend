const RefundPolicy = () => {
  return (
    <div className="bg-base-100 py-10">
      <div className="max-w-5xl mx-auto px-6 space-y-6">
        <h1 className="text-4xl font-bold">Refund & Cancellation Policy</h1>

        <p className="text-gray-400">
          ClassCrush currently offers free services. If paid features are
          introduced, the following policies will apply.
        </p>

        <section>
          <h2 className="font-semibold text-lg">1. Refund Eligibility</h2>
          <p className="text-gray-400">
            Refunds will only be issued in cases of billing errors or verified
            technical issues.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-lg">2. Cancellation</h2>
          <p className="text-gray-400">
            Users may cancel subscriptions at any time through their account
            settings.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-lg">3. Processing</h2>
          <p className="text-gray-400">
            Approved refunds will be processed within 5–7 business days.
          </p>
        </section>
      </div>
    </div>
  );
};

export default RefundPolicy;
