import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

let socket = null;

export const createSocketConnection = (userId) => {
  if (socket && socket.connected) {
    return socket;
  }

  if (socket) {
    socket.disconnect();
    socket = null;
  }

  const isLocal = location.hostname === "localhost";

  socket = io(isLocal ? BASE_URL : "/", {
    path: isLocal ? "/socket.io" : "/api/socket.io",
    auth: { userId },
    withCredentials: true,
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
