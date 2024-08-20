const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

const workspaces = [];
const properties = [];
const users = [];

function loadUsers() {
    if (fs.existsSync("users.txt")) {
        const data = fs.readFileSync("users.txt", "utf-8");
        const lines = data.trim().split("\n");
        lines.forEach((line) => {
            const [username, password] = line
                .split(",")
                .map((item) => item.split(": ")[1]);
            users.push({ username: username, password: password });
        });
    }
}

function loadProperties() {
    if (fs.existsSync("properties.txt")) {
        const data = fs.readFileSync("properties.txt", "utf-8");
        const lines = data.trim().split("\n");
        lines.forEach((line) => {
            const [
                address,
                neighborhood,
                squareFeet,
                parkingGarage,
                publicTransport,
            ] = line.split(",").map((item) => item.split(": ")[1]);
            properties.push({
                address: address,
                neighborhood: neighborhood,
                "square-feet": squareFeet,
                "parking-garage": parkingGarage,
                "public-transportation": publicTransport,
            });
        });
    }
}

function loadWorkspaces() {
    if (fs.existsSync("workspaces.txt")) {
        const data = fs.readFileSync("workspaces.txt", "utf-8");
        const lines = data.trim().split("\n");
        lines.forEach((line) => {
            const [
                roomType,
                leaseTerm,
                availableSeats,
                smokingAllowed,
                deactivate,
            ] = line.split(",").map((item) => item.split(": ")[1]);
            workspaces.push({
                "room-type": roomType,
                "lease-term": leaseTerm,
                "available-seats": availableSeats,
                smoking: smokingAllowed,
                deactivate: deactivate,
            });
        });
    }
}

app.get("/", (req, res) => {
    res.redirect("/login.html");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

loadUsers();
loadProperties();
loadWorkspaces();

// Leo que fez umas loucuras

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.post('/signin', (req, res) => {
    const { username, password, name, phone, email, role } = req.body;
    const newUser = { username, password, name, phone, email, role };
    users.push(newUser);
    
    fs.appendFileSync('users.txt', `username: ${username}, password: ${password}\n`);
    
    res.json({ success: true });
});

// forgot password
app.post('/forgot-password', (req, res) => {
    const { username } = req.body;
    const user = users.find(u => u.username === username);

    if (user) {
        res.json({ success: true, password: user.password });
    } else {
        res.json({ success: false });
    }
});



