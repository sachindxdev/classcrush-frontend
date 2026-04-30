import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { email, password },
        { withCredentials: true },
      );

      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");

      setToast({
        type: "error",
        message: "Login failed",
      });

      setTimeout(() => setToast(null), 3000);
    }
  };

  const handleSignUp = async () => {
    try {
      await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, email, password },
        { withCredentials: true },
      );

      setToast({
        type: "success",
        message: "Signup successful! Check your email.",
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);

      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");

      setToast({
        type: "error",
        message: "Signup failed",
      });

      setTimeout(() => setToast(null), 3000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isLoginForm ? handleLogin() : handleSignUp();
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl justify-center">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>

          <form onSubmit={handleSubmit}>
            {!isLoginForm && (
              <>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
              </>
            )}

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
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <div className="card-actions justify-center mt-4">
              <button type="submit" className="btn btn-primary">
                {isLoginForm ? "Login" : "Sign Up"}
              </button>
            </div>
          </form>

          <p
            className="text-center mt-2 cursor-pointer hover:text-primary"
            onClick={() => {
              setIsLoginForm(!isLoginForm);
              setError("");
            }}
          >
            {isLoginForm
              ? "Don't have an account? Sign Up"
              : "Already have an account? Login"}
          </p>

          {isLoginForm && (
            <p
              className="text-center mt-1 cursor-pointer text-sm hover:text-primary"
              onClick={() => navigate("/reset-password")}
            >
              Forgot Password?
            </p>
          )}
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

export default Login;
