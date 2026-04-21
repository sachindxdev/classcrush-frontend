import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import ProfileCard from "./ProfileCard";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about || "");
  const [skills, setSkills] = useState(user.skills || []);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, photoUrl, about, skills },
        { withCredentials: true },
      );
      dispatch(addUser(res?.data?.data));
      setSuccess(res.data.message);
      setTimeout(() => {
        setSuccess("");
      }, 3000);
      setError("");
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
      setSuccess("");
    }
  };
  return (
    <>
      <div className="flex justify-center items-center flex-col md:flex-row">
        <div className="flex justify-center m-5">
          <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body p-4">
              <h2 className="text-xl text-center font-bold mb-3">
                Edit Profile
              </h2>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <label className="w-28">First Name:</label>
                  <input
                    type="text"
                    className="input input-sm flex-1"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label className="w-28">Last Name:</label>
                  <input
                    type="text"
                    className="input input-sm flex-1"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label className="w-28">Photo URL:</label>
                  <input
                    type="text"
                    className="input input-sm flex-1"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label className="w-28">Age:</label>
                  <input
                    type="text"
                    className="input input-sm flex-1"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label className="w-28">Gender:</label>
                  <select
                    className="select select-sm flex-1"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option>Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="w-28">About:</label>
                  <textarea
                    className="textarea flex-1"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  ></textarea>
                </div>

                <div className="flex items-center gap-2">
                  <label className="w-28">Skills:</label>
                  <input
                    type="text"
                    className="input input-sm flex-1"
                    value={skills?.join(", ") || ""}
                    onChange={(e) =>
                      setSkills(e.target.value.split(",").map((s) => s.trim()))
                    }
                  />
                </div>
              </div>

              {error && (
                <p className="text-red-400 text-sm text-center mt-2">{error}</p>
              )}

              <div className="card-actions justify-center mt-3">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="m-5">
          <ProfileCard
            user={{ firstName, lastName, age, gender, photoUrl, about, skills }}
          />
        </div>
      </div>
      {success && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>{success}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
