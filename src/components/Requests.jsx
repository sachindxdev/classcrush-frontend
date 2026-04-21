import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.request);
  const dispatch = useDispatch();

  const reviewRequest = async (status, requestId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + requestId,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequest(requestId));
    } catch (err) {
      console.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return (
      <h1 className="text-2xl font-bold text-center m-4">
        No Request Found !!!
      </h1>
    );

  return (
    <div className="flex justify-center m-4 flex-col">
      <h1 className="text-2xl font-bold m-4">
        You have {requests.length} requests.
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-2">
        {requests.map((request) => {
          const {
            _id,
            firstName,
            lastName,
            age,
            gender,
            photoUrl,
            about,
            skills,
          } = request.fromUserId;

          return (
            <div
              className="card card-side bg-base-300 shadow-lg w-full"
              key={_id}
            >
              <figure className="w-40 shrink-0 m-2">
                <img
                  src={photoUrl}
                  alt="user-photo"
                  className="w-full object-cover rounded-full"
                />
              </figure>
              <div className="card-body py-3">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                <p className="text-sm opacity-70">{about}</p>
                {age && gender && (
                  <p className="text-sm">{age + ", " + gender}</p>
                )}
                {skills?.length > 0 && (
                  <p className="text-sm text-warning">
                    {skills.map((skill, index) => (
                      <span key={skill}>
                        {skill}
                        {index !== skills.length - 1 && ", "}
                      </span>
                    ))}
                  </p>
                )}
                <div className="card-actions justify-end mt-auto pt-1 gap-2">
                  <button
                    className="btn btn-sm btn-outline btn-primary"
                    onClick={() => reviewRequest("rejected", request._id)}
                  >
                    Reject
                  </button>
                  <button
                    className="btn btn-sm btn-error btn-outline text-white"
                    onClick={() => reviewRequest("accepted", request._id)}
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
