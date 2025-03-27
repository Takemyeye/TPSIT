import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./app.css";

const socket = io("http://localhost:3001");

function App() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on("loadMessages", (data) => {
            setMessages(data);
        });

        socket.on("newMessage", (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => {
            socket.off("loadMessages");
            socket.off("newMessage");
        };
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit("sendMessage", message);
            setMessage("");
        }
    };

    return (
        <div>
            <h1>Chat</h1>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.id}</strong>: {msg.text}
                    </div>
                ))}
            </div>
            <input
                type="text"
                placeholder="Type a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default App;
