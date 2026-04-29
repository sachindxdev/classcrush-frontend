import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

let socket = null;

export const createSocketConnection = (userId) => {
  if (!socket) {
    const isLocal = location.hostname === "localhost";

    socket = io(isLocal ? BASE_URL : "/", {
      path: isLocal ? "/socket.io" : "/api/socket.io",
      auth: { userId },
      withCredentials: true,
    });
  }

  return socket;
};
