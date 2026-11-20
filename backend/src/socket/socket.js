import http from "http";
import express from "express";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

export const io = new Server(server, {
    cors: {
        origin: "https://chatflow-1-c5fh.onrender.com",
        methods: ["GET", "POST"],
        credentials: true
    }
});

// userId -> Set of socket IDs
const userSocketMap = {};

export const getReceiverSocketIds = (userId) => {
    return userSocketMap[userId]
        ? [...userSocketMap[userId]]
        : [];
};

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    console.log("Socket connected:", socket.id);
    console.log("User ID:", userId);

    if (userId) {
        if (!userSocketMap[userId]) {
            userSocketMap[userId] = new Set();
        }

        userSocketMap[userId].add(socket.id);
    }

    io.emit(
        "getOnlineUsers",
        Object.keys(userSocketMap)
    );

    socket.on("disconnect", () => {
        console.log("Socket disconnected:", socket.id);

        if (userId && userSocketMap[userId]) {
            userSocketMap[userId].delete(socket.id);

            if (userSocketMap[userId].size === 0) {
                delete userSocketMap[userId];
            }
        }

        io.emit(
            "getOnlineUsers",
            Object.keys(userSocketMap)
        );
    });
});

export { app, server };
