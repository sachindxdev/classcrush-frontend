const About = () => {
  return (
    <div className="bg-base-100 py-5">
      <div className="max-w-5xl mx-auto px-6 space-y-8">
        <h1 className="text-4xl font-bold text-center">About ClassCrush</h1>

        <p className="text-gray-400 max-w-3xl mx-auto">
          ClassCrush is a modern networking platform designed to help
          individuals build meaningful connections based on shared interests,
          skills, and values. Our goal is to move beyond superficial
          interactions and enable authentic, lasting relationships in a safe and
          user-friendly environment.
        </p>

        <section>
          <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
          <p className="text-gray-400">
            Our mission is to create a trusted digital space where users can
            discover and connect with like-minded individuals, fostering genuine
            interactions and collaborative opportunities.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">What We Offer</h2>
          <ul className="list-disc pl-6 text-gray-400 space-y-1">
            <li>Personalized matching based on user profiles and interests</li>
            <li>A clean, intuitive, and accessible user experience</li>
            <li>Secure authentication and privacy-focused architecture</li>
            <li>
              A platform built for meaningful engagement, not just casual
              browsing
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Our Vision</h2>
          <p className="text-gray-400">
            We envision a platform where authenticity, respect, and shared
            values define how people connect online.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
