const express = require("express");
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer"); // Importing nodemailer

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

const workspaces = [];
const properties = [];
const users = [];
let nextPropertyId = 1; // Variable to keep track of the next ID for properties
let nextWorkspaceId = 1; // Variable to keep track of the next ID for workspaces

// Add a new property
app.post("/api/properties", (req, res) => {
    const {
        address,
        neighborhood,
        squareFeet,
        parkingGarage,
        publicTransportation,
    } = req.body;

    if (!address || !neighborhood || !squareFeet) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const newProperty = {
        id: nextPropertyId++,
        address,
        neighborhood,
        squareFeet,
        parkingGarage,
        publicTransportation,
    };
    properties.push(newProperty);
    // Save the new property to the properties.txt file with the ID
    const propertyData = `id: ${newProperty.id}, address: ${address}, neighborhood: ${neighborhood}, squareFeet: ${squareFeet}, parkingGarage: ${parkingGarage}, publicTransportation: ${publicTransportation}\n`;
    fs.appendFileSync("properties.txt", propertyData);

    res.status(201).json(newProperty);
});

// Get all properties
app.get("/api/properties", (req, res) => {
    res.status(200).json(properties);
});

// Get a single property by ID
app.get("/api/properties/:propertyId", (req, res) => {
    const propertyId = parseInt(req.params.propertyId, 10);
    const property = properties.find((p) => p.id === propertyId);
    if (property) {
        res.status(200).json(property);
    } else {
        res.status(404).json({ error: "Property not found" });
    }
});

// Delete a property by ID
app.delete("/api/properties/:propertyId", (req, res) => {
    const propertyId = parseInt(req.params.propertyId, 10);
    const index = properties.findIndex((p) => p.id === propertyId);
    if (index !== -1) {
        properties.splice(index, 1);
        res.status(204).end();
    } else {
        res.status(404).json({ error: "Property not found" });
    }
});

// Get workspaces by property ID
app.get("/api/properties/:propertyId/workspaces", (req, res) => {
    const propertyId = parseInt(req.params.propertyId, 10);
    const propertyWorkspaces = workspaces.filter(
        (ws) => ws.propertyId === propertyId,
    );
    res.status(200).json(propertyWorkspaces);
});

// Add a new workspace to a property
app.post("/api/properties/:propertyId/workspaces", (req, res) => {
    const propertyId = parseInt(req.params.propertyId, 10);
    const {
        name,
        roomType,
        leaseTerm,
        availableSeats,
        price,
        smoking,
        deactivate,
    } = req.body;

    const newWorkspace = {
        id: nextWorkspaceId++,
        propertyId,
        name,
        roomType,
        leaseTerm,
        availableSeats,
        price,
        smoking,
        deactivate,
    };
    workspaces.push(newWorkspace);
    res.status(201).json(newWorkspace);
});

// Delete a workspace by ID
app.delete(
    "/api/properties/:propertyId/workspaces/:workspaceId",
    (req, res) => {
        const propertyId = parseInt(req.params.propertyId, 10);
        const workspaceId = parseInt(req.params.workspaceId, 10);
        const index = workspaces.findIndex(
            (ws) => ws.id === workspaceId && ws.propertyId === propertyId,
        );
        if (index !== -1) {
            workspaces.splice(index, 1);
            res.status(204).end();
        } else {
            res.status(404).json({ error: "Workspace not found" });
        }
    },
);

// Additional utility functions to load data from text files
function loadUsers() {
    if (fs.existsSync("users.txt")) {
        const data = fs.readFileSync("users.txt", "utf-8");
        const lines = data.trim().split("\n");
        lines.forEach((line) => {
            const [username, password, name, phone, email] = line
                .split(",")
                .map((item) => item.split(": ")[1]);
            users.push({ username, password, name, phone, email });
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
                id: nextPropertyId++, // Incrementing the property ID
                address: address,
                neighborhood: neighborhood,
                squareFeet: squareFeet,
                parkingGarage: parkingGarage === "true",
                publicTransportation: publicTransport === "true",
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
                propertyId,
                name,
                roomType,
                leaseTerm,
                availableSeats,
                price,
                smoking,
                deactivate,
            ] = line.split(",").map((item) => item.split(": ")[1]);
            workspaces.push({
                id: nextWorkspaceId++, // Incrementing the workspace ID
                propertyId: parseInt(propertyId, 10),
                name: name,
                roomType: roomType,
                leaseTerm: leaseTerm,
                availableSeats: parseInt(availableSeats, 10),
                price: parseFloat(price),
                smoking: smoking === "true",
                deactivate: deactivate === "true",
            });
        });
    }
}

//Login
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find(
        (u) => u.username === username && u.password === password,
    );
    if (user) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.post("/signin", (req, res) => {
    const { username, password, name, phone, email, role } = req.body;

    const userExists = users.some((u) => u.username === username);
    const emailExists = users.some((u) => u.email === email);
    const phoneExists = users.some((u) => u.phone === phone);

    if (userExists) {
        res.json({
            success: false,
            message: "Username already exists. Please choose another one.",
        });
    } else if (emailExists) {
        res.json({
            success: false,
            message: "Email already exists. Please use another one.",
        });
    } else if (phoneExists) {
        res.json({
            success: false,
            message: "Phone number already exists. Please use another one.",
        });
    } else {
        const newUser = { username, password, name, phone, email, role };
        users.push(newUser);

        fs.appendFileSync(
            "users.txt",
            `username: ${username}, password: ${password}, name: ${name}, phone: ${phone}, email: ${email}\n`,
        );

        res.json({ success: true });
    }
});

app.post("/check-availability", (req, res) => {
    const { username, email, phone } = req.body;

    const userExists = users.some((u) => u.username === username);
    const emailExists = users.some((u) => u.email === email);
    const phoneExists = users.some((u) => u.phone === phone);

    if (userExists) {
        res.json({ success: false, message: "Username already exists." });
    } else if (emailExists) {
        res.json({ success: false, message: "Email already exists." });
    } else if (phoneExists) {
        res.json({ success: false, message: "Phone number already exists." });
    } else {
        res.json({ success: true });
    }
});

// Send Email to recover password

let transporter = nodemailer.createTransport({
    service: "outlook",
    auth: {         user: "sodv1201@outlook.com",
        pass: "GqZtAbAa!z?2E8"
     }
});

app.post('/forgot-password', (req, res) => {
    const { email } = req.body;
    const user = users.find(u => u.email === email);

    if (user) {
        let mailOptions = {
            from: "sodv1201@outlook.com",
            to: email,
            subject: "Password Reset",
            text: `Your password is: ${user.password}`
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
                res.json({ success: false, message: 'Failed to send email.' });
            } else {
                console.log('Email sent: ' + info.response);
                res.json({ success: true, message: 'Email sent successfully.' });
            }
        });
    } else {
        res.json({ success: false, message: 'Username does not exist.' });
    }
});

app.get("/", (req, res) => {
    res.redirect("/login.html");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

loadUsers();
loadProperties();
loadWorkspaces();
