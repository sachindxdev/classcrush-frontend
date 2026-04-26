import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import { Link } from "react-router";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [notLoggedIn, setNotLoggedIn] = useState(false);

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(res.data));
    } catch (err) {
      if (err.response?.status === 401) {
        setNotLoggedIn(true);
      } else {
        console.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="mt-4 text-gray-400">Finding your perfect matches...</p>
      </div>
    );
  }

  if (notLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <div className="text-5xl mb-4">🔐</div>

        <h1 className="text-2xl font-bold mb-2">Unlock your connections</h1>

        <p className="text-gray-400 max-w-sm mb-4">
          Sign in to explore profiles, send requests, and discover your perfect
          matches on ClassCrush 💕
        </p>

        <Link to="/login" className="btn btn-primary px-6">
          Go to Login
        </Link>
      </div>
    );
  }

  if (!feed || feed.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <div className="text-5xl mb-4">😴</div>
        <h1 className="text-2xl font-bold mb-2">No New Users Found!</h1>
        <p className="text-gray-400">
          You've explored everyone for now. Come back later 🚀
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center my-10">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
