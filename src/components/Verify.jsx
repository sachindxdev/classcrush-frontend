import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Verify = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const token = params.get("token");

        if (!token) {
          setStatus("error");
          setMessage("Invalid verification link");
          return;
        }

        await axios.get(`${BASE_URL}/verify?token=${token}`, {
          withCredentials: true,
        });

        setStatus("success");

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (err) {
        setStatus("error");
        setMessage(
          err?.response?.data?.message ||
            err?.response?.data ||
            "Verification failed. Link expired.",
        );
      }
    };

    verifyEmail();
  }, [params, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          {status === "loading" && (
            <>
              <span className="loading loading-spinner loading-lg"></span>
              <h2 className="text-xl font-semibold mt-4">
                Verifying your email...
              </h2>
            </>
          )}

          {status === "success" && (
            <>
              <div className="text-success text-5xl">✓</div>
              <h2 className="text-xl font-semibold mt-2">Email Verified!</h2>
              <p className="text-gray-500">Redirecting to login...</p>
            </>
          )}

          {status === "error" && (
            <>
              <div className="text-error text-5xl">✕</div>
              <h2 className="text-xl font-semibold mt-2">
                Verification Failed
              </h2>
              <p className="text-sm text-gray-500">{message}</p>

              <button
                className="btn btn-primary mt-4"
                onClick={() => navigate("/login")}
              >
                Go to Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Verify;
