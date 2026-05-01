import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) {
      setToast({
        type: "error",
        message: "Please enter your email",
      });
      setTimeout(() => setToast(null), 3000);
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(BASE_URL + "/user/forgot-password", {
        email,
      });

      setToast({
        type: "success",
        message: res.data.message || "Reset link sent to email",
      });

      setEmail("");
    } catch (err) {
      setToast({
        type: "error",
        message: err?.response?.data?.message || "Failed to send reset link",
      });
    } finally {
      setLoading(false);
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="text-xl text-center font-semibold">Forgot Password</h2>

          <input
            type="email"
            placeholder="Enter your email"
            className="input mt-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            className="btn btn-primary mt-4"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </div>
      </div>

      {toast && (
        <div className="toast toast-top toast-center">
          <div
            className={`alert ${
              toast.type === "success" ? "alert-success" : "alert-error"
            }`}
          >
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
