const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, "data.json");

app.use(express.json());

const corsOptions = {
    origin: ['http://localhost:3000'],
    methods: '*',
    allowedHeaders: '*',
    credentials: true
  };
  
  app.use(cors(corsOptions));

app.post("/save", (req, res) => {
    const { firstName, lastName } = req.body;

    if (!firstName || !lastName) {
        return res.status(400).json({ message: "Nome e cognome è richiesto" });
    }

    const newEntry = { firstName, lastName };

    let data = [];
    if (fs.existsSync(DATA_FILE)) {
        const fileContent = fs.readFileSync(DATA_FILE, "utf8");
        if (fileContent) {
            data = JSON.parse(fileContent);
        }
    }

    data.push(newEntry);

    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

    res.json(newEntry);
});

app.get("/getAll", (req, res) => {

    const fileContent = fs.readFileSync(DATA_FILE, "utf8");
    const data = fileContent ? JSON.parse(fileContent) : [];

    res.json(data);
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
