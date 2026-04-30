import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [toast, setToast] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleResetPassword = async () => {
    try {
      await axios.patch(
        BASE_URL + "/user/reset-password",
        { email, newPassword },
        { withCredentials: true },
      );

      setToast({
        type: "success",
        message: "A verification email sent. Verify email to reset password.",
      });

      setTimeout(() => setToast(null), 3000);
      setError("");
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");

      setToast({
        type: "error",
        message: "Reset password failed",
      });

      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl justify-center">Reset Password</h2>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email</legend>
            <input
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">New Password</legend>
            <input
              type="password"
              className="input"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </fieldset>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleResetPassword}>
              Reset Password
            </button>
          </div>

          <p
            className="text-center mt-3 cursor-pointer hover:text-primary text-sm"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </p>
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

export default ResetPassword;
