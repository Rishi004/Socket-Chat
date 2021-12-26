import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Join.css";

function Join() {
    const [name, setname] = useState("");
    const [room, setroom] = useState("");

    return (
        <>
            <div className="joinOuterContainer">
                <div className="joinInnerContainer">
                    <h1 className="heading">Join</h1>
                    <div>
                        <input
                            className="joinInput"
                            type="text"
                            placeholder="Name"
                            onChange={(e) => setname(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            className="joinInput mt-20"
                            type="text"
                            placeholder="Room"
                            onChange={(e) => setroom(e.target.value)}
                        />
                    </div>
                    <Link
                        onClick={(e) =>
                            !name || !room ? e.preventDefault() : null
                        }
                        to={`/chat?name=${name}&room=${room}`}
                    >
                        <button className="button mt-20" type="submit">
                            Sign In
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Join;
