const Contact = () => {
  return (
    <div className="bg-base-100 py-10">
      <div className="max-w-4xl mx-auto px-6 space-y-8">
        <h1 className="text-4xl font-bold text-center">Contact Us</h1>

        <p className="text-gray-400 text-center">
          For inquiries, support requests, or feedback, please reach out to us
          using the details below.
        </p>

        <div className="bg-base-100 p-6 rounded-xl shadow space-y-3">
          <p>
            <strong>Email:</strong> support@classcrush.online
          </p>
          <p>
            <strong>Support Hours:</strong> Monday to Saturday, 9:00 AM - 6:00
            PM
          </p>
          <p>
            <strong>Response Time:</strong> We aim to respond within 24 hours
          </p>
        </div>

        <p className="text-gray-400">
          We value your feedback and continuously strive to improve our platform
          based on user experience and suggestions.
        </p>
      </div>
    </div>
  );
};

export default Contact;
