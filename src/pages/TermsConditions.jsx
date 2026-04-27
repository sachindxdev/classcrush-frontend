const TermsConditions = () => {
  return (
    <div className="bg-base-100 py-10">
      <div className="max-w-5xl mx-auto px-6 space-y-6">
        <h1 className="text-4xl font-bold">Terms & Conditions</h1>

        <p className="text-gray-400">
          By accessing or using ClassCrush, you agree to be bound by these Terms
          and Conditions.
        </p>

        <section>
          <h2 className="font-semibold text-lg">1. User Conduct</h2>
          <p className="text-gray-400">
            Users must behave respectfully and must not engage in harassment,
            unlawful activities, or misuse of the platform.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-lg">2. Account Responsibility</h2>
          <p className="text-gray-400">
            You are responsible for maintaining the confidentiality of your
            account credentials and all activities under your account.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-lg">3. Limitation of Liability</h2>
          <p className="text-gray-400">
            ClassCrush shall not be held liable for any indirect or
            consequential damages arising from the use of the platform.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsConditions;
