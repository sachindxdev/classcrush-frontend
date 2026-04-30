import { useSearchParams, useNavigate } from "react-router";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { removeUser } from "../utils/userSlice";
import { clearFeed } from "../utils/feedSlice";
import { removeConnections } from "../utils/connectionSlice";

const DeleteAccount = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = params.get("token");

  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(
        `${BASE_URL}/profile/verify/delete-account?token=${token}`,
        { withCredentials: true },
      );

      dispatch(removeUser());
      dispatch(clearFeed());
      dispatch(removeConnections());

      setDone(true);

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid or expired link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-300 shadow-xl text-center">
        <div className="card-body">
          {done ? (
            <>
              <div className="text-success text-5xl">✓</div>

              <h2 className="text-xl font-semibold mt-2">
                Account Deleted Successfully
              </h2>

              <p className="text-gray-400">
                Your account has been permanently removed from ClassCrush.
              </p>

              <p className="text-sm text-gray-500 mt-2">
                Redirecting to login...
              </p>
            </>
          ) : (
            <>
              <div className="text-error text-5xl">⚠️</div>

              <h2 className="text-xl font-semibold mt-2">
                Confirm Account Deletion
              </h2>

              <p className="text-gray-400 mt-2">
                This action is permanent and cannot be undone.
              </p>

              {error && <p className="text-red-400 mt-3 text-sm">{error}</p>}

              <div className="flex justify-center gap-3 mt-5">
                <button className="btn" onClick={() => navigate("/login")}>
                  Cancel
                </button>

                <button
                  className="btn btn-error"
                  onClick={handleDelete}
                  disabled={loading}
                >
                  {loading ? "Deleting..." : "Yes, Delete"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
