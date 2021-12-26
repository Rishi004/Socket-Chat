import React from "react";
import "./Input.css";

function Input({ message, setmessage, sendMessage }) {
    return (
        <div>
            <form className="form">
                <input
                    className="input"
                    type="text"
                    placeholder="Type a message"
                    value={message}
                    onChange={(e) => setmessage(e.target.value)}
                    onKeyPress={(e) =>
                        e.key === "Enter" ? sendMessage(e) : null
                    }
                />
                <button className="sendButton" onClick={(e) => sendMessage(e)}>
                    Send
                </button>
            </form>
        </div>
    );
}

export default Input;
