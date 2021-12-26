import React, { useEffect, useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./Chat.css";
import { InfoBar, Input, Messages, TextContainer } from "../../component";

var socket;

function Chat({ location }) {
    const [name, setname] = useState("");
    const [room, setroom] = useState("");
    const [message, setmessage] = useState("");
    const [messages, setmessages] = useState([]);
    const [users, setUsers] = useState("");

    const ENDPOINT = "http://localhost:3001";

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setname(name);
        setroom(room);

        socket.emit("join", { name, room }, (error) => {
            if (error) alert(error);
        });

        return () => {
            socket.emit("disconnect");
            socket.off();
        };
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on("message", (message) => {
            setmessages([...messages, message]);
        });

        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });
    }, [messages]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message) {
            socket.emit("sendMessage", message, () => setmessage(""));
        }
    };

    console.log(message, messages);

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input
                    message={message}
                    setmessage={setmessage}
                    sendMessage={sendMessage}
                />
            </div>
            <TextContainer users={users} />
        </div>
    );
}

export default Chat;
