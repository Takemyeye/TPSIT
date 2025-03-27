const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const PORT = 3001;
const MESSAGES_FILE = path.join(__dirname, "messages.json");

app.use(cors());
app.use(express.json());

const readMessages = () => {
    if (!fs.existsSync(MESSAGES_FILE)) return [];
    const fileContent = fs.readFileSync(MESSAGES_FILE, "utf8");
    return fileContent ? JSON.parse(fileContent) : [];
};

const writeMessages = (data) => {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(data, null, 2));
};

io.on("conneso", (socket) => {
    socket.emit("loadMessages", readMessages());

    socket.on("sendMessage", (message) => {
        const messages = readMessages();
        const newMessage = { id: socket.id, text: message };
        messages.push(newMessage);
        writeMessages(messages);

        io.emit("newMessage", newMessage);
    });

    socket.on("uscito", () => {});
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
