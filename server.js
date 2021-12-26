const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");

const { Server } = require("socket.io");

const router = require("./router");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users.js");

app.use(cors());
app.use(router);

const PORT = process.env.PORT || 3001;

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
    },
});

io.on("connection", (socket) => {
    socket.on("join", ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });

        if (error) return callback(error);

        socket.emit("message", {
            user: "admin",
            text: `${user.name}, welcome to the room ${user.room}`,
        });
        socket.broadcast.to(user.room).emit("message", {
            user: "admin",
            text: `${user.name}, has joined!`,
        });

        socket.join(user.room);

        io.to(user.room).emit("roomData", {
            room: user.room,
            users: getUsersInRoom(user.room),
        });

        callback();
    });

    socket.on("sendMessage", (message, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit("message", { user: user.name, text: message });
        io.to(user.room).emit("roomData", { room: user.room, text: message });
        callback();
    });

    socket.on("disconnect", () => {
        const user = removeUser(socket.id);
        io.to(user.room).emit("message", {
            user: "admin",
            text: `${user.name} has left.`,
        });
    });
});

server.listen(PORT, () => console.log(`server has started on ${PORT}`));
