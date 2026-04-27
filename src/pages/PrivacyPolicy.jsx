const PrivacyPolicy = () => {
  return (
    <div className="bg-base-100 py-10">
      <div className="max-w-5xl mx-auto px-6 space-y-6">
        <h1 className="text-4xl font-bold">Privacy Policy</h1>

        <p className="text-gray-400">
          ClassCrush is committed to protecting your privacy. This Privacy
          Policy explains how we collect, use, and safeguard your information.
        </p>

        <section>
          <h2 className="font-semibold text-lg">1. Information We Collect</h2>
          <p className="text-gray-400">
            We may collect personal information such as your name, email
            address, profile details, and usage data to provide and enhance our
            services.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-lg">2. Use of Information</h2>
          <p className="text-gray-400">
            Your information is used to personalize your experience, improve
            platform functionality, and ensure the security of our services.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-lg">3. Data Protection</h2>
          <p className="text-gray-400">
            We implement appropriate technical and organizational measures to
            protect your personal data against unauthorized access or misuse.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-lg">4. Third-Party Sharing</h2>
          <p className="text-gray-400">
            We do not sell or rent your personal data to third parties.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
