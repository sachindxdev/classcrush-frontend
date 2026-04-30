import { useEffect, useState, useRef } from "react";
import { useParams, Navigate } from "react-router";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();

  const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(targetUserId);
  if (!isValidObjectId) {
    return <Navigate to="/connections" replace />;
  }

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [targetUser, setTargetUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const [isAuthorized, setIsAuthorized] = useState(null);

  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const formatTime = (time) => {
    return new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const fetchChatMessages = async () => {
    try {
      const connectionsRes = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      const isConnected = connectionsRes.data.data.some(
        (c) => c._id === targetUserId,
      );

      if (!isConnected) {
        setIsAuthorized(false);
        return;
      }

      setIsAuthorized(true);

      const res = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });

      const chatMessages = res.data.messages.map((msg) => ({
        senderId: msg.senderId._id,
        firstName: msg.senderId.firstName,
        lastName: msg.senderId.lastName,
        text: msg.text,
        createdAt: msg.createdAt,
      }));

      setMessages(chatMessages);

      const otherUser = res.data.participants.find((p) => p._id !== userId);
      setTargetUser(otherUser);
    } catch (err) {
      console.error(
        "Chat load error:",
        err?.response?.data?.message || err.message,
      );
      setIsAuthorized(false);
    }
  };

  useEffect(() => {
    if (!userId) return;
    fetchChatMessages();
  }, [userId, targetUserId]);

  useEffect(() => {
    if (!userId || !isAuthorized) return;

    const socket = createSocketConnection(userId);
    socketRef.current = socket;

    socket.emit("joinChat", { targetUserId });

    const handleMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    const handleOnlineUsers = (users) => {
      setOnlineUsers(users);
    };

    socket.off("messageReceived");
    socket.off("onlineUsers");

    socket.on("messageReceived", handleMessage);
    socket.on("onlineUsers", handleOnlineUsers);

    return () => {
      socket.off("messageReceived", handleMessage);
      socket.off("onlineUsers", handleOnlineUsers);
    };
  }, [userId, targetUserId, isAuthorized]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    if (!socketRef.current?.connected) {
      console.warn("Socket not connected, cannot send message");
      return;
    }

    socketRef.current.emit("sendMessage", {
      targetUserId,
      text: newMessage,
    });

    setNewMessage("");
  };

  const isOnline = onlineUsers.includes(targetUserId);

  if (isAuthorized === null) {
    return (
      <div className="w-full h-[85vh] flex justify-center items-center">
        <p className="text-gray-400 text-sm">Loading chat...</p>
      </div>
    );
  }

  if (isAuthorized === false) {
    return <Navigate to="/connections" replace />;
  }

  return (
    <div className="w-full h-[85vh] flex justify-center items-center bg-linear-to-br from-gray-900 via-gray-800 to-black">
      <div className="w-225 h-[80vh] backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        <div className="flex items-center gap-4 p-4 border-b border-white/10 bg-white/5">
          <div className="relative">
            <img
              src={targetUser?.photoUrl}
              className="w-12 h-12 rounded-full object-cover border border-white/20"
            />
            {isOnline && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border border-black"></span>
            )}
          </div>

          <div>
            <h2 className="text-white font-semibold text-lg">
              {targetUser?.firstName} {targetUser?.lastName}
            </h2>
            <p className="text-xs text-gray-400">
              {isOnline ? "Active now" : "Offline"}
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.map((msg, i) => {
            const isMe = msg.senderId === userId;

            return (
              <div
                key={i}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div className="flex flex-col max-w-xs">
                  <div
                    className={`px-4 py-3 rounded-2xl text-sm shadow-lg
                  ${
                    isMe
                      ? "bg-linear-to-r from-indigo-500 to-purple-500 text-white"
                      : "bg-white/10 text-white backdrop-blur-md border border-white/10"
                  }`}
                  >
                    {msg.text}
                  </div>

                  <span className="text-[11px] text-gray-400 mt-1 text-right pr-1">
                    {formatTime(msg.createdAt)}
                  </span>
                </div>
              </div>
            );
          })}

          <div ref={messagesEndRef}></div>
        </div>

        <div className="p-4 border-t border-white/10 bg-white/5 flex items-center gap-3">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type something..."
            className="flex-1 px-4 py-3 rounded-full bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            onClick={sendMessage}
            className="px-5 py-2 rounded-full bg-linear-to-r from-indigo-500 to-purple-500 text-white font-medium hover:scale-105 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
